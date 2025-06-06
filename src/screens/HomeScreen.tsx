import { useEffect, useState, useContext, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, 
  Modal} from 'react-native';

import client from '../client';
import { postsByUserFeed } from '../customGraphql/customQueries';
import { ModelSortDirection, Post, Group, UserFeed } from '../API';

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
  const [newsFeed, setNewsFeed] = useState<UserFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextToken, setNextToken] = useState<string | null | undefined>(null);
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
          {currUser && currUser?.unreadNotificationCount > 0 && 
            <View style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 10,
              width: 10,
              height: 10,
              right: 0,
              top: 0,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}/>
          }
        </TouchableOpacity>
      )
    })
  }, [currUser])

  const loadNewsFeed = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('newsFeedCache');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        const fiveMin = 5 * 60 * 1000;
        if (Date.now() - data.timestamp < fiveMin) {
          setNewsFeed(data.newsFeedData);
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
        query: postsByUserFeed,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          limit: 10,
          nextToken: nextToken
        },
        authMode: 'userPool'
      }); 
      const newsFeedData = res.data.postsByUserFeed.items;
      
      setNewsFeed(newsFeedData);
      setNextToken(res.data.postsByUserFeed.nextToken);
      
      await AsyncStorage.setItem('newsFeedCache', JSON.stringify({
        newsFeedData,
        timestamp: Date.now(),
      }));
      console.log(`Fetched from fetchnewsfeed.`);
    } catch (error: any) {
      console.log('Error fetching news feed', error);
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
            if(!item.post) return null;
            return(
             <FormatPost item={item.post}/>
            )
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
            <Icon name="close-outline" size={35} style={styles.closeReportModalButton}
              onPress={() => setModalVisible(false)}
            />
            
            <Text style={styles.title}>Notifications</Text>
            <Notifications closeNotificationModal={() => setModalVisible(false)}/>
          </View>
        </View>
      </Modal>
    </View>
    
  );
};

export default HomeScreen;
