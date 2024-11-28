import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, useWindowDimensions, 
  Alert } from 'react-native';
import { signIn, signUp, resetPassword } from '@aws-amplify/auth';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/rootStackParamTypes';
import client from '../client';
import { userByEmail } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';

/**
 * Retrieves the User input email and password. Signs in with Cognito then gets
 * user information from dynamoDB. Sets user context data then navigates home.
 * 
 * TODO: Add social provider login (Facebook, Google, Twitter, etc.)
 */
const SignInRoute = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };

  const { setSignedIn, setUserId, setUserEmail, setFirstName, setLastName, userEmail } = authContext;

  const handleSignIn = async () => {
    try{
      const res = await signIn({ username: userEmail, password: password });
      if(!res.isSignedIn){
        navigation.navigate('Verify');
        Alert.alert('Please verify your email before signing in.');
        return;
      };
      const data = await client.graphql({
        query: userByEmail,
        variables: { email: userEmail.toLowerCase() },
      });
      const user = data.data.userByEmail.items[0];
      setSignedIn(true);
      setUserId(user.id);
      if(user.firstname) setFirstName(user.firstname);
      if(user.lastname) setLastName(user.lastname);

    } catch (error: any) {
      if(error.message) Alert.alert('Error', error.message);
      if(error.errors) Alert.alert('Error', error.errors[0].message);
      else Alert.alert('Error', 'An unexpected error occurred.');
    };
  };

  const resetPw = async () => {
    try{
      await resetPassword({username: userEmail});
      navigation.navigate('ResetPassword');
      Alert.alert('Password reset email sent.', 'Please check your email to reset your password.');
    } catch (error : any) {
      Alert.alert('Error', 'Please enter a valid email.');
    }
  }

  return (
    <View style={styles.container}>
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
      <Button title="Sign In" onPress={ handleSignIn } />
      <Button title="Reset Password" onPress={ resetPw } />
    </View>
  );
};

/**
 * Accesses user inputted email, password, first and last name and creates a 
 * user profile in Cognito. Navigates to the Verify page to confirm 
 * verification code.
 */
const SignUpRoute = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userEmail , firstname, lastname, setUserEmail, setFirstName, setLastName } = authContext;
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try{
      await signUp({ username: userEmail, password: password });
      navigation.navigate('Verify');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your first name:</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <Text style={styles.label}>Enter your last name:</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={userEmail}
        onChangeText={setUserEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Create Account" onPress={ handleSignUp } />
    </View>
  );
};

//main UI that creates tab view with sign-in page and sign up page
const SignInScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderScene = SceneMap({
    first: SignInRoute,
    second: SignUpRoute,
  });

  const routes = [
    { key: 'first', title: 'Sign In' },
    { key: 'second', title: 'Sign Up'},
  ];

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={ renderScene }
      onIndexChange={ setIndex }
      initialLayout={{ width: layout.width }}
    />
  );
};

//Styles for Sign-in and Sign-up page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
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

export default SignInScreen;
