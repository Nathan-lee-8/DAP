import { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, Platform, Alert,
  RefreshControl } from 'react-native';

import client from '../client';
import { postsByUser } from '../customGraphql/customQueries';
import { Post } from '../API';

import styles from '../styles/Styles';
import { ModelSortDirection } from '../API';
import FormatPost from './FormatPost';

/**
 * Component to display all posts that a given user has posted
 * @param userID - The User ID of the user we want to display posts for
 */
const UserPosts = ( {userID} : {userID: string} ) => {
  if(!userID){
    Alert.alert('Error', 'User not found')
    return;
  }
  const [ posts, setPosts ] = useState<Post[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const flatListRef = useRef<FlatList<Post>>(null);

  useEffect(() => {
    fetchPosts(true);
  }, []);

  //Retreive all posts from given user and next Token
  const fetchPosts = async (refresh?: boolean) => {
    try {
      const response = await client.graphql({
        query: postsByUser,
        variables: { 
          userID: userID, 
          sortDirection: ModelSortDirection.DESC,
          limit: 10,
          nextToken: refresh ? null : nextToken
        },
        authMode: 'userPool'
      });
      const fetchedPosts = response.data.postsByUser.items || [];
      var filteredPosts = fetchedPosts.filter((item) => !posts.includes(item))
        .filter((item) => item.group?.type === 'Public');
      if(refresh) setPosts(filteredPosts);
      else setPosts((prev) => [...prev, ...filteredPosts]);
      setNextToken(response.data.postsByUser.nextToken);
    } catch {
      Alert.alert('Error', 'There was an issue fetching posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {loading? ( 
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={posts}
          renderItem={({ item }) => 
            <FormatPost post={item} destination={'Profile'}/>
          }
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.noResultsMsg}>No posts found</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={4}
          removeClippedSubviews={ Platform.OS === 'ios' ? false : true}
          onEndReachedThreshold={0.35}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                fetchPosts(true);
              }}
              colors={['#9Bd35A', '#689F38']}
              progressBackgroundColor="#ffffff" 
            />
          }
          onEndReached={ () => {
            if(nextToken) fetchPosts();
          }}
        />)}
    </View>
  );
}



export default UserPosts;