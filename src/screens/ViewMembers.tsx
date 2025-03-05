import { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import { deleteUserGroup, deleteGroup, deletePost } from "../graphql/mutations";
import { User } from "../API";
import client from "../client";
import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";
import SearchBar from "../components/SearchBar";

const ViewMembers = ( {route, navigation} : any) => {
  const group = route.params.group;
  const userGroups = group.members.items;
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  const myUserGroup = userGroups.find((item: any) => item?.user?.id === currUser.id);

  const handleInvite = () => {
    setModalVisible(false);
    //take addedMembers and create UserGroup for each member
  }

  const handleEditGroup = () => {
    navigation.navigate('EditGroup', {group: group});
  }

  const handleLeaveGroup = () => {
    Alert.alert(
      "Leave Group",
      "Are you sure you want to leave this group?",
      [
        {
          text: "Cancel",
        },
        { text: "Leave", onPress: leaveGroup}
      ]
    );
  }

  const leaveGroup = async () => {
    const userGroupID = myUserGroup?.id;
    if(!userGroupID) return;
    try{
      await client.graphql({
        query: deleteUserGroup,
        variables: {
          input: {
            id: userGroupID
          }
        },
        authMode: 'userPool'
      });
      console.log('user removed');
      navigation.reset({
        index: 0,
        routes: [ { name: 'MainTabs', params: { screen: 'Groups' } } ]
      });
    } catch (error: any) {
      console.log('Error', error.message);
    }
  }  
  
  const handleDeleteGroup = () => {
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
        },
        { text: "Delete", onPress: deleteGroupAndPosts}
      ]
    );
  }

  const deleteGroupAndPosts = async () => {
    // delete all Group Posts
    const postIDs = group.posts.items.map((item: any) => item.id)
    for(const postID of postIDs){
      try{
        await client.graphql({
          query: deletePost,
          variables: {
            input: {
              id: postID
            }
          },
          authMode: 'userPool'
        })
        console.log(postID, " post deleted");
      } catch (error) {
        console.log(error);
      }
    }
    // delete all user Groups
    const participantIDs = userGroups.map((item : any) => item.id);
    for(const partID of participantIDs){
      try{
        await client.graphql({
          query: deleteUserGroup,
          variables: {
            input: {
              id: partID
            }
          },
          authMode: 'userPool'
        })
        console.log(partID, " userGroup deleted");
      } catch (error) {
        console.log(error);
      }
    }
    // Delete group
    try{
      await client.graphql({
        query: deleteGroup,
        variables: {
          input: {
            id: group.id
          }
        },
        authMode: 'userPool'
      })
      console.log(group.id, " group deleted");
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddMember = async (user: User) => {
    setAddedMembers([...addedMembers, user]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.groupName}</Text>
      <FlatList
        data={userGroups}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
              <ImgComponent uri={ item.user.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item.user.firstname + " " + item.user.lastname}</Text>
              </View>
                <Text style={styles.roleText}>{item.role}</Text>
            </View>
          )
        }}
      />
      {(myUserGroup?.role === 'Admin' || myUserGroup?.role === 'Owner') && 
        <View>
          <TouchableOpacity style={styles.buttonWhite} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonTextBlack}>Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleEditGroup}>
            <Text style={styles.buttonTextBlack}>Edit Group</Text>
          </TouchableOpacity>
        </View>
      }
      {myUserGroup?.role === 'Owner' ? (
        <View>
          <TouchableOpacity style={styles.buttonBlack} onPress={handleDeleteGroup}>
            <Text style={styles.buttonTextWhite}>Delete Group</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.buttonBlack} onPress={handleLeaveGroup}>
          <Text style={styles.buttonTextWhite}>Leave Group</Text>
        </TouchableOpacity>
      )}
      <Modal 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modelOverlay}>
          <View style={ {alignItems: 'center', height: 50}}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} remove={addedMembers}/>
            <FlatList
              data={addedMembers}
              horizontal
              renderItem={({item}) => {
                return (
                  <View>
                    <ImgComponent uri={item.profileURL || 'defaultUser'} />
                  </View>
                )
              }}
              contentContainerStyle={{marginTop: 'auto'}}
            />
            <TouchableOpacity style={styles.buttonBlack} onPress={handleInvite}>
              <Text style={styles.buttonTextWhite}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ViewMembers;