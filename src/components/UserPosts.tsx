import { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, Platform,
  RefreshControl } from 'react-native';

import client from '../client';
import { postsByUser } from '../customGraphql/customQueries';
import { Post } from '../API';

import styles from '../styles/Styles';
import { ModelSortDirection } from '../API';
import FormatPost from './FormatPost';

const UserPosts = ( { userID, isPrivate } : {userID: string, isPrivate?: boolean }) => {
  if(!userID) return (<View style={styles.noResultsMsg}> <Text>Error retriving posts</Text></View>);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextToken, setNextToken] = useState<string | null | undefined>(null);
  const flatListRef = useRef<FlatList<Post>>(null);

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
      var filteredPosts = fetchedPosts.filter((item) => !posts.includes(item));
      if(isPrivate) filteredPosts = filteredPosts.filter((item) => item?.group?.type === 'Public');
      if(refresh) setPosts(filteredPosts);
      else setPosts((prev) => [...prev, ...filteredPosts]);
      setNextToken(response.data.postsByUser.nextToken);
      console.log('fetched from userPosts');
    } catch (error) {
      console.log('Error getting posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  return (
    <View style={{flex: 1}}>
      {loading? ( 
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={posts}
          renderItem={({ item }) => 
            <FormatPost item={item} groupData={item?.group ? [item?.group] : []}/>
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