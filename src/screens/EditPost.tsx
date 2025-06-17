import { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, FlatList, Keyboard,
  ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import Video from 'react-native-video';
import { mediaPicker, getMediaURI, compressVideo } from '../components/addMedia';
import { Asset } from 'react-native-image-picker';

import client from '../client';
import { updatePost } from '../customGraphql/customMutations';

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
    var file = await mediaPicker();
    if (file && (file.fileName?.endsWith('.mp4') || file.type?.startsWith('video'))){
      if(file.duration && file.duration > 30000){
        Alert.alert('Error', 'Video must be less than 30 seconds');
        return;
      }else if(file.duration){
        const compressedUri = await compressVideo(file);
        if(compressedUri){
          file = {...file, uri: compressedUri};
        }
      }
    }
    setNewMedia(prev => [...prev, file as Asset]);
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
          const uri = await getMediaURI(item.uri, 
            `public/groupPictures/${currPost.groupID}/${Date.now()}_${index}.jpg`);
          return `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${uri}`
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch {
      Alert.alert('Error', 'Error Uploading images');
      return [];
    }
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
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={getFilePath} style={{marginLeft: 'auto'}}>
            <Icon name="image-outline" size={30} color={"blue"}/>
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 10}}>
          <FlatList
            data={displayPaths}
            numColumns={4}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.postImageContainer}>
                {item.endsWith('.mp4') ? (
                  <Video source={{ uri: item }} style={{ width: 90, height: 90 }}
                    resizeMode="contain"
                  />
                ) : (              
                  <ImgComponent uri={item} style={{height: 90, width: 90}}/>
                )}
                <TouchableOpacity style={styles.removeIcon} 
                  onPress={() => handleRemoveItem(item)}
                >
                  <Icon name="remove-circle-outline" size={20}/>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{marginBottom: Platform.OS === 'ios' ? 40 : 0, marginTop: 'auto'}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >   
          <TouchableOpacity onPress={sendPost} style={styles.buttonBlack}>
            <Text style={styles.buttonTextWhite}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditPost;