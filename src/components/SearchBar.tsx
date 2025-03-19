import { useState, useContext, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';

import client from '../client';
import { listUsers } from '../customGraphql/customQueries';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import ProfilePicture from './ImgComponent';
import filter from 'lodash/filter';

const SearchBar = ( { userPressed, width, remove } : {userPressed?:any, width?:any, remove?: any}) => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<User[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const fetchUsers = async ( search: string) => {
    try{
      const users = await client.graphql({
        query: listUsers,
        variables: { 
          limit: 20,
          filter: {
            fullname: {contains: search.toLowerCase()}
          }
         },
        authMode: 'userPool'
      });
      const userData = users.data.listUsers.items;
      console.log('fetched from searchbar')
      setData(userData.filter((item) => item.id !== currUser.id));
      console.log('Fetched & cached from searchbar component.');
    } catch (error) {
      console.log('Error fetching users', error);
    }
  };
  
  const handleSearch = async (query: string) => {
    setSearch(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchUsers(query);
    }, 500); 
    
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
    setData(results);
  };

  const handleOnPress = (user: User) => {
    if(remove) setData([]);
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
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.searchUserContainer}>
            <TouchableOpacity onPress={() => handleOnPress(item)}>
              <View style={styles.listUserContainer}>
                <ProfilePicture uri={item.profileURL}/>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.postAuthor} numberOfLines={1}>{item.firstname} {item.lastname}</Text>
                  <Text style={styles.postContent} numberOfLines={1}>{item.email}</Text>
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