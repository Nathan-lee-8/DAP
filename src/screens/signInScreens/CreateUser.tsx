import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

import client from '../../client';
import { createUser, createNotificationSettings } from '../../customGraphql/customMutations';
import { moderateText } from '../../customGraphql/customQueries';

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

    const flagged = await textModeration(firstname + lastname);
    if(flagged){
      Alert.alert('Warning', 'Username is flagged for sensitive content. Please remove ' + 
        'sensitive content and review our community guidelines before posting.'
      )
      setLoading(false);
      return;
    }
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

  //uses openAI textmoderation to moderate text and return whether that text should be 
  //flagged or not
  const textModeration = async (name: string) => {
    try{
      const data = await client.graphql({
        query: moderateText,
        variables:{
          text: name,
        }
      })
      const modResults = data.data.moderateText;
      return modResults ? modResults.flagged : true;
    } catch (err) {
      console.log('Error', err);
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}/>
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
          {loading ? ( 
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.signInBtn} onPress={ handleSignUp } 
              disabled={loading}
            >
              <Text style={styles.loginBtnText}>Create Account</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreateUser;