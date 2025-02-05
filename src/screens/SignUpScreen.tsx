import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { signUp } from '@aws-amplify/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SignInParamList } from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles'

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
      <View style={styles.formContainer}>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          value={firstname}
          onChangeText={setFirstName}
          autoCapitalize="words"
          placeholder="First Name"
        />
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          value={lastname}
          onChangeText={setLastName}
          autoCapitalize="words"
          placeholder="Last Name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <Text style={styles.label}>Password</Text>
        <Text style={styles.note}>*Note: Password can not be changed until account is verified</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonCentered} onPress={ handleSignUp }>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;