import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Platform, Alert,
  ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';

import client from '../client';
import { createUserGroup, createGroup, deleteUserGroup, deleteGroup, updateGroup, 
  createNotification } from '../customGraphql/customMutations';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import SearchBar from '../components/SearchBar';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import LinearGradient from 'react-native-linear-gradient';

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
  const [type, setType] = useState('Public');
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
            isPublic: type !== 'Hidden',
            type: type,
            memberCount: 0
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
        client.graphql({
          query: createNotification,
          variables: {
            input: {
              type: 'Group',
              content: currUser.firstname + " " + currUser.lastname
                + ' added you to ' + groupName,
              userID: member.id,
              groupID: groupID,
              onClickID: groupID
            }
          },
          authMode: 'userPool'
        }).catch(() => {});
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

  const handleGoNext = () => {
    if(groupName.trim() === ""){
      Alert.alert("Error", "Please enter a valid group name.");
      return;
    }
    setGoNext(true);
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
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} 
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.addImageTextContainer}>
          <Text style={styles.addImageText}>Add Image</Text>
        </View>
        <TouchableOpacity onPress={getFilePath} style={styles.groupImgContainer}>
          <ImgComponent uri={groupURI} style={styles.groupImg}/>
          <LinearGradient
            colors={['rgba(231, 229, 229, 0.94)', 'rgba(51, 47, 47, 0.1)', 'rgba(0,0,0,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {marginTop: 10}]}
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
          <Text style={[styles.privacyText, {padding: 10}]}>Visibility</Text>

          <TouchableOpacity style={styles.privacyOptionContainer} onPress={() => setType('Public')}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-open" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Public</Text>
              <Text>Anyone can find and join.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={type === 'Public' ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privacyOptionContainer}  onPress={() => setType('Private')}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-closed" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Private</Text>
              <Text>Anyone can find. Request to join.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={type === 'Private' ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privacyOptionContainer}  onPress={() => setType('Hidden')}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-closed" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Hidden</Text>
              <Text>Invite Only.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={type === 'Hidden' ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{marginBottom: Platform.OS === 'ios' ? 40 : 0, marginTop: 'auto'}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >   
        <TouchableOpacity style={styles.buttonBlack} onPress={handleGoNext}>
          <Text style={styles.buttonTextWhite}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CreateGroup;