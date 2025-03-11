import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, ActivityIndicator,
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
 * user email.
 */
const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { setUserEmail } = authContext;

  //Signs in to cognito, navigates to verify if unverified
  const handleSignIn = async () => {
    try{
      const res = await signIn({ username: email.trim().toLowerCase(), password: password });
      if(!res.isSignedIn){
        Alert.alert('Error', 'Please verify your email before signing in.',[
          { text: 'OK', onPress: () => navigation.navigate('Verify', {email: email}) }
        ]);
        return;
      };
      setUserEmail(email.trim().toLowerCase());
    } catch (error: any) {
      Alert.alert('Error', 'Invalid email & password or account does not exist.');
    };
  };

  const resetPw = async () => {
    navigation.navigate('ResetPassword');
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.formContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={ setEmail }
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
      <SocialProvSignIn setLoading={setLoading}/>
    </View>
  );
};

export default SignIn;
