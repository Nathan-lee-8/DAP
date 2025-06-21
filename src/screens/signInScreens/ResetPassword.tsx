import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, Platform, Keyboard,
  TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { resetPassword, confirmResetPassword, signIn } from '@aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';

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
  const { setUserEmail } = authContext;
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password1, setPassword1 ] = useState('');
  const [ hasReset, setHasReset ] = useState(false);
  const [ email, setEmail ] = useState('');

  const confirmPasswordReset = async () => {
    if(password != password1) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await confirmResetPassword({ 
        username: email.trim().toLowerCase(),
        confirmationCode: code,
        newPassword: password
      });
      await signIn({ username: email.trim().toLowerCase(), password: password })
      setUserEmail(email.trim().toLowerCase());
      Alert.alert('Success', 'Password reset successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  const handleResetPassword = async () => {
    try {
      await resetPassword({ username: email.trim().toLowerCase() });
      setHasReset(true);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  if(!hasReset){
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <ImgComponent uri="logo" style={styles.logoLarge}/>
            <Text style={styles.loginText}>Enter your email to reset your password</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter email'
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.loginBtn} onPress={ handleResetPassword}>
              <Text style={styles.loginBtnText}>Reset Password</Text>
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ImgComponent uri="logo" style={styles.logoLarge}/>
          <Text style={styles.loginText}>Enter the confirmation code sent to: 
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
          <TouchableOpacity style={styles.loginBtn} onPress={ confirmPasswordReset }>
            <Text style={styles.loginBtnText}>Reset Password</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ResetPassword;
