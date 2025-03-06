import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Modal,
  Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import { AuthContext } from '../context/AuthContext';
import { updateChat, deleteUserChat, updateUserChat } from '../graphql/mutations';
import { UserChat } from '../API';
import client from '../client';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const EditChat = ( {route, navigation} : any) => {
  const chat = route.params.currChat;
  const [ filepath, setFilepath ] = useState<string>(chat.url);
  const [ name, setName ] = useState<string>(chat.name);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ participants, setParticipants ] = useState<UserChat[]>(chat.participants.items);
  const [ removedMembers, setRemovedMembers ] = useState<string[]>([]);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedUserChat, setSelected ] = useState<UserChat>();
  const [ updateRoleIDs, setUpdateRoleIDs ] = useState<string[]>([]);
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
      for(const member of removedMembers){
        await client.graphql({
          query: deleteUserChat,
          variables: {
            input: {id: member}
          },
          authMode: 'userPool'
        })
        console.log(member, "removed succesfully")
      }

      for(const part of participants){
        if(updateRoleIDs.includes(part.id)){
          await client.graphql({
            query: updateUserChat,
            variable: {
              input: {
                id: part.id,
                role: part.role
              }
            },
            authMode: 'userPool'
          })
          console.log(part.id, 'role updated Successfully')
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.pop(2);
      Alert.alert("Success", "Chat updated successfully");
    }
  }

  const updateRole = (userChat: any) => {
    if(userChat.role === 'Owner'){
      var count = 0;
      for(const part of participants){
        if(part.role === 'Owner'){
          count++;
        }
      }
      if(count <= 1){
        Alert.alert(
          'Error', 'Please give ownership to another member before changing Owner role'
        )
        return;
      }
    }
    setModalVisible(true);
    setSelected(userChat);
  }

  const handleOptionButton = (option : string) => {
    if (selectedUserChat) {
      // Update the role of the selected participant
      setParticipants((participants) =>
        participants.map((part) => {
          if(part.id === selectedUserChat.id && part.role !== option){
            if(!updateRoleIDs.includes(part.id)){
              setUpdateRoleIDs([...updateRoleIDs, part.id]);
            }
            return {...part, role: option};
          }else{
            return part;
          }
        })
      );
    }
    setModalVisible(false);
  };

  const removeUser = async ( userChat: UserChat ) => {
    setRemovedMembers((removedMembers) => [...removedMembers, userChat.id]);
    setParticipants(participants.filter((part) => part.id !== userChat.id));
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
        data={participants}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
              {currUser.id !== item.userID && item.role !== 'Owner' ? (
                <TouchableOpacity style={{marginRight: 10}} onPress={() => removeUser(item)}>
                  <Icon name="person-remove-outline" size={18}/>
                </TouchableOpacity>
              ) : (
                <View style={{width: 30}}></View>
              )}
              <ImgComponent uri={ item.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>
                  {item.user?.firstname + " " + item.user?.lastname}
                </Text>
              </View>
              <TouchableOpacity style={styles.roleContainer} onPress={() => updateRole(item)}>
                <Text style={styles.roleText}>{item.role}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        ListHeaderComponent={header()}
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
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={["Owner", "Admin", "Member"]}
              keyExtractor={(option) => option}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.buttonWhite} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <TouchableOpacity style={styles.buttonBlack} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonTextWhite}>Close</Text>
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default EditChat;