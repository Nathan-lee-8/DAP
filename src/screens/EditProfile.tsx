import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator,
  TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { updateUser } from '../graphql/mutations';
import client from '../client'
import styles from '../styles/Styles';
import ImgComponent from '../components/ImgComponent';
import UserPosts from '../components/UserPosts';
import { imagePicker, getImgURI } from '../components/addImg';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

//Update to get user data from authContext
const EditProfile = () => {
  const [ loading, setLoading ] = useState(false);
  const [ imgLoading, setImgLoading ] = useState(false);
  const [ editsOn, setEditsOn ] = useState(false);
  const [ hasChanged, setHasChanged ] = useState(false);
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userId, userEmail, firstname, lastname, profileURL, setFirstName,
    setLastName, setProfileURL } = authContext;
    
  //use temp values to hold names until user saves data
  const [ tempFirst, setTempFirst ] = useState(firstname);
  const [ tempLast, setTempLast ] = useState(lastname);
  const [ tempURL , setTempURL ] =  useState(profileURL);

  const addProfileImg = async () => {
    try {
      setImgLoading(true);
      const uri = await imagePicker();
      if(uri === null) throw new Error('No Image Selected');
      setTempURL(uri);
      setHasChanged(true);
    } catch (error: any) {
       Alert.alert('Error', error.message);
    } finally{
      setImgLoading(false);
    }
  };
  
  const saveEdits = async() => {
    if(firstname === tempFirst && lastname === tempLast && !hasChanged) {
      setEditsOn(false);
      return
    };
    try{
      setLoading(true);
      if(!tempURL) throw new Error('Url unavailable');
      const filepath = await getImgURI(tempURL, `public/profilePictures/${userId}/${Date.now()}.jpg`)
      if(filepath === null) throw new Error('Upload failed')
      setProfileURL("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + filepath);
      setLoading(true);
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            profileURL: "https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + filepath,
            firstname: tempFirst,
            lastname: tempLast
          },
        },
        authMode: 'userPool'
      });
      setFirstName(tempFirst);
      setLastName(tempLast);
      console.log("Updated user to graphql");
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setEditsOn(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEditsOn(false);
      setHasChanged(false);
    });
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      // This will reset the state when the screen loses focus
      return () => {
        setTempURL(profileURL); // Reset state to initial value when leaving the page
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !editsOn ? (
        <View>
          <View style={styles.viewUserProfileSection}>
            <ImgComponent uri={profileURL || 'defaultUser'} style={styles.viewProfileURL}/>
            <View style={styles.userInfoContainer}>
              <Text style={styles.postAuthor}>{firstname} {lastname} </Text>
              <Text style={styles.postContent}>{userEmail} </Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={() => setEditsOn(true)}>
              <Text style={styles.buttonTextBlack}>Edit</Text>
            </TouchableOpacity>
          </View>
          <UserPosts userID={userId} />
        </View>
    ) : imgLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <View>
        <TouchableOpacity onPress={addProfileImg} style={styles.uploadImage}>
          <ImgComponent uri={tempURL || 'defaultUser' } style={styles.uploadImage}/>
          <Text style={styles.uploadImageText}>Edit Image</Text>
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
        <TouchableOpacity style={styles.buttonBlack} onPress={saveEdits}>
          <Text style={styles.buttonTextWhite}>Save</Text>
        </TouchableOpacity>
      </View>
    )}
    </View>
    
  );
};

export default EditProfile;