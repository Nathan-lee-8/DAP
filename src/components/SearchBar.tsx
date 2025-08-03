import { useState, useContext, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';

import client from '../client';
import { listUsers, listGroups } from '../customGraphql/customQueries';
import { User, Group } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import ProfilePicture from './ImgComponent';

/**
 * Component to search users based on the search term entered in search bar.
 * 
 * @param userPressed - dynamic function to returns the user object to the parent 
 * component when user is pressed
 * @param width - Custom width of the search bar
 * @param remove - Array of Users to exclude from the search 
 */
const SearchBar = ( {userPressed, width, remove} : 
  {userPressed?: any, width?: any, remove?: any} ) => {

  const [ search, setSearch ] = useState<string>('');
  const [ data, setData ] = useState<User[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const currUser = useContext(AuthContext)?.currUser;
  const blockList = useContext(AuthContext)?.blockList;
  if(!currUser) return;

  //Fetch users that have a matching email or matching name to the search sequence and
  //merge and while filtering out 'remove' and 'blocklist' users
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
      //merge all users that have search term included (filter duplicates)
      const userData = 
        [...usersByEmail.data.listUsers.items, ...usersByName.data.listUsers.items];
      const uniqueUserData = 
        Array.from(new Map(userData.map(user => [user.id, user])).values());

      //Filter out currUser, 'remove' users and 'blocklist' users
      //create a set for faster removal
      var filteredData: User[] = uniqueUserData.filter((user) => {
        if(user.id === currUser.id) return false;
        if(remove && remove.some((removedUser: User) => removedUser.id === user.id)){
           return false;
        }
        if(blockList && blockList.includes(user.id)) return false;
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
                  <Text style={styles.postAuthor} numberOfLines={1}>
                    {item.firstname} {item.lastname}
                  </Text>
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

/**
 * Group seach function that searchs through groups when dropdown is set to groups.
 */
const GroupSearch = () => {
  const [ search, setSearch ] = useState('');
  const [ data, setData ] = useState<Group[]>();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  //retreive all groups that contains query while filtering out hidden grousp
  const fetchGroups = async (query: string) => {
    try{
      const groups = await client.graphql({
        query: listGroups,
        variables: { 
          limit: 10,
          filter: {
            nameLowercase: {contains: query.toLowerCase()}
          }
         },
        authMode: 'userPool'
      });
      setData(groups.data.listGroups.items.filter((item) => item.type !== 'Hidden'));
    } catch {
      Alert.alert('Error', 'Error fetching groups');  
    }
  }

  //sets debounce timeout to manage number of fetch calls 
  const handleSearch = async (query: string) => {
    setSearch(query);
    if(query === '') {
      setData([]);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchGroups(query);
    }, 500); 
  }

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const handleGroupClick = (item: any) => {
    navigation.navigate('ViewGroup', {groupID: item.id});
  }

  return(
    <View style={{width: '100%'}}>
      <TextInput
        style={[styles.searchInput,{ width: '80%'}]}
        value={search}
        onChangeText={handleSearch}
        placeholder='Search for groups'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchUserContainer}>
            <TouchableOpacity onPress={() => handleGroupClick(item) }>
              <View style={styles.listUserContainer}>
                <ProfilePicture uri={item.groupURL ? item.groupURL : 'defaultUser'} />
                <View style={styles.userInfoContainer}>
                  <Text style={styles.postAuthor} numberOfLines={1}>
                    {item.groupName}
                  </Text>
                  <Text style={styles.postContent} numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>
                <Text style={styles.memberText}>{item.memberCount} members</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyboardShouldPersistTaps="always"
      />
    </View>
  )
}

export { SearchBar, GroupSearch };