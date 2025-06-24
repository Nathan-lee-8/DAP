
import { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl,
   Alert } from 'react-native';
 
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
  const [ group, setGroup ] = useState<UserGroup[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  useEffect(() => {
    fetchGroups(true);
  }, []);

  //Retreives current groups user is a part of 
  const fetchGroups = async ( refresh: boolean) => {
    setLoading(true);
    try{
      const groups = await client.graphql({
        query: groupsByUser,
        variables: { 
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          limit: 20,
          nextToken: refresh ? null : nextToken
        },
        authMode: 'userPool'
      });
      const groupData = groups.data.groupsByUser.items;
      if(refresh){ 
        setGroup(groupData);
      }else {
        //remove duplicates
        const uniqueGroups = groupData.filter((item: UserGroup) => 
          !group.some((existingItem: UserGroup) => existingItem.id === item.id)
        );
        setGroup((prev: any) => [...prev, ...uniqueGroups]);
      }
      setNextToken(groups.data.groupsByUser.nextToken);
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
                    <Text style={[styles.postAuthor, {fontWeight: '500'}]}>
                      {item.group?.groupName}
                    </Text>
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
            onRefresh={() => fetchGroups(true)}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#ffffff" 
          />
        }
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if(nextToken) fetchGroups(false)
        }}
      />
      <Icon name="add-circle-outline" style={styles.createButton} size={50} 
        onPress={createGroup}
      />
    </View>
  );
};

export default Groups;
