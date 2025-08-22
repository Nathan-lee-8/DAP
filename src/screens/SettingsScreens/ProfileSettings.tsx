
import { useContext } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';

import client from '../../client';
import { deleteUser } from '../../customGraphql/customMutations';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Diplays all user Notification Settings and allows user to customize their
 * notification settings. 
 */
const ProfileSettings = ({navigation} : any) => {
  const {logout, currUser} = useContext(AuthContext)!;
  if(!logout || !currUser) {
    return;
  }

  const handleDeleteUser = async () => {
    try{
      client.graphql({
        query: deleteUser,
        variables: {
          input: {
            id: currUser.id
          }
        },
        authMode: 'userPool',
      })
      logout();
    }catch(err){
      console.log(err);
      Alert.alert('Error', 'Issue removing account. Please contact support');
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={25} color={'black'}/>
        <Text style={styles.backText}>Profile Settings</Text>
      </TouchableOpacity>
      <View style={styles.notifSettingContainer}>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('NotificationSettings')}>
          <Text style={styles.notificationSettingText}>Notification Settings</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('Report')}>
          <Text style={styles.notificationSettingText}>Report a Problem</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} 
          onPress={() => navigation.navigate('Terms', {section: 'terms-of-service'})}
        >
          <Text style={styles.notificationSettingText}>Terms and Conditions</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} 
          onPress={() => navigation.navigate('Terms', {section: 'privacy-policy'})}>
          <Text style={styles.notificationSettingText}>Privacy Policy</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} 
          onPress={() => navigation.navigate('Terms', {section: 'community-guidelines'})}
        >
          <Text style={styles.notificationSettingText}>Community Guidelines</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} 
          onPress={() => navigation.navigate('BlockedUsers')}
        >
          <Text style={styles.notificationSettingText}>Blocked Users</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => logout()}>
          <Text style={styles.notificationSettingText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => handleDeleteUser()}>
          <Text style={styles.notificationSettingText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default ProfileSettings;