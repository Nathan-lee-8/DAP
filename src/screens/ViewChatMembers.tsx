import { useContext, useState } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Alert } from "react-native";
import styles from '../styles/Styles';

import client from "../client";
import { deleteUserChat, updateUserChat, createMessage } from "../customGraphql/customMutations";
import { UserChat } from "../API";

import ImgComponent from "../components/ImgComponent";
import { AuthContext } from "../context/AuthContext";
import Report from "../components/Report";

/**
 * Displays all users that are in the chatroom and allows owners and admin to 
 * edit roles or remove users from the chatroom. ChatRoom members can report or 
 * View Members.
 * 
 * @param chatData - The current chatRoom
 * @param userChats - The current users that are in the chat 
 */
const ChatMembers = ( {route, navigation} : any ) => {
  const chatData = route.params.chatData;
  const [ userChats, setUserChats ] = useState(route.params.userChats);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ options, setOptions ] = useState(['View Profile', 'Report']); 
  const [ selectedUser, setSelectedUser ] = useState<UserChat>();
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ roleModalVisible, setRoleModalVisible ] = useState(false);
  const [ roleOptions, setRoleOptions ] = useState(['Owner', 'Admin', 'Member'])
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;
  const myUserChat = 
    userChats.find((userChat: UserChat) => userChat.userID === currUser.id);

  //When user long presses on a participant: sets options for user and then displays 
  //options. Either View Profile, Edit Roles, Remove User or report based on 
  //users role and if they are in the chat or not.
  const handleUserPress = (item: UserChat) => {
    if(item.userID === currUser.id) setOptions(['Edit Role']);
    else if(!myUserChat){
      setOptions(['View Profile', 'Report']);
    } else if(myUserChat.role === 'Admin' || myUserChat.role === 'Owner') {
      setOptions(['View Profile', 'Edit Role', 'Remove']);
      if(item.userID === currUser.id) setOptions(['Edit Role'])
    }else {
      setOptions(['View Profile', 'Report']);
    }
    setSelectedUser(item);
    setModalVisible(true);
  }

  //Handles the option the user presses: Navigates to viewProfiles page, 
  //Edits roles for users, & remove or reports a user
  const handleOptionButton = (option: string) => {
    if(option === 'View Profile'){
      navigation.navigate('ViewProfile', {userID: selectedUser?.userID})
    }else if(option === 'Edit Role'){
      if(selectedUser?.role === 'Admin') setRoleOptions(['Owner', 'Member']);
      else if(selectedUser?.role === 'Owner') setRoleOptions(['Admin', 'Member']);
      else if(selectedUser?.role === 'Member') setRoleOptions(['Admin', 'Owner']);
      setRoleModalVisible(true);
    }else if(option === 'Remove'){
      handleRemoveUser()
    }else if(option === 'Report'){
      setReportModalVisible(true);
    }
    setModalVisible(false);
  }

  //Fn to handle removing user from groupchat
  const handleRemoveUser = async () => {
    if(!selectedUser) {
      Alert.alert('Error', 'Error removing user');
      return;
    }
    try {
      await client.graphql({
        query: deleteUserChat,
        variables: {
          input: {
            id: selectedUser.id
          }
        },
        authMode: 'userPool'
      });
      setUserChats(userChats.filter((item: UserChat) => item.userID !== selectedUser.userID));
    } catch {
      Alert.alert('Error', 'Error removing user');
    }
    client.graphql({
      query: createMessage, 
      variables: {
        input: {
          senderID: currUser.id,
          content: `${currUser.firstname} ${currUser.lastname} removed ` +
            `${selectedUser.user?.firstname} ${selectedUser.user?.lastname}`,
          chatID: chatData.id,
          type: 'System'
        },
      },
      authMode: 'userPool'
    }).catch(() => {})
  }

  //Updates roles for users. Ensures at least one owner exists at all times
  const updateRole = async (role: string) => {
    setRoleModalVisible(false);
    if(!selectedUser){
      Alert.alert('Error updating roles')
      return;
    }
    const ownerCount = 
      userChats.filter((userGroup : UserChat) => userGroup.role === 'Owner').length;
    if(selectedUser.userID === currUser.id && ownerCount <= 1){
      Alert.alert('Error', 'You must have at least one owner');
      return;
    }
    try{
      await client.graphql({
        query: updateUserChat,
        variables: {
          input: {
            id: selectedUser.id,
            role: role
          }
        },
        authMode: 'userPool'
      })
      setUserChats((prevUserGroups : UserChat[]) =>
        prevUserGroups.map(userGroup => userGroup.id === selectedUser.id ? 
          { ...userGroup, role: role } : userGroup
        )
      );
    } catch {
      Alert.alert('Error', 'There was an issue updating roles');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chatData.name}</Text>
      <FlatList
        data={userChats}
        renderItem={({ item }) => {
          var disable = item.userID === currUser.id;
          if(myUserChat && myUserChat.role === 'Admin' || myUserChat.role === 'Owner'){
            disable = false;
          }
          return (
            <TouchableOpacity style={styles.listMemberContainer} 
              onPress={() => handleUserPress(item)}
              disabled= {disable}
            >
              <ImgComponent uri={ item.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>
                  {item.user?.firstname + " " + item.user?.lastname}
                  </Text>
              </View>
                <Text style={styles.roleText}>{item.role}</Text>
            </TouchableOpacity>
          )
        }}
      />

      {/* Post Options Modal */}
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
                <TouchableOpacity style={styles.optionButton} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      >
        <Report
          type={"User"}
          itemID={(selectedUser) ? selectedUser.id : ""}
          setReportModalVisible={setReportModalVisible}
        />
      </Modal>

      {/*Role Modal */}
      <Modal 
        transparent={true} 
        visible={roleModalVisible} 
        onRequestClose={() => setRoleModalVisible(false)}  
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={roleOptions}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.optionButton} 
                  onPress={() => updateRole(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setRoleModalVisible(false)}
          >
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ChatMembers;