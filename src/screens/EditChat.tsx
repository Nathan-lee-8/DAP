import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput,
  Platform, KeyboardAvoidingView } from 'react-native';

import client from '../client';
import { updateChat } from '../customGraphql/customMutations';

import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Displays chat name and chat image and allows user to update both fields.
 * 
 * @param currChat - the current chat to be updated
 */
const EditChat = ( {route, navigation} : any) => {
  const chat = route.params.currChat;
  const [ filepath, setFilepath ] = useState<string>(chat.url);
  const [ name, setName ] = useState<string>(chat.name);
  const [ loading, setLoading ] = useState<boolean>(false);

  //if chat images is changed, upload to s3 and update new filepath. Update chat 
  //image and chat name to db if either have changed. Navigates back to chatroom.
  const handleSaveChanges = async () => {
    try{
      setLoading(true);
      var imgURI = filepath;
      if(filepath !== chat.url){
        var uri = await getImgURI(filepath, 
          `public/chatPictures/${chat.id}/profile/${Date.now()}.jpg`);
        if(uri) imgURI = uri;
      }
      if(name !== chat.name || imgURI !== chat.url){
        await client.graphql({
          query: updateChat,
          variables: {
            input: {
              id: chat.id,
              name: name,
              url: imgURI
            }
          },
          authMode: 'userPool'
        })
        Alert.alert("Success", "Chat updated successfully");
      }
    } catch (error) {
      Alert.alert('Error', 'There was an issue updating Chat');
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  }

  //opens media picker to choose new chat image
  const getFilePath = async () => {
    var uri = await imagePicker();
    if(uri === null){ 
      Alert.alert("Alert", "No image selected");
      return;
    };
    setFilepath(uri);      
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <View style={styles.editNameContainer}>
        <TextInput
          style={styles.chatNameText}
          value={name}
          placeholder={name}
          onChangeText={setName}
        />
        <Icon name="pencil-outline" style={{marginLeft: 5}} size={18}/>
      </View>
      <TouchableOpacity style={styles.uploadImage} onPress={getFilePath}>
        <ImgComponent style={styles.editProfileURL} uri={filepath || 'defaultGroup'}/>
      </TouchableOpacity>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{marginTop: 'auto'}}
      >   
        <TouchableOpacity style={styles.buttonBlack} onPress={handleSaveChanges}>
          <Text style={styles.buttonTextWhite}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default EditChat;