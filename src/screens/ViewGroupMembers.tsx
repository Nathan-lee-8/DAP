import { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator,
  Modal } from "react-native";
  
import client from "../client";
import { createChat, createUserChat, deleteUserGroup, updateUserGroup 
} from "../customGraphql/customMutations";
import { UserGroup } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";
import Report from "../components/Report";

/**
 * Displays all users in the group and allows owners and admin to set roles and
 * remove users. Members and non-members can view profiles and report users.
 * 
 * @param group - The group that we are displaying list of users for
 */
const ViewGroupMembers = ( {route, navigation} : any ) => {
  const group = route.params.group;
  const [ userGroups, setUserGroups ] = useState(group.members.items);
  const [ loading, setLoading ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState<UserGroup>();
  const [ options, setOptions ] = useState(['View Profile', 'Report']);
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ roleModalVisible, setRoleModalVisible ] = useState(false);
  const [ roleOptions, setRoleOptions ] = useState(['Owner', 'Admin', 'Member'])
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  const myUserGroup = userGroups.find((item: any) => item?.userID === currUser.id);

  //If user is pressed, sets options based on if user is non-member, member or 
  //admin/owner
  const handleUserPressed = (item: UserGroup) => {
    if(item.userID === currUser.id) setOptions(['Edit Role']);
    else if(!myUserGroup){
      setOptions(['View Profile', 'Report']);
    } else if(myUserGroup.role === 'Admin' || myUserGroup.role === 'Owner') {
      setOptions(['View Profile', 'Edit Role', 'Remove']);
      if(item.userID === currUser.id) setOptions(['Edit Role'])
    }else {
      setOptions(['View Profile', 'Report']);
    }
    setSelectedUser(item);
    setModalVisible(true);
  }

  //Once an option is pressed navigates to proper handler for given option
  const handleOptionButton = async (option: string) => {
    if(option === 'View Profile'){
      navigation.navigate('ViewProfile', {userID: selectedUser?.userID})
    }else if(option === 'Edit Role'){
      if(selectedUser?.role === 'Admin') setRoleOptions(['Owner', 'Member']);
      else if(selectedUser?.role === 'Owner') setRoleOptions(['Admin', 'Member']);
      else if(selectedUser?.role === 'Member') setRoleOptions(['Admin', 'Owner']);
      setRoleModalVisible(true);
    }else if(option === 'Report'){
      setReportModalVisible(true);
    }else if(option === 'Remove'){
      await handleRemoveUser();
    }
    setModalVisible(false);
  }

  //Removes User from the Group by deleting their UserGroup
  const handleRemoveUser = async () => {
    if(!selectedUser){
      Alert.alert('Error', 'Error removing user');
      return;
    }
    try{
      await client.graphql({
        query: deleteUserGroup,
        variables: {
          input: {
            id: selectedUser.id
          }
        },
        authMode: 'userPool'
      })
      setUserGroups(
        userGroups.filter((item: UserGroup) => item.userID !== selectedUser.userID)
      );
      Alert.alert('Successfully removed User');
    } catch  {
      Alert.alert('Error', 'Error removing user');
    }
  }

  //Allows admin/owner to update roles of users while ensuring at least one owner
  //exists at all times
  const updateRole = async (role: string) => {
    setRoleModalVisible(false);
    if(!selectedUser){
      Alert.alert('Error', 'There was an issue updating roles');
      return;
    }
    const ownerCount =  
      userGroups.filter((userGroup : UserGroup) => userGroup.role === 'Owner').length;
    if(selectedUser.userID === currUser.id && ownerCount <= 1){
      Alert.alert('Error', 'You must have at least one owner');
      return;
    }
    try{
      await client.graphql({
        query: updateUserGroup,
        variables: {
          input: {
            id: selectedUser.id,
            role: role
          }
        },
        authMode: 'userPool'
      })
      setUserGroups((prevUserGroups : UserGroup[]) =>
        prevUserGroups.map(userGroup => userGroup.id === selectedUser.id ? 
          {...userGroup, role: role} : userGroup
        )
      );
    } catch {
      Alert.alert('Error', 'There was an issue updating roles');
    }
  }

  //Create a chatroom with all members that are part of the group with the group's
  //name and image
  const handleCreateChat = async () => {
    try {
      const addedMembers = [];
      setLoading(true);

      const chat = await client.graphql({ //Create ChatRoom
        query: createChat,
        variables: {
          input: {
            name: group.groupName,
            isGroup: true,
            url: group.groupURL
          }
        },
        authMode: 'userPool'
      });

      userGroups.map(async (item: UserGroup) => { //Create Participants
        let role = 'Member';
        if(item.userID === currUser.id){
          role = 'Owner';
        }
        const targetUserChat = await client.graphql({
          query: createUserChat,
          variables: {
            input: {
              userID: item.userID,
              chatID: chat.data.createChat.id,
              unreadMessageCount: 0,
              lastMessage: "",
              lastMessageAt: Date.now().toString(),
              role: role,
              active: false
            }
          },
          authMode: 'userPool'
        })
        addedMembers.push(targetUserChat.data.createUserChat.id);
      })
      Alert.alert('Success', 'GroupChat Successfully Created');
    } catch {
      Alert.alert('Error', 'There was an issue creating the Chatroom');
    } finally {
      setLoading(false);
    }
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" /> 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.groupName}</Text>
      <FlatList
        data={userGroups}
        renderItem={({ item }) => {
          var disable = (item.userID === currUser.id);
          if(myUserGroup && myUserGroup.role === 'Admin' || myUserGroup.role === 'Owner'){
            disable = false;
          }
          return(
            <TouchableOpacity style={styles.listMemberContainer} 
              onPress={() => handleUserPressed(item)}
              disabled={disable}
            >
              <ImgComponent uri={item?.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>
                  {item?.user?.firstname} {item?.user?.lastname}
                </Text>
              </View>
              <Text style={styles.roleText}>{item.role}</Text>
            </TouchableOpacity>
          )
        }}
      />
      {(myUserGroup?.role === 'Admin' || myUserGroup?.role === 'Owner') && 
        <View>
          <TouchableOpacity style={styles.buttonBlack} onPress={handleCreateChat}>
            <Text style={styles.buttonTextWhite}>Create Chat</Text>
          </TouchableOpacity>
        </View>
      }
      
      {/* Options modal */}
      <Modal 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}  
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={options}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.optionButton} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/*Report Modal */}
      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      > 
        <Report
          type={"User"}
          itemID={(selectedUser) ? selectedUser.id : ""}
          setReportModalVisible={setReportModalVisible}
        />
      </Modal>

      {/*Role Modal */}
      <Modal 
        transparent={true} 
        visible={roleModalVisible} 
        onRequestClose={() => setRoleModalVisible(false)}  
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={roleOptions}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.optionButton} 
                  onPress={() => updateRole(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setRoleModalVisible(false)}
          >
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ViewGroupMembers;