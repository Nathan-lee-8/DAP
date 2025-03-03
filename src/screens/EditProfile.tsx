import React, { useContext, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator,
  TextInput, Platform, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { updateUser } from '../graphql/mutations';
import client from '../client'
import styles from '../styles/Styles';
import ImgComponent from '../components/ImgComponent';
import UserPosts from '../components/UserPosts';
import { imagePicker, getImgURI } from '../components/addImg';
import { useFocusEffect } from '@react-navigation/native';

//Update to get user data from authContext
const EditProfile = () => {
  const [ loading, setLoading ] = useState(false);
  const [ editsOn, setEditsOn ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext){
    Alert.alert('Error', 'Internal Error');
    return;
  }
  const  { currUser, setCurrUser } = authContext;
  if(!currUser) return;
     
  //use temp values to hold data until user saves
  const [ tempFirst, setTempFirst ] = useState(currUser.firstname);
  const [ tempLast, setTempLast ] = useState(currUser.lastname);
  const [ tempURL , setTempURL ] =  useState(currUser.profileURL);
  const [ description, setDescription ] = useState<string | undefined>(currUser.description || undefined);

  const addProfileImg = async () => {
    try {
      setLoading(true);
      const uri = await imagePicker();
      if(uri === null) throw new Error('No Image Selected');
      setTempURL(uri);
    } catch (error: any) {
       Alert.alert('Error', error.message);
    } finally{
      setLoading(false);
    }
  };
  
  const saveEdits = async() => {
    if(currUser.firstname === tempFirst && currUser.lastname === tempLast && 
      tempURL === currUser.profileURL && description === currUser.description
    ) {
      setEditsOn(false);
      return;
    };
    try{
      setLoading(true);
      if(!tempURL) throw new Error('Url unavailable');
      const filepath = await getImgURI(tempURL, `public/profilePictures/${currUser.id}/${Date.now()}.jpg`)
      if(filepath === null) throw new Error('Upload failed')
      setTempURL("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + filepath);
      const data = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currUser.id,
            profileURL: "https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + filepath,
            firstname: tempFirst,
            lastname: tempLast,
            description: description
          },
        },
        authMode: 'userPool'
      });
      setCurrUser(data.data.updateUser);
      console.log("Updated user to graphql", data);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setEditsOn(false);
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      // This will reset the state when the screen loses focus
      return () => {
        setTempURL(currUser.profileURL); // Reset state to initial value when leaving the page
        setEditsOn(false);
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
            <ImgComponent uri={currUser.profileURL || 'defaultUser'} style={styles.viewProfileURL}/>
            <View style={styles.userInfoContainer}>
              <Text style={styles.postAuthor}>{currUser.firstname} {currUser.lastname} </Text>
              <Text style={styles.postContent}>{currUser.email} </Text>
              <Text style={styles.postContent}>{currUser.description}</Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton} onPress={() => setEditsOn(true)}>
              <Text style={styles.buttonTextBlack}>Edit</Text>
            </TouchableOpacity>
          </View>
          <UserPosts userID={currUser.id} />
        </View>
    ) : (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} 
          keyboardShouldPersistTaps='handled'
        >
          <TouchableOpacity onPress={addProfileImg} style={styles.uploadImage}>
            <ImgComponent uri={tempURL || 'defaultUser' } style={styles.editProfileURL}/>
            <Text style={styles.uploadImageText}>Edit Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditsOn(false)} style={styles.editProfileButton}>
            <Text style={styles.buttonTextBlack}>Cancel</Text>
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
          <TouchableOpacity style={[styles.buttonBlack, {marginTop: 'auto'}]} onPress={saveEdits}>
            <Text style={styles.buttonTextWhite}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )}
    </View>
    
  );
};

export default EditProfile;