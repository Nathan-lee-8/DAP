import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView,
  ActivityIndicator, TouchableWithoutFeedback, Platform } from 'react-native';
import { signUp } from '@aws-amplify/auth';
import styles from '../../styles/Styles';

/**
 * Creates a user profile in Cognito. Navigates to the Verify page to confirm 
 * verification code.
 */
const SignUp = ( {navigation} : any ) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSignUp = async () => {
    if(email === '') {
      Alert.alert('Error', 'Please enter an email.');
      return;
    }else if(password === '') {
      Alert.alert('Error', 'Please enter a password.');
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.note}>
            *Note: Password can not be changed until after account verification
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <TouchableOpacity style={[styles.buttonBlack, {marginTop: 20}]} 
              onPress={ handleSignUp }
            >
              <Text style={styles.buttonTextWhite}>Create Account</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignUp;