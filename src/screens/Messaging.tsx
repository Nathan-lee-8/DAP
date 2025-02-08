import { useState, useContext, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { chatsByUser } from '../graphql/queries';
import { ModelSortDirection, UserChat } from '../API';
import client  from '../client';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import SearchBar from '../components/SearchBar';
import { User } from '../API';
import ProfilePicture from '../components/ImgComponent';
import { GlobalParamList } from '../types/rootStackParamTypes';
import Icon from '@react-native-vector-icons/ionicons';

const MessageUsers = () => {
  const [chatRooms, setChatRooms] = useState<UserChat[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  if(!authContext){
    console.log("Auth context not defined");
    return;
  }
  const currUserId = authContext.userId;

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

  //Handles when user wants to message a user: checks if chatroom exists before creating new one
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

  const handleSendMessage = (user: User) => {
    for (const chatRoom of chatRooms) {
      const participants = chatRoom.chat?.participants?.items;
      if(participants && participants[0] && participants[1] && 
        (participants[0].user?.owner === user.owner || participants[1].user?.owner === user.owner)){
        navigation.navigate('ChatRoom', { chatID: chatRoom.chatID });
        return;
      }
      
    };
    navigation.navigate('CreateChat', { user: user});
  };

  const handleOpenChatRoom = (chatRoom: UserChat) => {
    navigation.navigate('ChatRoom', { chatID: chatRoom.chatID });
  }

  const handleCreateMsg = () => {
    Alert.alert("not implemented yet");
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
      <SearchBar userPressed={handleSendMessage}/>
      <TouchableOpacity style={[styles.buttonBlack, {marginBottom: 20}]} onPress={handleCreateMsg}>
        <Text style={styles.buttonTextWhite}>Create Chat</Text>
      </TouchableOpacity>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let chatname = "";
          let displayURI = undefined;
          if(item?.chat?.isGroup){
              chatname = item.chat.name;
          }else{
            const participants = item.chat?.participants?.items;
            if(participants && participants[0] && participants[1]){
              var part;
              if(participants[0].user?.id === currUserId){
                part = participants[1].user;
              }else{
                part = participants[0].user;
              }
              chatname = part?.firstname + " " + part?.lastname;
              displayURI = part?.profileURL || undefined;
            }
          }
          let containerStyle = styles.postContainer;
          if(item.unreadMessageCount && item.unreadMessageCount > 0){
            containerStyle = styles.unreadMsgContainer;
          }

          return (
            <TouchableOpacity onPress={() => handleOpenChatRoom(item)}>
              <View style={containerStyle}> 
                <View style={styles.profileSection}>
                  <ProfilePicture uri={displayURI ? displayURI : 'defaultUser'}/>
                  <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{chatname}</Text>
                    <Text style={styles.postContact}> {item.lastMessage} </Text>
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
