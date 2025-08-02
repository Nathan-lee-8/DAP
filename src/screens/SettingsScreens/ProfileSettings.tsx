
import { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../context/AuthContext';

import styles from '../../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Diplays all user Notification Settings and allows user to customize their
 * notification settings. 
 */
const ProfileSettings = ({navigation} : any) => {
  const logout = useContext(AuthContext)?.logout;
  if(!logout) {
    return null;
  }

  return(
    <View style={styles.container}>
      <View style={styles.notifSettingContainer}>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('NotificationSettings')}>
          <Text style={styles.notificationSettingText}>Notification Settings</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('Report')}>
          <Text style={styles.notificationSettingText}>Report a Problem</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('Privacy')}>
          <Text style={styles.notificationSettingText}>Privacy Policy</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.notificationSettingText}>Terms and Conditions</Text>
          <Icon name="arrow-forward" size={20} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => logout()}>
          <Text style={styles.notificationSettingText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default ProfileSettings;