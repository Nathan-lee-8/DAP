// context/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { userByEmail } from '../graphql/queries';
import client from '../client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../API';

interface AuthContextType {
  isSignedIn: boolean;
  userEmail: string;
  currUser: User | undefined;
  setSignedIn: (value: boolean) => void;
  setUserEmail: (email: string) => void;
  setCurrUser: (currUser: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currUser, setCurrUser ] = useState<User | undefined>(undefined);
  const [isSignedIn, setSignedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  //Signs out of the app and clears cached data
  const logout = async () => {
    setSignedIn(false);
    setUserEmail('');
    setCurrUser(undefined);
    await signOut();
    AsyncStorage.clear();
  }
  
  //runs on app start up to check if user is already signed in
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await fetchUserAttributes();
        if(user.email){ 
          setUserEmail(user.email);
        } else{
          console.log('error getting user from cognito');
        }
      } catch (error) {
        console.log('Error checking auth state:', error);
        await signOut();
      }
    };
    checkAuthState();
  }, []);

  //Sets current user data whenever userEmail is set
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
  }, [userEmail]);

  return (
    <AuthContext.Provider value={{ isSignedIn, userEmail, currUser, setSignedIn,
      setUserEmail, setCurrUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
