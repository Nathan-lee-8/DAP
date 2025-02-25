import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert,
  ActivityIndicator, FlatList} from 'react-native';
import styles from '../styles/Styles';
import { imagePicker, getImgURI } from '../components/addImg';
import { createPost } from '../graphql/mutations';
import client from '../client';
import { AuthContext } from '../context/AuthContext';
import ImgComponent from '../components/ImgComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
import Icon from '@react-native-vector-icons/ionicons';

const CreatePost = ({route}: any) => {
  const { groupID } = route.params;
  const [ content, setContent ] = useState('');
  const [ filepaths, setFilepaths ] = useState<string[]>([]);
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return null;
  const { userId } = authContext;

  const getFilePath = async () => {
    try{
      var uri = await imagePicker();
      if(uri === null) throw new Error('No image selected');
      setFilepaths([...filepaths.filter((item) => item !== null), uri]);
    } catch(error : any){
      Alert.alert('Error', error.message);
    }
  }

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

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

  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        filepaths.map(async (item, index) => {
          const uri = await getImgURI(item, `public/groupPictures/${groupID}/${Date.now()}_${index}.jpg`);
          console.log(uri);
          return uri ? 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + uri : null;
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch (error) {
      console.error('Error Uploading images', error)
    }
  }

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.noResultsMsg}>What's on your mind?</Text>
      <TextInput 
        style={styles.contentInput} 
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
      <View style={styles.postImageContainer}>
        <FlatList
          data={filepaths}
          horizontal
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => (
            <ImgComponent 
              uri={item || 'defaultUser'} 
              style={{ 
                height: 100,
                width: 100,
                marginRight: 10, 
              }} 
            />
          )}
        />     
      </View>
      
      <TouchableOpacity onPress={sendPost} style={styles.createButton}>
        <Icon name="add-circle-outline" style={{alignSelf: 'center'}} size={50}/>
      </TouchableOpacity>    

    </View>
  )
}

export default CreatePost;