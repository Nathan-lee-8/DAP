import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import client from '../client';
import { postsByUser } from '../graphql/queries';
import { Post } from '../API';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModelSortDirection } from '../API';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
import FormatPost from './FormatPost';

const UserPosts = ( { userID } : any ) => {
  if(!userID) return (<View style={styles.noResultsMsg}> <Text>Error retriving posts</Text></View>);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await client.graphql({
        query: postsByUser,
        variables: { 
          userID: userID, 
          sortDirection: ModelSortDirection.DESC 
        },
      });
      const fetchedPosts = response?.data?.postsByUser?.items || [];
      console.log("fetched post from userposts page");
      setPosts(fetchedPosts);
      await AsyncStorage.setItem(
        `${userID}PostsCache`, 
        JSON.stringify({posts: fetchedPosts,timestamp: Date.now()})
      );
    } catch (error) {
      console.log('Error getting posts', error);
    } 
  }, [userID]);

  useEffect(() => {
    let isMounted = true;
    const loadPosts = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(`${userID}PostsCache`);
        if(isMounted && cachedData){
          const data = JSON.parse(cachedData);
          const fiveMin = 5 * 60 * 1000;
          if (Date.now() - data.timestamp < fiveMin) {
            setPosts(data.posts);
            return;
          }
        }
        // If no cache or cache expired, fetch new data
        if(isMounted) await fetchPosts();
      } catch (error) {
        if(isMounted) console.log('Error loading cached posts', error);
      } finally {
        if(isMounted) setLoading(false);
      }
    };
    loadPosts();
    return () => {isMounted = false};
  }, [fetchPosts]);

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const clickPost = (currPostID: string) => {
      navigation.navigate('ViewPost', { postID: currPostID });
  }

  return (
    <View>
      {loading? ( 
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            return(
              <FormatPost item={item}/>
            )
          }}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.noResultsMsg}>No posts found</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
        />)}
    </View>
  );
}



export default UserPosts;