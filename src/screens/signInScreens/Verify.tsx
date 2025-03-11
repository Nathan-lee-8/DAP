import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, Keyboard,
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform
} from 'react-native';
import { confirmSignUp, resendSignUpCode, signIn} from '@aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';

/**
 * Retrieves the email, firstname, and lastname entered from the sign up page and 
 * allows the user to enter the verification code sent to their email. Once the
 * user is successfully verified through Cognito, the user info is added to dynamodb
 * tables. The user then is navigated to the home page.
 */
const VerifyScreen = ( {route} : any ) => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { setUserEmail } = authContext;
  const [ password, setPassword ] = useState(route.params.password);
  const email = route.params.email;
  const [ code, setCode ] = useState('');

  const handleVerification = async () => {
    try {
      const emailFormat = email.trim().toLowerCase();
      await confirmSignUp({username: emailFormat, confirmationCode: code });
      await signIn({username: emailFormat, password: password});
      setUserEmail(emailFormat);
    } catch (error) {
      console.log(error);
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
          <Text style={[styles.contentText, {alignContent: 'flex-start'}]}>
            Verification email sent to: 
            <Text style={{color: "#007BFF"}}> {email}</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
          />
          {!password &&
            <TextInput
              style={styles.input}
              placeholder="Enter password used at account creation"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          }
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <TouchableOpacity style={styles.buttonBlack} onPress={ resendSignUp }>
              <Text style={styles.buttonTextWhite}>Resend</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonWhite, {marginBottom: 80}]} onPress={ handleVerification }>
              <Text style={styles.buttonTextBlack}>Verify</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};


export default VerifyScreen;
