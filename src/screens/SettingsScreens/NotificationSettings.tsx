import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import client from '../../client';
import { updateNotificationSettings } from '../../customGraphql/customMutations';

import FontIcon from '@react-native-vector-icons/fontawesome';
import styles from '../../styles/Styles';
import { AuthContext } from '../../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Diplays all user Notification Settings and allows user to customize their
 * notification settings. 
 */
const NotificationSettings = ({navigation} : any) => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    Alert.alert('Error', 'Unable to retreive notification settings.')
    return;
  }
  const { currUser, triggerFetch } = authContext;
  if(!currUser?.notificationSettings) {
    Alert.alert('Error', 'Unable to retreive notification settings.')
    return;
  }

  const [muteAll, setMuteAll] = useState(false);
  const [mutePosts, setMutePosts] = useState(currUser.notificationSettings.newPost);
  const [muteJoinGroup , setMuteJoinGroup] = useState(currUser.notificationSettings.joinGroup);
  const [muteGroupRequest, setMuteGroupRequest] = useState(currUser.notificationSettings.groupRequest);
  const [muteComments, setMutecomments] = useState(currUser.notificationSettings.newComment);
  const [muteReplies, setMuteReplies] = useState(currUser.notificationSettings.newReply);
  const [muteCommentReplies, setMuteCommentReplies] = useState(currUser.notificationSettings.newReplyComment);
  const [muteMessages, setMuteMessages] = useState(currUser.notificationSettings.newMessage);
  const [muteJoinChat, setMuteJoinChat] = useState(currUser.notificationSettings.joinChat);

  const handleMuteAll = () => {
    setMuteAll(!muteAll);
    setMutePosts(!muteAll);
    setMuteJoinGroup(!muteAll);
    setMuteGroupRequest(!muteAll);
    setMutecomments(!muteAll);
    setMuteReplies(!muteAll);
    setMuteCommentReplies(!muteAll);
    setMuteMessages(!muteAll);
    setMuteJoinChat(!muteAll);
  }
  
  const updateSettings = async () => {
    if(!currUser?.notificationSettings?.id){
      Alert.alert('Error', 'There was an issue updating settings.');
      return;
    }
    try{
      await client.graphql({
        query: updateNotificationSettings,
        variables:{
          input:{
            id: currUser.notificationSettings.id,
            newPost: mutePosts,
            joinGroup: muteJoinGroup,
            groupRequest: muteGroupRequest,
            newComment: muteComments,
            newReply: muteReplies,
            newReplyComment: muteCommentReplies,
            newMessage: muteMessages,
            joinChat: muteJoinChat,
          },
        },
        authMode: 'userPool',
      })
      if(triggerFetch) triggerFetch();
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'There was an issue updating settings.');
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={25} color={'black'}/>
        <Text style={styles.backText}>Notification Settings</Text>
      </TouchableOpacity>

      <View style={styles.notifSettingContainer}>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Mute all</Text>
          <FontIcon name={muteAll ? 'toggle-on' : 'toggle-off'} size={25} color='black'
            onPress={handleMuteAll}
          />
        </View>
      </View>

      <View style={styles.notifSettingContainer}>
        <Text style={styles.notificationCategoryText}>Groups</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>New Posts</Text>
          <FontIcon name={mutePosts ? 'toggle-on' : 'toggle-off'} size={25} color='black'
            onPress={() => setMutePosts(!mutePosts)}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Joined Group</Text>
          <FontIcon name={muteJoinGroup ? 'toggle-on' : 'toggle-off'} size={25} 
            color='black' onPress={() => setMuteJoinGroup(!muteJoinGroup)}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Join Requests</Text>
          <FontIcon name={muteGroupRequest ? 'toggle-on' : 'toggle-off'} size={25} 
            color='black' onPress={() => setMuteGroupRequest(!muteGroupRequest)}
          />
        </View>
      </View>

      <View style={styles.notifSettingContainer}>
        <Text style={styles.notificationCategoryText}>Posts</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Comments</Text>
          <FontIcon name={muteComments ? 'toggle-on' : 'toggle-off'} size={25} 
            color='black' onPress={() => setMutecomments(!muteComments)}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Replies</Text>
          <FontIcon name={muteReplies ? 'toggle-on' : 'toggle-off'} size={25} 
            color='black' onPress={() => setMuteReplies(!muteReplies)}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Replies to Comments</Text>
          <FontIcon name={muteCommentReplies ? 'toggle-on' : 'toggle-off'} size={25} 
            color='black' onPress={() => setMuteCommentReplies(!muteCommentReplies)}
          />
        </View>
      </View>

      <View style={styles.notifSettingContainer}>
        <Text style={styles.notificationCategoryText}>Messages</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>New Message</Text>
          <FontIcon name={muteMessages ? 'toggle-on' : 'toggle-off'} size={25} 
            color='black' onPress={() => setMuteMessages(!muteMessages)}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.notificationSettingText}>Joined Chat</Text>
          <FontIcon name={muteJoinChat ? 'toggle-on' : 'toggle-off'} size={25}
            color='black' onPress={() => setMuteJoinChat(!muteJoinChat)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonBlack} onPress={updateSettings}>
        <Text style={styles.buttonTextWhite}>Save</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default NotificationSettings;