import { useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { fetchUserAttributes, signInWithRedirect } from 'aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const SocialProvSignIn = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { setUserEmail, setSignedIn } = authContext;

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      console.log(payload);
      switch (payload.event) {
        case 'signInWithRedirect':
          handleSignIn();
          console.log('User signed in!');
          break;
        case 'signInWithRedirect_failure':
          Alert.alert('Error', 'Sign In Failed');
          break;
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    const user = await fetchUserAttributes();
    if(user.email) setUserEmail(user.email);
    setSignedIn(true);
  }

  return (
    <View style={{width: '100%'}}>
     <View style={styles.iconContainer}>
        <Text style={styles.label}>Login with Social Provider</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.icon} onPress={ () => signInWithRedirect({ provider: 'Google' }) }>
            <Icon name="logo-google" size={35} color="#007BFF"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={ () => signInWithRedirect({ provider: 'Google' }) }>
            <Icon name="logo-facebook" size={35} color="#007BFF"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={ () => signInWithRedirect({ provider: 'Google' }) }>
            <Icon name="logo-apple" size={35} color="#007BFF"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={ () => signInWithRedirect({ provider: 'Google' }) }>
            <Icon name="logo-amazon" size={35} color="#007BFF"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SocialProvSignIn;