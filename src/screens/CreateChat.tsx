import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList,
  KeyboardAvoidingView, Platform} from 'react-native';

import client from '../client';
import { createChat, createUserChat, createMessage, createNotification,
  deleteChat } from '../customGraphql/customMutations';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import { SearchBar } from '../components/SearchBar';

/** CHANGE: Send a message to create chatroom -> button press or message send
 ** UPDATE: ability to upload image on this page? 
 * Page to create Chatroom with chatname, image, and invited users
 * Optional user param to start with a target User already in the chat room
*/
const CreateChat = ({ route, navigation }: any) => {
  const initalUser = route.params.user ? [route.params.user] : [];
  const [ targetUsers, setTargetUsers ] = useState<User[]>(initalUser);
  const [ chatname, setChatname ] = useState('Chat name');
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  //Creates a chat room with metadata unless message is empty or target 
  //chat members are not set
  const createChatRoom = async () => {
    if (message === '') {
      Alert.alert("Error", "Please enter a message");
      return;
    } else if (targetUsers.length === 0) {
      Alert.alert("Error", "No target selected.");
      return;
    }
    let tempChatID: string | undefined;
    try {
      setLoading(true);

      //Create ChatRoom
      const chat = await client.graphql({
        query: createChat,
        variables: {
          input: {
            name: chatname,
            isGroup: false,
          }
        },
        authMode: 'userPool'
      });
      console.log("chat created");
      
      const chatID = chat.data.createChat.id;
      tempChatID = chatID;
      //Create current user User Chat
      await client.graphql({
        query: createUserChat,
        variables: {
          input: {
            userID: currUser.id,
            chatID: chatID,
            unreadMessageCount: 0,
            lastMessage: message,
            lastMessageAt: new Date().toISOString(),
            role: 'Owner'
          }
        },
        authMode: 'userPool'
      })
      console.log("senderChat created");

      //create User Chat and notifications for each target user
      targetUsers.map(async (user: User) => {
        await client.graphql({
          query: createUserChat,
          variables: {
            input: {
              userID: user.id,
              chatID: chatID,
              unreadMessageCount: 1,
              lastMessage: message,
              lastMessageAt: new Date().toISOString(),
              role: 'Member'
            }
          },
          authMode: 'userPool'
        })
        console.log(user.firstname + " chat created");
        client.graphql({
          query: createNotification,
          variables: {
            input: {
              userID: user.id,
              content: currUser.fullname + " added you to a chat",
              type: 'Chat',
              onClickID: chatID,
            }
          },
          authMode: 'userPool'
        }).catch(() => {})
      })

      //Send message in chat
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: message,
            chatID: chatID,
          }
        },
        authMode: 'userPool'
      })
      console.log("Msg sent")

      navigation.reset({
        index: 1,
        routes: [
          { name: 'MainTabs', params: { screen: 'Messages' } },
          {
            name: 'ViewChat', params: { chatID: chat.data.createChat.id }
          }],
      });
    } catch {
      Alert.alert('Error', 'Unable to create Chat');
      if(tempChatID){
        client.graphql({
          query: deleteChat,
          variables: {
            input: {
              id: tempChatID
            }
          },
          authMode: 'userPool'
        }).catch(() => {});
      }
    } finally {
      setLoading(false);
    }
  }

  //adds member to list of users to add to chat
  const handleUserSelected = (user: User) => {
    if (targetUsers.includes(user)) return;
    setTargetUsers([...targetUsers, user]);
  }

  //removes member from list of users to add to chat
  const handleRemoveUser = (userID: string) => {
    setTargetUsers(targetUsers.filter((user) => user.id !== userID));
  }

  if (loading) return <Text style={styles.container}>Loading...</Text>;

  return (
    <View style={[styles.container, { justifyContent: "flex-end" }]}>
      <SearchBar userPressed={handleUserSelected} remove={targetUsers} />
      <View style={styles.editNameContainer}>
        <TextInput
          style={styles.chatNameText}
          value={chatname}
          placeholder={chatname}
          onChangeText={setChatname}
        />
        <Icon name="pencil-outline" style={{marginLeft: 5}} size={18}/>
      </View>
      <FlatList
        data={targetUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', margin: 3 }}>
            <Text>{item.firstname} {item.lastname} </Text>
            <TouchableOpacity onPress={() => handleRemoveUser(item.id)}>
              <Icon name="remove-circle-outline" size={20} />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
      />
      <Text style={[styles.contentText, { marginBottom: 'auto' }]}></Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.addCommentSection, {flexDirection: 'row'}]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <TextInput
          style={styles.commentInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.commentButton} onPress={createChatRoom} >
          <Icon name="send" size={30} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CreateChat;