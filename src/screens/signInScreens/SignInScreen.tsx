import { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, ActivityIndicator,
  TouchableWithoutFeedback } from 'react-native';

import { signIn, fetchUserAttributes, signInWithRedirect } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { AuthContext } from '../../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../../styles/Styles';

/**
 * Displays Inputs for user to sign in with email and password and Icon for user to sign
 * in with Google. Signs in using user input values and retrieves the User input email 
 * and password. Signs in with Cognito and sets user email.
 */
const SignIn = ({route}: any) => {
  const navigation = route.navigation;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { setUserEmail } = authContext;

  //Subscription to listen for social provider login response
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      setLoading(true);
      switch (payload.event) {
        case 'signInWithRedirect':
          handleSocialProviderSignIn();
          break;
        case 'signInWithRedirect_failure':
          Alert.alert('Error', 'Sign In Failed');
          setLoading(false);
          break;
      }
    });
    return unsubscribe;
  }, []);

  //Signs in to cognito, navigates to verify if unverified & triggers signin through 
  //authcontext if verified
  const handleSignIn = async () => {
    try{
      const res = await signIn({ username: email.trim().toLowerCase(), password: password });
      if(!res.isSignedIn){
        Alert.alert('Error', 'Please verify your email before signing in.',[
          { text: 'OK', onPress: () => navigation.navigate('Verify', {email: email}) }
        ]);
        return;
      };
      setUserEmail(email.trim().toLowerCase());
    } catch (error: any) {
      Alert.alert('Error', 'Invalid email & password or account does not exist.');
    };
  };

  //handles social provider signin: sets User email triggering signin through authcontext
  const handleSocialProviderSignIn = async () => {
    try{
      const user = await fetchUserAttributes();
      if(user.email) setUserEmail(user.email);
    } catch {
      Alert.alert('Error', 'Sign In Failed');
    } finally {
      setLoading(false);
    }
  }

  const resetPw = async () => {
    navigation.navigate('ResetPassword');
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.formContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={ setEmail }
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={ setPassword }
          />
          <TouchableOpacity style={[styles.buttonBlack, {marginTop: 20}]} onPress={ handleSignIn }>
            <Text style={styles.buttonTextWhite}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlack} 
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonTextWhite}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.centeredRow}>
        <Text>Forgot Password? </Text>
        <TouchableOpacity onPress={ resetPw }>
          <Text style={{color: "#007BFF"}}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%'}}>
        <View style={styles.iconContainer}>
          <Text style={styles.label}>Login with Google</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.icon} onPress={ () => signInWithRedirect({ provider: 'Google' }) }>
              <Icon name="logo-google" size={35} color="#007BFF"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
