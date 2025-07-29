import { createContext, useState, ReactNode, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessaging, requestPermission, getToken, deleteToken 
} from '@react-native-firebase/messaging';

import client from '../client';
import { tokensByID, userByEmail } from '../customGraphql/customQueries';
import { createToken, deleteTokenItem } from '../customGraphql/customMutations';
import { User } from '../API';
import { onUpdateUser } from '../customGraphql/customSubscriptions';
import wsClient from '../components/webSocket';

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
        wsClient.setUserID(users[0].id);
        wsClient.connect();
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
    })
    return () => subscription.unsubscribe();
  }, [currUser?.id]);

  //Listens to app state and manages Chat API connection 
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        wsClient.disconnect();
      } else if (nextAppState === 'active') {
        wsClient.connect();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [])

  //Signs out of the app and clears cached data
  const logout = async () => {
    setSignedIn(false);
    setUserEmail('');
    setCurrUser(undefined);
    removeToken();
    wsClient.disconnect();
    wsClient.setUserID(null);
    await signOut();
    AsyncStorage.clear();
  }

  //deletes current token from backend on logout
  const removeToken = () => {
    if(!tokenDynamoID) return;
    deleteToken(getMessaging());
    client.graphql({
      query: deleteTokenItem,
      variables: {
        input: {
          id: tokenDynamoID
        }
      },
      authMode: 'userPool'
    }).catch(() => {})
  }

  //Checks if any other tokens with the same ID exist: 
  //  exists for current user: do nothing
  //  exists for other user: delete and create token
  //  no matching tokens: create token
  const registerTokenToBackend = async (tokenID: string) => {
    if(!currUser) return;
    try {
      const tokenData = await client.graphql({
        query: tokensByID,
        variables: {tokenID: tokenID},
        authMode: 'userPool'
      });
      const tokenList = tokenData.data.tokensByID.items;
      const isCurrent = tokenList.some((item) => item.userID === currUser.id);
      if(!isCurrent) return; //token connection exists for current user

      //remove all matching tokens from db
      tokenList.map((token: any) => {
        if(!token.tokenID) return;
        client.graphql({
          query: deleteTokenItem,
          variables: {
            input: {
              id: token.id
            }
          },
          authMode: 'userPool'
        }).catch(() => {})
      })

      //create token with current tokenID
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
    } catch { }
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, userEmail, currUser, setSignedIn,
      setUserEmail, setCurrUser, logout, triggerFetch}}>
      {children}
    </AuthContext.Provider>
  );
};
