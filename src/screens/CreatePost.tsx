import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard,
  ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'react-native-video';

import client from '../client';
import { createPost } from '../customGraphql/customMutations';
import { moderateText } from '../customGraphql/customQueries';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import { mediaPicker, getMediaURI } from '../components/addMedia';
import { Asset } from 'react-native-image-picker';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Allows the User upload video or images with content and post it to the target 
 * group. 
 * @param groupID - ID of the group to write the post to
 */
const CreatePost = ( {route, navigation}: any ) => {
  const { groupID } = route.params;
  const [ content, setContent ] = useState('');
  const [ media, setMedia ] = useState<Asset[]>([]);
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  //Opens user's media picker and adds chosen media to upload queue. Ensures 
  //videos are less than 30s then compressed.
  const getFilePath = async () => {
    setLoading(true);
    if(media.length >= 12){
      Alert.alert('Max 12 media files');
      setLoading(false);
      return;
    }
    var file = await mediaPicker();
    if(!file) {
      setLoading(false);
      return;
    }
    setMedia(prev => [...prev, file as Asset]);
    setLoading(false);
  }

  //removes media item from upload queue
  const handleRemoveItem = (item: Asset) => {
    setMedia(media.filter((file) => file.uri !== item.uri));
  }

  //takes media and uploads to S3 before creating the post with associated filepaths
  //and content. Returns to Group page.
  const sendPost = async () => {
    if(content === '' && media.length === 0){
      Alert.alert('Error', 'Post must have content');
      return;
    }
    setLoading(true);
    const newPaths = await handleUploadFilepaths();
    try{
      await client.graphql({
        query: createPost,
        variables: {
          input: {
            content: content,
            groupID: groupID,
            postURL: newPaths,
            userID: currUser.id,
            commentCount: 0
          }
        },
        authMode: 'userPool'
      })
      navigation.goBack();
      Alert.alert('Success','Post Created');
    } catch {
      Alert.alert('Error', 'There was an issue creating the post')
    } finally {
      setLoading(false);
    }
  }

  const textModeration = async (name: string) => {
    try{
      const data = await client.graphql({
        query: moderateText,
        variables:{
          text: name,
        }
      })
      console.log('1.', data.data.moderateText)
    
    } catch (err) {
      console.log('Error', err);
    }
  }

  //uploads all uri's in media to s3 and returns new s3 filepaths 
  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        media.map(async (item, index) => {
          const uri = await getMediaURI(item, 
            `public/groupPictures/${groupID}/${Date.now()}_${index}`);
          return `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${uri}`;
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch {
      Alert.alert('Error', 'There was an issue uploading the media');
    }
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff"/>

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.noResultsMsg}>What's on your mind?</Text>
        <TextInput 
          style={[styles.contentInput]} 
          placeholder="Post content..."
          multiline={true}
          autoCapitalize='sentences'
          value={content}
          onChangeText={setContent}
        />
        <View style={styles.postFooter}>
          <TouchableOpacity style={styles.addPostImgButton} onPress={getFilePath}>
            <Text style={styles.buttonTextBlack}>Photos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.createPostButton} onPress={sendPost}>
            <Text style={styles.buttonTextWhite}>Post</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={media}
          numColumns={4}
          keyExtractor={(_,index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postImageContainer}>
              {item.fileName?.endsWith('.mp4') || item.type?.startsWith('video') ? (
                <Video source={{ uri: item.uri }} style={{ width: 90, height: 90 }}
                  resizeMode="contain"
                />
              ) : (
                <ImgComponent uri={item.uri || 'defaultUser'} 
                  style={{height: 90, width: 90}} 
                />
              )}
              <Icon style={styles.removeIcon} name="remove-circle-outline" size={20}
                onPress={() => handleRemoveItem(item)}
              />
            </View>
          )}
        />
        <TouchableOpacity style={[styles.buttonBlack]} 
          onPress={() => textModeration('text')}
        >
          <Text style={styles.buttonTextWhite}>test moderation</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CreatePost;