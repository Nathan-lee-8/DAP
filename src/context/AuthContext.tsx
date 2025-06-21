import { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessaging, requestPermission, getToken, deleteToken 
} from '@react-native-firebase/messaging';

import client from '../client';
import { tokensByUser, userByEmail } from '../customGraphql/customQueries';
import { createToken, deleteTokenItem } from '../customGraphql/customMutations';
import { User } from '../API';
import { onUpdateUser } from '../customGraphql/customSubscriptions';

interface AuthContextType {
  isSignedIn: boolean;
  userEmail: string;
  currUser: User | undefined;
  setSignedIn: (value: boolean) => void;
  setUserEmail: (email: string) => void;
  setCurrUser: (currUser: User) => void;
  logout: () => void;
  triggerFetch: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ currUser, setCurrUser ] = useState<User | undefined>(undefined);
  const [ isSignedIn, setSignedIn ] = useState<boolean>(false);
  const [ userEmail, setUserEmail ] = useState<string>('');
  const [ fetchCounter, setFetchCounter ] = useState(0);
  const [ tokenDynamoID, setTokenDynamoID ] = useState<string>();

  //runs on app start up to check if user is already signed in
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await fetchUserAttributes();
        if(user.email) setUserEmail(user.email);
      } catch (error) {
        console.log('Error checking auth state:', error);
        await signOut();
      }
    };
    checkAuthState();
  }, []);

  //Sets current user data whenever userEmail is set or custom triggered by fetchcounter
  useEffect(() => {
    if(!userEmail || userEmail === '') return;
    const getUserAttributes = async () => {
      try {
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail.toLowerCase() },
          authMode: 'userPool'
        });
        const users = data.data.userByEmail.items;
        if(users.length > 0) setCurrUser(users[0]);
        setSignedIn(true);
      } catch (error) {
        console.log('Error fetching user attributes:', error);
      }
    };
    getUserAttributes();
  }, [userEmail, fetchCounter]);

  //trigger to get user attributes
  const triggerFetch = () => {
    setFetchCounter((item) => item + 1);
  }

  //requests notification permission after user is set
  useEffect(() => {
    let isMounted = true;
    const getNotificationPermission = async () => {
      try{
        const messaging = getMessaging();
        const authStatus = await requestPermission(messaging);
        if (authStatus > 0 && isMounted) {
          const token = await getToken(messaging);
          console.log('token:', token);
          await registerTokenToBackend(token); 
        } 
      }catch(error){
        console.log(error);
      }
    }
    getNotificationPermission();
    return () => { isMounted = false };
  }, [currUser?.id]);

  //Subscription to listen for new tokens.
  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = messaging.onTokenRefresh(async (newToken) => {
      await registerTokenToBackend(newToken); 
    });
    return () => unsubscribe();
  }, []);

  //Subscription to listen for new Notifications
  useEffect(() => {
    const subscription = client.graphql({
      query: onUpdateUser,
      variables:{
        filter: {
          id: { eq: currUser?.id }
        }
      },
      authMode: 'userPool'
    }).subscribe({
      next: () => {
        triggerFetch();
      },
      error: (error) => {
        console.warn(error);
      }
    })
    return () => subscription.unsubscribe();
  }, [currUser?.id]);

  //Signs out of the app and clears cached data
  const logout = async () => {
    setSignedIn(false);
    setUserEmail('');
    setCurrUser(undefined);
    removeToken();
    await signOut();
    AsyncStorage.clear();
  }

  //deletes current token from backend on logout
  const removeToken = async () => {
    if(!tokenDynamoID) return;
    deleteToken(getMessaging());
    try {
      await client.graphql({
        query: deleteTokenItem,
        variables: {
          input: {
            id: tokenDynamoID
          }
        },
        authMode: 'userPool'
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Creates a new token in backend for current user if token doesn't already exists
  const registerTokenToBackend = async (tokenID: string) => {
    if(!currUser) return;
    try {
      const tokenData = await client.graphql({
        query: tokensByUser,
        variables: {userID: currUser.id},
        authMode: 'userPool'
      });
      const exists = 
        tokenData.data.tokensByUser.items.some((item) => item.tokenID === tokenID);
      if(!exists){
        const res = await client.graphql({
          query: createToken,
          variables: {
            input: {
              tokenID: tokenID,
              userID: currUser.id,
            }
          },
          authMode: 'userPool'
        })
        setTokenDynamoID(res.data.createToken.id);
      }else{
        const matchedToken = tokenData.data.tokensByUser.items.find(
          (item) => item.tokenID === tokenID
        );
        const dbID = matchedToken?.id;
        setTokenDynamoID(dbID);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, userEmail, currUser, setSignedIn,
      setUserEmail, setCurrUser, logout, triggerFetch}}>
      {children}
    </AuthContext.Provider>
  );
};
