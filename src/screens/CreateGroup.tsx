import { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,
  ActivityIndicator, Alert } from 'react-native'
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import SearchBar from '../components/SearchBar';
import { User } from '../API';
import ImgComponent from '../components/ImgComponent';
import client from '../client';
import { createUserGroup, createGroup, deleteUserGroup, deleteGroup,
  updateGroup } from '../graphql/mutations';
import { getCurrentUser } from '@aws-amplify/auth';
import { AuthContext } from '../context/AuthContext';
import { imagePicker, getImgURI } from '../components/addImg';
import { useNavigation } from '@react-navigation/native';
import { GlobalParamList } from '../types/rootStackParamTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * @returns 
 */
const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<User[]>([]);
  const [groupURI, setGroupURL] = useState<string>('defaultGroup');
  const [loading, setLoading] = useState(false);
  const [ addMembers, setAddMembers ] = useState(false);
  const authContext = useContext(AuthContext);
  if(!authContext){
    console.log("Auth context not defined");
    return;
  }
  const { userId } = authContext;
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const flatListRef = useRef<FlatList<User>>(null); 
  
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
            description: description,
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
      const cogID = await getCurrentUser();
      const selfData = await client.graphql({
        query: createUserGroup,
        variables: { 
          input: {
            ownerID: cogID.userId,
            userID: userId,
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
    } catch {
      Alert.alert('Error', "error uploading Image");
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

  const scrollToEnd = () => {
    // Scroll to the last item
    flatListRef.current?.scrollToIndex({
      index: members.length - 1, // The last item's index
      animated: true, // Smooth scroll
    });
    console.log('scrolled')
  };

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }
  
  const pageContent = () => {
    return (
      <View>
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
        <TouchableOpacity onPress={scrollToEnd}>
          <SearchBar userPressed={getUser} remove={members}/>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
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
        ListHeaderComponent={pageContent}
      />
      <TouchableOpacity onPress={addGroup} style={styles.buttonBlack}>
        <Text style={styles.buttonTextWhite}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateGroup;