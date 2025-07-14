import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Platform,
  KeyboardAvoidingView } from 'react-native';

import client from '../client';
import { createChat, createUserChat, createMessage, createNotification, deleteChat,
  updateChat } from '../customGraphql/customMutations';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import { SearchBar } from '../components/SearchBar';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';

/** 
 * UPDATE: ability to upload image on this page? 
 * Page to create Chatroom with chatname, image, and invited users
 * Optional user param to start with a target User already in the chat room
*/
const CreateChat = ({ route, navigation }: any) => {
  const initalUser = route.params.user ? [route.params.user] : [];
  const [ targetUsers, setTargetUsers ] = useState<User[]>(initalUser);
  const [ chatname, setChatname ] = useState('Chat name');
  const [ chatImage, setChatImage ] = useState<string>('defaultUser');
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
            url: chatImage
          }
        },
        authMode: 'userPool'
      });

      const chatID = chat.data.createChat.id;
      tempChatID = chatID;

      //upload image to s3 and update new filepath for chat
      if(chatImage !== 'defaultUser'){
        const imgURI = await getImgURI(chatImage, 
          `public/chatPictures/${chatID}/profile/${Date.now()}`);
        const filepath = `https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/${imgURI}`;
        if(imgURI){
          await client.graphql({
            query: updateChat,
            variables: {
              input: {
                id: chat.data.createChat.id,
                url: filepath
              }
            },
            authMode: 'userPool'
          })
        }
      }

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
        
        client.graphql({
          query: createNotification,
          variables: {
            input: {
              userID: user.id,
              name: chatname === 'Chat name' ? 'new chat' : chatname,
              content: currUser.fullname + " added you to a chat",
              type: 'AddChat',
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

  //opens library and sets filepath for user selected image
  const openImageLibrary = async () => {
    const uri = await imagePicker();
    if(!uri) return;
    setChatImage(uri);
  }

  if (loading) return <Text style={styles.container}>Loading...</Text>;

  return (
    <View style={[styles.container, { justifyContent: "flex-end" }]}>
      <SearchBar userPressed={handleUserSelected} remove={targetUsers} />
      <TouchableOpacity onPress={openImageLibrary}
        style={{height: 120, width: 120, alignSelf: 'center', marginVertical: 10}}
      >
        <ImgComponent uri={chatImage || 'defaultGroup'} 
          style={{height: 120, width: 120, borderRadius: 60, alignSelf:'center'}}
        />
        <Text style={{position: 'absolute', top: '40%', left: 20, fontSize: 18}}>
          Add Image
        </Text>
      </TouchableOpacity>
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
            <Icon name="remove-circle-outline" size={20} 
              onPress={() => handleRemoveUser(item.id)}
            />
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
        <Icon name="send" style={styles.commentButton} onPress={createChatRoom} size={30}/>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CreateChat;