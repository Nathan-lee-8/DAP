import { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import client from '../client';
import { postsByDate, userByEmail } from '../graphql/queries';
import { ModelSortDirection, Post } from '../API';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import ProfilePicture from '../components/ProfilePicture';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeParamList } from '../types/rootStackParamTypes';

/**
 * Displays the active HomeScreen for the current user including:
 * The News feed which has the current active news feed for user
 * A tab view at the bottom which allows users to: create a post, 
 *    view feed, edit profile, find other users and send messages
 */
const HomeScreen = (route : any) => {
  var category = route.route.params.category;
  if(!category) return
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userId, userEmail, firstname, lastname, setProfileURL,
     setUserId, setFirstName, setLastName } = authContext;

  let headerName = userEmail;
  if(firstname) headerName = firstname;
  if(lastname) headerName += ' ' + lastname;

  const [newsFeed, setNewsFeed] = useState<Post[]> ([]);
  const [loading, setLoading] = useState(true);
  
  //Reset Cache if it was cleared but user is still logged in
  useEffect(() => {
    if(userId != '') return;
    console.log("UserId is: ", userId);
    const fetchUserId = async () => {
      const cachedUser = await AsyncStorage.getItem('currUser');
      if(cachedUser) {
        const user = JSON.parse(cachedUser);
        if(user.id) setUserId(user.id);
        if(user.firstname) setFirstName(user.firstname);
        if(user.lastname) setLastName(user.lastname);
        if(user.profileURL) setProfileURL(user.profileURL);
      }
      try{
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail.toLowerCase() },
        });
        const user = data.data.userByEmail.items[0];
        AsyncStorage.setItem('currUser', JSON.stringify(user));
        console.log('Fetched current user & set cache'); //REMOVE 
        setUserId(user.id);
        if (user.firstname) setFirstName(user.firstname);
        if (user.lastname) setLastName(user.lastname);
      } catch (error: any) {
        if(error.messsage) console.log('Error fetching user ID', error.message);
        else if(error.errors) console.log('Error fetching user ID', error.errors);
        else console.log('Error fetching user ID', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(()=> {
    const loadNewsFeed = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('newsFeedCache' + category);
        if (cachedData) {
          const data = JSON.parse(cachedData);
          const fiveMin = 5 * 60 * 1000;
          if (Date.now() - data.timestamp < fiveMin) {
            setNewsFeed(data.posts);
            setLoading(false);
            return;
          }
        }
        // If no cache or cache expired, fetch new data
        await fetchNewsFeed();
      } catch (error) {
        console.log('Error loading cached news feed', error);
      }
    };

    const fetchNewsFeed = async () => { 
      setLoading(true);
      try{
        const allPosts = await client.graphql({
          query: postsByDate,
          variables: {
            type: category,
            sortDirection: ModelSortDirection.DESC,
            limit: 10,
          },
        }); 
        console.log('Fetched posts from fetchnewsfeed.');
        const posts = allPosts.data.postsByDate.items;
        setNewsFeed(posts);
        
        await AsyncStorage.setItem('newsFeedCache' + category, JSON.stringify({
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
    loadNewsFeed();
  }, []);

  const navigation = useNavigation<NativeStackNavigationProp<HomeParamList, 'ViewHomeProf'>>();
  const visitProfile = (item : any) => {
    navigation.navigate('ViewHomeProf', { user: item.user });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => {
            let displayName = "";
            let displayEmail = "";
            let profileURL = undefined;
            if(item.user?.profileURL) profileURL = item.user.profileURL;
            if(item.user){
              if(item.user.firstname) displayName += item.user.firstname;
              if(item.user.lastname) displayName += " " + item.user.lastname;
              if(item.user.email) displayEmail = item.user.email;
            }
            return (
              <View style={styles.postContainer}>
                <View style={styles.profileSection}> 
                  <TouchableOpacity onPress={() => visitProfile(item)}>
                    <ProfilePicture uri={profileURL} size={35} />
                  </TouchableOpacity>
                  <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{displayName}</Text>
                    <Text style={styles.postContact}>{displayEmail}</Text>
                  </View>
                </View>
                <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
                <Text style={styles.postType}>{item.title}</Text>
                <Text style={styles.postContent}>{item.content}</Text>
              </View>
          )}}
        />
      )}
    </View>
    
  );
};

export default HomeScreen;
