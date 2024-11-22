import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import client from '../client';
import { postsByDate } from '../graphql/queries';
import { ModelSortDirection } from '../API';
import { AuthContext } from '../context/AuthContext';
import { userByEmail } from '../graphql/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

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
  const { userId, userEmail, setUserId, setFirstName, setLastName } = authContext;

  type PostProps = { 
    title: string, 
    content: String,
    createdAt: String,
    type: String,
    user: {
      email: String,
      firstname: String,
      lastname: String,
      phonenumber: String,
    },
  };

  const [newsFeed, setNewsFeed] = useState<PostProps[]> ([]);
  const [loading, setLoading] = useState(true);
  const [postType, setPostType] = useState('FreeAndForSale');
  
  //Reset Cache if it was cleared but user is still logged in
  useEffect(() => {
    if(userId != '') return;
    console.log("UserId is: ", userId);
    const fetchUserId = async () => {
      try{
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail },
        });
        console.log('Fetched user info from fetchuserID.'); //REMOVE 
        const user = data.data.userByEmail.items[0];
        setUserId(user.id);
        if (user.firstname) setFirstName(user.firstname);
        if (user.lastname) setLastName(user.lastname);
      } catch (error) {
        console.log('Error fetching user ID', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(()=> {
    const loadNewsFeed = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('newsFeedCache' + postType);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const cacheAge = Date.now() - timestamp;
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  
          // If cache is less than 1 hour old, use cached data
          if (cacheAge < oneHour) {
            setNewsFeed(data);
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
        console.log('Fetched graphql from fetchnewsfeed.'); //REMOVE 
        const posts: PostProps[] = allPosts.data.postsByDate.items.map((post: any) => ({
          title: post.title,
          content: post.content,
          type: post.type,
          createdAt: post.createdAt,
          user: post.user, // Add the user data here
        }));
        setNewsFeed(posts);
        
        await AsyncStorage.setItem('newsFeedCache' + postType, JSON.stringify({
          posts,
          timestamp: Date.now(),
        }));
      } catch (error) {
        console.log('Error fetching news feed', error);
      } finally {
        setLoading(false);
      }
    };
    loadNewsFeed();
  }, [postType]);

  return (
    <View style={styles.container}>
      <SelectDropdown data={['FreeAndForSale','JobListings', 'VolunteerOpportunities']}
        onSelect={(selectedItem) => {
          setPostType(selectedItem);
        }}
        renderButton={(selectedItem) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem) || 'FreeAndForSale'}
              </Text>
            </View>
          );
        }}
        renderItem={(item) => {
          return (
            <View style={styles.dropdownItemStyle}>
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Text style={styles.title}>My News Feed For {userEmail} </Text>
      {loading ? (
        <Text>Loading posts... </Text>
      ) : (
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.type}: {item.title}</Text>
              <Text>{item.content}</Text>
              <Text>Posted by: {item.user.firstname || 'Unknown User'} {item.user.lastname}</Text>
              <Text>Contact: {item.user.email}</Text>
            </View>
          )}
        />
      )}
    </View>
    
  );
};

//Styles for HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dropdownButtonStyle: {
    width: 180,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#151E26',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#151E26',
  },
});

export default HomeScreen;
