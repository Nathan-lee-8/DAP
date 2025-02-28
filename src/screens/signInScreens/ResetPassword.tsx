import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, Platform,
  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView 
} from 'react-native';
import { resetPassword, confirmResetPassword } from '@aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';

/**
 * Retrieves the code and password from the user. Resets the password in Cognito
 * as long as user entered code is correct and password match. 
 */
const ResetPassword = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { setSignedIn, setUserEmail } = authContext;
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password1, setPassword1 ] = useState('');
  const [ hasReset, setHasReset ] = useState(true);
  const [ email, setEmail ] = useState('');

  const confirmPasswordReset = async () => {
    if(password != password1) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await confirmResetPassword({ username: email, confirmationCode: code, newPassword: password });
      setSignedIn(true);
      setUserEmail(email);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  const handleResetPassword = async () => {
    try {
      await resetPassword({ username: email });
      setHasReset(true);
      setUserEmail(email);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  if(!hasReset){
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.contentText}>Enter your email to reset your password:</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter email'
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={[styles.buttonBlack, {marginBottom: 140}]} onPress={ handleResetPassword}>
            <Text style={styles.buttonTextWhite}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <Text style={styles.contentText}>Enter the confirmation code sent to: 
            <Text style={{color: "#007BFF"}}> {email}</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter confirmation code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Re-enter new password"
            value={password1}
            onChangeText={setPassword1}
          />
          <TouchableOpacity style={styles.buttonBlack} onPress={ confirmPasswordReset }>
            <Text style={styles.buttonTextWhite}>Reset Password</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ResetPassword;
