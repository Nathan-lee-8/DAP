import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,
  ActivityIndicator} from 'react-native';
import styles from '../styles/Styles';
import { getImgURI } from '../components/addImg';
import { createPost } from '../graphql/mutations';
import client from '../client';
import { AuthContext } from '../context/AuthContext';
import ProfilePicture from '../components/ProfilePicture';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
import Icon from '@react-native-vector-icons/ionicons';

const CreatePost = ({route}: any) => {
  const { groupID } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filepath, setFilepath] = useState<string>();
  const [loadingIMG, setLoadingIMG] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addImgText, setAddImgText] = useState('Add Img');
  const authContext = useContext(AuthContext);
  if(!authContext) return null;
  const { userId } = authContext;

  const getFilePath = async () => {
    try{
      setLoadingIMG(true);
      var path = await getImgURI(`groupPictures/${groupID}/${Date.now()}_post.jpg`);
      if(path){
        setFilepath("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + path);      
        setAddImgText('');
      }
    } catch(error){
      console.log(error);
    }finally{
      setLoadingIMG(false);
    }
  }

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

  const sendPost = async () => {
    setLoading(true);
    try{
      await client.graphql({
        query: createPost,
        variables: {
          input: {
            title: title,
            content: content,
            groupID: groupID,
            postURL: [filepath ? filepath : null],
            userID: userId
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

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

  return (
    <View style={styles.container}>
      {loadingIMG ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.groupImgContainer} onPress={getFilePath}>
          <ProfilePicture uri={filepath} size={100} style={styles.groupImg}/>
          <Text style={styles.addImageText}>{addImgText}</Text>
        </TouchableOpacity>
      )}
      <TextInput 
        style={styles.input} 
        placeholder="Title"
        autoCapitalize='sentences'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput 
        style={styles.longInput} 
        placeholder="Content"
        multiline={true}
        autoCapitalize='sentences'
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={[styles.createGroupButton, {marginTop: 'auto'}]} onPress={sendPost}>
        <Text style={styles.createGroupButtonText}>Create Post</Text>
        <Icon name="arrow-forward-circle-outline" size={25}/>
      </TouchableOpacity>
    </View>
  )
}

export default CreatePost;