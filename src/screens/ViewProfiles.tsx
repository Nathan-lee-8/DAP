import { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert
 } from 'react-native';

import client from '../client';
import { getUser } from '../customGraphql/customQueries';
import { createReport } from '../customGraphql/customMutations';
import { User } from '../API';

import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import { AuthContext } from '../context/AuthContext';

const ViewProfiles = ( { route, navigation } : any) => {
  const targetUserID = route.params.userID;
  const [ targetUser, setTargetUser ] = useState<User>();
  const [ loading, setLoading ] = useState(true);
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ reportMessage, setReportMessage ] = useState("");
  const currUser = useContext(AuthContext)?.currUser
  if(!currUser) return;

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

  const handleReport = async () => {
    if(reportMessage === "") return;
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: targetUserID,
            reportedItemType: "User",
            reason: reportMessage, // UPDATE REASON WITH TYPES
            message: reportMessage,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Report sent successfully');
      setReportModalVisible(false);
    }catch(error){
      Alert.alert('Error', 'Failed to send report');
    }
  }

  if(loading) return (<ActivityIndicator size="large" color="#0000ff" />);
  if(!targetUser) {
    return <Text style={styles.noResultsMsg}>Error: User not found</Text>
  }

  return(
    <View style={styles.container}>
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
      <UserPosts userID={targetUser.id} isPrivate={true}/>
      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      >
        <View style={styles.reportModalOverLay}>
          <View style={styles.reportModalContainer}>
            <Icon style={styles.closeReportModalButton} name={'close-outline'} size={30} 
              onPress={() => setReportModalVisible(false)}
            /> 
            <Text style={styles.title}>Report</Text>
            <Text style={styles.reportModalText}>
              Thank you for keeping DAP communities safe. What is the purpose of this report?
            </Text>
            <TextInput
              value={reportMessage}
              onChangeText={setReportMessage}
              style={styles.reportInput}
              placeholder="Add a note"
              multiline={true}
            />
            <TouchableOpacity style={styles.reportModalButton} onPress={handleReport}>
              <Text style={{textAlign: 'center', fontSize: 18}}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ViewProfiles;