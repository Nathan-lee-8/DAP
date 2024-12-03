import { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import client from '../client';
import { postsByDate, userByEmail } from '../graphql/queries';
import { ModelSortDirection, Post } from '../API';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../styles/Styles';

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
  const { userId, userEmail, firstname, lastname,
     setUserId, setFirstName, setLastName } = authContext;

  let headerName = userEmail;
  if(firstname) headerName = firstname;
  if(lastname) headerName += ' ' + lastname;

  const [newsFeed, setNewsFeed] = useState<Post[]> ([]);
  const [loading, setLoading] = useState(true);
  const [postType, setPostType] = useState('FreeAndForSale');
  
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
      }
      try{
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail.toLowerCase() },
        });
        const user = data.data.userByEmail.items[0];
        console.log('Fetched current user & set cache'); //REMOVE 
        AsyncStorage.setItem('currUser', JSON.stringify(user));
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
        const cachedData = await AsyncStorage.getItem('newsFeedCache' + postType);
        if (cachedData) {
          const data = JSON.parse(cachedData);
          const cacheAge = Date.now() - data.timestamp;
          const oneHour = 5 * 60 * 1000; // 5 minute in milliseconds
  
          // If cache is less than 5 minute old, use cached data
          if (cacheAge < oneHour) {
            setNewsFeed(data.posts);
            setLoading(false);
            return;
          }
        }
        // If no cache or cache expired, fetch new data
        await fetchNewsFeed();
      } catch (error) {
        console.log('Error loading cached news feed', error);
        await fetchNewsFeed(); // Fallback to fetching new data if something goes wrong
      }
    };

    const fetchNewsFeed = async () => { 
      setLoading(true);
      try{
        const allPosts = await client.graphql({
          query: postsByDate,
          variables: {
            type: postType,
            sortDirection: ModelSortDirection.DESC,
            limit: 10,
          },
        }); 
        console.log('Fetched posts from fetchnewsfeed.');
        const posts = allPosts.data.postsByDate.items;
        setNewsFeed(posts);
        
        await AsyncStorage.setItem('newsFeedCache' + postType, JSON.stringify({
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
  }, [postType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My News Feed For {headerName} </Text>
      <SelectDropdown data={['FreeAndForSale','JobListings', 'VolunteerOpportunities']}
        onSelect={(selectedItem) => setPostType(selectedItem)}
        renderButton={(selectedItem) => (
          <TouchableOpacity style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem) || 'FreeAndForSale'}
            </Text>
          </TouchableOpacity>
        )}
        renderItem={(item) => (
          <View style={styles.dropdownItemStyle}>
            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
          </View>
        )}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      {loading ? (
        <Text>Loading posts... </Text>
      ) : (
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => {
            let displayName = "";
            let displayEmail = "";
            if(item.user){
              if(item.user.firstname) displayName += item.user.firstname;
              if(item.user.lastname) displayName += " " + item.user.lastname;
              if(item.user.email) displayEmail = item.user.email;
            }
            return (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.type}: {item.title}</Text>
              <Text>{item.content}</Text>
              <Text>Posted by: {displayName}</Text>
              <Text>Contact: {displayEmail}</Text>
              <Text>Created At: {item.createdAt}</Text>
            </View>
          )}}
        />
      )}
    </View>
    
  );
};

export default HomeScreen;
