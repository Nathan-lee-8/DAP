import { useEffect, useState, useRef, useContext, useLayoutEffect, useCallback
 } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, 
    KeyboardAvoidingView, Platform, Alert, AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { getChat } from '../graphql/queries';
import { createMessage, updateUserChat } from '../graphql/mutations';
import { onCreateMessage } from '../graphql/subscriptions';
import  { Message, UserChat, Chat } from '../API';
import styles from '../styles/Styles';
import client from '../client';
import Icon from '@react-native-vector-icons/ionicons';
import ImgComponent from '../components/ImgComponent';
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

  const flatListRef = useRef<FlatList<Message>>(null);
  const msgCountRef = useRef<number>(0);
  const msgSentRef = useRef<boolean>(false);
  const lastMsgRef = useRef(messages[0]);

  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  //Updates last message anytime messages changes
  useEffect(() => {
    lastMsgRef.current = messages[0];
  }, [messages]);

  //update title anytime participants changes
  useEffect( () => {
    var temptitle = participants.map((item) => 
      `${item.user?.firstname} ${item.user?.lastname}`).filter(Boolean).join(', ');
    setTitle(temptitle);
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
            lastMsgRef.current = newMessage;
            return [newMessage, ...prev];
          });
          scrollToBottom();
        },
        error: (err: any) => console.error("Subscription error:", err),
      });
      return () => subscription.unsubscribe();
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
      console.log("chat fetched from chatroom");
      if(chatData?.messages){
        setMessages(
          chatData.messages.items.filter((item): item is Message => item !== null)
        )
      }
      let parts = chatData?.participants?.items.filter(item => item !== null);
      if(parts){
        let URLs: (string | undefined)[] = [];
        setParticipants(parts.filter((item): item is UserChat => {
          if(item?.userID !== currUser.id){ 
            URLs.push(item?.user?.profileURL || undefined)
          }
          return item?.userID !== currUser?.id;
        }));
        setURLs(URLs);
        setMyUserChat(parts.find((item): item is UserChat => item?.userID === currUser.id));
      }
      setNextToken(chatData?.messages?.nextToken);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleGoBack} >
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
      )
    })
  })

  const handleGoBack = async () => {
    try{
      if(myUserChat){
        const myUnread = myUserChat?.unreadMessageCount || 0;
        const msgChanged = messages[0].content !== myUserChat.lastMessage;
        if(myUnread === 0 && !msgChanged) {
            return;
        };
        await client.graphql({
          query: updateUserChat,
          variables: {
            input: {
              id: myUserChat?.id,
              lastMessage: messages[0].content, 
              lastMessageAt: messages[0].createdAt,
              unreadMessageCount: 0,
            },
          },
          authMode: 'userPool'
        });
        console.log('updated my chat');
      }

      if(msgSentRef.current){
        for(const part of participants){
          const numUnread = part?.unreadMessageCount || 0;
          await client.graphql({
            query: updateUserChat,
            variables: {
              input: {
                id: part.id,
                lastMessage: lastMsgRef.current.content,
                lastMessageAt: lastMsgRef.current.createdAt,
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
    if(currMessage === '' || !myUserChat ) return;
    try {
      await client.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: currUser.id,
            content: currMessage,
            chatID: myUserChat.chatID,
          },
        },
        authMode: 'userPool'
      });
      setMessage('');
      msgCountRef.current = msgCountRef.current + 1;
      msgSentRef.current = true;
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

  const handleViewMembers = () => {
    if(!myUserChat){
      Alert.alert("Error", 'unknown error');
      return;
    }
    navigation.navigate('ViewChatMembers', 
      {chatData: chat, userChats: [myUserChat, ...participants]});
  }

  const getMsgStyle = (id: string) => {
    if(id === currUser.id) return styles.myMessage;
    return styles.otherMessage;
  }

  const getMsgContainerStyle = (id: string) => {
    if(id === currUser.id) return styles.myMessageContainer;
    return styles.otherMessageContainer;
  }
  
  const getUserURL = (userID: string) => {
    const uri = participants.find((part) => part.userID === userID);
    return uri?.user?.profileURL || 'defaultUser';
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.messageHeaderContainer}
        onPress={handleViewMembers}
      >        
        <View style={styles.URLSection}>
          {displayURLs.length > 1 ? (
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
            )
          }
        </View>
        <Text style={styles.chatRoomName} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
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
          return (
            <View>
              {shouldShowDate && (
                <Text style={{ textAlign: 'center' }}>
                  {currTime.format('MMM D, YYYY')}
                </Text>
              )}
              <View style={getMsgContainerStyle(item?.senderID)}>
                {item?.senderID !== currUser.id && 
                  <ImgComponent uri={getUserURL(item?.senderID)}/>
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
        style={styles.addCommentSection}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      > 
        <TextInput
          style={styles.commentInput}
          placeholder={'Type a message'}
          value={currMessage}
          autoCapitalize='sentences'
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.commentButton} onPress={sendMessage} >
          <Icon name="send" size={30} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatRoom;