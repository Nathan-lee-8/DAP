import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator,
  RefreshControl, TouchableOpacity} from "react-native";

import client from '../client';
import { notificationsByUser } from "../customGraphql/customQueries";
import { deleteNotification } from "../customGraphql/customMutations";
import { Notification } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import Icon from "@react-native-vector-icons/ionicons";

import { useNavigation } from "@react-navigation/native";
import { GlobalParamList } from "../types/rootStackParamTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Notifications = ( {closeNotificationModal}: any ) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

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

  const handleRemoveNotification = async (itemID: string) => {
    setNotifications(prev => prev.filter(item => item.id !== itemID));
    try{
      await client.graphql({
        query: deleteNotification,
        variables: {
          input: {
            id: itemID
          }
        },
        authMode: 'userPool'
      })
    }catch(error){
      console.log(error);
    }
  }

  const handleNav = (item: Notification) => {
    closeNotificationModal();
    if(item.type === 'Group'){
      navigation.navigate('ViewGroup', { groupID: item.onClickID });
    }else if(item.type === 'Post'){
      navigation.navigate('ViewPost', { postID: item.onClickID });
    }else if(item.type === 'Message'){
      navigation.navigate('ChatRoom', { chatID: item.onClickID });
    }
  }

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({item}) => 
          <TouchableOpacity style={styles.notificationItem} onPress={() => handleNav(item)}>
            <Icon name="close-outline" size={20} onPress={() => handleRemoveNotification(item.id)}
              style={{
                position: 'absolute',
                right: 5,
                top: 5,
                zIndex: 1,
              }
            }/>
            <Text>{item.content}</Text>
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
      />
    </View>
  )
}

export default Notifications;