import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import styles from '../styles/Styles';
import { deleteUserChat, deleteMessage, deleteChat } from "../graphql/mutations";
import { User } from "../API";
import client from "../client";
import ImgComponent from "../components/ImgComponent";
import SearchBar from "../components/SearchBar";

const ChatMembers = ( {route, navigation} : any ) => {
  const chatData = route.params.chatData;
  const userChats = route.params.userChats;
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const myChat = userChats[0];

  const handleInvite = () => {
    setModalVisible(false);
    //take addedMembers and create UserChat for each member
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

  const handleAddMember = async (user: User) => {
    setAddedMembers([...addedMembers, user]);
  }

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
        <View style={styles.modelOverlay}>
          <View style={ {alignItems: 'center', height: 50}}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} remove={addedMembers}/>
            
            <FlatList
              data={addedMembers}
              horizontal
              renderItem={({item}) => {
                return (
                  <View>
                    <ImgComponent uri={item.profileURL || 'defaultUser'} />
                  </View>
                )
              }}
              contentContainerStyle={{marginTop: 'auto'}}
            />
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