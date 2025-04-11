import { useEffect, useState, useContext, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, 
  Modal} from 'react-native';

import client from '../client';
import { groupPosts } from '../customGraphql/customQueries';
import { ModelSortDirection, Post, Group } from '../API';

import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import FormatPost from '../components/FormatPost';
import Icon from '@react-native-vector-icons/ionicons';
import Notifications from '../components/Notifications';

/**
 * Displays the active News feed for the current user
 */
const HomeScreen = ( {navigation} : any) => {
  const [newsFeed, setNewsFeed] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;

  useEffect(() => {
    loadNewsFeed();
  }, [currUser]);

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => setModalVisible(true)} >
          <Icon name="notifications-outline" size={24} />
        </TouchableOpacity>
      )
    })
  })

  const loadNewsFeed = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('newsFeedCache');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        const fiveMin = 5 * 60 * 1000;
        if (Date.now() - data.timestamp < fiveMin) {
          setNewsFeed(data.posts);
          setGroups(data.groupData);
          setLoading(false);
          return;
        }
      }
      await fetchNewsFeed();
    } catch (error) {
      console.log('Error loading cached news feed', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsFeed = async () => {
    if(!currUser) {
      console.log("User ID is empty");
      return;
    };
    setLoading(true);
    try{
      const res = await client.graphql({
        query: groupPosts,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: 'userPool'
      }); 
      const userGroupData = res.data.groupsByUser.items

      let groupData = userGroupData.flatMap(group => { return (group.group  || []) })
        .filter(group => group !== null);
      setGroups(groupData);

      let posts = userGroupData.flatMap(userGroup => {
        return (userGroup.group?.posts?.items || []).filter((post): post is Post => post !== null);
      }).sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setNewsFeed(posts);

      await AsyncStorage.setItem('newsFeedCache', JSON.stringify({
        posts,
        groupData,
        timestamp: Date.now(),
      }));
      console.log(`Fetched from fetchnewsfeed.`);
    } catch (error: any) {
      if(error.messsage) console.log('Error fetching news feed', error.message);
      else if(error.errors) console.log('Error fetching news feed', error.errors);
      else console.log('Error fetching news feed', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchNewsFeed();
  }, [currUser]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => {
            return <FormatPost item={item} groupData={groups}/>
          }}
          ListEmptyComponent={() => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Text style={styles.noResultsMsg}>New To DAP? Create or join a Group to get started!</Text>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={['#9Bd35A', '#689F38']}
              progressBackgroundColor="#ffffff" 
            />
          }
        />
      )}
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.notificationOverlay}>
        <TouchableOpacity style={styles.notificationHeader} onPress={() => setModalVisible(false)}/>
          <View style={styles.notificationContainer}>
            <Icon name="close-outline" size={35} style={styles.editProfileButton}
              onPress={() => setModalVisible(false)}
            />
            <Notifications/>
          </View>
        </View>
      </Modal>
    </View>
    
  );
};

export default HomeScreen;
