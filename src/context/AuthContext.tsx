// context/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { userByEmail } from '../graphql/queries';
import client from '../client';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isSignedIn: boolean;
  userId: string;
  userEmail: string;
  firstname: string;
  lastname: string;
  profileURL: string | undefined;
  description: string;
  setSignedIn: (value: boolean) => void;
  setUserId: (id: string) => void;
  setUserEmail: (email: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setProfileURL: (url: string) => void;
  setDescription: (desc: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [profileURL, setProfileURL] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>('');

  const logout = async () => {
    setSignedIn(false);
    setUserId('');
    setUserEmail('');
    setFirstName('');
    setLastName('');
    setProfileURL(undefined);
    setDescription('');
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
        setUserId(user.id);
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setProfileURL(user.profileURL);
        setDescription(user.description || '');
        setSignedIn(true);
      } catch (error) {
        console.log('Error fetching user attributes:', error);
      }
    };
    fetchUserAttributes();
  }, [isSignedIn])

  return (
    <AuthContext.Provider value={{ 
        isSignedIn, userId, userEmail, firstname, lastname, profileURL, description,
        setProfileURL,setSignedIn, setUserId, setUserEmail, setFirstName, setLastName, 
        setDescription, logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};
