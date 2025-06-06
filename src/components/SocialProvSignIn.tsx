import { useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { fetchUserAttributes, signInWithRedirect } from 'aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const SocialProvSignIn = ( {setLoading} : any ) => {
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { setUserEmail } = authContext;

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      setLoading(true);
      switch (payload.event) {
        case 'signInWithRedirect':
          handleSignIn();
          console.log('User signed in!');
          break;
        case 'signInWithRedirect_failure':
          Alert.alert('Error', 'Sign In Failed');
          setLoading(false);
          break;
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    try{
      const user = await fetchUserAttributes();
      if(user.email) setUserEmail(user.email);
      console.log(user);
    } catch (error) {
      console.log('Error signing in with Google:', error);
      Alert.alert('Error', 'Sign In Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{width: '100%'}}>
     <View style={styles.iconContainer}>
        <Text style={styles.label}>Login with Social Provider</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.icon} onPress={ () => signInWithRedirect({ provider: 'Google' }) }>
            <Icon name="logo-google" size={35} color="#007BFF"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SocialProvSignIn;