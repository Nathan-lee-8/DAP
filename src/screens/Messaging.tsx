import { useEffect, useState, useContext } from 'react';
import { View, FlatList, TouchableOpacity, Button,
  Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chatsByUser } from '../graphql/queries';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import { ModelSortDirection, UserChat } from '../API';
import client  from '../client';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import SearchBar from '../components/SearchBar';
import { User } from '../API';

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
    try {
      const chatRooms = await client.graphql({
        query: chatsByUser,
        variables: {
          userID: currUserId,
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: 'userPool'
      });
      const chatRoomData = chatRooms.data.chatsByUser.items;
      setChatRooms(chatRoomData);
      console.log('Fetched & cached from fetchChatRooms.', chatRoomData);
      await AsyncStorage.setItem('chatRoomsCache', JSON.stringify({chatRoomData: chatRoomData}));
    } catch (error) {
      console.log('Error fetching chat rooms', error);
    }
  };
  
  //On page load: check if cache contains users and loads from cache. 
  //If not, calls fetch users.
  useEffect(() => {
    const initializeCache = async () => {
      setLoading(true);
      try {
        const cachedData = await AsyncStorage.getItem('chatRoomsCache');
        if(cachedData){
          const parsedChatRooms = JSON.parse(cachedData).chatRoomData;
          setChatRooms(parsedChatRooms);
        } else {
          await fetchChatRooms();
        }
      } catch (error) {
        console.log('Error initializing cache', error);
      } finally {
        setLoading(false);
      }
    };
    initializeCache();
  }, []);

  //Handles when user wants to message a user: checks if chatroom exists before creating new one
  const navigation = useNavigation<NativeStackNavigationProp<MessagingStackParamList, 'ChatRoom'>>();

  const handleSendMessage = (user: User) => {
    for (const chatRoom of chatRooms) {
      const participants = chatRoom.chat?.participantIDs;
      if(participants && participants[0] && participants[1]){
        if(participants[0] === user.owner || participants[1] === user.owner){
          navigation.navigate('ChatRoom', { userChat: chatRoom });
          return;
        }
      }
    };
    navigation.navigate('CreateChat', { user: user});
};

  const handleOpenChatRoom = (chatRoom: UserChat) => {
    navigation.navigate('ChatRoom', { userChat: chatRoom });
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
      <SearchBar screen="messaging" handleSendMessage={handleSendMessage}/>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let chatname = "";
          if(item.chatName) chatname = item.chatName;
          if(item?.chat?.isGroup){
              chatname = item.chat.name;
          }
          return (
            <View>
              <Image style={styles.avatar} source={{}}/>
              <View>
                <Text>{chatname}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => handleOpenChatRoom(item)}>
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>            
            </View>
        )}}
      />
      <Button title="Fetch Chat rooms" onPress={fetchChatRooms}/>
    </View>
  );
};

export default MessageUsers;
