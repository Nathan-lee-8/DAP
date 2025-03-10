import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform
 } from 'react-native';
import { signUp } from '@aws-amplify/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SignInParamList } from '../../types/rootStackParamTypes';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import SocialProvSignIn from '../../components/SocialProvSignIn';

/**
 * Accesses user inputted email, password, first and last name and creates a 
 * user profile in Cognito. Navigates to the Verify page to confirm 
 * verification code.
 */
const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userEmail , firstname, lastname, setUserEmail, setFirstName, setLastName } = authContext;
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if(firstname === '') {
      Alert.alert('Error', 'Please enter your first name.');
      return;
    }else if(lastname === '') {
      Alert.alert('Error', 'Please enter your last name.');
      return;
    }else if(userEmail === '') {
      Alert.alert('Error', 'Please enter an email.');
      return;
    }else if(password === '') {
      Alert.alert('Error', 'Please enter a password.');
      return;
    }
    try{
      await signUp({ username: userEmail, password: password });
      navigation.navigate('Verify', {password: password});
    } catch (error: any) {
      if(error.message.includes("User already exists")){
        Alert.alert('Account exists', 'Verify your account or navigate to Sign-in page.',[
          { text: 'Cancel', style: 'cancel' },
          { text: 'Verify', onPress: () => navigation.navigate('Verify', {} )},
        ]);
        return;
      }
      Alert.alert('Error', error.message);
    };
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={firstname}
            onChangeText={setFirstName}
            autoCapitalize="words"
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={setLastName}
            autoCapitalize="words"
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={userEmail}
            onChangeText={setUserEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.note}>*Note: Password can not be changed until after account is verified</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <TouchableOpacity style={[styles.buttonBlack, {marginTop: 20}]} onPress={ handleSignUp }>
              <Text style={styles.buttonTextWhite}>Create Account</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        
      </TouchableWithoutFeedback>
      <SocialProvSignIn/>
    </View>
  );
};

export default SignUp;