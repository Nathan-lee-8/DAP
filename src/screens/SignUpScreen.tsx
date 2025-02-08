import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { signUp } from '@aws-amplify/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SignInParamList } from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles'
import Icon from '@react-native-vector-icons/ionicons';

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

  const googleLogin = () => {
    console.log('Google login not implemented yet.');
  }

  return (
    <View style={styles.container}>
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
        <TouchableOpacity style={[styles.buttonBlack, {marginTop: 20}]} onPress={ handleSignUp }>
          <Text style={styles.buttonTextWhite}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.label}>Login with Social Provider</Text>
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

export default SignUp;