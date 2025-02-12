import { useState, useContext, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { chatsByUser } from '../graphql/queries';
import { ModelSortDirection, UserChat } from '../API';
import client  from '../client';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import { GlobalParamList } from '../types/rootStackParamTypes';
import ImgComponent from '../components/ImgComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageUsers = () => {
  const [chatRooms, setChatRooms] = useState<UserChat[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  if(!authContext){
    console.log("Auth context not defined");
    return;
  }
  const currUserId = authContext.userId;

  const loadChatRooms = async () => {
    try{
      const cachedData = await AsyncStorage.getItem('ChatRoomData');
      if(cachedData){
        setChatRooms(JSON.parse(cachedData));
        return;
      }
      await fetchChatRooms();
    } catch (error) {
      console.log(error);
    }finally {
      setLoading( false);
    }
  }

  const fetchChatRooms = async () => {
    setLoading(true);
    const userId = authContext.userId;
    try {
      const chatRooms = await client.graphql({
        query: chatsByUser,
        variables: {
          userID: userId,
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: 'userPool'
      });
      const chatRoomData = chatRooms.data.chatsByUser.items;
      setChatRooms(chatRoomData);
      AsyncStorage.setItem('ChatRoomData', JSON.stringify(chatRoomData));
      console.log('Fetched Chat rooms from Messaging.');
    } catch (error) {
      console.log('Error fetching chat rooms', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadChatRooms();
    }, [])
  );

  //Handles when user wants to message a user: checks if chatroom exists before creating new one
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const handleOpenChatRoom = (chatRoom: UserChat) => {
    navigation.navigate('ChatRoom', { chatID: chatRoom.chatID });
  }

  const handleCreateMsg = () => {
    navigation.navigate('CreateChat', {});
  }

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
      <TouchableOpacity style={[styles.buttonBlack, {marginBottom: 20}]} onPress={handleCreateMsg}>
        <Text style={styles.buttonTextWhite}>Create Chat</Text>
      </TouchableOpacity>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let displayURIs: (string | undefined)[] = [];
          var chatname = item.chat?.participants?.items.filter((item) => item?.userID !== currUserId)
            .map((item) => {
              displayURIs.push(item?.user?.profileURL || undefined);
              return `${item?.user?.firstname} ${item?.user?.lastname}`
            })
            .filter(Boolean)
            .join(', ')
            .slice(0, 30);
          if(item?.chat?.name !== 'default') chatname = item?.chat?.name;

          let containerStyle = (item.unreadMessageCount && item.unreadMessageCount > 0) ? 
            styles.unreadMsgContainer : styles.postContainer;

          return (
            <TouchableOpacity onPress={() => handleOpenChatRoom(item)}>
              <View style={containerStyle}> 
                <View style={styles.itemContentSection}>
                  <View style={styles.URLSection}>
                    {displayURIs.length > 1 ? (
                      displayURIs.slice(0, 2).map((uri, index) => (
                        <ImgComponent 
                          key={index} 
                          uri={uri || 'defaultUser'} 
                          style={{ 
                            position: 'absolute', 
                            top: index * 10,
                            left: index * 10, 
                            zIndex: displayURIs.length - index,   
                            height: 26,
                            width: 26,
                            borderRadius: 13,
                          }} 
                        />
                      ))
                    ) : (
                        <ImgComponent 
                          uri={displayURIs[0] || 'defaultUser'} 
                          style={{height: 30, width: 30, borderRadius: 15}} 
                        />
                    )}
                    
                  </View>
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.postAuthor}>{chatname}</Text>
                    <Text style={styles.postContent}>{item.lastMessage} </Text>
                  </View>  
                </View> 
                <Text style={styles.postDate}>Unread Msgs: {item.unreadMessageCount}</Text>
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
    </View>
  );
};

export default MessageUsers;
