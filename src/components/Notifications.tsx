import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator,
  RefreshControl, TouchableOpacity} from "react-native";

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

const Notifications = ( {closeNotificationModal} : any ) => {
  const [ notifications, setNotifications ] = useState<any>([]);
  const [ loading, setLoading ] = useState(true);
  const [ nextToken, setNextToken ] = useState<string | null | undefined>(null);
  const authContext = useContext(AuthContext);
  if(!authContext) return;
  const currUser = useContext(AuthContext)?.currUser;
  const triggerFetch = useContext(AuthContext)?.triggerFetch;
  if(!currUser) return;

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

  const fetchNotifications = async () => {
    setLoading(true);
    try{
      const notifData = await client.graphql({
        query: notificationsByUser,
        variables: {
          userID: currUser.id,
          sortDirection: ModelSortDirection.DESC,
          nextToken: nextToken,
          limit: 10
        },
        authMode:'userPool'
      })
      setNextToken(notifData.data.notificationsByUser.nextToken);
      const notificationList = notifData.data.notificationsByUser.items.filter((item) => item.type !== 'Message');
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
    setNotifications((prev: any) => prev.filter((item: any) => item.id !== itemID));
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
      }).catch((error: any) => console.log(error))
      client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currUser.id,
            unreadNotificationCount: ((currUser.unreadNotificationCount - 1) >= 0) ? 
              currUser.unreadNotificationCount - 1 : 0,
          }
        },
        authMode: 'userPool'
      }).catch((error: any) => console.log(error))
      .finally(() => {
        if(triggerFetch) triggerFetch();
      });
    }

    closeNotificationModal();
    if(item.type === 'Group'){
      navigation.navigate('ViewGroup', { groupID: item.onClickID });
    }else if(item.type === 'Post'){
      navigation.navigate('ViewPost', { postID: item.onClickID });
    }else if(item.type === 'Chat'){
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
          <TouchableOpacity style={ item?.hidden ? styles.notificationItem : styles.unreadItem } 
            onPress={() => handleNav(item)}
          >
            <Text>{item.content}</Text>
            <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
            <Icon name="close-outline" size={20} onPress={() => handleRemoveNotification(item.id)}
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
      />
    </View>
  )
}

export default Notifications;