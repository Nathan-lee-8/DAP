import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, Platform,
  TouchableWithoutFeedback, KeyboardAvoidingView, 
  ActivityIndicator} from 'react-native';

import client from '../../client';
import { createUser, createNotificationSettings
 } from '../../customGraphql/customMutations';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';

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
  if(!authContext) return;
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
      const user = await client.graphql({
        query: createUser,
        variables: {
          input: { 
            email: userEmail.trim().toLowerCase(), 
            firstname: firstname.trim(), 
            fullname: firstname.trim().toLocaleLowerCase() + " " +
              lastname.trim().toLocaleLowerCase(),
            lastname: lastname.trim(),
            profileURL: 'defaultUser',
            unreadChatCount: 0,
            unreadNotificationCount: 0
          },
        },
        authMode: 'userPool'
      });
      await client.graphql({
        query: createNotificationSettings,
        variables: {
          input: {
            id: user.data.createUser.id,
            userID: user.data.createUser.id,
            newPost: false,
            joinGroup: false,
            groupRequest: false,
            newComment: false,
            newReply: false,
            newReplyComment: false,
            newMessage: false,
            joinChat: false,
          }
        },
        authMode: 'userPool'
      })
      triggerFetch();
    } catch (error: any) {
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };

  if(loading) return <ActivityIndicator size="small" color="#0000ff" />

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <ImgComponent uri="logo" style={styles.logoLarge}/>
          <Text style={styles.loginText}>About you</Text>
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
            <TouchableOpacity style={styles.signInBtn} onPress={ handleSignUp }>
              <Text style={styles.loginBtnText}>Create Account</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreateUser;