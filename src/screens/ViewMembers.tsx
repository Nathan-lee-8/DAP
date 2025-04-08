import { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator 
} from "react-native";
  
import client from "../client";
import {  createChat, createUserChat 
} from "../customGraphql/customMutations";
import { UserGroup } from "../API";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";

const ViewMembers = ( {route} : any) => {
  const group = route.params.group;
  const userGroups = group.members.items;
  const [ loading, setLoading ] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  const myUserGroup = userGroups.find((item: any) => item?.userID === currUser.id);

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
        </View>
      }
    </View>
  );
}

export default ViewMembers;