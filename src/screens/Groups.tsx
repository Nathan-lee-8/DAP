
import { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import styles from '../styles/Styles';
import client from '../client';
import { AuthContext } from '../context/AuthContext';
import { groupsByUser } from '../graphql/queries';
import { UserGroup } from '../API';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

const Groups = () => {
  const [group, setGroup] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userId } = authContext;

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
        variables: { userID: userId },
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
  
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
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
          var groupURL = item.group?.groupURL ? item.group?.groupURL : undefined;
          var members = item.group?.members?.items.length;
          var description = item.group?.description ? item.group?.description : "No description";
          return (
            <TouchableOpacity onPress={() => viewGroup(item)}>
              <View style={styles.postContainer}>
                <View style={styles.itemContentSection}>
                  <ImgComponent uri={groupURL ? groupURL : "defaultGroup"} 
                    style={{height: 40, width: 40, borderRadius: 20}} />
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.postAuthor}>{item.group?.groupName}</Text>
                    <Text style={styles.postDate} numberOfLines={1}>{description}</Text>
                  </View>
                </View>
                
                <Text style={styles.memberText}>{members} members</Text>
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
