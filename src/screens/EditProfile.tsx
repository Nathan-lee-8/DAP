import { useContext } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../context/AuthContext';
import { uploadData } from '@aws-amplify/storage';
import { updateUser } from '../graphql/mutations';
import client from '../client'
import styles from '../styles/Styles';
import ProfilePicture from '../components/ProfilePicture';
import UserPosts from '../components/UserPosts';

//Update to get user data from authContext
const EditProfile = () => {
  const authContext = useContext(AuthContext);

  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userId, userEmail, firstname, lastname, profileURL } = authContext;

  const addProfileImg = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        console.error('ImagePicker Error:', result.errorMessage);
        Alert.alert('Error', 'Could not pick an image.');
        return;
      }

      const file = result.assets?.[0];
      if (!file || !file.uri) {
        Alert.alert('Error', 'No image selected.');
        return;
      }

      const fileName = `${userId}_profile.jpg`; // Use a unique name for the user's profile image
      const fileType = file.type || 'image/jpeg'; // Default to 'image/jpeg' if type is missing

      const response = await fetch(file.uri);
      const arrayBuffer = await response.arrayBuffer();

      // Upload to S3
      const uploadResult = await uploadData({
        path: `public/profilePictures/${fileName}`,
        data: arrayBuffer,
        options: {
          contentType: fileType,
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${
                  Math.round((transferredBytes / totalBytes) * 100)
                } %`
              );
            }
          },
        },
      }).result;
      
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            profileURL: "https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + uploadResult.path,
          },
        },
      });
      Alert.alert('Success', 'Profile picture updated!');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'Failed to upload profile picture.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={addProfileImg}>
          <ProfilePicture uri={profileURL} size={100} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.postAuthor}>{firstname} {lastname} </Text>
          <Text style={styles.postContact}>{userEmail} </Text>
        </View>
      </View>
      <View>

      </View>
      <UserPosts style={{backgroundColor: 'black'}} userID={userId} />
    </View>
  );
};

export default EditProfile;