import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator,
  RefreshControl} from "react-native";

import client from '../client';
import { notificationsByUser } from "../graphql/queries";
import { Notification } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles'

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const fetchNotifications = async () => {
    try{
      const notifData = await client.graphql({
        query: notificationsByUser,
        variables: {
          userID: currUser.id
        },
        authMode:'userPool'
      })
      const notificationList = notifData.data.notificationsByUser.items;
      setNotifications(notificationList);

    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({item}) => (
          <View>
            <Text>{item.content}</Text>
          </View>
        )}
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
      />
    </View>
  )
}

export default Notifications;