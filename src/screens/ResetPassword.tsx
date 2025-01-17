import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { confirmResetPassword } from '@aws-amplify/auth';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';

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
  const { setSignedIn, setUserEmail, userEmail } = authContext;
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const confirmPasswordReset = async () => {
    if(password != password1) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await confirmResetPassword({ username: userEmail, confirmationCode: code, newPassword: password });
      setSignedIn(true);
      setUserEmail(userEmail);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={[styles.container, styles.formContainer]}>
        <Text style={[styles.title, {marginBottom: 30}]}>Enter the confirmation code sent to: {userEmail} </Text>
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
        <TouchableOpacity style={styles.buttonCentered} onPress={ confirmPasswordReset }>
            <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;
