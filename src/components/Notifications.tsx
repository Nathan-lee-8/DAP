import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, RefreshControl, 
  TouchableOpacity } from "react-native";

import client from '../client';
import { notificationsByUser } from "../customGraphql/customQueries";
import { deleteNotification, updateNotification, updateUser 
} from "../customGraphql/customMutations";
import { ModelSortDirection, Notification } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import Icon from "@react-native-vector-icons/ionicons";

import { useNavigation } from "@react-navigation/native";
import { GlobalParamList } from "../types/rootStackParamTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";

/**
 * Retrieves and displays all notifications for the Users. Resets notification
 * count to 0 when opened. 
 * @param closeNotificationModal - Function to close the overlay  
 */
const Notifications = ( {closeNotificationModal} : any ) => {
  const [ notifications, setNotifications ] = useState<any>([]);
  const [ loading, setLoading ] = useState(true);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const currUser = authContext.currUser;
  const { triggerFetch } = authContext;
  if(!currUser) return;

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

  useEffect(() => {
    fetchNotifications();
  }, []);

  //retreives all notifications and nexttoken and resets notification count to 0
  const fetchNotifications = async () => {
    setLoading(true);
    try{
      const notifData = await client.graphql({
        query: notificationsByUser,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          limit: 15
        },
        authMode:'userPool'
      })
      setNextToken(notifData.data.notificationsByUser.nextToken);
      const notificationList = notifData.data.notificationsByUser.items
        .filter((item) => item.type !== 'Message');
      setNotifications(notificationList);

      //reset notification count to 0 
      await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currUser.id,
            unreadNotificationCount: 0
          }
        },
        authMode: 'userPool'
      });
      triggerFetch();

    } catch {
      Alert.alert('Error', 'Issue fetching notifications')
    } finally {
      setLoading(false);
    }
  }

  const fetchNextBatch = () => {
    client.graphql({
      query: notificationsByUser,
      variables: {
        userID: currUser.id,
        sortDirection: ModelSortDirection.DESC,
        limit: 15,
        nextToken: nextToken
      },
      authMode:'userPool'
    }).then((notifData) => {
      const notifs = notifData.data.notificationsByUser.items.filter((item) =>
        item !== null && !notifications.includes(item) && item.type !== 'Message'
      );
      setNotifications((prev: any) => [...prev, ...notifs]);
    })
}

  //Deletes the pressed notification
  const handleRemoveNotification = (itemID: string) => {
    setNotifications((prev: any) => prev.filter((item: any) => item.id !== itemID));
    client.graphql({
      query: deleteNotification,
      variables: {
        input: {
          id: itemID
        }
      },
      authMode: 'userPool'
    }).catch(() => Alert.alert('Error', 'Issue deleting notification'))
  }

  //Marks the current pressed notification as read and navigates to the 
  //proper post, group or chat after closing the notification modal
  const handleNav = async (item: Notification) => {
    if(!item.read){
      client.graphql({
        query: updateNotification,
        variables: {
          input: {
            id: item.id,
            read: true
          }
        },
        authMode: 'userPool'
      }).catch(() => {});
    }

    closeNotificationModal();
    if(item.type === 'Group'){
      navigation.navigate('ViewGroup', { groupID: item.onClickID });
    }else if(item.type === 'Post'){
      navigation.navigate('ViewPost', { postID: item.onClickID });
    }else if(item.type === 'Chat'){
      navigation.navigate('ViewChat', { chatID: item.onClickID });
    }
  }

  return (
    <View style={styles.notificationOverlay}>
      <TouchableOpacity style={styles.notificationHeader} 
        onPress={() => closeNotificationModal()}
      />        
      <View style={styles.notificationContainer}>
        <Icon name="close-outline" style={styles.closeReportModalButton}
          size={35} onPress={() => closeNotificationModal()}
        />
        <Text style={styles.title}>Notifications</Text>
        
        {loading ? ( <ActivityIndicator size="large" color="#0000ff" /> ) : (
          <FlatList
            data={notifications}
            renderItem={({item}) => 
              <TouchableOpacity onPress={() => handleNav(item)}
                style={ item.read ? styles.notificationItem : styles.unreadItem } 
              >
                <Text>{item.content}</Text>
                <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
                <Icon name="close-outline" size={20} 
                  onPress={() => handleRemoveNotification(item.id)}
                  style={{ position: 'absolute', right: 5, top: 5, zIndex: 1}
                }/>
              </TouchableOpacity>
            }
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.noResultsMsg}>No Notifications</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchNotifications}
                colors={['#9Bd35A', '#689F38']}
                progressBackgroundColor="#ffffff" 
              />
            }
            onEndReachedThreshold={0.3}
            onEndReached={() => {
              if(nextToken) fetchNextBatch();
            }}
          />
        )}
      </View>
    </View>
  )
}

export default Notifications;