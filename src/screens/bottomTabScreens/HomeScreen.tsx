import { useEffect, useState, useContext, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, 
  Modal, Alert} from 'react-native';

import client from '../../client';
import { postsByUserFeed } from '../../customGraphql/customQueries';
import { ModelSortDirection, UserFeed } from '../../API';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import FormatPost from '../../components/FormatPost';
import Icon from '@react-native-vector-icons/ionicons';
import Notifications from '../../components/Notifications';

/**
 * Displays the active News feed for the current user and the notification count.
 * Allows the user to refresh the news feed and open/view notifications.
 */
const HomeScreen = ( {navigation} : any) => {
  const [ newsFeed, setNewsFeed ] = useState<UserFeed[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  useEffect(() => {
    fetchNewsFeed(true);
  }, [currUser?.id]);

  //updates the unread notification count on the notification icon in header
  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{margin: 15}} onPress={() => setModalVisible(true)}>
          <Icon name="notifications-outline" size={24} />
          {currUser && currUser?.unreadNotificationCount > 0 && 
            <View style={{position: 'absolute', right: 0, top: -10}}>
              <Text style={{fontWeight: 700, color: 'red'}}>
                {currUser.unreadNotificationCount}
              </Text>
            </View>
          }
        </TouchableOpacity>
      )
    })
  }, [currUser?.unreadNotificationCount])

  //retreives userfeed with logic for retreiving next items on scroll
  const fetchNewsFeed = async (refresh: boolean) => {
    if(loading) return;
    setLoading(true);
    try{
      const res = await client.graphql({
        query: postsByUserFeed,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          nextToken: refresh ? null : nextToken
        },
        authMode: 'userPool'
      }); 
      const newsFeedData = res.data.postsByUserFeed.items;
      if(refresh){ 
        setNewsFeed(newsFeedData);
      } else {
        const filteredFeed = newsFeedData.filter((item) => 
          item !== null && !newsFeed.some(userfeed => userfeed.id === item.id)
        );
        setNewsFeed((prev) => [...prev, ...filteredFeed])
      };
      setNextToken(res.data.postsByUserFeed.nextToken);
    } catch {
      Alert.alert('Error', 'Error fetching news feed');
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />
  return (
    <View style={styles.container}>
      <FlatList
        data={newsFeed}
        renderItem={({ item }) => {
          if(!item.post) return null;
          return (
            <FormatPost post={item.post} destination={'Home'} 
              refresh={() => fetchNewsFeed(true)}
            /> 
          )
        }}
        ListEmptyComponent={() => (
          <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
            <Text style={styles.noResultsMsg}>
              New To DAP? Create or join a Group to get started!
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchNewsFeed(true)}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#ffffff" 
          />
        }
        onEndReached={() => {
          if(nextToken) fetchNewsFeed(false)
        }}
        onEndReachedThreshold={0.3}
      />
      
      {/* Notification Modal */}
      <Modal transparent={true} visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}
      >
        <Notifications closeNotificationModal={() => setModalVisible(false)}/>
      </Modal>
    </View>
    
  );
};

export default HomeScreen;
