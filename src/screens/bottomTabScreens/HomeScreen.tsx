import { useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, 
  Modal } from 'react-native';

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
const HomeScreen = () => {
  const [ newsFeed, setNewsFeed ] = useState<UserFeed[]>([]);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ error, setError] = useState<string| null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const { blockList, currUser } = useContext(AuthContext)!;
  if(!currUser){
    setError('Could not load posts. Pull down to refresh.');
  }

  //Retreives Newsfeed every time screen is refocused
  useFocusEffect(
    useCallback(() => {
      fetchNewsFeed(true);
    }, [currUser?.id, blockList])
  );

  //retreives userfeed with logic for retreiving next items on scroll
  const fetchNewsFeed = async (refresh: boolean) => {
    if(!currUser) return;
    if(refresh) setLoading(true);
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

      //get items and filter for null items
      const newsFeedData = res.data.postsByUserFeed.items || [];

      //filter out blocked users
      const filteredByBlockList = !blockList ? newsFeedData
        : newsFeedData.filter((item: any) => !blockList?.includes(item.post?.user?.id));

      //handle refresh vs pagination
      if(refresh){ 
        setNewsFeed(filteredByBlockList);
      } else {
        const filteredFeed = filteredByBlockList.filter((item: any) => 
          !newsFeed.some((userfeed) => userfeed.id === item.id)
        );
        setNewsFeed((prev) => [...prev, ...filteredFeed])
      };
      setNextToken(res.data.postsByUserFeed.nextToken);
    } catch (err) {
      console.log(err);
      setError('Could not load newfeed. Pull down to refresh.')
    } finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <View style={styles.backBtn}>
        <Text style={styles.backText}>Home</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.notificationIcon}>
        <Icon name="notifications-outline" size={24} style={{marginRight: 15}}/>
        {currUser && currUser?.unreadNotificationCount > 0 && 
          <View style={{position: 'absolute', right: 10, top: -10}}>
            <Text style={{fontWeight: 700, color: 'red'}}>
              {currUser.unreadNotificationCount}
            </Text>
          </View>
        }
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
            error ? (
              <View>
                <Text style={[styles.noResultsMsg, {color: 'red'}]}>{error}</Text>
              </View>
            ) : (
              <Text style={styles.noResultsMsg}>
                New To DAP? Create or join a Group to get started!
              </Text>
            )
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
      )}
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
