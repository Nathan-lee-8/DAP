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
  const [ loadingIMG, setLoadingIMG ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) return null;
  const { userId } = authContext;

  const getFilePath = async () => {
    try{
      setLoadingIMG(true);
      var uri = await imagePicker();
      if(uri === null) throw new Error('No image selected');
      setFilepaths([...filepaths.filter((item) => item !== null), uri]);
    } catch(error : any){
      Alert.alert('Error', error.message);
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
            content: content,
            groupID: groupID,
            postURL: filepaths,
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
      <Text style={styles.noResultsMsg}>What's on your mind?</Text>
      <TextInput 
        style={styles.contentInput} 
        placeholder="Content"
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
      {loadingIMG ? (
        <FlatList
          data={filepaths}
          renderItem={({ item }) => {
            return (
              <ImgComponent uri={item} />
            )
          }}
        />
      ) : ( null )}
      <TouchableOpacity onPress={sendPost} style={styles.createButton}>
        <Icon name="add-circle-outline" style={{alignSelf: 'center'}} size={50}/>
      </TouchableOpacity>    

    </View>
  )
}

export default CreatePost;