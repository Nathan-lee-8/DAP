import { createContext, useState, ReactNode, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessaging, requestPermission, getToken, deleteToken 
} from '@react-native-firebase/messaging';

import client from '../client';
import { blockListByBlocked, blockListByBlocker, tokensByID, userByEmail 
} from '../customGraphql/customQueries';
import { createToken, deleteTokenItem } from '../customGraphql/customMutations';
import { onUpdateUser, onCreateBlockList, onDeleteBlockList
 } from '../customGraphql/customSubscriptions';
import { User } from '../API';
import wsClient from '../components/webSocket';

interface AuthContextType {
  isSignedIn: boolean;
  userEmail: string;
  currUser: User | undefined;
  blockList: string[];
  setSignedIn: (value: boolean) => void;
  setUserEmail: (email: string) => void;
  setCurrUser: (currUser: User) => void;
  logout: () => void;
  triggerFetch: () => void;
  setBlockList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ currUser, setCurrUser ] = useState<User | undefined>(undefined);
  const [ isSignedIn, setSignedIn ] = useState<boolean>(false);
  const [ userEmail, setUserEmail ] = useState<string>('');
  const [ fetchCounter, setFetchCounter ] = useState(0);
  const [ tokenDynamoID, setTokenDynamoID ] = useState<string>();
  const [ blockList, setBlockList ] = useState<string[]>([]);

  //runs on app start up to check if user is already signed in
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await fetchUserAttributes();
        if(user.email) setUserEmail(user.email);
      } catch {
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
        if(users.length > 0){ 
          setCurrUser(users[0])
          wsClient.setUserID(users[0].id);
          wsClient.connect();
        }
      } catch (error) {
        console.log('Error fetching user attributes:', error);
      } finally { 
        setSignedIn(true);
      }
    };
    getUserAttributes();
  }, [userEmail, fetchCounter]);

  //Subscription to listen for updates to User metadata
  useEffect(() => {
    if(!currUser || !currUser.id) return;
    const subscription = client.graphql({
      query: onUpdateUser,
      variables:{
        filter: {
          id: { eq: currUser.id }
        }
      },
      authMode: 'userPool'
    }).subscribe({
      next: (msg) => {
        const updateUser = msg.data?.onUpdateUser;
        console.log('updating User', updateUser);
        if(updateUser) setCurrUser(updateUser);
      },
      error: (err) => console.error(err),
    })
    return () => subscription.unsubscribe();
  }, [currUser?.id]);

  //fetch blocked users whenever userID updates and subscription to listen for 
  //when users block or unblock currUser
  useEffect(() => {
    if(!currUser) return;

    const getBlockList = async () => {
      const blockedData = await client.graphql({
        query: blockListByBlocker,
        variables: {
          blockerID: currUser.id
        },
        authMode: 'userPool'
      })
      const blockedMeData = await client.graphql({
        query: blockListByBlocked,
        variables: {
          blockedID: currUser.id
        },
        authMode: 'userPool'
      })
      const blocked = blockedData.data.blockListByBlocker.items || [];
      const blockedMe = blockedMeData.data.blockListByBlocked.items || [];

      const combinedBlockList = Array.from(
        new Set([
          ...blocked.map((item: any) => item.blockedID),
          ...blockedMe.map((item: any) => item.blockerID)
        ])
      );
      setBlockList(combinedBlockList);
    }

    getBlockList();
    
    let timeout: NodeJS.Timeout;
    const handleUpdate = () => {
      clearTimeout(timeout);
      timeout = setTimeout(getBlockList, 300);
    }

    //subsription to fetch blocklist when curr user is blocked or unblocked
    const onBlocked = client.graphql({
      query: onCreateBlockList,
      variables: {
        filter: { blockedID: { eq: currUser.id } }
      },
      authMode: 'userPool'
    }).subscribe({
      next: handleUpdate
    });

    const onUnblocked = client.graphql({
      query: onDeleteBlockList,
      variables: {
        filter: { blockedID: { eq: currUser.id } }
      },
      authMode: 'userPool'
    }).subscribe({
      next: handleUpdate
    })

    return () => {
      onBlocked.unsubscribe();
      onUnblocked.unsubscribe();
    }
  }, [currUser?.id])

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

  //Subscription to listen for new FCM tokens.
  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = messaging.onTokenRefresh(async (newToken) => {
      await registerTokenToBackend(newToken); 
    });
    return () => unsubscribe();
  }, []);

  //subsciprtion to listen for new incoming messages from WS client and 
  //update notification/unreadMessagecounts
  useEffect(() => {
    if(!currUser || !currUser.id) return;
    const handleWSMessage  = (data: any ) => {
      if(data.action === 'subscribe_to_chat'){
        if (wsClient.socket && wsClient.socket.readyState === WebSocket.OPEN) {
          wsClient.send({
            action: 'joinChat',
            userIDs: [currUser.id],
            chatID: data.chatID
          });
        }
      }else{
        console.log('auth WS log', data);
      }
    }
    wsClient.addListener(handleWSMessage);
    return () => wsClient.removeListener(handleWSMessage);
  }, [currUser?.id])

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
    <AuthContext.Provider value={{ isSignedIn, userEmail, currUser, blockList, setSignedIn,
      setUserEmail, setCurrUser, logout, triggerFetch, setBlockList}}>
      {children}
    </AuthContext.Provider>
  );
};
