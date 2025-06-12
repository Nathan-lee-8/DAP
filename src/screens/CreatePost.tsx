import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard,
  ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'react-native-video';

import client from '../client';
import { createPost } from '../customGraphql/customMutations';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import { mediaPicker, getMediaURI } from '../components/addMedia';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

const CreatePost = ({route, navigation}: any) => {
  const { groupID } = route.params;
  const [ content, setContent ] = useState('');
  const [ media, setMedia ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  const getFilePath = async () => {
    if(media.length > 12){
      Alert.alert('Max 12 images uploaded at once');
      return;
    }
    var file = await mediaPicker();
    if(!file?.uri){
      return;
    };
    setMedia([...media, file]);
  }

  const sendPost = async () => {
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
      Alert.alert('Success','Post Created', [{
        text: 'OK',
        onPress: () => {
          navigation.goBack();
        }
      }])
    } catch {
      Alert.alert('Error', 'There was an issue creating the post')
    } finally {
      setLoading(false);
    }
  }

  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        media.map(async (item, index) => {
          const uri = await getMediaURI(item, `${Date.now()}_${index}`);
          return uri ? `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/public/groupPictures/${groupID}/${uri}` : null;
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch (error) {
      console.error('Error Uploading images', error)
    }
  }

  const handleRemoveItem = (item: any) => {
    setMedia(media.filter((file) => file.uri !== item.uri));
  }

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

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
        <View style={{paddingLeft: 10}}>
          <FlatList
            data={media}
            numColumns={4}
            keyExtractor={(_,index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postImageContainer}>
                {item.fileName?.endsWith('.mp4') || item.type?.startsWith('video') ? (
                  <Video
                    source={{ uri: item.uri }}
                    style={{ width: 90, height: 90 }}
                    resizeMode="contain"
                    controls
                  />
                ) : (
                  <ImgComponent uri={item || 'defaultUser'} 
                    style={{height: 90, width: 90}} 
                  />
                )}
                <Icon style={styles.removeIcon} name="remove-circle-outline" size={20}
                  onPress={() => handleRemoveItem(item)}
                />
              </View>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CreatePost;