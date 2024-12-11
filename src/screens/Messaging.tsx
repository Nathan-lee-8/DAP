import { useEffect, useState, useContext } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Button,
  Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash/filter';
import { listUsers, chatsByUser } from '../graphql/queries';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import { ModelSortDirection, UserChat, User } from '../API';
import client  from '../client';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';

const MessageUsers = () => {
  const [search, setSearch] = useState<string | any>('');
  const [data, setData] = useState<User[]>([]);
  const [chatRooms, setChatRooms] = useState<UserChat[]>([])
  const [filteredData, setFilteredData] = useState<User[]>([]);
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
  
  //Fetches users to populate the Search bar
  const fetchUsers = async () => {
    try{
      const users = await client.graphql({
        query: listUsers,
        variables: { limit: 100 },
        authMode: 'userPool'
      });
      const userData = users.data.listUsers.items;
      setData(userData);
      await AsyncStorage.setItem('usersCache', JSON.stringify({userData: userData}));
      console.log('Fetched & cached from fetchusers.');
    } catch (error) {
      console.log('Error fetching users', error);
    }
  };

  //On page load: check if cache contains users and loads from cache. 
  //If not, calls fetch users.
  useEffect(() => {
    const initializeCache = async () => {
      setLoading(true);
      try {
        const cachedData = await AsyncStorage.getItem('usersCache');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData).userData;
          setData(parsedData);
        } else {
          await fetchUsers();
        }
        const cachedChatRooms = await AsyncStorage.getItem('chatRoomsCache');
        if(cachedChatRooms){
          const parsedChatRooms = JSON.parse(cachedChatRooms).chatRoomData;
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

  //Handles querying functionality for the search bar. Filters users by search text.
  const handleSearch = async (query: string) => {
    setSearch(query);
    if(!query){
      setFilteredData([]);
      return;
    }
    const formattedSearch = query.toLowerCase();
    const results = filter(data, (user) => {
      if(user.id === currUserId){
        return false;
      }
      return user.firstname && user.firstname.toLowerCase().includes(formattedSearch) || 
        user.email.toLowerCase().includes(formattedSearch)
    });
    setFilteredData(results);
  };

  //Handles when user wants to message a user: checks if chatroom exists before creating new one
  const navigation = useNavigation<NativeStackNavigationProp<MessagingStackParamList, 'ChatRoom'>>();
  const handleSendMessage = (user: User) => {
    for (const chatRoom of chatRooms) {
      const participants = chatRoom.chat?.participants?.items;
      if(participants && participants[0] && participants[1]){
        if(participants[0].user?.id === user.id || participants[1].user?.id === user.id){
          handleOpenChatRoom(chatRoom);
          console.log('Chatroom already exists');
          return;
        }
      }
    };
    //Add fucntiaonlity to check if chatroom exists before creating a chat
    navigation.navigate('CreateChat', { user: user});
    return(<View> Loading</View>);
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
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
        placeholder="Search for users..."
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
      />
      {search.length > 0 && (
        <FlatList
        data={filteredData}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.listUserContainer}>
            <Image style={styles.avatar} source={{}}/>
            <View>
              <Text style={styles.textName}>{item.firstname} {item.lastname} </Text>
              <Text style={styles.textEmail}>{item.email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleSendMessage(item)}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
        />
      )}
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let chatname = "";
          if(item.chat) chatname = item.chat.name;
          return (
          <View>
            <Image style={styles.avatar} source={{}}/>
            <View>
              <Text>{chatname}</Text>
              <Text>{item.createdAt}</Text>
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
