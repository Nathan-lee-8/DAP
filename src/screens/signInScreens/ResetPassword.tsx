import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, Keyboard,
  TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';

import { resetPassword, confirmResetPassword, signIn } from '@aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Retrieves the code and password from the user. Resets the password in Cognito
 * as long as user entered code is correct and password match. 
 */
const ResetPassword = ( {navigation} : any) => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    return null;
  }
  const { setUserEmail } = authContext;
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordCheck, setPasswordCheck ] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false); 
  const [ passwordCheckVisible, setPasswordCheckVisible ] = useState(false); 
  const [ hasReset, setHasReset ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ loading, setLoading ] = useState(false); //for password reset
  const [ codeLoading, setCodeLoading ] = useState(false); //for confirmation code request

  const confirmPasswordReset = async () => {
    if(password != passwordCheck) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await confirmResetPassword({ 
        username: email.trim().toLowerCase(),
        confirmationCode: code,
        newPassword: password
      });
      await signIn({ username: email.trim().toLowerCase(), password: password })
      setUserEmail(email.trim().toLowerCase());
      setCode('');
      Alert.alert('Success', 'Password reset successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }finally {
      setLoading(false);
    }
  }

  const handleResetPassword = async () => {
    if(email === ''){
      Alert.alert('Error', 'Please enter a valid email.');
    }
    setCodeLoading(true);
    try {
      await resetPassword({ username: email.trim().toLowerCase() });
      setHasReset(true);
      Alert.alert('Success', 'Confirmation code sent to ' + email);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally{
      setCodeLoading(false);
    }
  }

  if(!hasReset){
    return (
      <View style={styles.container}>
        <View style={styles.header}/>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} size={25} color={'black'}/>
          <Text style={styles.backText}>Log in </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <ImgComponent uri="logo" style={styles.logoLarge}/>
            <Text style={styles.loginText}>Reset password</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter email'
              value={email}
              onChangeText={setEmail}
            />
            { codeLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (  
              <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
                <Text style={styles.loginBtnText}>Reset Password</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={25} color={'black'}/>
        <Text style={styles.backText}>Log in </Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <ImgComponent uri="logo" style={styles.logoLarge}/>
          <Text style={styles.loginText}>Enter confirmation code</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmation code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
          />
          <View>
            <TextInput
              style={styles.input}
              placeholder="New password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} 
              style={styles.seePasswordIcon} size={20} 
              onPress={() => setPasswordVisible(!passwordVisible)} 
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Re-enter new password"
              secureTextEntry={!passwordCheckVisible}
              value={passwordCheck}
              onChangeText={setPasswordCheck}
            />
            <Icon name={passwordCheckVisible ? 'eye-off' : 'eye'} 
              style={styles.seePasswordIcon} size={20} 
              onPress={() => setPasswordCheckVisible(!passwordCheckVisible)} 
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.loginBtn} onPress={confirmPasswordReset}>
              <Text style={styles.loginBtnText}>Reset Password</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ResetPassword;
