// context/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
  isSignedIn: boolean;
  userId: string;
  userEmail: string;
  firstname: string;
  lastname: string;
  session: any;
  setSignedIn: (value: boolean) => void;
  setUserId: (id: string) => void;
  setUserEmail: (email: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setSession: (session: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [session, setSession] = useState(null);

  const logout = async () => {
    setSession(null);
    await AsyncStorage.removeItem("newsFeedCacheFreeAndForSale");
    await AsyncStorage.removeItem("newsFeedCacheJobListings");
    await AsyncStorage.removeItem("newsFeedCacheVolunteerOpportunities");
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

  return (
    <AuthContext.Provider value={{ 
        isSignedIn, userId, userEmail, firstname, lastname, session,
        setSignedIn, setUserId, setUserEmail, setFirstName, setLastName, setSession, logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
