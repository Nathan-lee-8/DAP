import { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl,
  TouchableOpacity } from 'react-native';
import client from '../client';
import { groupsByUser, userByEmail } from '../graphql/queries';
import { ModelSortDirection, Post, Group } from '../API';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import ProfilePicture from '../components/ProfilePicture';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList, LoggedInParamList } from '../types/rootStackParamTypes';

/**
 * Displays the active HomeScreen for the current user including:
 * The News feed which has the current active news feed for user
 * A tab view at the bottom which allows users to: create a post, 
 *    view feed, edit profile, find other users and send messages
 */
const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userId, userEmail, setProfileURL, setUserId, setFirstName, setLastName } = authContext;

  const [newsFeed, setNewsFeed] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  
  //Reset Cache if it was cleared but user is still logged in
  useEffect(() => {
    const fetchUserId = async () => {
      try{
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail.toLowerCase() },
          authMode: 'userPool'
        });
        const user = data.data.userByEmail.items[0];
        setUserId(user.id);
        if (user.firstname) setFirstName(user.firstname);
        if (user.lastname) setLastName(user.lastname);
        if (user.profileURL) setProfileURL(user.profileURL)
      } catch (error: any) {
        if(error.messsage) console.log('Error fetching user ID', error.message);
        else if(error.errors) console.log('Error fetching user ID', error.errors);
        else console.log('Error fetching user ID', error);
      } 
    };
    if(userId == '') fetchUserId();
  }, [userEmail]);

  useEffect(() => {
    if(userId){
      loadNewsFeed();
    }
  }, [userId]);

  const loadNewsFeed = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('newsFeedCache');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        const fiveMin = 5 * 60 * 1000;
        if (Date.now() - data.timestamp < fiveMin) {
          setNewsFeed(data.posts);
          setLoading(false);
          return;
        }
      }else{
        await fetchNewsFeed();
      }
    } catch (error) {
      console.log('Error loading cached news feed', error);
    }
  };

  const fetchNewsFeed = async () => { 
    if(userId == '') {
      console.log("User ID is empty");
      return;
    };
    setLoading(true);
    try{
      const res = await client.graphql({
        query: groupsByUser,
        variables: {
          userID: userId,
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: 'userPool'
      }); 
      const userGroupData = res.data.groupsByUser.items;
      console.log(`Fetched from fetchnewsfeed.`);

      let groupData = userGroupData.flatMap(group => {
        return (group.group  || []);
      });
      setGroups(groupData.filter(group => group !== null))
      let posts = userGroupData.flatMap(userGroup => {
        return (userGroup.group?.posts?.items || []).filter(post => post !== null);
      })
      posts = posts.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setNewsFeed(posts);
      
      await AsyncStorage.setItem('newsFeedCache', JSON.stringify({
        posts,
        timestamp: Date.now(),
      }));
    } catch (error: any) {
      if(error.messsage) console.log('Error fetching news feed', error.message);
      else if(error.errors) console.log('Error fetching news feed', error.errors);
      else console.log('Error fetching news feed', error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const nav2 = useNavigation<NativeStackNavigationProp<LoggedInParamList>>();
  const visitProfile = (item : any) => {
    if(item.user.id === userId){
      nav2.navigate('Profile');
    }else{
      navigation.navigate('ViewProfile', { user: item.user });
    }
  }

  const clickPost = (item : string) => {
    navigation.navigate('ViewPost', { postID: item });
  }

  const getGroupName = ( id : string) => {
    const res = groups.flatMap(group => {
      if(group.id === id){
        return group.groupName;
      }
    })
    return res;
  }

  const onRefresh = useCallback(() => {
    fetchNewsFeed();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => {
            let firstname = item?.user?.firstname ? item.user.firstname : undefined;
            let lastname = item?.user?.lastname ? item.user.lastname: undefined;
            let displayEmail = item?.user?.email ? item.user.email : undefined ;
            let profileURL = item?.user?.profileURL ? item.user.profileURL : undefined;
            var groupName = getGroupName(item.groupID);
            return (
              <TouchableOpacity style={styles.postContainer} onPress={ () => clickPost(item.id)}>
                <View style={styles.profileSection}> 
                  <TouchableOpacity onPress={() => visitProfile(item)}>
                    <ProfilePicture uri={profileURL} size={35} />
                  </TouchableOpacity>
                  <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{firstname + " " + lastname}</Text>
                    <Text style={styles.postContact}>{displayEmail}</Text>
                  </View>
                </View>
                <Text style={styles.postGroup}> {groupName}</Text>
                <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>{item.content}</Text>
                <Text style={styles.postContent}>{item.comments?.items.length} comments</Text>
              </TouchableOpacity>
            )
          }}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.noResultsMsg}>New To DAP? Create or join a Group to get started!</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
                colors={['#9Bd35A', '#689F38']}  // Customize loading spinner color
                progressBackgroundColor="#ffffff" // Background color of the spinner
            />
          }
        />
      )}
    </View>
    
  );
};

export default HomeScreen;
