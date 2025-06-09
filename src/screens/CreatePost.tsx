import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Keyboard,
  ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

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
    setMedia([...media, file.uri]);
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
      console.log('Post created successfully');
    } catch (error: any) {
      console.log('Error creating post', error);
    } finally {
      setLoading(false);
      Alert.alert('Success','Post Created', [{
        text: 'OK',
        onPress: () => {
          navigation.goBack();
        }
      }])
    }
  }

  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        media.map(async (item, index) => {
          const uri = await getMediaURI(item, `public/groupPictures/${groupID}/${Date.now()}_${index}.jpg`);
          return uri ? 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + uri : null;
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch (error) {
      console.error('Error Uploading images', error)
    }
  }

  const handleRemoveItem = (uri: string) => {
    setMedia(media.filter((item) => item.uri !== uri));
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
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postImageContainer}>
                <ImgComponent uri={item || 'defaultUser'} 
                  style={{height: 90, width: 90}} 
                />
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