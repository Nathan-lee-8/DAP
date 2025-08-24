import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

import client from '../../client';
import { createUser } from '../../customGraphql/customMutations';
import { moderateText } from '../../customGraphql/customQueries';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';
import { imagePicker, getImgURI } from '../../components/addImg';

/**
 * Accesses user inputted email, password, first and last name and creates a 
 * user profile in Cognito. Navigates to the Verify page to confirm 
 * verification code.
 */
const CreateUser = (route: any) => {
  const navigation = route.navigation;
  const [ firstname, setFirstName ] = useState<string>('');
  const [ lastname, setLastName ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');
  const [ url, setURL ] = useState('defaultUser');
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { userEmail, triggerFetch } = authContext;

  const handleSignUp = async () => {
    //ensure user enters first and last name
    if(firstname === '') {
      Alert.alert('Error', 'Please enter your first name.');
      return;
    }else if(lastname === '') {
      Alert.alert('Error', 'Please enter your last name.');
      return;
    }
    setLoading(true);

    //moderate first and last name
    const flagged = await textModeration(firstname + lastname);
    if(flagged){
      Alert.alert('Warning', 'Username is flagged for sensitive content. Please remove ' + 
        'sensitive content and review our community guidelines before posting.'
      )
      setLoading(false);
      return;
    }
    
    //moderate description 
    if(description !== ''){
      const descFlagged = await textModeration(description);
      if(descFlagged){
        Alert.alert('Warning', 'Bio is flagged for sensitive content. Please remove ' + 
          'sensitive content and review our community guidelines before posting.'
        )
        setLoading(false);
        return;
      }
    }
    //upload img to s3 and get the s3 filepath
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
            description: description,
            profileURL: 'defaultUser',
            unreadChatCount: 0,
            unreadNotificationCount: 0
          },
        },
        authMode: 'userPool'
      });
      const userID = user.data.createUser.id;
      if(url !== 'defaultUser'){
        await getImgURI(url, `public/processing/profilePictures/${userID}.jpg`);
      }
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

  const addProfileImg = async () => {
    try {
      setLoading(true);
      const uri = await imagePicker();
      if(uri === null) throw new Error('No Image Selected');
      setURL(uri);
    } catch {
       Alert.alert('Error', 'Issue loading image library');
    } finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={[styles.loginText, { marginTop: '10%'}]}>About you</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={addProfileImg}>
            <ImgComponent uri={url} style={styles.profImage}/>
            {url === 'defaultUser' && 
              <View style={styles.overlay}>
                <Text style={styles.overLayText}>Add Img</Text>
              </View>
            }
          </TouchableOpacity>

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
            style={styles.longInput}
            placeholder={"Description..."}
            multiline={true}
            maxLength={150}
            value={description}
            onChangeText={setDescription}
          />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
            <Text>By creating an account, you agree to our </Text>
            <TouchableOpacity onPress={() => 
              navigation.navigate('Terms', {section: 'terms-of-service'})}
            >
              <Text style={styles.hyperlink}>Terms, </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => 
              navigation.navigate('Terms', {section: 'privacy-policy'})}
            >
              <Text style={styles.hyperlink}>Privacy, </Text>
            </TouchableOpacity>
            <Text>and </Text>
            <TouchableOpacity onPress={() => 
              navigation.navigate('Terms', {section: 'community-guidelines'})}
            >
              <Text style={styles.hyperlink}>Community Guidelines.</Text>
            </TouchableOpacity>
          </View>
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