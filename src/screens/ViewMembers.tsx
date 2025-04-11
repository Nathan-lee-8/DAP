import { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator,
  Modal } from "react-native";
  
import client from "../client";
import {  createChat, createUserChat, deleteUserGroup
 } from "../customGraphql/customMutations";
import { UserGroup } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";

const ViewMembers = ( {route, navigation} : any) => {
  const group = route.params.group;
  const userGroups = group.members.items;
  const [ loading, setLoading ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState<UserGroup>();
  const [ options, setOptions ] = useState(['View Profile', 'Report']);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  const myUserGroup = userGroups.find((item: any) => item?.userID === currUser.id);

  if(myUserGroup?.role === 'Admin' || myUserGroup?.role === 'Owner'){
    setOptions(['View Profile', 'Edit Role', 'Remove']);
  }

  const handleCreateChat = async () => {
    try {
      const addedMembers = [];
      setLoading(true);

      const chat = await client.graphql({
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
      console.log("chat created");

      userGroups.map(async (item: UserGroup) => {
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
              role: role
            }
          },
          authMode: 'userPool'
        })
        console.log(item.user?.firstname + " chat created");
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

  const handleUserPressed = (item: UserGroup) => {
    setSelectedUser(item);
    setModalVisible(true);
  }

  const handleOptionButton = (option: string) => {
    if(option === 'View Profile'){
      navigation.navigate('ViewProfile', {userID: selectedUser?.userID})
    }else if(option === 'Edit Role'){
      Alert.alert('Not Implemented Yet');
    }else if(option === 'Report'){
      Alert.alert('Not Implemented Yet')
    }else if(option === 'Remove'){
      handleRemoveUser();
    }
    setModalVisible(false);
  }

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
            id: selectedUser.userID
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Successfully removed User');
    } catch (error) {
      Alert.alert('Error', 'Error removing user');
    }
  }

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.groupName}</Text>
      <FlatList
        data={userGroups}
        renderItem={({ item }) => {
          var disable = item.userID === currUser.id;
          return(
            <TouchableOpacity style={styles.listMemberContainer} onPress={() => handleUserPressed(item)}
              disabled={disable}
            >
              <ImgComponent uri={item?.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
              </View>
              <Text style={styles.roleText}>{item.role}</Text>
            </TouchableOpacity>
          )
        }}
      />
      {(myUserGroup?.role === 'Admin' || myUserGroup?.role === 'Owner') && 
        <View>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleCreateChat}>
            <Text style={styles.buttonTextBlack}>Create Chat</Text>
          </TouchableOpacity>
        </View>
      }
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
          
          <TouchableOpacity style={styles.closeOverlayButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ViewMembers;