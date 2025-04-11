import { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Alert } from "react-native";
import styles from '../styles/Styles';

import client from "../client";
import { deleteUserChat } from "../customGraphql/customMutations";
import { UserChat } from "../API";

import ImgComponent from "../components/ImgComponent";
import { AuthContext } from "../context/AuthContext";

const ChatMembers = ( {route, navigation} : any ) => {
  const chatData = route.params.chatData;
  const userChats = route.params.userChats;
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ options, setOptions ] = useState(['View Profile', 'Report']); 
  const [ selectedUser, setSelectedUser ] = useState<UserChat>();
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const myUserChat = userChats.find((userChat: UserChat) => userChat.userID === currUser.id);
  useEffect(() => {
    if(myUserChat?.role === 'Owner' || myUserChat?.role === 'Admin'){
      setOptions(['View Profile', 'Edit Role', 'Remove']);
    }
  }, [myUserChat]);

  const handleUserPress = (item: UserChat) => {
    if(item.userID === currUser.id) setOptions([])
    setSelectedUser(item);
    setModalVisible(true);
  }

  const handleOptionButton = (option: string) => {
    if(option === 'View Profile'){
      navigation.navigate('ViewProfile', {userID: selectedUser?.userID})
    }else if(option === 'Edit role'){
      Alert.alert('Not implemented yet');
    }else if(option === 'Remove'){
      handleRemoveUser()
    }else if(option === 'Report'){
      Alert.alert('Not implemented yet');
    }
    setModalVisible(false);
    console.log(option);
  }

  const handleRemoveUser = async () => {
    if(!selectedUser) {
      Alert.alert('Error', 'Error removing user');
      return;
    }
    try{
      await client.graphql({
        query: deleteUserChat,
        variables: {
          input: {
            id: selectedUser.id
          }
        },
        authMode: 'userPool'
      });
    }catch(error){
      Alert.alert('Error', 'Error removing user');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chatData.name}</Text>
      <FlatList
        data={userChats}
        renderItem={({ item }) => {
          var disable = item.userID === currUser.id;
          return (
            <TouchableOpacity style={styles.listMemberContainer} onPress={() => handleUserPress(item)}
              disabled= {disable}
            >
              <ImgComponent uri={ item.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item.user?.firstname + " " + item.user?.lastname}</Text>
              </View>
                <Text style={styles.roleText}>{item.role}</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Modal 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}  
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={options}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.optionButton} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          
          <TouchableOpacity style={styles.closeOverlayButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ChatMembers;