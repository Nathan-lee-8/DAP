import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';

import client from '../../client'; 
import { blockListByBlocker } from '../../customGraphql/customQueries';
import { deleteBlockList } from '../../customGraphql/customMutations';
import { BlockList } from '../../API';

import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/Styles';
import ImgComponent from '../../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

const BlockedUsers = ({navigation} : any) => {
  const currUser = useContext(AuthContext)?.currUser;
  const setBlockList = useContext(AuthContext)?.setBlockList;
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
          Alert.alert('Success', 'Unblocked user');
          if(setBlockList){
            setBlockList((prev) => 
              prev.filter((blockedID) => blockedID !== unblock.blockedUser?.id)
            );
          }
          setBlockedUsers((prev) => prev.filter((item) => item.id !== unblock.id));
        } catch {
          Alert.alert('Error', 'There was and issue unblocking this user.')
        }
      }}
    ]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={25} color={'black'}/>
        <Text style={styles.backText}>Blocked Users</Text>
      </TouchableOpacity>
      <View style={styles.header}/>
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
        ListEmptyComponent={() => (
          <Text style={styles.noResultsMsg}>No Blocked Users</Text>
        )}
      />
    </View>
  );
}

export default BlockedUsers;