import { useState, useContext, useCallback, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator, Dimensions,
  RefreshControl, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import client  from '../../client';
import { chatsByUser } from '../../customGraphql/customQueries';
import { ModelSortDirection, UserChat } from '../../API';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import ImgComponent from '../../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import moment from "moment";

/**
 * Displays all Chatrooms that the user is a part of and component to navigate
 * to CreateChat screen to create a new chatroom.
 */
const MessageUsers = ( {navigation}: any ) => {
  const [ chatRooms, setChatRooms ] = useState<UserChat[]>([])
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const firstRender = useRef(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  const blockList = authContext?.blockList;
  if(!currUser) return;

  useFocusEffect(
    useCallback(() => {
      fetchChatRooms(true);
      if(firstRender.current){
        firstRender.current = false;
      }
    }, [])
  );

  //retreives list of chatrooms that user is a part of
  const fetchChatRooms = async (refresh: boolean) => {
    if(firstRender.current){
      setLoading(true);
    }
    try {
      const getChatRooms = await client.graphql({
        query: chatsByUser,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          limit: 15,
          nextToken: refresh ? null : nextToken
        },
        authMode: 'userPool'
      });
      const chatRoomData = getChatRooms.data.chatsByUser.items;
      if(refresh){ 
        setChatRooms(chatRoomData);
      } else {
        const uniqueChatRooms = chatRoomData.filter((item: UserChat) => 
          !chatRooms.some((userChat: UserChat) => userChat.id === item.id));
        setChatRooms((prev: any) => [...prev, ...uniqueChatRooms]);
      }
      setNextToken(getChatRooms.data.chatsByUser.nextToken);
    } catch {
      Alert.alert('Error', 'Error fetching chat rooms',);
    } finally {
      setLoading(false);
    }
  };

  //Navigates to the ChatRoom page to view the selected Chat
  const handleOpenChatRoom = (chatRoom: UserChat) => {
    navigation.navigate('ViewChat', { chatID: chatRoom.chatID });
  }

  //Navigates to the CreateChat page to create a new Chat
  const handleCreateMsg = () => {
    navigation.navigate('CreateChat', {});
  }

  //helper functions to format date name and display URIs for chatrooms 
  const formatDate = (dateString : string) => {
    const date = moment(dateString);
    const now = moment();
    if (date.isSame(now, 'day')) {
      return date.format('h:mm A');
    } else if (date.isSame(now, 'week')) {
      return date.format('dddd');
    } else {
      return date.format('M/DD/YY');
    }
  };
  const getChatName = (userChat: UserChat) => {
    if(userChat.chat?.name !== 'Chat name') return userChat.chat?.name;
    return userChat.chat?.participants?.items
      .filter((item) => item?.userID !== currUser.id)
      .map((item) => `${item?.user?.firstname} ${item?.user?.lastname}`)
      .filter(Boolean)
      .join(', ');
  }
  const getDisplayURIs = (userChat: UserChat) => {
    return userChat.chat?.participants?.items
      .filter((item) => item?.userID !== currUser.id)
      .map((item) => item?.user?.profileURL)
      .filter(Boolean)
  }

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if(!item.chat) return null;
          const displayURIs = getDisplayURIs(item) || [];
          const chatname = getChatName(item);

          //filters out dm's(1 to 1 chats) with blocked users
          if(item.chat.participants?.items.length === 2){ //guarantees direct chat (not group)
            const otherUser = item.chat.participants.items.find(
              (part) => part && part.userID !== currUser.id
            )
            if(blockList && blockList.includes(otherUser?.user?.id ?? "")){
              return null;
            }
          }

          return (
            <TouchableOpacity onPress={() => handleOpenChatRoom(item)}>
              <View style={(item.unreadMessageCount && item.unreadMessageCount > 0) ? 
                styles.unreadMsgContainer : styles.postContainer}
              > 
                {item.unreadMessageCount && item.unreadMessageCount > 0 ? (
                  <Icon name="ellipse-sharp" color="blue" size={12} 
                    style={styles.unreadMsgdot}
                  />
                ) : ( null )}
                <View style={styles.itemContentSection}>
                  <View style={styles.URLSection}>
                    {item.chat.url ? (
                      <ImgComponent uri={item.chat.url} style={styles.chatImageDefault}/>
                    ) : displayURIs.length > 1 ? (
                      displayURIs.slice(0, 2).map((uri, index) => (
                        <ImgComponent 
                          key={index} 
                          uri={uri || 'defaultUser'} 
                          style={{ 
                            position: 'absolute', height: 30, width: 30, 
                            borderRadius: 25, top: index * 10, left: index * 10, 
                            zIndex: displayURIs.length - index
                          }} 
                        />
                      ))
                    ) : (
                      <ImgComponent style={styles.chatImageDefault} 
                        uri={displayURIs[0] || 'defaultUser'}
                      />
                    )}
                  </View>
                  <View style={{
                    paddingHorizontal: 10, width: Dimensions.get('window').width * 0.70
                  }}>
                    <Text style={[styles.postAuthor, {fontWeight: '500'}]}
                      numberOfLines={1}
                    >
                      {chatname}
                    </Text>
                    <Text style={styles.postContent}numberOfLines={1}>
                      {item.lastMessage}
                    </Text>
                  </View>  
                </View> 
                <Text style={styles.memberText}>{formatDate(item.lastMessageAt)}</Text>
              </View>
            </TouchableOpacity>  
          )
        }}
        ListEmptyComponent={
          <View><Text style={styles.noResultsMsg}>No chat rooms found.</Text></View>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchChatRooms(true)}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#ffffff" 
          />
        }
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if(nextToken) fetchChatRooms(false)
        }}
      />
      <Icon name="add-circle-outline" style={styles.createButton} size={50} 
        onPress={handleCreateMsg}
      />
    </View>
  );
};

export default MessageUsers;
