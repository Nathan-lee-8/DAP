import { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, 
    KeyboardAvoidingView, Platform, Alert, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import client from '../client';
import { getChat } from '../customGraphql/customQueries';
import { createMessage, updateUserChat, deleteUserChat, createUserChat, deleteChat,
  updateUser, createNotification } from '../customGraphql/customMutations';
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
  const [ currMessage, setMessage ] = useState<string>('');
  const [ participants, setParticipants ] = useState<UserChat[]>([]);
  const [ myUserChat, setMyUserChat ] = useState<UserChat>();
  const [ chat, setChat ] = useState<Chat>();
  const [ title, setTitle ] = useState<string>('default');
  const [ displayURLs, setURLs ] = useState<(string | undefined)[]>([]);
  const [ messages, setMessages ] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList<Message>>(null);

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ inviteModalVisible, setInviteModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const [ users, setUsers ] = useState<User[]>([]);
  const [ options, setOptions ] = useState(['View Members', 'Leave']);
  const inviteFlatListRef = useRef<FlatList>(null);
 
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  const triggerFetch = authContext?.triggerFetch;
  if(!currUser) return;

  //update title anytime participants changes
  useEffect( () => {
    if(chat?.name && chat.name !== 'Chat name') setTitle(chat.name);
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
          const newMessage = value.data.onCreateMessage;
          setMessages((prev) => {
            if(!newMessage || prev.find((msg) => msg.id === newMessage.id)){
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

  //Get Chat metadata and set chat, messages, users, urls, nexttoken and myUser
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
          return item?.userID !== currUser.id;
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
      Alert.alert('Error', 'Could not find Chat');
    } finally {
      setLoading(false);
    }
  };

  //When user leaves chatroom: reset unread count to 0 & 
  //decrement user's unread chat count by 1
  const handleGoBack = async () => {
    if(myUserChat && myUserChat.unreadMessageCount !== 0){
      await client.graphql({
        query: updateUserChat,
        variables: {
          input: {
            id: myUserChat.id,
            unreadMessageCount: 0,
          },
        },
        authMode: 'userPool'
      });
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currUser.id,
            unreadChatCount: ((currUser.unreadChatCount - 1) >= 0) ? 
              currUser.unreadChatCount - 1 : 0,
          }
        },
        authMode: 'userPool'
      }).catch((error: any) => console.log(error))
      .finally(() => {
        if(triggerFetch) triggerFetch();
      });
    }
    navigation.goBack();
  }

  //Send current message unless message is empty
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
    } catch (error) {
      Alert.alert('Error', "Failed to send message");
    }
  };

  //Handles menu option buttons
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
      navigation.reset({
        index: 0,
        routes: [ { name: 'MainTabs', params: { screen: 'Messages' } } ]
      });
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: currUser.firstname + " " + currUser.lastname + " left the chat",
            chatID: chatID,
            type: 'System'
          }
        },
        authMode: 'userPool'
      })
    } catch (error){ 
      Alert.alert('Error', 'There was an issue leaving the chat');
    }
  }

  const handleInvite = async () => {
    setInviteModalVisible(false);
    const userIDs = addedMembers.map((item: any) => item.id);
    console.log(userIDs);
    try{
      for(const userID of userIDs){
        await client.graphql({
          query: createUserChat,
          variables: {
            input: {
              userID: userID,
              chatID: chatID,
              unreadMessageCount: 0,
              lastMessage: myUserChat?.lastMessage || "",
              lastMessageAt: myUserChat?.lastMessageAt || new Date().toISOString(),
              role: 'Member'
            }
          },
          authMode: 'userPool'
        });
        client.graphql({
          query: createNotification,
          variables: {
            input: {
              userID: userID,
              content: currUser.fullname + " added you to a chat",
              type: 'Chat',
              onClickID: chatID,
            }
          },
          authMode: 'userPool'
        }).catch(() => {})
      }
      var addedMemberNames = addedMembers.map((item) => 
        `${item.firstname} ${item.lastname}`).filter(Boolean).join(', ');
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: currUser.firstname + " " + currUser.lastname + " added " + addedMemberNames,
            chatID: chatID,
            type: 'System'
          }
        },
        authMode: 'userPool'
      })
    } catch (error){
      Alert.alert('Error', 'Failed to add User(s) to Chat');
    }
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
          onPress: async () => {
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
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'There was an issue deleting the chatroom');
            }
          }
        }
      ]
    );
  }

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