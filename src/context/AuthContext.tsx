// context/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { userByEmail } from '../graphql/queries';
import client from '../client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../API';

interface AuthContextType {
  isSignedIn: boolean;
  userEmail: string;
  firstname: string;
  lastname: string;
  profileURL: string | undefined;
  currUser: User | undefined;
  setSignedIn: (value: boolean) => void;
  setUserEmail: (email: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setProfileURL: (url: string) => void;
  setCurrUser: (currUser: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currUser, setCurrUser ] = useState<User | undefined>(undefined);
  const [isSignedIn, setSignedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [profileURL, setProfileURL] = useState<string | undefined>(undefined);

  const logout = async () => {
    setSignedIn(false);
    setUserEmail('');
    setFirstName('');
    setLastName('');
    setProfileURL(undefined);
    setCurrUser(undefined);
    AsyncStorage.clear();
  }

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const user = await fetchUserAttributes();
        if(user.email) setUserEmail(user.email);
        setSignedIn(true);
      } catch (error) {
        console.log('Error checking auth state:', error);
      }
    };
    checkAuthState();
  }, []);

  useEffect(() => {
    if(!userEmail) return;
    const fetchUserAttributes = async () => {
      try {
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail.toLowerCase() },
          authMode: 'userPool'
        });
        const user = data.data.userByEmail.items[0];
        setCurrUser(user);
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setProfileURL(user.profileURL);
        setSignedIn(true);
      } catch (error) {
        console.log('Error fetching user attributes:', error);
      }
    };
    fetchUserAttributes();
  }, [isSignedIn])

  return (
    <AuthContext.Provider value={{ 
        isSignedIn, userEmail, firstname, lastname, profileURL, currUser,
        setProfileURL,setSignedIn, setUserEmail, setFirstName, setLastName, setCurrUser, logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
