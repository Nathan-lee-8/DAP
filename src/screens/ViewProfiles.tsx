import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, Alert, 
FlatList } from 'react-native';

import client from '../client';
import { getUser } from '../customGraphql/customQueries';
import { User } from '../API';

import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ImgComponent';
import Report from '../components/Report';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Screen to display the name, email, profile image, description, 
 * and all the posts of the current user. 
 * 
 * @param userID - the user that we want to view the profile of
 */
const ViewProfiles = ( { route, navigation } : any) => {
  const targetUserID = route.params.userID;
  const [ targetUser, setTargetUser ] = useState<User>();
  const [ loading, setLoading ] = useState(true);
  const [ optionModalVisible, setOptionModalVisible ] = useState(false)
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  
  useEffect(() => {
    fetchProfile();
  }, []);

  //retreives target Users profile data
  const fetchProfile = async () => {
    try {
      const response = await client.graphql({
        query: getUser,
        variables: { 
          id: targetUserID,
        },
        authMode: 'userPool'
      });
      const user = response.data.getUser;
      if(user) setTargetUser(user);
    } catch {
      Alert.alert('Error', 'Could not find User');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionButton = (option: string) => {
    if(option === "Report"){
      setOptionModalVisible(false);
      setReportModalVisible(true);
    }else if(option === "Block"){
      Alert.alert('Block not implemented yet ')
    }else{
      Alert.alert('Error', option + ' not implemented yet')
    }
  }

  if(loading) return (<ActivityIndicator size="large" color="#0000ff" />);
  if(!targetUser) {
    return <Text style={styles.noResultsMsg}>Error: User not found</Text>
  }

  return(
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.viewUserProfileSection}>
        <Icon style={styles.editProfileButton} name="ellipsis-horizontal" 
          onPress={() => setOptionModalVisible(true)} size={25}
        />
        <ProfilePicture uri={targetUser.profileURL || 'defaultUser'} 
          style={styles.viewProfileURL}
        />
        <View style={styles.userInfoContainer}>
          <Text style={[styles.postAuthor, {fontWeight: '600'}]}>
            {targetUser.firstname} {targetUser.lastname}
          </Text>
          <Text style={styles.userContact}>{targetUser.email}</Text>
          <Text style={styles.userContact}>
            {targetUser.description || "No bio available"}
          </Text>
        </View>
        <View style={{height: 80, flexDirection:'column'}}>
          <TouchableOpacity style={styles.messageUserButton} 
            onPress={() => navigation.navigate('CreateChat', {user: targetUser})}
          >
            <Text style={{textAlign:'center', fontSize: 12}}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List of User Posts */}
      <UserPosts userID={targetUser.id}/>

      {/* Options modal */}
      <Modal
        transparent={true} 
        visible={optionModalVisible}
        onRequestClose={() => setOptionModalVisible(false)} 
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={["Report", "Block"]}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity style={styles.optionButton} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setOptionModalVisible(false)}
          >
            <Text style={styles.buttonTextRed}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      >
        <Report 
          type={'User'} 
          itemID={targetUserID} 
          setReportModalVisible={setReportModalVisible}
        />
      </Modal>
    </View>
  )
}

export default ViewProfiles;