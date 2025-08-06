import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';

import client from '../../client'; 
import { blockListByBlocker } from '../../customGraphql/customQueries';
import { deleteBlockList } from '../../customGraphql/customMutations';
import { BlockList } from '../../API';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import ImgComponent from '../../components/ImgComponent';

const PrivacyPolicy = () => {
  const currUser = useContext(AuthContext)?.currUser
  const [ blockedUsers, setBlockedUsers ] = useState<BlockList[]>([]);
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
      if(blockedUsers) setBlockedUsers(blockItems);
    }
    getblockedUsers();
  }, [currUser.id]);

  //Update to 'unblock' user 
  const handleUserPressed = (unblock: BlockList) => {
    Alert.alert("Unblock", "Would you like to unblock this User?", [
      { text: "Cancel" },
      { text: "Confirm", onPress: async () => {
        try{ 
          client.graphql({
            query: deleteBlockList,
            variables: {
              input: {
                id: unblock.id
              }
            },
            authMode: 'userPool'
          })
          Alert.alert('Success', 'Unblocked user')
        } catch {
          Alert.alert('Error', 'There was and issue unblocking this user.')
        }
      }}
    ]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={blockedUsers}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listMemberContainer} 
            onPress={() => handleUserPressed(item || undefined)}
          >
            <ImgComponent uri={item?.blockedUser?.profileURL || 'defaultUser'}/>
            <View style={styles.userInfoContainer}>
              <Text style={styles.postAuthor}>
                {item?.blockedUser?.firstname} {item?.blockedUser?.lastname}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default PrivacyPolicy;