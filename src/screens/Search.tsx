import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Group, User } from '../API';
import styles from '../styles/Styles';
import SearchBar from '../components/SearchBar';
import { listGroups } from '../graphql/queries';
import ProfilePicture from '../components/ProfilePicture';
import client from '../client';
import filter from 'lodash/filter';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('Users');
  const [selected, setSelected] = useState(true);

  const handleSelected = ( item : string) => {
    setSearchTerm(item);
    setSelected(true);
  }

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const handleViewUser = ( user: User) => {
    navigation.navigate('ViewProfile', {user: user});
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        {searchTerm === 'Users' ? (
          <SearchBar width={'85%'} userPressed={handleViewUser}/>
        ) : searchTerm === 'Groups' ? (
          <GroupSearch />
        ) : null}
        <View>
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
          />
        </View>
      </View>
    </View>
  )
}

const GroupSearch = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Group[]>();
  const [filteredData, setFilteredData] = useState<Group[]>();

  const fetchGroups = async () => {
    try{
      const groups = await client.graphql({
        query: listGroups,
        authMode:'userPool'
      })
      setData(groups.data.listGroups.items);
      AsyncStorage.setItem('groupCache', JSON.stringify(groups.data.listGroups.items));
      console.log("fetchedGroups from search")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const initializeCache = async () => { 
      try{
        const cachedData = await AsyncStorage.getItem('groupCache');
        if(cachedData){
          setData(JSON.parse(cachedData));
        } else {
          fetchGroups();
        }
      } catch (error) {
        console.log(error);
      }
    }
    initializeCache();
  }, []);

  const handleSearch = async (query: string) => {
    setSearch(query);
    if(!query){
      setFilteredData([]);
      return;
    }
    const formattedSearch = query.toLowerCase();
    const results = filter(data, (group) => {
      const name = group.groupName.toLowerCase();
      const id = group.id.toString();
      return name.includes(formattedSearch) || id.includes(formattedSearch);
    });
    setFilteredData(results);
  }

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const handleGroupClick = (item: any) => {
    navigation.navigate('ViewGroup', {groupID: item.id});
  }

  return(
    <View style={{width: '85%'}}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
        placeholder='Search for groups'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchUserContainer}>
            <TouchableOpacity onPress={() => handleGroupClick(item) }>
              <View style={styles.listUserContainer}>
                <ProfilePicture uri={item.groupURL ? item.groupURL : undefined} size={50}/>
                <View style={styles.textContainer}>
                  <Text style={styles.postAuthor}>{item.groupName}</Text>
                  <Text style={styles.postContact}>{item.description}</Text>
                </View>
              </View>
              <Text style={styles.postDate}>{item.members?.items.length} members</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    
  )
}


export default Search;