import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Keyboard,
  ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
  
import client from '../client';
import { listGroups, groupsByMemberCount } from '../customGraphql/customQueries';
import { Group, User, ModelSortDirection } from '../API';

import styles from '../styles/Styles';
import SearchBar from '../components/SearchBar';
import ProfilePicture from '../components/ImgComponent';
import FormatExploreGroup from '../components/FormatExploreGroup';

const Search = ( {navigation} : any) => {
  const [searchTerm, setSearchTerm] = useState('Users');
  const [selected, setSelected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exploreGroups, setExplore] = useState<Group[]>([]);

  // useEffect(() => {
  //   fetchExplorer();
  // }, []);

  // const fetchExplorer = async () => {
  //   try{
  //     const data = await client.graphql({
  //       query: groupsByMemberCount,
  //       variables: {
  //         creatdAt
  //         limit: 10,
  //         sortDirection: ModelSortDirection.DESC,
  //         filter: {isPublic: {eq: true}}
  //       },
  //       authMode:'userPool'
  //     })
  //     setExplore(data.data.groupsByMemberCount.items);
  //     console.log('fetched explore groups', data.data.groupsByMemberCount.items) 
  //   }catch(error){
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleSelected = ( item : string) => {
    setSearchTerm(item);
    setSelected(true);
  }

  const handleViewUser = ( user: User) => {
    navigation.navigate('ViewProfile', {user: user});
  }

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

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
              var currStyle = styles.searchTermContainer;
              if(item === searchTerm) currStyle = styles.searchTermSelected;
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
            <FormatExploreGroup item={item}/>
          }
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

const GroupSearch = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Group[]>();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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
      setData(groups.data.listGroups.items);
      console.log("fetchedGroups from search")
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = async (query: string) => {
    setSearch(query);

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