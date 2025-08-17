import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, Keyboard,
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';

import { confirmSignUp, resendSignUpCode, signIn} from '@aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignInParamList } from '../../types/rootStackParamTypes';

/**
 * Retrieves the email, firstname, and lastname entered from the sign up page and 
 * allows the user to enter the verification code sent to their email. Once the
 * user is successfully verified through Cognito, the user info is added to dynamodb
 * tables. The user then is navigated to the home page.
 */
const VerifyScreen = ( {route} : any ) => {
  const authContext = useContext(AuthContext);
  const [ loading, setLoading ] = useState(false);
  if(!authContext) {
    return null;
  }
  const { setUserEmail } = authContext;
  const [ password, setPassword ] = useState(route.params.password);
  const [ code, setCode ] = useState('');
  const email = route.params.email;
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();

  const handleVerification = async () => {
    setLoading(true);
    const emailFormat = email.trim().toLowerCase();
    try {
      await confirmSignUp({username: emailFormat, confirmationCode: code });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Incorrect verification code.');
    }
    try{
      await signIn({username: emailFormat, password: password});
      setUserEmail(emailFormat);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Internal error: ' + 
        'sign in with your password in the Sign-in Screen');
      navigation.reset({
        index: 1,
        routes: [{name: 'Welcome'}, {name: 'SignIn'}]
      });
      setLoading(false);
    }
  }

  const resendSignUp = async () => {
    try {
      resendSignUpCode({ username: email.trim().toLowerCase() });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      Alert.alert('Success', 'Verification code resent');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <ImgComponent uri="logo" style={styles.logoLarge}/>
          <Text style={styles.loginText}>
            Verification email sent to: 
            <Text style={{color: "#007BFF"}}> {email}</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
          />
          {!password &&
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          }
          {loading ? ( 
           <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
              <TouchableOpacity style={styles.signInBtn} onPress={ handleVerification }>
                <Text style={styles.loginBtnText}>Verify</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={ resendSignUp} style={{marginTop: 20}}>
                <Text style={styles.hyperlink}>Resend code</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};


export default VerifyScreen;
