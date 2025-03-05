import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, 
  Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import { AuthContext } from '../context/AuthContext';
import { updateChat, deleteUserChat } from '../graphql/mutations';
import client from '../client';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const EditChat = ( {route, navigation} : any) => {
  const chat = route.params.currChat;
  const [ filepath, setFilepath ] = useState<string>(chat.url);
  const [ name, setName ] = useState<string>(chat.name);
  const [ loading, setLoading ] = useState<boolean>(false);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

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
      const imgURI = await getImgURI(filepath, `public/chatPictures/${chat.id}/profile/${Date.now()}.jpg`);
      await client.graphql({
        query: updateChat,
        variables: {
          input: {
            id: chat.id,
            name: name,
            url: 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + imgURI
          }
        },
        authMode: 'userPool'
      })
      Alert.alert("Success", "Chat updated successfully");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const updateRole = (userChat: any) => {
    console.log(userChat);
  }

  const removeUser = async ( userChat: any ) => {
    Alert.alert(
      "Remove User",
      "Are you sure you want to remove " + userChat.user.firstname + " " +
      userChat.user.lastname + " from this chat?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: async () => {
            try{
              await client.graphql({
                query: deleteUserChat,
                variables: {
                  input: {
                    id: userChat.id
                  }
                },
                authMode: 'userPool'
              });
            } catch {

            }
          }
        }
      ]
    );
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />;

  const header = () => {
    return (
      <View>
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
          <ImgComponent style={styles.viewProfileURL} uri={filepath || 'defaultGroup'}/>
        </TouchableOpacity>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chat.participants.items}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
                {currUser.id !== item.user.id && item.user.role !== 'Owner' ? (
                  <TouchableOpacity style={{marginRight: 10}} onPress={() => removeUser(item)}>
                    <Icon name="person-remove-outline" size={18}/>
                  </TouchableOpacity>
                ) : (
                  <View style={{width: 30}}></View>
                )}
                <ImgComponent uri={ item.user.profileURL || 'defaultUser'}/>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.postAuthor}>
                    {item.user.firstname + " " + item.user.lastname}
                  </Text>
                </View>
                <TouchableOpacity style={styles.roleContainer} onPress={() => updateRole(item)}>
                  <Text style={styles.roleText}>{item.role}</Text>
                </TouchableOpacity>
            </View>
          )
        }}
        ListHeaderComponent={header}
        keyboardShouldPersistTaps='handled'
      />
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