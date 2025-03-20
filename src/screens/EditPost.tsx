import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, FlatList, Keyboard,
  ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import client from '../client';
import { updatePost } from '../customGraphql/customMutations';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import { imagePicker, getImgURI } from '../components/addImg';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

const EditPost = ( {route, navigation} : any ) => {
  const { currPost } = route.params;
  const [ content, setContent ] = useState(currPost.content);
  const [ filepaths, setFilepaths ] = useState<string[]>(currPost.postURL);
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

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

  const sendPost = async () => {
    if(content === currPost.content && filepaths === currPost.postURL) {
      Alert.alert('Success','Post updated successfully!', [{
        text: 'OK',
        onPress: () => {
          navigation.goBack();
        }
      }])
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
            postURL: newPaths,
            userID: currUser.id
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success','Post updated successfully!', [{
        text: 'OK',
        onPress: () => {
          navigation.goBack();
        }
      }])
    } catch (error: any) {
      console.log('Error creating post', error);
      Alert.alert('Error','Error updating post', [{
        text: 'OK',
        onPress: () => {
          navigation.goBack();
        }
      }])
    } finally {
      setLoading(false);
    }
  }

  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        filepaths.map(async (item, index) => {
          if(item.startsWith('https')) return item;
          const uri = await getImgURI(item, `public/groupPictures/${currPost.groupID}/${Date.now()}_${index}.jpg`);
          console.log('running getimguri');
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