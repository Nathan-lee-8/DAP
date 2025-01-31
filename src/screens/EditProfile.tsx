import { useContext, useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator,
  TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { updateUser } from '../graphql/mutations';
import client from '../client'
import styles from '../styles/Styles';
import ProfilePicture from '../components/ProfilePicture';
import UserPosts from '../components/UserPosts';
import { getImgURI } from '../components/addImg';
import { useNavigation } from '@react-navigation/native';

//Update to get user data from authContext
const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [editsOn, setEditsOn] = useState(false);
  const [hasChanged, setHasChanged ] = useState(false);
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userId, userEmail, firstname, lastname, profileURL, setFirstName,
    setLastName, setProfileURL } = authContext;
    
  //use temp values to hold names until user saves data
  const [tempFirst, setTempFirst] = useState(firstname);
  const [tempLast, setTempLast] = useState(lastname);

  const addProfileImg = async () => {
    try {
      setImgLoading(true);
      const profileURI = await getImgURI(`profilePictures/${userId}/${Date.now()}.jpg`);
      setProfileURL("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + profileURI);
      setHasChanged(true);
      Alert.alert('Success');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload profile picture.');
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
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            profileURL: profileURL,
            firstname: tempFirst,
            lastname: tempLast
          },
        },
        authMode: 'userPool'
      });
      setFirstName(tempFirst);
      setLastName(tempLast);
      console.log("Updated user to graphql");
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setEditsOn(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEditsOn(false);
    });
    return unsubscribe;
  }, [navigation])

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !editsOn ? (
        <View>
          <View style={[styles.profileSection, {marginBottom: 25}]}>
            <ProfilePicture uri={profileURL} size={100} />
            <View style={styles.textContainer}>
              <Text style={styles.postAuthor}>{firstname} {lastname} </Text>
              <Text style={styles.postContact}>{userEmail} </Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton} onPress={() => setEditsOn(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <UserPosts userID={userId} />
        </View>
    ) : imgLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <View>
        <TouchableOpacity onPress={addProfileImg} style={styles.uploadImage}>
          <ProfilePicture uri={profileURL} size={150}/>
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
        <TouchableOpacity style={styles.editProfileButton} onPress={saveEdits}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )}
    </View>
    
  );
};

export default EditProfile;