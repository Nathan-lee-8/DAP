import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Platform, Alert,
  ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import client from '../client';
import { createUserGroup, createGroup, deleteUserGroup, deleteGroup, updateGroup 
} from '../customGraphql/customMutations';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import SearchBar from '../components/SearchBar';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';

/**
 * @returns 
 */
const CreateGroup = ( {navigation} : any) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<User[]>([]);
  const [groupURI, setGroupURL] = useState<string>('defaultGroup');
  const [loading, setLoading] = useState(false);
  const [goNext, setGoNext] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  
  const addGroup = async () => {
    if(groupName.trim() === ''){
      Alert.alert('Error', 'Please enter a group name before creating a group');
      return;
    }
    var groupID = null;
    const addedMembers = [];

    try{
      setLoading(true);
      setGoNext(false);

      //Create Group
      const groupData = await client.graphql({
        query: createGroup,
        variables: {
          input: {
            groupName: groupName,
            description: description,
            groupURL: groupURI,
            isPublic: isPublic
          }
        },
        authMode:'userPool'
      })
      console.log("Group created Successfully");
      groupID = groupData.data.createGroup.id;

      //Add Members 
      for(const member of members){
        const userGroupData = await client.graphql({
          query: createUserGroup,
          variables: {
            input: {
              userID: member.id,
              role: "Member",
              groupID: groupID
            }
          },
          authMode:'userPool'
        })
        console.log(member.firstname, "added successfully");
        addedMembers.push(userGroupData.data.createUserGroup.id);
      };

      //Add Self
      const selfData = await client.graphql({
        query: createUserGroup,
        variables: { 
          input: {
            userID: currUser.id,
            role: "Owner",
            groupID: groupID
          }
        },
        authMode:'userPool'
      })
      console.log("Self added successfully");
      addedMembers.push(selfData.data.createUserGroup.id);

      if(groupURI !== 'defaultGroup') handleUploadImage(groupID);

      navigation.reset({
        index: 1,
        routes: [
            { name: 'MainTabs', params: {screen: 'Groups'} },
            { name: 'ViewGroup', params: { groupID: groupID } 
        }],
      });
    } catch (error) {
      console.log(error);
      rollBack(addedMembers, groupID);
    } finally {
      setLoading(false);
    }
  }

  const handleUploadImage = async (groupID: string) => {
    //upload image to s3
    try{
      const uri = await getImgURI(groupURI, `public/groupPictures/${groupID}/profile/${Date.now()}.jpg`);
      if(!uri) throw new Error('Image not selected');
      client.graphql({
        query: updateGroup,
        variables: {
          input: {
            id: groupID,
            groupURL: 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + uri
          }
        },
        authMode:'userPool'
      })
      console.log("updated Group Image")
    } catch (error: any) {
      Alert.alert('Error', error.message);
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
      var uri = await imagePicker();
      if(uri === null) throw new Error('Image not selected');
      setGroupURL(uri);
    } catch(error: any){
      console.log(error.message);
    }
  }

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

  if(goNext) {
    return(
      <View style={styles.container}>
        <FlatList
          data={members}
          renderItem={({ item }) => {
            return (
              <View style={styles.searchUserContainer}>
                <View style={styles.listUserContainer}>
                  <ImgComponent uri={item?.profileURL || 'defaultUser'}/>
                  <Text style={[styles.postContent, {marginLeft: 10}]}>{item?.firstname + ' ' + item?.lastname}</Text>
                  <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=> removeUser(item)}>
                    <Icon name="remove-circle-outline" size={25}/>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
          ListHeaderComponent={
            <View>
              <SearchBar userPressed={getUser} remove={members}/>
              <Text style={styles.title}>Add Members</Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={[styles.noResultsMsg, {marginTop: 0}]}>No members</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{marginBottom: Platform.OS === 'ios' ? 40 : 0, marginTop: 'auto'}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >   
          <TouchableOpacity style={styles.buttonWhite} onPress={() => setGoNext(false)}>
            <Text style={styles.buttonTextBlack}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlack} onPress={addGroup}>
            <Text style={styles.buttonTextWhite}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={getFilePath} style={styles.groupImgContainer}>
        <ImgComponent uri={groupURI} style={styles.groupImg}/>
        <Text style={styles.addImageText}>add Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Group name"
        autoCapitalize="words"
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
      <View style={styles.groupPrivacyContainer}>
        <Text style={styles.privacyText}>Group Privacy Options:   </Text>
        <TouchableOpacity style={styles.privacyIcon} onPress={() => setIsPublic(false)}>
          <View 
            style={isPublic !== null && !isPublic ? styles.privacyIconSelected : null}
          />
        </TouchableOpacity>
        <Text style={styles.privacyText}>Private</Text>
        <TouchableOpacity style={styles.privacyIcon} onPress={() => setIsPublic(true)}>
          <View 
            style={isPublic === null || isPublic ? styles.privacyIconSelected : null}
          />
        </TouchableOpacity>
        <Text style={styles.privacyText}>Public</Text>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{marginBottom: Platform.OS === 'ios' ? 40 : 0, marginTop: 'auto'}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >   
        <TouchableOpacity style={styles.buttonBlack} onPress={() => setGoNext(true)}>
          <Text style={styles.buttonTextWhite}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CreateGroup;