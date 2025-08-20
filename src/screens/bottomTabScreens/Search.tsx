import { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, RefreshControl, Alert,
  ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
  
import client from '../../client';
import {  groupsByMemberCount, groupsByUser } from '../../customGraphql/customQueries';
import { Group, User, UserGroup, ModelSortDirection } from '../../API';

import styles from '../../styles/Styles';
import { SearchBar, GroupSearch } from '../../components/SearchBar';
import FormatExploreGroup from '../../components/FormatExploreGroup';
import { AuthContext } from '../../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Search Page that contains a search bar that allows searching for users or groups. 
 * Toggle dropdown menu to switch between users and groups. Displays a list of users 
 * or groups based on the search term and selected option. Allows users to navigate to
 * the profile or group page by tapping on the respective item. Explore section below
 * search bar that shows most popular groups that user is not a part of.
 */
const Search = ( {navigation} : any ) => {
  const [ searchTerm, setSearchTerm ] = useState('Users');
  const [ selected, setSelected ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ exploreGroups, setExplore ] = useState<Group[]>([]);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
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
          limit: 20,
          sortDirection: ModelSortDirection.DESC
        },
        authMode:'userPool'
      })
      const allGroups = data.data.groupsByMemberCount.items;
      setNextToken(data.data.groupsByMemberCount.nextToken);
      
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

  const fetchNextPage = () => {
    client.graphql({
      query: groupsByMemberCount,
      variables: {
        type: "Public",
        limit: 20,
        sortDirection: ModelSortDirection.DESC,
        nextToken: nextToken
      },
      authMode:'userPool'
    }).then((data) => {
      const newGroups = data.data.groupsByMemberCount.items
        .filter((group) => !exploreGroups.some((item) => item.id === group.id));
      setExplore((prev: Group[]) => [...prev, ...newGroups]);
      setNextToken(data.data.groupsByMemberCount.nextToken);
    })
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
      <View style={styles.shortHeader}/>
      <View style={{flexDirection:'row'}}>
        {searchTerm === 'Users' ? (
          <SearchBar width={'80%'} userPressed={handleViewUser}/>
        ) : searchTerm === 'Groups' ? (
          <GroupSearch />
        ) : null}
        <View style={styles.searchTermList}>
          <TouchableOpacity style={styles.searchTermContainer} 
            onPress={() => setSelected(!selected)}
          >
            <Text style={{marginHorizontal: 5}}>{searchTerm}</Text>
            <Icon name={selected ? 'chevron-down' : 'chevron-up'} size={15} />
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
              <FormatExploreGroup group={item}/>
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
          onEndReached={() => {
            if(nextToken) fetchNextPage()
          }}
          onEndReachedThreshold={0.3}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Search;