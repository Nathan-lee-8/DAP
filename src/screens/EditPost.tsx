import { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard,
  ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

import Video from 'react-native-video';
import { mediaPicker, getMediaURI } from '../components/addMedia';
import { Asset } from 'react-native-image-picker';

import client from '../client';
import { updatePost } from '../customGraphql/customMutations';
import { moderateText } from '../customGraphql/customQueries';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Displays the current post content and media and allows the user to edit both
 * 
 * @param currPost - The current Post to edit
 */
const EditPost = ( {route, navigation} : any ) => {
  const { currPost } = route.params;
  const [ content, setContent ] = useState(currPost.content);

  const [ filepaths, setFilepaths ] = useState<string[]>(currPost.postURL);
  const [ newMedia, setNewMedia ] = useState<Asset[]>([]);
  const [ displayPaths, setDisplayPaths ] = useState<string[]>([]);

  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  
  //merge old filepath with new anytime user adds or removes media
  useEffect(() => {
    setDisplayPaths([ 
      ...filepaths,  
      ...newMedia
        .map(item => item.uri)
        .filter((uri): uri is string => typeof uri === 'string')
    ])
  }, [filepaths, newMedia])

  //updates the post unless contents and list of media are unchanged. Naviagtes 
  //back to ViewPost page
  const sendPost = async () => {
    if(content === currPost.content && newMedia.length === 0 &&
      JSON.stringify(filepaths) === JSON.stringify(currPost.postURL) 
    ) {
      Alert.alert('Success','Post updated successfully!');
      return;
    };

    //moderate post content if updated
    if(content !== currPost.content){
      const flagged = await textModeration(content);
      if(flagged){
        Alert.alert('Warning', 'Content is flagged for sensitive content. Please remove ' + 
          'sensitive content and review our community guidelines before posting.'
        )
        return;
      }
    }
    setLoading(true);
    const newPaths = await handleUploadFilepaths();
    try{
      await client.graphql({
        query: updatePost,
        variables: {
          input: {
            id: currPost.id,
            content: content,
            groupID: currPost.groupID,
            postURL: [...filepaths, ...newPaths],
            userID: currUser.id
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Post updated successfully!')
    } catch {
      Alert.alert('Error', 'Error updating post')
    } finally {
      navigation.goBack();
      setLoading(false);
    }
  }

  //opens user's image picker to adds selected media to list of media. Ensure videos are 
  //less than 30s and compresses videos to limit max bitrate of 3MB/s
  const getFilePath = async () => {
    if(filepaths.length > 12){
      Alert.alert('Max 12 images uploaded at once');
      return;
    }
    setLoading(true);
    var file = await mediaPicker();
    if(!file){
      setLoading(false);
      return;
    }
    setNewMedia(prev => [...prev, file as Asset]);
    setLoading(false);
  }

  //Removes selected media from post
  const handleRemoveItem = (uri: string) => {
    setFilepaths(filepaths.filter((item) => item !== uri));
    setNewMedia(newMedia.filter((item) => item.uri !== uri));
  }

  //Uploads new media to s3, ignoring old media
  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        newMedia.map(async (item, index) => {
          const uri = await getMediaURI(item, 
            `public/processing/groupPictures/${currPost.groupID}/${currPost.id}/${Date.now()}_${index}.jpg`);
          return `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${uri}`
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch {
      Alert.alert('Error', 'Error Uploading images');
      return [];
    }
  }

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
          data={displayPaths}
          numColumns={4}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.postImageContainer}>
              {item.endsWith('.mp4') ? (
                <Video source={{ uri: item }} style={{width: 90, height: 90}}
                  resizeMode="contain"
                />
              ) : (              
                <ImgComponent uri={item} style={{height: 90, width: 90}}/>
              )}
              <Icon name="remove-circle-outline" size={20} style={styles.removeIcon} 
                onPress={() => handleRemoveItem(item)}
              />
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditPost;