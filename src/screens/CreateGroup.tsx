import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,
  ActivityIndicator } from 'react-native'
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import SearchBar from '../components/SearchBar';
import { User } from '../API';
import ProfilePicture from '../components/ProfilePicture';
import client from '../client';
import { createUserGroup, createGroup, deleteUserGroup, deleteGroup } from '../graphql/mutations';
import { getCurrentUser } from '@aws-amplify/auth';
import { AuthContext } from '../context/AuthContext';
import { getImgURI } from '../components/addImg';

/**
 * @returns 
 */
const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<User[]>([]);
  const [groupURI, setGroupURL] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addImgText, setAddImgText] = useState("Add Img");
  const authContext = useContext(AuthContext);
  if(!authContext){
    console.log("Auth context not defined");
    return;
  }
  const { userId } = authContext;
  
  const addGroup = async () => {

    var groupID = null;
    const addedMembers = [];

    try{
      setLoading(true);
      //Create Group
      const groupData = await client.graphql({
        query: createGroup,
        variables: {
          input: {
            groupName: groupName,
            groupURL: groupURI
          }
        },
        authMode:'userPool'
      })
      console.log("Group created Successfully");
      groupID = groupData.data.createGroup.id;

      //Add Members 
      for(const member of members){
        if(!member.owner) throw new Error("No owner");
        const userGroupData = await client.graphql({
          query: createUserGroup,
          variables: {
            input: {
              ownerID: member.owner,
              userID: member.id,
              groupID: groupID
            }
          },
          authMode:'userPool'
        })
        console.log(member.firstname, "added successfully");
        addedMembers.push(userGroupData.data.createUserGroup.id);
      };

      //Add Self
      const cogID = await getCurrentUser();
      const selfData = await client.graphql({
        query: createUserGroup,
        variables: { 
          input: {
            ownerID: cogID.userId,
            userID: userId,
            groupID: groupID
          }
        },
        authMode:'userPool'
      })
      console.log("Self added successfully");
      addedMembers.push(selfData.data.createUserGroup.id);
    } catch (error) {
      console.log(error);
      rollBack(addedMembers, groupID);
    } finally {
      setLoading(false);
    }
  }

  //Rollback any graphql entries for group or member upon failure
  const rollBack = async (addedMembers: string[], groupID: string | null) => {
    //Delete Members
    if(addedMembers.length > 0){
      for(const member of addedMembers){
        try{
          await client.graphql({
            query: deleteUserGroup,
            variables: {
              input: {
                id: member
              }
            },
            authMode:'userPool'
          })
        } catch (error) {
          console.log(`Failed to rollback member ID: ${member}:`, error);
        }
      }
    }
    //Delete group
    if(groupID){
      try{
        await client.graphql({
          query: deleteGroup,
          variables: {
            input: {
              id: groupID
            }
          },
          authMode:'userPool'
        })
      } catch (error) {
        console.log(`Failed to rollback group ID: ${groupID}:`, error);
      }
    }
  }

  //Adds user to group onPress
  const getUser = (user: User) => {
    if(members.includes(user)){
      return;
    }
    setMembers([...members, user]);
  }

  //Removes user from group onPress
  const removeUser = (user: User) => {
    if(members.includes(user)){
      setMembers(members.filter((member) => member !== user));
    }
  }

  const getFilePath = async () => {
    try{
      setImgLoading(true);
      var path = await getImgURI(`groupProfile/${userId}/${Date.now()}.jpg`);
      if(path){
        setGroupURL("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + path);      
        setAddImgText('');
      }
    } catch(error){
      console.log(error);
    }finally{
      setImgLoading(false);
    }
  }

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

  return(
    <View style={styles.container}>
      {imgLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={getFilePath} style={styles.groupProfileContainer}>
          <ProfilePicture style={styles.groupProfile} size={90}/>
          <Text style={styles.addImageText}>{addImgText}</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Group name"
        autoCapitalize="sentences"
        value={groupName}
        onChangeText={ setGroupName }
      />
      <TextInput
        style={styles.longInput}
        placeholder="Description"
        multiline={true}
        autoCapitalize="sentences"
        value={description}
        onChangeText={ setDescription }
      />
      
      <Text style={styles.title}>Members</Text>
      <SearchBar userPressed={getUser}/>
      <FlatList
        data={members}
        renderItem={({ item }) => {
          let user = item;
          let name = user?.firstname + ' ' + user?.lastname;
          let userURL = user?.profileURL || undefined;

          return (
            <View style={styles.searchUserContainer}>
              <View style={styles.listUserContainer}>
                <ProfilePicture uri={userURL} size={50}/>
                <Text style={[styles.postContent, {marginLeft: 10}]}>{name}</Text>
                <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=> removeUser(item)}>
                  <Icon name="remove-circle-outline" size={25}/>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />
      <TouchableOpacity style={styles.createGroupContainer} onPress={addGroup}>
        <Text style={styles.createGroupTitle}> Create Group </Text>
        <Icon name="arrow-forward-circle-outline" size={25}/>
      </TouchableOpacity>
    </View>
  )
}

export default CreateGroup;