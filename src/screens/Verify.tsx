import { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { confirmSignUp, resendSignUpCode, signIn} from '@aws-amplify/auth';
import client from '../client';
import { createUser } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';

/**
 * Retrieves the email, firstname, and lastname entered from the sign up page and 
 * allows the user to enter the verification code sent to their email. Once the
 * user is successfully verified through Cognito, the user info is added to dynamodb
 * tables. The user then is navigated to the home page.
 */
const VerifyScreen = ( route : any) => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userEmail, firstname, lastname, setSignedIn } = authContext;
  const [code, setCode] = useState('');

  const handleVerification = async () => {
    try {
      await confirmSignUp({username: userEmail, confirmationCode: code });
      const password = route.route.params.password;
      await signIn({ username: userEmail, password: password });
      const user = await client.graphql({
        query: createUser,
        variables: {
          input: { 
            email: userEmail.toLowerCase(), 
            firstname: firstname, 
            lastname: lastname, 
          },
        },
        authMode: 'userPool'
      });
      setSignedIn(true); 
    } catch (error) {
      console.log(error);
    }
  }

  const resendSignUp = async () => {
    try {
      resendSignUpCode({ username: userEmail });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      Alert.alert('Success', 'Verification code resent');
    }
  }

  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Enter verification code"
      value={code}
      onChangeText={setCode}
      keyboardType="numeric"
      maxLength={6}
    />
    <Button title="Verify" onPress={handleVerification} />
    <Button title="Resend Code" onPress={resendSignUp} />
  </View>
  );
};

//Styles for Verify page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
});

export default VerifyScreen;
