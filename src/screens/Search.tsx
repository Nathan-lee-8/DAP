import { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Keyboard, RefreshControl,
  ActivityIndicator, TouchableWithoutFeedback, 
  Alert} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
  
import client from '../client';
import { listGroups, groupsByMemberCount, groupsByUser } from '../customGraphql/customQueries';
import { Group, User, UserGroup, ModelSortDirection } from '../API';

import styles from '../styles/Styles';
import SearchBar from '../components/SearchBar';
import ProfilePicture from '../components/ImgComponent';
import FormatExploreGroup from '../components/FormatExploreGroup';
import { AuthContext } from '../context/AuthContext';

/**
 * Search Page that contains a search bar that allows searching for users or groups. 
 * Toggle dropdown menu to switch between users and groups.
 * Displays a list of users or groups based on the search term and selected option.
 * Allows users to navigate to the profile or group page by tapping on the respective item.
 * Displays an explore that shows most popular groups that user is not a part of.
 */
const Search = ( {navigation} : any ) => {
  const [ searchTerm, setSearchTerm ] = useState('Users');
  const [ selected, setSelected ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ exploreGroups, setExplore ] = useState<Group[]>([]);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  useEffect(() => {
    fetchExplorer();
  }, []);

  //Retreives groups by popularity and retreives all current user's groups 
  //and filters out groups the user is in. Displays in explore section.
  const fetchExplorer = async () => {
    try{
      const data = await client.graphql({
        query: groupsByMemberCount,
        variables: {
          type: "Public",
          limit: 10,
          sortDirection: ModelSortDirection.DESC
        },
        authMode:'userPool'
      })
      const allGroups = data.data.groupsByMemberCount.items;
      
      const groups = await client.graphql({
        query: groupsByUser,
        variables: { 
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC
        },
        authMode: 'userPool'
      });

      const myGroupData = groups.data.groupsByUser.items;
      const myGroupIDs = myGroupData.map((item: UserGroup) => item.group?.id);
      
      const filteredData = allGroups.filter((item) => !myGroupIDs.includes(item.id));
      setExplore(filteredData);
    } catch {
      Alert.alert('Error', 'Error fetching groups')
    } finally {
      setLoading(false);
    }
  }

  //handles the dropdown to swap between user and group search
  const handleSelected = ( item : string) => {
    setSearchTerm(item);
    setSelected(true);
  }

  //Navigates to group or User if pressed in search list
  const handleViewUser = ( user: User) => {
    navigation.navigate('ViewProfile', {userID: user.id});
  }
  const handleViewGroup = (groupID: string) => {
    navigation.navigate('ViewGroup', {groupID: groupID});

  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        {searchTerm === 'Users' ? (
          <SearchBar width={'85%'} userPressed={handleViewUser}/>
        ) : searchTerm === 'Groups' ? (
          <GroupSearch />
        ) : null}
        <View style={styles.searchTermList}>
          <TouchableOpacity style={styles.searchTermContainer} onPress={() => setSelected(!selected)}>
            <Text style={{textAlign: 'center'}}>{searchTerm}</Text>
          </TouchableOpacity>
          <FlatList
            data={['Users', 'Groups']}
            renderItem={({ item }) => {
              if(selected) return null;
              var currStyle = (item === searchTerm) ? 
                styles.searchTermSelected : styles.searchTermContainer;
              return(
                <TouchableOpacity style={currStyle} onPress={() => handleSelected(item)}>
                  <Text style={{textAlign: 'center'}}>{item}</Text>
                </TouchableOpacity>
            )}}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={exploreGroups}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => handleViewGroup(item.id)} >
              <FormatExploreGroup item={item}/>
            </TouchableOpacity> 
          }
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchExplorer}
              colors={['#9Bd35A', '#689F38']}
              progressBackgroundColor="#ffffff" 
            />
          }
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

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
            groupName: {contains: query}
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
        style={[styles.searchInput,{ width: '85%'}]}
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
                  <Text style={styles.postAuthor} numberOfLines={1}>{item.groupName}</Text>
                  <Text style={styles.postContent} numberOfLines={1}>{item.description}</Text>
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

export default Search;