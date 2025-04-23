import { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, 
    KeyboardAvoidingView, Platform, Alert, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import client from '../client';
import { getChat } from '../customGraphql/customQueries';
import { createMessage, updateUserChat, deleteUserChat, createUserChat,
deleteChat, deleteMessage } from '../customGraphql/customMutations';
import { onCreateMessage } from '../customGraphql/customSubscriptions';
import  { Message, UserChat, Chat, User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import ImgComponent from '../components/ImgComponent';
import SearchBar from '../components/SearchBar';
import moment from 'moment';

const ChatRoom = ( { route, navigation } : any) => {
  const chatID = route.params.chatID;
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ currMessage, setMessage ] = useState<string>('');
  const [ participants, setParticipants ] = useState<UserChat[]>([]);
  const [ myUserChat, setMyUserChat ] = useState<UserChat>();
  const [ chat, setChat ] = useState<Chat>();
  const [ title, setTitle ] = useState<string>('default');
  const [ displayURLs, setURLs ] = useState<(string | undefined)[]>([]);
  const [ modalVisible, setModalVisible ] = useState(false);

  const [ inviteModalVisible, setInviteModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const [ users, setUsers ] = useState<User[]>([]);
  const [ options, setOptions ] = useState(['View Members', 'Leave']);
  const inviteFlatListRef = useRef<FlatList>(null);
 
  const flatListRef = useRef<FlatList<Message>>(null);
  const msgCountRef = useRef<number>(0);
  const msgSentRef = useRef<boolean>(false);

  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;


  //update title anytime participants changes
  useEffect( () => {
    if(chat?.name) setTitle(chat.name);
    else{
      var temptitle = participants.map((item) => 
        `${item.user?.firstname} ${item.user?.lastname}`).filter(Boolean).join(', ');
      setTitle(temptitle);
    }
  }, [participants]);

  //get Chat data when gain focus and clean subscription when losing focus
  useFocusEffect(
    useCallback(() => {
      fetchChat();
      const subscription = client.graphql({
        query: onCreateMessage,
        variables: {
            filter: { chatID: { eq: chatID } },
        },
        authMode: 'userPool'
      }).subscribe({
        next: (value : any) => {
          const newMessage = value?.data.onCreateMessage;
          setMessages((prev) => {
            if(!newMessage || prev.find((msg) => msg?.id === newMessage?.id)){
              return prev;
            }
            return [newMessage, ...prev];
          });
          scrollToBottom();
        },
        error: (err: any) => console.error("Subscription error:", err),
      });
      return () => {
        setMessages([]);
        subscription.unsubscribe()
      };
    }, [chatID])
  );

  const fetchChat = async () => {
    if(loading) return;
    setLoading(true);
    try{
      const chat = await client.graphql({
        query: getChat,
        variables: { 
          id: chatID, 
          messagesLimit: 20, 
          messagesNextToken: nextToken,
        },
        authMode: 'userPool'
      });
      const chatData = chat.data.getChat;
      if(chatData) setChat(chatData);
      if(chatData?.messages){
        const newChat = chatData.messages.items
          .filter((item): item is Message => item !== null && !messages.includes(item))
        setMessages((prev) => [...prev, ...newChat])
      }
      let parts = chatData?.participants?.items.filter(item => item !== null);
      const userData = parts?.map((item: any) => item.user)
      if(userData) setUsers(userData);
      if(parts){
        let URLs: (string | undefined)[] = [];
        setParticipants(parts.filter((item): item is UserChat => {
          if(item?.userID !== currUser.id){ 
            URLs.push(item?.user?.profileURL || undefined)
          }
          return item?.userID !== currUser?.id;
        }));
        setURLs(URLs);
        const myUser = parts.find((item): item is UserChat => item?.userID === currUser.id)
        setMyUserChat(myUser);
        if(myUser?.role === 'Admin'){
          setOptions(['View Members', 'Invite', 'Edit', 'Leave'])
        }else if(myUser?.role === 'Owner'){
          setOptions(['View Members', 'Invite', 'Edit', 'Delete'])
        }
      }
      setNextToken(chatData?.messages?.nextToken);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = async () => {
    try{
      if(!myUserChat || !messages[0]) return;
      const myUnread = myUserChat.unreadMessageCount || 0;
      const msgChanged = messages[0].content !== myUserChat.lastMessage;
      //if curr user has 0 unread messages and message hasn't changed, do nothing
      if(myUnread === 0 && !msgChanged) {
          return;
      };
      //update current user to have 0 unread messages and update the last message
      await client.graphql({
        query: updateUserChat,
        variables: {
          input: {
            id: myUserChat?.id,
            lastMessage: messages[0].content, 
            unreadMessageCount: 0,
          },
        },
        authMode: 'userPool'
      });
      console.log('updated my chat');
      

      if(msgSentRef.current){
        for(const part of participants){
          const numUnread = part?.unreadMessageCount || 0;
          await client.graphql({
            query: updateUserChat,
            variables: {
              input: {
                id: part.id,
                lastMessage: messages[0].content, 
                unreadMessageCount: numUnread + msgCountRef.current,
              },
            },
            authMode: 'userPool'
          });
        }
        console.log("updated participant chats");
      }
    } catch (error) {
      console.error("Error updating last message:", error);
    } finally{
      navigation.goBack();
    }
  }

  const sendMessage = async () => {
    if(currMessage === '' || !chat ) return;
    try {
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: currMessage,
            chatID: chat.id,
          },
        },
        authMode: 'userPool'
      });
      setMessage('');
      msgCountRef.current = msgCountRef.current + 1;
      msgSentRef.current = true;
      console.log('msg sent');
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const getMsgStyle = (id: string) => {
    if(id === currUser.id) return styles.myMessage;
    return styles.otherMessage;
  }

  const getMsgContainerStyle = (id: string) => {
    if(id === currUser.id) return styles.myMessageContainer;
    return styles.otherMessageContainer;
  }

  const handleOptionButton = (option: string) => {
    if(option === 'View Members'){
      navigation.navigate('ViewChatMembers', 
        {chatData: chat, userChats: [myUserChat, ...participants]});
    }else if( option === 'Leave'){
      handleLeaveChat();
    }else if(option === 'Invite'){
      setInviteModalVisible(true);
    }else if(option === 'Edit'){
      handleEditChat();
    }else if(option === 'Delete'){
      handleDeleteChat();
    }
    setModalVisible(false);
  }

  const handleEditChat = () => {
    navigation.navigate('EditChat', {currChat: chat});
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
            id: chatID
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
            chatID: chatID,
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

  const handleInvite = async () => {
    setInviteModalVisible(false);
    const userIDs = addedMembers.map((item: any) => item.id);
    try{
      for(const userID of userIDs){
        await client.graphql({
          query: createUserChat,
          variables: {
            input: {
              userID: userID,
              chatID: chatID,
              unreadMessageCount: 0,
              lastMessage: myUserChat?.lastMessage,
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

  const handleAddMember = (user: User) => {
    setAddedMembers([...addedMembers, user]);
    setTimeout(() => {
      scrollToInviteBottom();
    }, 100);
  }

  const removeMember = (user: User) => {
    setAddedMembers(addedMembers => addedMembers.filter(item => item !== user));
    setTimeout(() => {
      scrollToInviteBottom();
    }, 100);
  }

  const scrollToInviteBottom = () => {
    inviteFlatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

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
    const chatIDs = chat?.messages?.items.map( (item : any) => item.id);
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
    const userChatIDs = chat?.participants?.items.map( (item: any) => item.id);
    if(userChatIDs){
      for(const userChatID of userChatIDs){
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
    try{
      await client.graphql({
        query: deleteChat,
        variables: {
          input: {
            id: chatID
          }
        },
        authMode: 'userPool'
      })
      console.log(chatID, " chat deleted");
    } catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [ { name: 'MainTabs', params: { screen: 'Messages' } } ]
    });
  }

  return(
    <View style={styles.container}>
      <View style={styles.messageHeaderContainer}>
        <View style={{flexDirection: 'row'}}>
          <Icon style={{padding: 10, alignSelf: 'center'}} name='arrow-back-outline' size={25}
            onPress={() => handleGoBack()}
          />
          <View style={styles.URLSection}>
            {chat?.url !== null ? (
              <ImgComponent 
                uri={chat?.url || 'defaultUser'} 
                style={{height: 40, width: 40, borderRadius: 20}} 
              />
            ) : displayURLs.length > 1 ? (
              displayURLs.slice(0, 2).map((uri, index) => (
                <ImgComponent 
                  key={index} 
                  uri={uri || 'defaultUser'} 
                  style={{ 
                    position: 'absolute', 
                    top: index * 10,
                    left: index * 10 + 5 , 
                    zIndex: displayURLs.length - index,   
                    height: 26,
                    width: 26,
                    borderRadius: 13,
                  }} 
                />
              ))
            ) : (
              <ImgComponent uri={displayURLs[0] || 'defaultUser'} 
                style={{height: 40, width: 40, borderRadius: 20}} 
              />
            )}
          </View>
          <Text style={styles.chatRoomName} numberOfLines={1}>{title}</Text>
          <Icon style={{alignSelf:'center'}} name='ellipsis-horizontal-outline' size={25} 
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const currTime = moment(item.createdAt);
          const prevItem = index < messages.length - 1 ? messages[index + 1] : null;
          const prevTime = prevItem ? moment(prevItem.createdAt) : null;
          const shouldShowDate = !prevTime || !currTime.isSame(prevTime, 'day');
          if(item.type === 'System') return(
            <View>
              <Text style={styles.systemMessage}>{item?.content}</Text>
            </View>
          )
          return (
            <View>
              {shouldShowDate && (
                <Text style={{ textAlign: 'center' }}>
                  {currTime.format('MMM D, YYYY')}
                </Text>
              )}
              <View style={getMsgContainerStyle(item?.senderID)}>
                {item?.senderID !== currUser.id && 
                  <ImgComponent uri={item?.sender?.profileURL|| 'defaultUser'}/>
                }
                <View style={getMsgStyle(item?.senderID)}>
                  <Text>{item?.content}</Text>
                </View>
                {item?.senderID === currUser.id && 
                  <ImgComponent uri={currUser.profileURL}/>
                }
              </View>
            </View>
          )
        }}
        onEndReached={ () => {
          if(nextToken) fetchChat();
        }}
        onEndReachedThreshold={0.4}
        inverted
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.addCommentSection, {paddingBottom: 0}]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
      > 
        <View style={{flexDirection: 'row', paddingBottom: Platform.OS === 'ios' ? 30 : 0}}>
          <TextInput
            style={styles.commentInput}
            placeholder={'Type a message'}
            value={currMessage}
            autoCapitalize='sentences'
            onChangeText={(text) => setMessage(text)}
          />
          <Icon style={styles.commentButton} onPress={sendMessage}  name="send" size={30} />
        </View>
      </KeyboardAvoidingView>
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
      <Modal 
        transparent={true} 
        visible={inviteModalVisible} 
        onRequestClose={() => setInviteModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.searchModalOverlay}>
          <TouchableOpacity style={styles.searchModalSpacer} onPress={() => setInviteModalVisible(false)}/>
          <View style={styles.searchModalHeader}>
            <TouchableOpacity onPress={() => setInviteModalVisible(false)} style={styles.closeSearchButton}>
              <Text style={styles.closeSearchButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} remove={[...addedMembers, ...users]}/>
            <View style={{marginTop: 'auto'}}>
              <FlatList
                ref={inviteFlatListRef}
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
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
            >
              <TouchableOpacity style={styles.buttonBlack} onPress={handleInvite}>
                <Text style={styles.buttonTextWhite}>Invite</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>  
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ChatRoom;