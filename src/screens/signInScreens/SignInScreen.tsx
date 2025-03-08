import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback } from 'react-native';
import { signIn } from '@aws-amplify/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SignInParamList } from '../../types/rootStackParamTypes';
import { AuthContext } from '../../context/AuthContext';
import SocialProvSignIn from '../../components/SocialProvSignIn';
import styles from '../../styles/Styles';

/**
 * Retrieves the User input email and password. Signs in with Cognito and sets
 * user email and signed in status & navigates to homepage.
 */
const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { setSignedIn, setUserEmail, userEmail } = authContext;

  const handleSignIn = async () => {
    try{
      const res = await signIn({ username: userEmail, password: password });
      if(!res.isSignedIn){
        Alert.alert('Error', 'Please verify your email before signing in.',[
          { text: 'OK', onPress: () => navigation.navigate('Verify', {}) }
        ]);
        return;
      };
      setSignedIn(true);
    } catch (error: any) {
      Alert.alert('Error', 'Invalid email & password or account does not exist.');
    };
  };

  const resetPw = async () => {
    navigation.navigate('ResetPassword');
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.formContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={userEmail}
            onChangeText={ setUserEmail }
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
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.centeredRow}>
        <Text>Forgot Password? </Text>
        <TouchableOpacity onPress={ resetPw }>
          <Text style={{color: "#007BFF"}}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      <SocialProvSignIn/>
    </View>
  );
};

export default SignIn;
