import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';

import client from '../../client'; 
import { blockListByBlocker } from '../../customGraphql/customQueries';
import { User } from '../../API';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import ImgComponent from '../../components/ImgComponent';

const PrivacyPolicy = () => {
  const currUser = useContext(AuthContext)?.currUser
  const [ blockedUsers, setBlockedUsers ] = useState<User[]>([]);
  if(!currUser) return (
    <Text style={styles.noResultsMsg}>Error: There was an issue loading blocked users</Text>
  )

  useEffect(() => {
    const getblockedUsers = async () => { 
      const blockedData = await client.graphql({
        query: blockListByBlocker,
        variables: {
          blockerID: currUser.id
        },
        authMode: 'userPool'
      })
      const blockItems = blockedData.data.blockListByBlocker.items || [];
      const blockedUsers = blockItems.map((item => item.blockedUser))
        .filter(user => user !== null && user !== undefined)
      if(blockedUsers) setBlockedUsers(blockedUsers);
    }
    getblockedUsers();
  }, [currUser.id]);

  //Update to 'unblock' user 
  const handleUserPressed = (user: User) => {
    Alert.alert('Error', 'unblock not implemented yet')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={blockedUsers}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listMemberContainer} 
            onPress={() => handleUserPressed(item)}
          >
            <ImgComponent uri={item?.profileURL || 'defaultUser'}/>
            <View style={styles.userInfoContainer}>
              <Text style={styles.postAuthor}>
                {item?.firstname} {item?.lastname}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default PrivacyPolicy;