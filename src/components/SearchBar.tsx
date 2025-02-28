import { useEffect, useState, useContext } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash/filter';
import client  from '../client';
import { listUsers } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import { User } from '../API';
import ProfilePicture from './ImgComponent';

const SearchBar = ( { userPressed, width, remove } : {userPressed?:any, width?:any, remove?: any}) => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const fetchUsers = async () => {
    try{
      const users = await client.graphql({
        query: listUsers,
        variables: { limit: 100 },
        authMode: 'userPool'
      });
      const userData = users.data.listUsers.items;
      setData(userData);
      await AsyncStorage.setItem('usersCache', JSON.stringify(userData));
      console.log('Fetched & cached from searchbar component.');
    } catch (error) {
      console.log('Error fetching users', error);
    }
  };
  useEffect(() => {
    const initializeCache = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('usersCache');
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          fetchUsers();
        }
      } catch (error) {
        console.log('Error initializing cache', error);
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
    const results = filter(data, (user) => {
      if(!user.id || user.id === currUser.id){
        return false;
      }
      if(remove && remove.some((removedUser: User) => removedUser.id === user.id)) return false;
      const name = user.firstname + " " + user.lastname;
      return name.toLowerCase().includes(formattedSearch) || 
        user.email.toLowerCase().includes(formattedSearch)
    });
    setFilteredData(results);
  };
  
  const resetCache = async () => {
    await AsyncStorage.removeItem('usersCache');
    fetchUsers();
  }

  const handleOnPress = (user: User) => {
    if(remove) setFilteredData(filteredData.filter((item) => item !== user));
    if(userPressed) userPressed(user);
  }

  return (
    <View style={{width: '100%'}}>
      <TextInput
        style={[styles.searchInput, {width: width}]}
        value={search}
        onChangeText={handleSearch}
        placeholder="Search for users..."
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.searchUserContainer}>
            <TouchableOpacity onPress={() => handleOnPress(item)}>
              <View style={styles.listUserContainer}>
                <ProfilePicture uri={item.profileURL}/>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.postAuthor}>{item.firstname} {item.lastname}</Text>
                  <Text style={styles.postContent}>{item.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

export default SearchBar;