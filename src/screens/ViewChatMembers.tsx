import { useContext, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import styles from '../styles/Styles';

import client from "../client";
import { deleteUserChat, deleteMessage, deleteChat, createUserChat } from "../graphql/mutations";
import { createMessage } from "../graphql/mutations";
import { User } from "../API";

import { AuthContext } from "../context/AuthContext";
import ImgComponent from "../components/ImgComponent";
import SearchBar from "../components/SearchBar";
import Icon from "@react-native-vector-icons/ionicons";

const ChatMembers = ( {route, navigation} : any ) => {
  const chatData = route.params.chatData;
  const userChats = route.params.userChats;
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const users = userChats.map((item: any) => item.user);
  const myChat = userChats[0];
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const handleInvite = async () => {
    setModalVisible(false);
    const userIDs = addedMembers.map((item: any) => item.id);
    try{
      for(const userID of userIDs){
        await client.graphql({
          query: createUserChat,
          variables: {
            input: {
              userID: userID,
              chatID: chatData.id,
              unreadMessageCount: 0,
              lastMessageAt: myChat.lastMessageAt,
              lastMessage: myChat.lastMessage,
              role: 'Member'
            }
          },
          authMode: 'userPool'
        });
        console.log('userAdded');
      }
    } catch (error){
      console.log(error);
    } 
    navigation.goBack();
    Alert.alert('Success', 'User(s) successfully added');
  }

  const handleEditChat = () => {
    navigation.navigate('EditChat', {currChat: chatData});
  }

  const handleLeaveChat = () => {
    Alert.alert(
      "Leave Chat",
      "Are you sure you want to leave this chat?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Leave", 
          onPress: leaveChat
        }
      ]
    );
  }

  const leaveChat = async () => {
    try{
      await client.graphql({
        query: deleteUserChat,
        variables: {
          input: {
            id: myChat.id
          }
        },
        authMode: 'userPool'
      });
      console.log('left chat');
      navigation.reset({
        index: 0,
        routes: [ { name: 'MainTabs', params: { screen: 'Messages' } } ]
      });
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: currUser.firstname + " left the chat",
            chatID: chatData.id,
            type: 'System'
          }
        },
        authMode: 'userPool'
      })
      console.log("Msg sent")
    } catch (error){ 
      console.log('Error', error);
    }
  }

  const handleDeleteChat = async () => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: deleteChatAndMessages
        }
      ]
    );
  }

  const deleteChatAndMessages = async () => {
    //delete messages
    const chatIDs = chatData.messages.items.map( (item : any) => item.id);
    if(chatIDs){
      for( const chatID of chatIDs){
        try{
          await client.graphql({
            query: deleteMessage,
            variables: {
              input: {
                id: chatID
              }
            },
            authMode: 'userPool'
          })
          console.log(chatID, " message deleted");
        } catch (error) {
          console.log(error);
        }
      }
    }

    //delete userChats
    const userChatIDs = chatData.participants.items.map( (item: any) => item.id);
    if(userChatIDs){
      for( const userChatID of userChatIDs){
        try{
          await client.graphql({
            query: deleteUserChat,
            variables: {
              input: {
                id: userChatID
              }
            },
            authMode: 'userPool'
          })
          console.log(userChatID, " user chat deleted");
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    //delete chat
    if(chatData.id){
      try{
        await client.graphql({
          query: deleteChat,
          variables: {
            input: {
              id: chatData.id
            }
          },
          authMode: 'userPool'
        })
        console.log(chatData.id, " chat deleted");
      } catch (error) {
        console.log(error);
      }
    }
    navigation.reset({
      index: 0,
      routes: [ { name: 'MainTabs', params: { screen: 'Messages' } } ]
    });
  }

  const handleAddMember = (user: User) => {
    setAddedMembers([...addedMembers, user]);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  const removeMember = (user: User) => {
    setAddedMembers(addedMembers => addedMembers.filter(item => item !== user));
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chatData.name}</Text>
      <FlatList
        data={userChats}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
              <ImgComponent uri={ item.user.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item.user.firstname + " " + item.user.lastname}</Text>
              </View>
                <Text style={styles.roleText}>{item.role}</Text>
            </View>
          )
        }}
      />
      {(myChat.role === 'Admin' || myChat.role === 'Owner') &&
        <View>
          <TouchableOpacity style={styles.buttonWhite} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonTextBlack}>Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleEditChat}>
            <Text style={styles.buttonTextBlack}>Edit Chat</Text>
          </TouchableOpacity>
        </View>
      }
      {myChat.role === 'Owner' ? (
        <View>
          <TouchableOpacity style={styles.buttonBlack} onPress={handleDeleteChat}>
            <Text style={styles.buttonTextWhite}>Delete Chat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.buttonBlack} onPress={handleLeaveChat}>
          <Text style={styles.buttonTextWhite}>Leave Chat</Text>
        </TouchableOpacity>
      )}
      <Modal 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.searchModalOverlay}>
          <View style={styles.searchModalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} remove={[...addedMembers, ...users]}/>
            <View style={{marginTop: 'auto'}}>
              <FlatList
                ref={flatListRef}
                data={addedMembers}
                horizontal
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity style={styles.removeIcon} onPress={() => removeMember(item)}>
                        <Icon name="remove-circle-outline" size={25}/>
                      </TouchableOpacity>
                      <ImgComponent style={styles.addedUserImg} uri={item.profileURL || 'defaultUser'}/>
                    </View>
                  )
                }}
                keyboardShouldPersistTaps='handled'
              />
            </View>
            <TouchableOpacity style={styles.buttonBlack} onPress={handleInvite}>
              <Text style={styles.buttonTextWhite}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ChatMembers;