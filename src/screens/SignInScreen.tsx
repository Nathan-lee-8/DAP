import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { signIn, resetPassword } from '@aws-amplify/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SignInParamList } from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';

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
    try{
      await resetPassword({username: userEmail});
      navigation.navigate('ResetPassword');
      Alert.alert('Password reset email sent.', 'Please check your email to reset your password.');
    } catch (error : any) {
      Alert.alert('Error', 'Invalid email or account does not exist.');
    }
  }

  const resetConfirm = async () => {
    if(userEmail === ''){
      Alert.alert('Error', 'Invalid email or account does not exist.');
      return;
    }
    Alert.alert(
      'Confirm password reset for: ', userEmail,[
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: resetPw },
      ]
    );
  }

  const googleLogin = async () => {
    console.log('Google login not implemented yet.');
  }

  return (
    <View style={styles.container}>
      <View style={[styles.formContainer]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={userEmail}
          onChangeText={ setUserEmail }
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={ setPassword }
        />
        <View style={{flexDirection: 'row', alignSelf: 'center'}} > 
          <TouchableOpacity style={styles.buttonCentered} onPress={ resetConfirm }>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCentered} onPress={ handleSignIn }>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Text style={[styles.label]}>Login with Social Provider</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.icon} onPress={ googleLogin }>
            <Icon name="logo-google" size={35} color="#007BFF"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={ googleLogin }>
            <Icon name="logo-facebook" size={35} color="#007BFF"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={ googleLogin }>
            <Icon name="logo-apple" size={35} color="#007BFF"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={ googleLogin }>
            <Icon name="logo-amazon" size={35} color="#007BFF"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
