import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput,
  Platform, KeyboardAvoidingView } from 'react-native';

import client from '../client';
import { updateChat } from '../customGraphql/customMutations';

import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const EditChat = ( {route, navigation} : any) => {
  const chat = route.params.currChat;
  const [ filepath, setFilepath ] = useState<string>(chat.url);
  const [ name, setName ] = useState<string>(chat.name);
  const [ loading, setLoading ] = useState<boolean>(false);

  const getFilePath = async () => {
    var uri = await imagePicker();
    if(uri === null){ 
      Alert.alert("Alert", "No image selected")
      return;
    };
    setFilepath(uri);      
  }

  const handleSaveChanges = async () => {
    try{
      setLoading(true);
      var imgURI = filepath;
      if(filepath !== chat.url){
        var uri = await getImgURI(filepath, `public/chatPictures/${chat.id}/profile/${Date.now()}.jpg`);
        imgURI = 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + uri;
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
        console.log(chat.id, 'updated');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.goBack();
      Alert.alert("Success", "Chat updated successfully");
    }
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />;
  
  return (
    <View style={styles.container}>
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