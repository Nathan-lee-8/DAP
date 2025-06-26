import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, Platform,
  TouchableWithoutFeedback, KeyboardAvoidingView,  } from 'react-native';

import { signUp } from '@aws-amplify/auth';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Creates a user profile in Cognito. Navigates to the Verify page to confirm 
 * verification code.
 */
const SignUp = ( {navigation} : any ) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordCheck, setPasswordCheck ] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ passwordCheckVisible, setPasswordCheckVisible ] = useState(false);

  const handleSignUp = async () => {
    if(email === '') {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }else if(password === '') {
      Alert.alert('Error', 'Please enter a password.');
      return;
    }else if( password !== passwordCheck){
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try{
      await signUp({ username: email.trim().toLowerCase(), password: password });
      navigation.navigate('Verify', {email: email, password: password});
    } catch (error: any) {
      if(error.message.includes("User already exists")){
        Alert.alert('Account exists', 'Verify your account or navigate to Sign-in page.',[
          { text: 'Cancel', style: 'cancel' },
          { text: 'Verify', onPress: () => navigation.navigate('Verify', {email: email} )},
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
          <ImgComponent uri="logo" style={styles.logoLarge}/>
          <Text style={styles.loginText}>Create a Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={passwordVisible}
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
              placeholder="Re-Enter Password"
              secureTextEntry={passwordCheckVisible}
              value={passwordCheck}
              onChangeText={setPasswordCheck}
            />
            <Icon name={passwordCheckVisible ? 'eye-off' : 'eye'} 
              style={styles.seePasswordIcon} size={20}
              onPress={() => setPasswordCheckVisible(!passwordCheckVisible)}
            />
          </View>

          <Text style={styles.note}>
            *Note: Password can not be changed until after account verification
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <TouchableOpacity style={[styles.loginBtn, {marginTop: 20}]} 
              onPress={ handleSignUp }
            >
              <Text style={styles.loginBtnText}>Continue</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignUp;