import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, Platform,
  TouchableWithoutFeedback, KeyboardAvoidingView, 
  ActivityIndicator} from 'react-native';

import client from '../../client';
import { createUser } from '../../customGraphql/customMutations';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';

/**
 * Accesses user inputted email, password, first and last name and creates a 
 * user profile in Cognito. Navigates to the Verify page to confirm 
 * verification code.
 */
const CreateUser = () => {
  const [ firstname, setFirstName ] = useState<string>('');
  const [ lastname, setLastName ] = useState<string>('');
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userEmail, triggerFetch } = authContext;

  const handleSignUp = async () => {
    if(firstname === '') {
      Alert.alert('Error', 'Please enter your first name.');
      return;
    }else if(lastname === '') {
      Alert.alert('Error', 'Please enter your last name.');
      return;
    }
    setLoading(true);
    try{
      await client.graphql({
        query: createUser,
        variables: {
          input: { 
            email: userEmail.trim().toLowerCase(), 
            firstname: firstname.trim(), 
            fullname: 
              firstname.trim().toLocaleLowerCase() + " " +
              lastname.trim().toLocaleLowerCase(),
            lastname: lastname.trim(),
            profileURL: 'defaultUser'
          },
        },
        authMode: 'userPool'
      });
      console.log('created graphql user');
      triggerFetch();
    } catch (error: any) {
      Alert.alert('Error', error.message);
      setLoading(false);
      console.log(error);
    }
  };

  if(loading) return <ActivityIndicator size="small" color="#0000ff" />

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>About you</Text>
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <TouchableOpacity style={[styles.buttonBlack, {marginTop: 20}]} onPress={ handleSignUp }>
              <Text style={styles.buttonTextWhite}>Create Account</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreateUser;