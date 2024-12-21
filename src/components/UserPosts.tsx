import { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import client from '../client';
import { postsByUser } from '../graphql/queries';
import { Post } from '../API';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModelSortDirection } from '../API';
import moment from 'moment';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PostsTopTabParamList } from '../types/rootStackParamTypes';

const TopTabStack = createMaterialTopTabNavigator<PostsTopTabParamList>();

const UserPostsLogic = ( { route } : any ) => {
  const userID = route.params.userID;
  const category = route.params.category;
  if(!userID) return (<View> <Text>Error retriving posts</Text></View>);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await client.graphql({
          query: postsByUser,
          variables: {
            userID: userID,
            sortDirection: ModelSortDirection.DESC,
          },
        });
        const posts = response.data.postsByUser.items;
        console.log("fetched post from userposts page");
        setPosts(posts);
        const cacheData = {
          posts: posts,
          timestamp: Date.now(),
        };
        await AsyncStorage.setItem(userID + 'PostsCache', JSON.stringify(cacheData));
      } catch (error) {
        console.log('Error fetching user posts', error);
        Alert.alert('Error getting posts', 'Please restart the app');
      } finally {
        setLoading(false);
      }
    }

    const loadPosts = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(userID + 'PostsCache');
        if(cachedData){
          const data = JSON.parse(cachedData);
          const cacheAge = Date.now() - data.timestamp;
          const oneHour = 5 * 60 * 1000; // 5 minute in milliseconds
  
          // If cache is less than 5 minute old, use cached data
          if (cacheAge < oneHour) {
            setPosts(data.posts);
            setLoading(false);
            return;
          }
        }
        // If no cache or cache expired, fetch new data
        await fetchPosts();
      } catch (error) {
        console.log('Error loading cached posts', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const getTimeDisplay = ( postTime: string) => {
    var postDate = moment(postTime);
    var currDate = moment();
    const daysDiff = currDate.diff(postDate, 'days');
    if(daysDiff > 0){
      let date = new Date(postTime);
      let cutOff = date.toDateString().indexOf(' '); //index to cut off the day
      let display = date.toDateString().slice(cutOff, ) + " " + date.toLocaleTimeString();
      return display;
    }

    const hoursDiff = currDate.diff(postDate, 'hours');
    if(hoursDiff > 0) return hoursDiff + ' hours ago';
    
    const minutesDiff = currDate.diff(postDate, 'minutes');
    return minutesDiff + ' minutes ago';
  }

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  if (posts.length === 0) {
    return (
      <View>
        <Text>No posts found</Text>
      </View>
    );
  }

  return(
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          if(item.type !== category) return <View></View>;
          const displayDate = getTimeDisplay(item.createdAt);
          return(
            <View style={styles.postContainer}>
              <Text style={styles.postType}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
              <Text style={styles.postDate}>{displayDate}</Text>
              <Text style={styles.postCategory}>{item.type}</Text>
            </View>
        )}}
      />
    </View>
  );
}

const UserPosts = ({ userID } : any) => {
  return (
    <TopTabStack.Navigator>
      <TopTabStack.Screen name="Market" component={UserPostsLogic} 
        initialParams={{category: "Market", userID: userID}}
        options={{title: 'Market'}} />
      <TopTabStack.Screen name="Jobs" component={UserPostsLogic} 
        initialParams={{category: "Jobs", userID: userID}}
        options={{title: 'Jobs'}} />
      <TopTabStack.Screen name="Volunteer" component={UserPostsLogic} 
        initialParams={{category: "Volunteer", userID: userID}}
        options={{title: 'Volunteer'}} />
    </TopTabStack.Navigator>
  );
}


export default UserPosts;