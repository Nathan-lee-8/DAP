import { useState, useContext, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator
  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import client  from '../client';
import { chatsByUser } from '../graphql/queries';
import { ModelSortDirection, UserChat } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import moment from "moment";

const MessageUsers = ( {navigation} : any) => {
  const [chatRooms, setChatRooms] = useState<UserChat[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  const fetchChatRooms = async () => {
    setLoading(true);
    const currUser = authContext?.currUser;
    if(!currUser) return;
    try {
      const chatRooms = await client.graphql({
        query: chatsByUser,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: 'userPool'
      });
      const chatRoomData = chatRooms.data.chatsByUser.items;
      setChatRooms(chatRoomData);
      console.log('Fetched Chat rooms from Messaging.');
    } catch (error) {
      console.log('Error fetching chat rooms', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChatRooms();
    }, [])
  );

  const handleOpenChatRoom = (chatRoom: UserChat) => {
    navigation.navigate('ChatRoom', { chatID: chatRoom.chatID });
  }

  const handleCreateMsg = () => {
    navigation.navigate('CreateChat', {});
  }

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

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let displayURIs: (string | undefined)[] = [];
          var chatname = item.chat?.participants?.items.filter((item) => item?.userID !== currUser.id)
            .map((item) => {
              displayURIs.push(item?.user?.profileURL || undefined);
              return `${item?.user?.firstname} ${item?.user?.lastname}`
            })
            .filter(Boolean)
            .join(', ');
          if(item?.chat?.name !== 'Chat name') chatname = item?.chat?.name;

          let containerStyle = (item.unreadMessageCount && item.unreadMessageCount > 0) ? 
            styles.unreadMsgContainer : styles.postContainer;

          return (
            <TouchableOpacity onPress={() => handleOpenChatRoom(item)}>
              <View style={containerStyle}> 
                {item.unreadMessageCount && item.unreadMessageCount > 0 ? (
                  <Icon name="ellipse-sharp" color="blue" size={12} style={styles.unreadMsgdot}/>
                ) : ( null )}
                <View style={styles.itemContentSection}>
                  <View style={styles.URLSection}>
                    {item?.chat?.url !== null ? (
                      <ImgComponent 
                        uri={item?.chat?.url || 'defaultUser'} 
                        style={{height: 40, width: 40, borderRadius: 20}} 
                      />
                    ) : displayURIs.length > 1 ? (
                      displayURIs.slice(0, 2).map((uri, index) => (
                        <ImgComponent 
                          key={index} 
                          uri={uri || 'defaultUser'} 
                          style={{ 
                            position: 'absolute', 
                            top: index * 10,
                            left: index * 10 , 
                            zIndex: displayURIs.length - index,   
                            height: 30,
                            width: 30,
                            borderRadius: 25,
                          }} 
                        />
                      ))
                    ) : (
                      <ImgComponent 
                        uri={displayURIs[0] || 'defaultUser'} 
                        style={{height: 40, width: 40, borderRadius: 20}} 
                      />
                    )}
                  </View>
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.postAuthor} numberOfLines={1}>{chatname}</Text>
                    <Text style={styles.postContent} numberOfLines={1}>{item.lastMessage} </Text>
                  </View>  
                </View> 
                  <Text style={styles.memberText}>{formatDate(item.updatedAt)}</Text>
              </View>
            </TouchableOpacity>  
          )
        }}
        ListEmptyComponent={
          <View>
            <Text style={styles.noResultsMsg}>No chat rooms found.</Text>
          </View>
        }
      />
      <TouchableOpacity onPress={handleCreateMsg}>
        <Icon name="add-circle-outline" style={styles.createButton} size={50}/>
      </TouchableOpacity>
    </View>
  );
};

export default MessageUsers;
