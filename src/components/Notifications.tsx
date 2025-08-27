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
  const [ notifications, setNotifications ] = useState<Notification[]>([]);
  const [ grouped, setGrouped ] = useState<any>([]);
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

  //Organize notifications anytime notifications changes
  useEffect(() => {
    const grouped = groupNotifications(notifications);
    setGrouped(grouped);
  }, [notifications]);

  //retreives all notifications and nexttoken and resets notification count to 0
  const fetchNotifications = async () => {
    setLoading(true);
    try{
      const notifData = await client.graphql({
        query: notificationsByUser,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          limit: 30
        },
        authMode:'userPool'
      })
      setNextToken(notifData.data.notificationsByUser.nextToken);
      const notificationList = notifData.data.notificationsByUser.items
        .filter((item) => item.type !== 'Message');
      setNotifications(notificationList);

      //reset notification count to 0 
      if(currUser.unreadNotificationCount >  0){
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
      }

      //for each notification in the notificationList: mark as read
      const updatePromises = notificationList.map((notif) => {
         if(!notif.read){
          return client.graphql({
            query: updateNotification,
            variables: {
              input: {
                id: notif.id,
                read: true
              }
            },
            authMode: 'userPool'
          });
        }
      })
      await Promise.all(updatePromises);
    } catch (error) {
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
        limit: 30,
        nextToken: nextToken
      },
      authMode:'userPool'
    }).then((notifData) => {
      const notifs = notifData.data.notificationsByUser.items.filter((item) =>
        !notifications.some((existingItem: Notification) => existingItem.id === item.id)
        && item.type !== 'Message'
      );
      setNotifications((prev: any) => [...prev, ...notifs]);
      setNextToken(notifData.data.notificationsByUser.nextToken);
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
    closeNotificationModal();
    if(item.type === 'Post' || item.type === 'AddGroup' || item.type === 'JoinGroup' ||
      item.type === 'RequestJoin'
    ){
      navigation.navigate('ViewGroup', { groupID: item.onClickID });
    }else if(item.type === 'Comment' || item.type === 'CommentReply' || item.type === 'Reply'){
      navigation.navigate('ViewPost', { postID: item.onClickID });
    }else if(item.type === 'AddChat'){
      navigation.navigate('ViewChat', { chatID: item.onClickID });
    }
  }

  //Sort Notifications by onClickID
  const groupNotifications = (notifications : Notification[]) => {
    const grouped: any = {};

    notifications.forEach((notif) => {
      const key = notif.onClickID;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(notif);
    });

    return Object.entries(grouped)
      .map(([onClickID, group]: any) => ({
        onClickID,
        isExpanded: false,
        notifications: group.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        numUnread: group.filter((notif: any) => !notif.read).length,
      }))
      .sort((a, b) => new Date(b.notifications[0].createdAt).getTime() - 
        new Date(a.notifications[0].createdAt).getTime()
      );
  };

  //Changes group view to isExpanded to show all notifications from one group
  const toggleGroup = (onClickID: string) => {
    setGrouped((prev: any) =>
      prev.map((group: any) =>
        group.onClickID === onClickID
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

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
            data={grouped}
            keyExtractor={(item) => item.onClickID}
            renderItem={({item}) => 
              <View style={{marginBottom: 10}}>
                <TouchableOpacity onPress={() => toggleGroup(item.onClickID)}
                  style={item.numUnread > 0 ? styles.unreadItem : styles.notificationItem} 
                >
                  <Text>{item.numUnread} new updates from {item.notifications[0].name}
                  </Text>
                  <Text style={styles.postDate}>
                    {moment(item.notifications[0].createdAt).fromNow()}
                  </Text>
                  
                  <Icon name={item.isExpanded ? 'chevron-up' : 'chevron-down'} size={25}
                    style={styles.expandNotifIcon}
                  />
                </TouchableOpacity>
                {item.isExpanded && (
                  item.notifications.map((notif: Notification) => (
                    <TouchableOpacity key={notif.id} onPress={() => handleNav(notif)}
                      style={notif.read ? styles.notificationItem : styles.unreadItem} 
                    >
                      <Text>{notif.content}</Text>
                      <Text style={styles.postDate}>{moment(notif.createdAt).fromNow()}</Text>
                      <Icon name="close-outline" size={20} style={styles.removeNotificationIcon}
                        onPress={() => handleRemoveNotification(notif.id)}
                      />
                    </TouchableOpacity>
                  ))
                )}
                
              </View>
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