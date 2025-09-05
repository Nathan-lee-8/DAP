import { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, ActivityIndicator,
  TouchableWithoutFeedback } from 'react-native';

import { signIn, fetchUserAttributes, signInWithRedirect } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { AuthContext } from '../../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignInParamList } from '../../types/rootStackParamTypes';

import { AppleButton } from '@invertase/react-native-apple-authentication';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

/**
 * Displays Inputs for user to sign in with email and password and Icon for user to sign
 * in with Google. Signs in using user input values and retrieves the User input email 
 * and password. Signs in with Cognito and sets user email.
 */
const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { setUserEmail } = authContext;

  //Signs in to cognito, navigates to verify if unverified & triggers signin through 
  //authcontext if verified
  const handleSignIn = async () => {
    setLoading(true);
    try{
      const res = await signIn({username: email.trim().toLowerCase(), password: password});
      if(!res.isSignedIn){
        Alert.alert('Error', 'Please verify your email before signing in.', [
          {text: 'OK', onPress: () => navigation.navigate('Verify', {email: email})}
        ]);
        setLoading(false);
        return;
      };
      setUserEmail(email.trim().toLowerCase());
    } catch {
      Alert.alert('Error', 'Invalid email & password or account does not exist.');
      setLoading(false);
    }
  };

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

  //handles social provider signin: setsUser email triggers signin through authcontext
  const handleSocialProviderSignIn = async () => {
    try{
      const user = await fetchUserAttributes();
      if(user.email) setUserEmail(user.email);
    } catch (err) {
      Alert.alert('Error', 'Sign In Failed');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const resetPw = async () => {
    navigation.navigate('ResetPassword');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <ImgComponent uri="logo" style={styles.logoLarge}/>
          <Text style={styles.loginText}>Log in</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={ setEmail }
          />
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={ setPassword }
            />
            <Icon name={passwordVisible ? 'eye-off' : 'eye'}
              style={styles.seePasswordIcon} size={20} 
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          </View>
          
          {loading ? ( 
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <TouchableOpacity style={styles.signInBtn} onPress={ handleSignIn }
                disabled={loading}
              >
                <Text style={styles.loginBtnText}>Sign In</Text>
              </TouchableOpacity>
              <Text style={{textAlign:'center', marginVertical: 15}}>or</Text>
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}  // BLACK, WHITE, WHITE_OUTLINE
                buttonType={AppleButton.Type.SIGN_IN}  // SIGN_IN, CONTINUE
                style={styles.appleBtn}
                cornerRadius={4}
                onPress={() => signInWithRedirect({provider: 'Apple'})}
              />
              <GoogleSigninButton
                style={styles.googleBtn}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => signInWithRedirect({provider: 'Google'})}
              />
            </View>
          )}

          <View style={styles.centeredRow}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} disabled={loading}>
              <Text style={styles.hyperlink}>Sign Up</Text> 
            </TouchableOpacity>
          </View>

          <View style={styles.centeredRow}>
            <Text>Forgot Password? </Text>
            <TouchableOpacity onPress={ resetPw } disabled={loading}>
              <Text style={styles.hyperlink}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignIn;
