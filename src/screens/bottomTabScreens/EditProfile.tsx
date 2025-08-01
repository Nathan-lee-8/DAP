import { useContext, useState, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator, TextInput, Platform, 
  KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import client from '../../client'
import { updateUser } from '../../customGraphql/customMutations';

import { AuthContext } from '../../context/AuthContext';
import { imagePicker, getImgURI } from '../../components/addImg';
import ImgComponent from '../../components/ImgComponent';
import UserPosts from '../../components/UserPosts';
import styles from '../../styles/Styles';
import welcomeStyles from '../../styles/SignInScreenStyles';
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
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ aboutModalVisible, setAboutModalVisible ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const { currUser, setCurrUser, logout } = authContext;
  if(!currUser) return;
     
  //use temp values to hold data until user saves
  const [ tempFirst, setTempFirst ] = useState(currUser.firstname);
  const [ tempLast, setTempLast ] = useState(currUser.lastname);
  const [ tempURL , setTempURL ] = useState(currUser.profileURL);
  const [ description, setDescription ] = 
    useState<string | undefined>(currUser.description || undefined);

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
    try{
      setLoading(true);
      var tempProfileURL = tempURL;
      if(tempURL !== currUser.profileURL){
        const filepath = await getImgURI(tempURL, 
          `public/profilePictures/${currUser.id}/${Date.now()}.jpg`);        
        tempProfileURL = 
          `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${filepath}`;
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

  //handles option modal: switches to edit view when user selects edit option
  const handleOptionButton = ( option: string) => {
    setModalVisible(false);
    if(option === 'Edit Profile'){
      setEditsOn(true);
    }else if(option === 'Logout'){
      logout();
    }else if(option === 'Settings'){
      navigation.navigate('Settings')
    }else if(option === 'About'){
      setAboutModalVisible(true);
    } else{
      Alert.alert(option, 'Not implemented yet');
    }
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />
  return (
    <View style={styles.container}>
      {!editsOn ? ( //Standard Profile View
        <View style={{flex: 1}}>
          <View style={styles.viewUserProfileSection}>
            <ImgComponent uri={currUser.profileURL} style={styles.viewProfileURL}/>
            <View style={styles.userInfoContainer}>
              <Text style={[styles.postAuthor, {fontWeight: '600'}]}>
                {currUser.firstname} {currUser.lastname} 
              </Text>
              <Text style={styles.postContent}>{currUser.email} </Text>
              <Text style={styles.postContent}>{currUser.description}</Text>
            </View>
            <Icon style={styles.editProfileButton} name="ellipsis-horizontal" 
              onPress={() => setModalVisible(true)} size={25}
            />
          </View>
          <UserPosts userID={currUser.id} />
        </View>
      ) : ( //Edit View
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} 
            keyboardShouldPersistTaps='handled'
          >
            <TouchableOpacity onPress={addProfileImg} style={styles.uploadImage}>
              <ImgComponent uri={tempURL} style={styles.editProfileURL}/>
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

      {/* Options Modal */}
      <Modal
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={["Settings", "Edit Profile", "About", "Logout"]}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity style={styles.optionButton} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonTextRed}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Company(DAP) info Modal */}
      <Modal 
        transparent={true} 
        visible={aboutModalVisible} 
        onRequestClose={() => setAboutModalVisible(false)}  
      >
        <View style={styles.imageOverlay}>
          <View style={styles.aboutModalContainer}>
            <Icon name="close-outline" size={25} style={styles.closeImageModal}
              onPress={() => setAboutModalVisible(false)}
            />
            <View style={welcomeStyles.logoContainer}>
              <ImgComponent uri="logo" style={welcomeStyles.logo}/>
              <Text style={welcomeStyles.logoText}> DAP </Text>
            </View>
            <Text style={welcomeStyles.welcomeMessage}>Interact with your community.</Text>
            <Text>Report a problem</Text>
            <Text>Contact us</Text>
            <Text>Terms and conditions</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;