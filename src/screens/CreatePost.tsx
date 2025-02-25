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
    if(filepaths.length > 12){
      Alert.alert('Max 12 images uploaded at once');
      return;
    }
    var uri = await imagePicker();
    if(uri === null){
      Alert.alert('No image selected')
      return;
    };
    setFilepaths([...filepaths.filter((item) => item !== null), uri]);
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
          return uri ? 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + uri : null;
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch (error) {
      console.error('Error Uploading images', error)
    }
  }

  const handleRemoveItem = (uri: string) => {
    setFilepaths(filepaths.filter((item) => item !== uri));
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
      <View style={{paddingLeft: 10}}>
        <FlatList
          data={filepaths}
          numColumns={4}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postImageContainer}>
              <ImgComponent uri={item || 'defaultUser'} 
                style={{height: 90, width: 90}} 
              />
              <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveItem(item)}>
                <Icon name="remove-circle-outline" size={20}/>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      
      <TouchableOpacity onPress={sendPost} style={[styles.buttonBlack, {marginTop: 'auto', marginBottom: 30}]}>
        <Text style={styles.buttonTextWhite}>Create</Text>
      </TouchableOpacity>

    </View>
  )
}

export default CreatePost;