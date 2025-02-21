import { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { confirmSignUp, resendSignUpCode, signIn} from '@aws-amplify/auth';
import client from '../client';
import { createUser } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';

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
  const { userEmail, firstname, lastname, setSignedIn } = authContext;
  const [password, setPassword] = useState(route.params.password);
  const [code, setCode] = useState('');

  const handleVerification = async () => {
    try {
      await confirmSignUp({username: userEmail, confirmationCode: code });
      await signIn({username: userEmail, password: password});
      await client.graphql({
        query: createUser,
        variables: {
          input: { 
            email: userEmail.toLowerCase(), 
            firstname: firstname.trim(), 
            lastname: lastname.trim(),
            profileURL: 'defaultUser'
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
      <View style={styles.formContainer}>
        <Text style={styles.contentText}>Verification email sent to:
          <Text style={{color: "#007BFF"}}> {userEmail}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={6}
        />
        {!password ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter password used at account creation"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        ) : (null)}
        <TouchableOpacity style={styles.buttonBlack} onPress={ resendSignUp }>
          <Text style={styles.buttonTextWhite}>Resend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWhite} onPress={ handleVerification }>
          <Text style={styles.buttonTextBlack}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default VerifyScreen;
