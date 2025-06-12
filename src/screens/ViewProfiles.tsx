import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';

import client from '../client';
import { getUser } from '../customGraphql/customQueries';
import { User } from '../API';

import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ImgComponent';
import Report from '../components/Report';

const ViewProfiles = ( { route, navigation } : any) => {
  const targetUserID = route.params.userID;
  const [ targetUser, setTargetUser ] = useState<User>();
  const [ loading, setLoading ] = useState(true);
  const [ reportModalVisible, setReportModalVisible ] = useState(false);

  useEffect(() => {
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
        if(user)setTargetUser(user);
        console.log('fetched User');
      } catch (error) {
        console.log('Error getting posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if(loading) return (<ActivityIndicator size="large" color="#0000ff" />);
  if(!targetUser) {
    return <Text style={styles.noResultsMsg}>Error: User not found</Text>
  }

  return(
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.viewUserProfileSection}>
        <ProfilePicture uri={targetUser.profileURL || 'defaultUser'} style={styles.viewProfileURL}/>
        <View style={styles.userInfoContainer}>
          <Text style={styles.postAuthor}>{targetUser.firstname} {targetUser.lastname}</Text>
          <Text style={styles.userContact}>{targetUser.email}</Text>
          <Text style={styles.userContact}>{targetUser.description || "No bio available"}</Text>
        </View>
        <View style={{height: 80, flexDirection:'column'}}>
          <TouchableOpacity style={styles.messageUserButton} 
            onPress={() => navigation.navigate('CreateChat', {user: targetUser})}
          >
            <Text style={{textAlign:'center', fontSize: 12}}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportUserButton} 
            onPress={() => setReportModalVisible(true)}
          >
            <Text style={{textAlign:'center', fontSize: 12}}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List of User Posts */}
      <UserPosts userID={targetUser.id}/>

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