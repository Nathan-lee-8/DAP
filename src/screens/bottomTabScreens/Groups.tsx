
import { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl, Alert
 } from 'react-native';
 
import client from '../../client';
import { groupsByUser } from '../../customGraphql/customQueries';
import { UserGroup, ModelSortDirection } from '../../API';

import { AuthContext } from '../../context/AuthContext';
import ImgComponent from '../../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../../styles/Styles';

/**
 * Displays list of groups that the current user is a part of and displays
 * component to navigate to CreateGroup screen
 */
const Groups = ( {navigation} : any ) => {
  const [group, setGroup] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  useEffect(() => {
    fetchGroups();
  }, []);

  const onRefresh = useCallback(() => {
    fetchGroups();
  }, []);

  //Retreives current groups user is a part of 
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
      setGroup(groupData);
    } catch {
      Alert.alert('Error', 'Failed to get groups');
    } finally{
      setLoading(false);
    }
  }

  const createGroup = () => {
    navigation.navigate('CreateGroup');
  }

  const viewGroup = (item: any) => {
    navigation.navigate('ViewGroup', { groupID: item.group.id });
  }

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />

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
                    <Text style={[styles.postAuthor, {fontWeight: '500'}]}>{item.group?.groupName}</Text>
                    <Text style={styles.postDate} numberOfLines={1}>
                      {item.group?.description || "No description"}
                    </Text>
                  </View>
                </View>
                <Text style={styles.memberText}>
                  {item.group?.memberCount || 0} members
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <View><Text style={styles.noResultsMsg}>No groups found.</Text></View>
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
      <Icon name="add-circle-outline" style={styles.createButton} size={50} 
        onPress={createGroup}
      />
    </View>
  );
};

export default Groups;
