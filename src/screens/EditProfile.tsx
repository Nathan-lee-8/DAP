import { useContext, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { updateUser } from '../graphql/mutations';
import client from '../client'
import styles from '../styles/Styles';
import ProfilePicture from '../components/ProfilePicture';
import UserPosts from '../components/UserPosts';
import { getImgURI } from '../components/addImg';

//Update to get user data from authContext
const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userId, userEmail, firstname, lastname, profileURL,
    setProfileURL
   } = authContext;

  const addProfileImg = async () => {
    try {
      setLoading(true);
      const profileURI = await getImgURI(`profilePictures/${userId}/${Date.now()}.jpg`);
      if(profileURI === null) throw new Error('Failed to get profile image URI');
      setProfileURL("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + profileURI);
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            profileURL: "https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + profileURI,
          },
        },
        authMode: 'userPool'
      });
      Alert.alert('Success');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload profile picture.');
    } finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View style={[styles.profileSection, {marginBottom: 25}]}>
            <TouchableOpacity onPress={addProfileImg}>
              <ProfilePicture uri={profileURL} size={100} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.postAuthor}>{firstname} {lastname} </Text>
              <Text style={styles.postContact}>{userEmail} </Text>
            </View>
          </View>
          <UserPosts userID={userId} />
        </View>
    )}
    </View>
    
  );
};

export default EditProfile;