import { useContext, useState, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator, TextInput, Platform, 
  KeyboardAvoidingView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import client from '../../client'
import { updateUser } from '../../customGraphql/customMutations';
import { moderateText } from '../../customGraphql/customQueries';

import { AuthContext } from '../../context/AuthContext';
import { imagePicker, getImgURI } from '../../components/addImg';
import ImgComponent from '../../components/ImgComponent';
import UserPosts from '../../components/UserPosts';
import styles from '../../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Displays two different pages that allows the User to View their profile in standard
 * View mode and Edit mode. In Edit mode, the user can change their profile picture,
 * First and Last name, and Description. The user can also save or cancel the changes 
 * they made.
 */
const EditProfile = ({navigation}: any) => {
  const [ loading, setLoading ] = useState(false);
  const [ editsOn, setEditsOn ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { currUser, setCurrUser } = authContext;
  if(!currUser) return;
  
  //use temp values to hold data until user saves
  const [ tempFirst, setTempFirst ] = useState(currUser.firstname);
  const [ tempLast, setTempLast ] = useState(currUser.lastname);
  const [ tempURL , setTempURL ] = useState(currUser.profileURL);
  const [ description, setDescription ] = useState<string>(currUser.description || '');
  //reset the page to standard view instead of edit view and reverts any unsaved 
  //changes  to profile image
  useFocusEffect(
    useCallback(() => {
      return () => {
        setTempURL(currUser.profileURL);
        setEditsOn(false);
      };
    }, [])
  );
  
  //Checks if name, lastname, image or description has changed and updates image 
  //to s3 and updates changed user metadata
  const saveEdits = async() => {
    if(currUser.firstname === tempFirst && currUser.lastname === tempLast && 
      tempURL === currUser.profileURL && description === currUser.description
    ) {
      setEditsOn(false);
      return;
    };

    //moderate text for user bio if bio is updated 
    if(description !== currUser.description && description !== ''){ //prevent overloading calls
      const flagged = await textModeration(description || "");
      if(flagged){
        Alert.alert('Warning', 'Bio is flagged for sensitive content. Please remove ' + 
          'sensitive content and review our community guidelines before posting.'
        )
        return;
      }
    }

    //moderate text for username if updated
    if(currUser.firstname !== tempFirst || currUser.lastname !== tempLast){
      const flagged = await textModeration(tempFirst + tempLast);
      if(flagged){
        Alert.alert('Warning', 'Username is flagged for sensitive content. Please remove ' + 
          'sensitive content and review our community guidelines before posting.'
        )
        return;
      }
    }

    try{
      setLoading(true);
      var tempProfileURL = tempURL;
      if(tempURL !== currUser.profileURL){
        const filepath = await getImgURI(tempURL, 
          `public/processing/profilePictures/${currUser.id}.jpg`);        
        if(filepath) tempProfileURL = filepath;
      }
      if(tempProfileURL === null) throw new Error('Upload failed');
      setTempURL(tempProfileURL);
      const data = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currUser.id,
            profileURL: tempProfileURL,
            firstname: tempFirst,
            lastname: tempLast,
            fullname: tempFirst.toLowerCase() + " " + tempLast.toLowerCase(),
            description: description
          },
        },
        authMode: 'userPool'
      });
      setCurrUser(data.data.updateUser);
      Alert.alert('Success', 'Profile updated successfully');
    } catch {
      Alert.alert('Error', 'Failed to update Profile');
    } finally {
      setEditsOn(false);
      setLoading(false);
    }
  }

  //Opens images picker to set new profile picture
  const addProfileImg = async () => {
    try {
      setLoading(true);
      const uri = await imagePicker();
      if(uri === null) throw new Error('No Image Selected');
      setTempURL(uri);
    } catch {
       Alert.alert('Error', 'Issue loading image library');
    } finally{
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

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />
  return (
    <View style={styles.container}>
      {!editsOn ? ( //Standard Profile View
        <View style={{flex: 1}}>
          <View style={styles.viewUserProfileSection}>
            <ImgComponent uri={currUser.profileURL || 'defaultUser'} 
              style={styles.viewProfileURL}
            />
            <View style={styles.profileInfoContainer}>
              <Text style={[styles.postAuthor, {fontWeight: '600'}]}>
                {currUser.firstname} {currUser.lastname} 
              </Text>
              <Text style={styles.postContent}>{currUser.email} </Text>
              <Text style={styles.postContent}>{currUser.description}</Text>
            </View>
            <Icon style={styles.editProfileButton} name="list-sharp" size={25}
              onPress={() => navigation.navigate('Settings')}
            />
            <TouchableOpacity style={styles.messageUserButton} 
              onPress={() => setEditsOn(true)}
            >
              <Text style={styles.messageUserText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <UserPosts userID={currUser.id} />
        </View>
      ) : ( //Edit View
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} 
            keyboardShouldPersistTaps='handled'
          >
            <TouchableOpacity onPress={addProfileImg} style={styles.uploadImage}>
              <ImgComponent uri={tempURL || 'defaultUser'} style={styles.editProfileURL}/>
              <Text style={styles.uploadImageText}>Edit Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditsOn(false)} 
              style={styles.editProfileButton}
            >
              <Text style={styles.noResultsMsg}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder={"First Name"}
              value={tempFirst}
              onChangeText={setTempFirst}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput 
              style={styles.input}
              placeholder={"Last Name"}
              value={tempLast}
              onChangeText={setTempLast}
            />
            <Text style={styles.label}>Profile Description</Text>
            <TextInput
              style={styles.longInput}
              placeholder={"About you..."}
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </ScrollView>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          >   
            <TouchableOpacity style={[styles.buttonBlack]} 
              onPress={saveEdits}
            >
              <Text style={styles.buttonTextWhite}>Save</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )}
      
    </View>
  );
};

export default EditProfile;