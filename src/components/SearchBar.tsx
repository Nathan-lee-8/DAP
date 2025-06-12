import { useState, useContext, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Alert } from 'react-native';

import client from '../client';
import { listUsers } from '../customGraphql/customQueries';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import ProfilePicture from './ImgComponent';

/**
 * 
 * @param userPressed - dynamic function to handle what to do when user is Pressed:
 *  returns the user object to the parent component
 * @param width - Custom width of the search bar
 * @param remove - Array of Users to exclude from the search 
 * @returns 
 */
const SearchBar = ( {userPressed, width, remove} : 
  {userPressed?: any, width?: any, remove?: any} ) => {

  const [ search, setSearch ] = useState<string>('');
  const [ data, setData ] = useState<User[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  //Fetch users that have a matching email or matching name to the search sequence
  //and merge and display the matching users while filtering out 'remove' users
  const fetchUsers = async (search: string) => {
    try{
      const usersByEmail = await client.graphql({
        query: listUsers,
        variables: { 
          limit: 10,
          filter: {
            email: {contains: search.toLowerCase()}
          }
         },
        authMode: 'userPool'
      });
      const usersByName = await client.graphql({
        query: listUsers,
        variables: { 
          limit: 10,
          filter: {
            fullname: {contains: search.toLowerCase()}
          }
         },
        authMode: 'userPool'
      });
      const userData = [...usersByEmail.data.listUsers.items, ...usersByName.data.listUsers.items];
      const uniqueUserData = Array.from(new Map(userData.map(user => [user.id, user])).values());
      var filteredData = uniqueUserData.filter((user) => {
        if(user.id === currUser.id) return false;
        if(remove && remove.some((removedUser: User) => removedUser.id === user.id)) return false;
        return true;
      });
      setData(filteredData);
    } catch {
      Alert.alert('Error', 'Could not find users');
    }
  };
  
  //reduce fetch calls to search by creating a debounce after user keyboard input
  const handleSearch = async ( query: string ) => {
    setSearch(query);
    if(query === '') {
      setData([]);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchUsers(query);
    }, 500); 
  };

  //Returns the user Object to parent component
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