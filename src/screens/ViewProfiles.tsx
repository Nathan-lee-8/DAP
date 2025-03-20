import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import client from '../client';
import { getUser } from '../customGraphql/customQueries';
import { User } from '../API';

import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ImgComponent';

const ViewProfiles = ( { route, navigation } : any) => {
  const targetUserID = route.params.userID;
  const [ targetUser, setTargetUser ] = useState<User>();
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
      } 
    };
    fetchProfile();
  }, []);

  if(!targetUser) return (<View><Text style={styles.noResultsMsg}>Error: User not found</Text></View>);

  return(
    <View style={styles.container}>
      <View style={styles.viewUserProfileSection}>
        <ProfilePicture uri={targetUser.profileURL || 'defaultUser'} style={styles.viewProfileURL}/>
        <View style={styles.userInfoContainer}>
          <Text style={styles.postAuthor}>{targetUser.firstname} {targetUser.lastname}</Text>
          <Text style={styles.userContact}>{targetUser.email}</Text>
          <Text style={styles.userContact}>{targetUser.description || "No bio available"}</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity style={styles.messageUserButton} onPress={() => navigation.navigate('CreateChat', {user: targetUser})}>
            <Text style={{textAlign:'center', fontSize: 12}}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
      <UserPosts userID={targetUser.id} isPrivate={true}/>
    </View>
    
  )
}

export default ViewProfiles;