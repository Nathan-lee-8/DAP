import { useContext, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal,
  ActivityIndicator } from "react-native";
  
import client from "../client";
import { deleteUserGroup, deleteGroup, deletePost, createUserGroup, createChat, 
  createUserChat } from "../customGraphql/customMutations";
import { User } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";
import SearchBar from "../components/SearchBar";
import Icon from "@react-native-vector-icons/ionicons";

const ViewMembers = ( {route, navigation} : any) => {
  const group = route.params.group;
  const userGroups = group.members.items;
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const [ loading, setLoading ] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  const myUserGroup = userGroups.find((item: any) => item?.user?.id === currUser.id);
  const users = userGroups.map((item: any) => item.user);

  const handleCreateChat = async () => {
    console.log(userGroups.map((item: any) => item.user.id))
    try {
      var chatID = null;
      const addedMembers = [];

      setLoading(true);

      const chat = await client.graphql({
        query: createChat,
        variables: {
          input: {
            name: group.groupName,
            isGroup: userGroups.length > 1,
            url: group.groupURL
          }
        },
        authMode: 'userPool'
      });
      console.log("chat created");
      chatID = chat.data.createChat.id;

      const myUserChat = await client.graphql({
        query: createUserChat,
        variables: {
          input: {
            userID: currUser.id,
            chatID: chat.data.createChat.id,
            unreadMessageCount: 0,
            role: 'Owner'
          }
        },
        authMode: 'userPool'
      })
      console.log("senderChat created");
      addedMembers.push(myUserChat.data.createUserChat.id);

      userGroups.map(async (user: User) => {
        const targetUserChat = await client.graphql({
          query: createUserChat,
          variables: {
            input: {
              userID: user.id,
              chatID: chat.data.createChat.id,
              unreadMessageCount: 0,
              role: 'Member'
            }
          },
          authMode: 'userPool'
        })
        console.log(user.firstname + " chat created");
        addedMembers.push(targetUserChat.data.createUserChat.id);
      })
      Alert.alert('Success', 'GroupChat Successfully Created');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const handleInvite = async () => {
    setModalVisible(false);
    const memberIDs = addedMembers.map((item: any) => item.id);
    for(const memberID of memberIDs){
      try{
        await client.graphql({
          query: createUserGroup,
          variables: {
            input: {
              userID: memberID,
              groupID: group.id,
              role: 'Member'
            }
          },
          authMode: 'userPool'
        });
        console.log('userAdded');
      } catch (error){
        console.log(error);
      }
    }
    navigation.goBack();
    Alert.alert('Success', 'Group updated successfully')
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
    navigation.pop(2);
    Alert.alert('Success', 'Group successfully deleted')
  }

  const handleAddMember = async (user: User) => {
    setAddedMembers([...addedMembers, user]);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  const removeMember = (user: User) => {
    setAddedMembers(addedMembers => addedMembers.filter(item => item !== user));
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.groupName}</Text>
      <FlatList
        data={userGroups}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
              <ImgComponent uri={ item.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item.user?.firstname + " " + item.user?.lastname}</Text>
              </View>
                <Text style={styles.roleText}>{item.role}</Text>
            </View>
          )
        }}
      />
      {(myUserGroup?.role === 'Admin' || myUserGroup?.role === 'Owner') && 
        <View>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleCreateChat}>
            <Text style={styles.buttonTextBlack}>Create Chat</Text>
          </TouchableOpacity>
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
        <View style={styles.searchModalOverlay}>
          <View style={styles.searchModalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} remove={[...addedMembers, ...users]}/>
            <View style={{marginTop: 'auto'}}>
              <FlatList
                ref={flatListRef}
                data={addedMembers}
                horizontal
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity style={styles.removeIcon} onPress={() => removeMember(item)}>
                        <Icon name="remove-circle-outline" size={25}/>
                      </TouchableOpacity>
                      <ImgComponent style={styles.addedUserImg} uri={item.profileURL || 'defaultUser'}/>
                    </View>
                  )
                }}
                keyboardShouldPersistTaps='handled'
              />
            </View>
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