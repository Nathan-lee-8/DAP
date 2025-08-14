import { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, 
    KeyboardAvoidingView, Platform, Alert, Modal } from 'react-native';

import client from '../client';
import { getChat } from '../customGraphql/customQueries';
import { createMessage, updateUserChat, deleteUserChat, createUserChat, deleteChat,
  updateUser, createNotification } from '../customGraphql/customMutations';
import  { Message, UserChat, Chat, User } from '../API';

import { Asset } from 'react-native-image-picker';
import Video from 'react-native-video';
import { mediaPicker, getMediaURI } from '../components/addMedia';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import ImgComponent from '../components/ImgComponent';
import { SearchBar } from '../components/SearchBar';
import moment from 'moment';
import wsClient from '../components/webSocket';

/**
 * Screen to display a given Chatroom based on the ChatID. ChatRooms allow users 
 * view and send messages to other users or groups. 
 * @param chatID - The ID of the given ChatRoom to display
 */
const ViewChat = ( { route, navigation } : any) => {
  const chatID = route.params.chatID;
  const [ chat, setChat ] = useState<Chat>();
  const [ participants, setParticipants ] = useState<UserChat[]>([]); //all users including curr
  const [ myUserChat, setMyUserChat ] = useState<UserChat>(); //curr User's chat

  const [ title, setTitle ] = useState<string>('default');
  const [ displayURLs, setURLs ] = useState<(string | undefined)[]>([]);
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const flatListRef = useRef<FlatList<Message>>(null);

  const [ currMessage, setMessage ] = useState<string>(''); //curr message to send
  const [ media, setMedia ] = useState<Asset[]>([]); //curr selected media to send
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ iconsVisible, setIconsVisible ] = useState(false); //add media icons

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ options, setOptions ] = useState(['View Members', 'Leave']);

  const [ inviteModalVisible, setInviteModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const inviteFlatListRef = useRef<FlatList>(null);

  const [ mediaModalVisible, setMediaModalVisible ] = useState(false);
  const [ mediaModalUrl, setMediaModalUrl ] = useState<string | null>();
 
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  const blockList = authContext?.blockList;
  const triggerFetch = authContext?.triggerFetch;
  if(!currUser) return;

  //update title anytime participants changes
  useEffect( () => {
    if(chat?.name && chat.name !== 'Chat name') setTitle(chat.name);
    else{
      var temptitle = participants.filter((user) => user.user?.id !== currUser.id).map((item) => 
        `${item.user?.firstname} ${item.user?.lastname}`).filter(Boolean).join(', ');
      setTitle(temptitle);
    }
  }, [participants]);

  //retrieves chat then starts WebSocket connection to listen for new messages 
  useEffect(() => {
    fetchChat();
    const handleNewMessage = (data: any) => {
      if(data.chatID !== chatID) return;
      const currTime = new Date().toISOString();
      console.log(participants.find((item) => item.user?.id === data.userID)?.user)
      const newMessage: Message = {
        id: currTime,
        content: data.message,
        msgURL: data.urls,
        type: "Message",
        chatID: data.chatID,
        senderID: data.userID,
        sender: participants.find((item) => item.user?.id === data.userID)?.user,
        createdAt: currTime,
        updatedAt: currTime,
        __typename: "Message",
      };
      setMessages((prev) =>
        prev.some((m) => m.id === newMessage.id) ? prev : [newMessage, ...prev]
      );
      scrollToBottom();
    }
    wsClient.addListener(handleNewMessage);
    return () => {
      wsClient.removeListener(handleNewMessage);
    }
  }, [])

  //on open set unreadMessageCount to 0 & decrement unreadChatCount if neccessary
  useEffect(() => {
    if(myUserChat && myUserChat.unreadMessageCount !== 0){
      client.graphql({
        query: updateUserChat,
        variables: {
          input: {
            id: myUserChat.id,
            unreadMessageCount: 0,
          },
        },
        authMode: 'userPool'
      });
      client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currUser.id,
            unreadChatCount: (currUser.unreadChatCount - 1) >= 0 ? 
              currUser.unreadChatCount - 1 : 0,
          }
        },
        authMode: 'userPool'
      })
      if(triggerFetch) triggerFetch();
    }
  }, [myUserChat]);

  //Get Chat metadata and set chat, messages, urls, nexttoken and myUser
  const fetchChat = async () => {
    if(loading) return;
    setLoading(true);
    try{
      //retreive and set chat
      const chat = await client.graphql({
        query: getChat,
        variables: { 
          id: chatID, 
          messagesLimit: 20, 
        },
        authMode: 'userPool'
      });
      const chatData = chat.data.getChat;
      if(chatData) setChat(chatData);

      //filter and set messages & nextToken
      if(chatData && chatData.messages){
        setMessages(chatData.messages.items.filter((item): item is Message => item !== null));
        setNextToken(chatData.messages.nextToken);
      }
      
      //loop through participant and set my userChat, options and url
      let parts = chatData?.participants?.items.filter((item): item is UserChat => item !== null);
      if(parts) setParticipants(parts);
      let URLs: (string)[] = [];
      parts?.map((participant) => {
        if(!participant?.user) return;
        if(participant.user.id === currUser.id){ //if my Userchat, set roles and options
          setMyUserChat(participant);
          let currUsersChat = participant;
          if(currUsersChat.role === 'Admin'){
            setOptions(['View Members', 'Invite', 'Edit', 'Leave'])
          }else if(currUsersChat.role === 'Owner'){
            setOptions(['View Members', 'Invite', 'Edit', 'Delete'])
          }
        }else{ //set chat header images
          URLs.push(participant.user.profileURL)
        }
      })
      setURLs(URLs);
    } catch {
      Alert.alert('Error', 'Could not find Chat');
    } finally {
      setLoading(false);
    }
  };

  //retrieve next 20 messages as user scrolls 
  const fetchMoreChat = () => {
    if(loading) return;
    client.graphql({
      query: getChat,
      variables: {
        id: chatID,
        messagesLimit: 20,
        messagesNextToken: nextToken,
      },
      authMode: 'userPool'
    }).then((chat) => {
      const chatData = chat.data.getChat;
      if(chatData?.messages){
        const newChat = chatData.messages.items.filter((item): item is Message => 
          item !== null && !messages.includes(item));
        setMessages((prev) => [...prev, ...newChat]);
        setNextToken(chatData.messages.nextToken);
      }
    }).catch(() => {
      Alert.alert("Error fetching older chat logs");
    })
  };

  //Send current message unless message is empty
  const sendMessage = async () => {
    if((currMessage === '' && media.length === 0) || !chat ) return;
    const newPaths = await handleUploadFilepaths() || [];
    wsClient.send({
      action: 'sendMessage',
      chatID: chatID,
      userID: currUser.id,
      message: currMessage,
      urls: newPaths
    })
    try {
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: currMessage,
            type: currMessage === '' ? 'Message' : 'Media',
            msgURL: newPaths,
            chatID: chat.id,
          },
        },
        authMode: 'userPool'
      });
      setMessage('');
    } catch {
      Alert.alert('Error', "Failed to send message");
    }
  };

  //Handles menu option buttons
  const handleOptionButton = (option: string) => {
    if(option === 'View Members'){
      navigation.navigate('ViewChatMembers', {chatData: chat, userChats: participants});
    }else if( option === 'Leave'){
      Alert.alert("Leave Chat", "Are you sure you want to leave this chat?", [
        { text: "Cancel", style: "cancel" },
        { text: "Leave", onPress: leaveChat}
      ]);
    }else if(option === 'Invite'){
      setInviteModalVisible(true);
    }else if(option === 'Edit'){
      navigation.navigate('EditChat', {currChat: chat});
    }else if(option === 'Delete'){
      handleDeleteChat();
    }
    setModalVisible(false);
  }

  //Deletes the current UserChat removing user from the group and sends a System message
  //in Chat that user has left
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
            content: `${currUser.firstname} ${currUser.lastname} left the chat`,
            chatID: chatID,
            type: 'System'
          }
        },
        authMode: 'userPool'
      })
    } catch { 
      Alert.alert('Error', 'There was an issue leaving the chat');
    }
  }

  //adds each member added by the invite modal to the group and send them a notification
  //that they've been added to the group. Sends an admin message to chat that members have
  //been added
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
              lastMessage: myUserChat?.lastMessage || "",
              lastMessageAt: myUserChat?.lastMessageAt || new Date().toISOString(),
              role: 'Member',
              active: false
            }
          },
          authMode: 'userPool'
        });
        client.graphql({
          query: createNotification,
          variables: {
            input: {
              userID: userID,
              name: title.slice(0, 20),
              content: `${currUser.fullname} added you to a chat`,
              type: 'AddChat',
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
            content: `${currUser.firstname} ${currUser.lastname} added ${addedMemberNames}`,
            chatID: chatID,
            type: 'System'
          }
        },
        authMode: 'userPool'
      })
    } catch {
      Alert.alert('Error', 'Failed to add User(s) to Chat');
    }
  }
  //Adds member to add to group queue
  const handleAddMember = (user: User) => {
    setAddedMembers([...addedMembers, user]);
    setTimeout(() => {
      scrollToInviteBottom();
    }, 100);
  }
  //removes member from add to group queue
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

  //Deletes the current chat after User confirmation. Lambda cascade deletes
  //messages and UserChats
  const handleDeleteChat = async () => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: async () => {
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
        } catch {
          Alert.alert('Error', 'There was an issue deleting the chatroom');
        }
      }}
    ]);
  }

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  //Opens media library to choose video/image to add to message
  const openLibrary = async () => {
    setLoading(true);
    if(media.length >= 8){
      Alert.alert('Max 8 media files');
      setLoading(false);
      return;
    }
    var file = await mediaPicker();
    if(!file){
      setLoading(false);
      return;
    }
    setMedia(prev => [...prev, file as Asset]);
    setLoading(false);
  }
  //uploads all uri's in media to s3 and returns new s3 filepaths 
  const handleUploadFilepaths = async () => {
    try{
      const newPaths = await Promise.all(
        media.map(async (item, index) => {
          const uri = await getMediaURI(item, 
            `public/chatPictures/${chatID}/${Date.now()}_${index}`);
          return uri;
        })
      )
      return newPaths.filter((path) => path !== null);
    } catch {
      Alert.alert('Error', 'There was an issue uploading the media');
    }
  }
  const removeMedia = (item: Asset) => {
    setMedia(media.filter((file) => file.uri !== item.uri));
  }
  const openCamera = () => {
    Alert.alert('not implemented yet');
  }

  const openMedia = (url: string | null) => {
    setMediaModalUrl(url);
    setMediaModalVisible(true);
  }

  //Msg and container styles based on Sent or Recieved
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
      {/* page header section */}
      <View style={styles.messageHeaderContainer}>
        <Icon style={{alignSelf: 'center', marginRight: 10}} name='arrow-back-outline' 
          size={25} onPress={() => navigation.goBack()}
        />
        <View style={[styles.URLSection, {padding: 0}]}>
          {chat && chat.url ? (
            <ImgComponent uri={chat.url} style={styles.chatHeaderIcon}/>
          ) : displayURLs.length > 1 ? (
            displayURLs.slice(0, 2).map((uri, index) => (
              <ImgComponent key={index} uri={uri || 'defaultUser'} 
                style={{ position: 'absolute', height: 26, width: 26, borderRadius: 13,
                  top: index * 10, left: index * 10 + 5, 
                  zIndex: displayURLs.length - index,
                }} 
              />
            ))
          ) : (
            <ImgComponent uri={displayURLs[0] || 'defaultUser'} 
              style={styles.chatImageDefault} 
            />
          )}
        </View>
        <Text style={styles.chatRoomName} numberOfLines={1}>{title}</Text>
        <Icon style={{alignSelf:'center'}} name='ellipsis-horizontal' size={25} 
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Flatlist for Messages */}
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle = {{paddingVertical: 5}}
        renderItem={({ item, index }) => {
          const currTime = moment(item.createdAt);
          const prevItem = index < messages.length - 1 ? messages[index + 1] : null;
          const prevTime = prevItem ? moment(prevItem.createdAt) : null;
          const shouldShowDate = !prevTime || !currTime.isSame(prevTime, 'day');
          if(item.type === 'System') return(
            <View><Text style={styles.systemMessage}>{item?.content}</Text></View>
          )
          if(blockList && blockList.includes(item.senderID)) return (
            <View style={styles.otherMessageContainer}>
              <ImgComponent uri={'defaultUser'} style={styles.msgIcon}/>
              <Text style={styles.redacted}>Hidden</Text>
            </View>
          )
          return (
            <View>
              {shouldShowDate && (
                <Text style={{ textAlign: 'center' }}>
                  {currTime.format('MMM D, YYYY')}
                </Text>
              )}

              <View style={getMsgContainerStyle(item.senderID)}>
                {item.senderID !== currUser.id && 
                  <ImgComponent uri={item.sender?.profileURL|| 'defaultUser'}
                    style={styles.msgIcon}
                  />
                }

                {/* Flatlist to display media in messages */}
                {item.msgURL && item.msgURL.length > 0 &&
                  <FlatList
                    data={item.msgURL}
                    numColumns={3}
                    keyExtractor={(_, index) => index.toString()}
                    style={{
                      marginLeft: item.senderID === currUser.id ? 'auto' : 5,
                      marginRight: item.senderID === currUser.id ? 5 : 'auto'
                    }}
                    renderItem={({ item }) => (
                      item?.endsWith('.mp4') ? (
                        <TouchableOpacity onPress={() => openMedia(item)}>
                          <Video source={{ uri: item }} resizeMode="cover"
                            style={{ width: 90, height: 90, margin: 2}}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => openMedia(item)}>
                          <ImgComponent uri={item || 'defaultUser'} resizeMode='cover'
                            style={{height: 90, width: 90, margin: 2}}
                          />
                        </TouchableOpacity>
                      )

                    )}
                  />
                }

                {item.content && 
                  <View style={getMsgStyle(item.senderID)}>
                    <Text>{item.content}</Text>
                  </View>
                }
                {item.senderID === currUser.id && 
                  <ImgComponent uri={currUser.profileURL} style={styles.msgIcon}/>
                }
              </View>

            </View>
          )
        }}
        onEndReached={ () => {
          if(nextToken) fetchMoreChat();
        }}
        onEndReachedThreshold={0.4}
        inverted
      />

      {/* Keyboard/TextInput section */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.addCommentSection, {paddingBottom: 0}]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}
      > 
        {/* Flatlist for image/video icons */}
        {media.length > 0 && 
          <FlatList
            data={media}
            keyExtractor={(_, index) => index.toString()}
            style={{marginBottom: 10}}
            horizontal
            renderItem={({ item }) => (
              <View style={{alignSelf: 'center'}}>
                {item.fileName?.endsWith('.mp4') ? (
                  <Video source={{ uri: item.uri }} style={{width: 90, height: 90}}
                    resizeMode="contain"
                  />
                ) : (
                  <ImgComponent uri={item.uri || 'defaultUser'} 
                    style={{width: 90, height: 90}} resizeMode={'cover'}
                  />
                )}
                <Icon name="remove-circle-outline" size={20} style={styles.removeIcon}
                  onPress={() => removeMedia(item)}
                />
              </View>
            )}
          />
        }
        <View style={{flexDirection: 'row', paddingBottom: Platform.OS === 'ios' ? 30 : 0}}>
          {iconsVisible ? (
            <View style={{flexDirection: 'row'}}>
              <Icon name="remove-circle" style={{marginRight: 5, alignSelf: 'center'}} 
                size={25} onPress={() => setIconsVisible(false)}
              />
              <Icon name="camera-outline" style={{marginRight: 5}} size={30}
                onPress={openCamera}
              />
              <Icon name="image-outline" style={{marginRight: 5}} size={30}
                onPress={openLibrary}
              />
            </View>
          ) : (
            <Icon name="add-circle" size={25} onPress={() => setIconsVisible(true)}
              style={{marginRight: 5, marginBottom: 10, alignSelf: 'center'}} 
            />
          )}
          <TextInput
            style={styles.commentInput}
            placeholder={'Type a message'}
            value={currMessage}
            autoCapitalize='sentences'
            onChangeText={(text) => setMessage(text)}
            onFocus={() => setIconsVisible(false)}
          />
          <Icon style={styles.commentButton} onPress={sendMessage} name="send" size={30}/>
        </View>
      </KeyboardAvoidingView>

      {/* ChatRoom Options Modal */}
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

      {/* Invite User Modal */}
      <Modal 
        transparent={true} 
        visible={inviteModalVisible} 
        onRequestClose={() => setInviteModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.searchModalOverlay}>
          <TouchableOpacity style={styles.searchModalSpacer} 
            onPress={() => setInviteModalVisible(false)}
          />
          <View style={styles.searchModalHeader}>
            <TouchableOpacity style={styles.closeSearchButton}
              onPress={() => setInviteModalVisible(false)} 
            >
              <Text style={styles.closeSearchButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} 
              remove={[...addedMembers, ...participants.map(item => item.user)]}
            />
            <View style={{marginTop: 'auto'}}>
              <FlatList
                ref={inviteFlatListRef}
                data={addedMembers}
                horizontal
                renderItem={({item}) => {
                  return (
                    <View>
                      <Icon name="remove-circle-outline" style={styles.removeIcon} 
                        onPress={() => removeMember(item)} size={25} 
                      />
                      <ImgComponent style={styles.addedUserImg} 
                        uri={item.profileURL || 'defaultUser'}
                      />
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

      {/* View Media Modal */}
      <Modal 
        transparent={true} 
        visible={mediaModalVisible} 
        onRequestClose={() => setMediaModalVisible(false)}  
      >
        <View style={styles.imageOverlay}>
          <View style={styles.imageModalContainer}>
            <Icon name="close-outline" size={25} style={styles.closeImageModal}
              onPress={() => setMediaModalVisible(false)}
            />
            {mediaModalUrl?.endsWith('.mp4') ? (
              <Video source={{ uri: mediaModalUrl }} resizeMode="contain"/>
            ) : (
              <ImgComponent uri={mediaModalUrl || 'defaultGroup'} resizeMode='contain'
                style={{height: '100%', width: '100%'}}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ViewChat;