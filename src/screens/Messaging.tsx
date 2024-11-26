import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity,
   Text, Image, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listUsers } from '../graphql/queries';
import client  from '../client';
import filter from 'lodash/filter';

interface User {
  id: string,
  email: string,
  firstname?: string | null,
  lastname?: string | null,
  avatarUrl?: string,
  phonenumber?: string | null,
  createdAt: string,
  updatedAt: string,
}

/**
 * TODO: Load page feed with current users messages. 
 *       Populate search with users. 
 */
const MessageUsers = () => {
  const [search, setSearch] = useState<string | any>('');
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try{
      const users = await client.graphql({
        query: listUsers,
        variables: { limit: 100 },
      });
      const userData = users.data.listUsers.items;
      setData(userData);
      await AsyncStorage.setItem('usersCache', JSON.stringify({userData: userData}));
      console.log('Fetched & cached from fetchusers.');
    } catch (error) {
      console.log('Error fetching users', error);
    }
  };

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
      } catch (error) {
        console.log('Error initializing cache', error);
      } finally {
        setLoading(false);
      }
    };
    initializeCache();
  }, []);

  const handleSearch = async (query: string) => {
    setSearch(query);
    if(!query){
      setFilteredData([]);
      return;
    }
    const formattedSearch = query.toLowerCase();
    const results = filter(data, (user) => 
      (user.firstname && user.firstname.toLowerCase().includes(formattedSearch)) || 
      user.email.toLowerCase().includes(formattedSearch)
    );
    setFilteredData(results);
  };

  const handleSendMessage = (user: User) => {
    console.log(`Sending message to ${user.firstname} ${user.lastname}`);
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
    <View style={styles.searchBar}>
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
          <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  textEmail: {
    fontSize: 13,
    color: '#666',
    marginLeft: 10,
  },
  button: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 5,
    marginLeft: 'auto',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});

export default MessageUsers;
