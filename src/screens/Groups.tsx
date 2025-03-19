
import { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl
 } from 'react-native';
 
import client from '../client';
import { groupsByUser } from '../graphql/queries';
import { UserGroup, ModelSortDirection } from '../API';

import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';

const Groups = ( {navigation} : any ) => {
  const [group, setGroup] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  const loadGroups = async () => {
    try{
      const cachedData = await AsyncStorage.getItem('groups');
      if(cachedData){
        console.log("loaded cached groups");
        const data = JSON.parse(cachedData);
        setGroup(data);
        setLoading(false);
        return;
      }else{
        await fetchGroups();
      }
    } catch (error) {
      console.log('Error loading cached groups', error);
    }
  }
  
  const fetchGroups = async () => {
    setLoading(true);
    try{
      const groups = await client.graphql({
        query: groupsByUser,
        variables: { 
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC
        },
        authMode: 'userPool'
      });
      const groupData = groups.data.groupsByUser.items;
      console.log("fetched groups data");
      AsyncStorage.setItem('groups', JSON.stringify(groupData));
      setGroup(groupData);
    } catch (error: any) {
      console.error("Error fetching user groups:", error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGroups();
  }, []);

  const onRefresh = useCallback(() => {
    fetchGroups();
  }, []);
  
  const createGroup = () => {
    navigation.navigate('CreateGroup');
  }
  const viewGroup = (item: any) => {
    navigation.navigate('ViewGroup', { groupID: item.group.id });
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
      <FlatList
        data={group}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => viewGroup(item)}>
              <View style={styles.postContainer}>
                <View style={styles.itemContentSection}>
                  <ImgComponent uri={item.group?.groupURL || "defaultGroup"} 
                    style={{height: 40, width: 40, borderRadius: 20}} />
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.postAuthor}>{item.group?.groupName}</Text>
                    <Text style={styles.postDate} numberOfLines={1}>{item.group?.description || "No description"}</Text>
                  </View>
                </View>
                
                <Text style={styles.memberText}>{item.group?.members?.items.length  || 0} members</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <View>
            <Text style={styles.noResultsMsg}>No groups found.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#ffffff" 
          />
        }
      />
      
      <TouchableOpacity onPress={createGroup}>
        <Icon name="add-circle-outline" style={styles.createButton} size={50}/>
      </TouchableOpacity>
    </View>
  );
};

export default Groups;
