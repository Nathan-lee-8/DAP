import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Platform, Alert,
  ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';

import client from '../client';
import { createUserGroup, createGroup, deleteGroup, updateGroup, 
  createNotification } from '../customGraphql/customMutations';
import { User } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import { SearchBar } from '../components/SearchBar';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import LinearGradient from 'react-native-linear-gradient';

/**
 * Page to allow user to Create a group with other users and customize groupname,
 * description, groupImage and privacy settings
 */
const CreateGroup = ({ navigation }: any) => {
  const [ groupName, setGroupName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ groupURI, setGroupURL ] = useState<string>('defaultGroup');
  const [ privacy, setPrivacy ] = useState('Public');
  const [ members, setMembers ] = useState<User[]>([]);

  const [ loading, setLoading ] = useState(false);
  const [ goNext, setGoNext ] = useState(false);

  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;
  
  //Triggered when CreateGroup Button Pressed. Takes user inputs and creates a group,
  // sending notifications to each member then navigates to newly created group 
  const addGroup = async () => {
    if(groupName.trim() === ''){
      Alert.alert('Error', 'Please enter a group name before creating a group');
      return;
    }

    let tempGroupID: string | undefined;
    try{ 
      setLoading(true);
      setGoNext(false);

      //Create Group
      const groupData = await client.graphql({
        query: createGroup,
        variables: {
          input: {
            groupName: groupName,
            nameLowercase: groupName.toLowerCase(),
            description: description,
            groupURL: groupURI,
            isPublic: privacy !== 'Hidden',
            type: privacy,
            memberCount: 0
          }
        },
        authMode:'userPool'
      })
      console.log("Group created Successfully");
      var groupID = groupData.data.createGroup.id;

      //Add Self
      await client.graphql({
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

      //Add Members & send notifications to each
      for(const member of members){
        await client.graphql({
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
      console.log("Self added successfully");
      if(groupURI !== 'defaultGroup') handleUploadImage(groupID);

      navigation.reset({
        index: 1,
        routes: [
            { name: 'MainTabs', params: {screen: 'Groups'} },
            { name: 'ViewGroup', params: { groupID: groupID } 
        }],
      });
    } catch {
      Alert.alert('Error', 'Failed to create group');
      if(tempGroupID){
        client.graphql({
          query: deleteGroup,
          variables: {
            input: {
              id: tempGroupID
            }
          },
          authMode:'userPool'
        }).catch(() => {});
      }
    } finally {
      setLoading(false);
    }
  }

  //uploads group Image to s3
  const handleUploadImage = async (groupID: string) => {
    try{
      const uri = await getImgURI(groupURI, 
        `public/groupPictures/${groupID}/profile/${Date.now()}.jpg`);
      if(!uri) throw new Error('Image not selected');
      await client.graphql({
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

  //Adds user to list of members to add to group
  const getUser = (user: User) => {
    if(members.includes(user)){
      return;
    }
    setMembers([...members, user]);
  }

  //Removes user from list of members to add to group
  const removeUser = (user: User) => {
    if(members.includes(user)){
      setMembers(members.filter((member) => member !== user));
    }
  }
  
  //Retrieves the local filepath to user image
  const getFilePath = async () => {
    var uri = await imagePicker();
    if(uri === null) return;
    setGroupURL(uri);
  }

  if(loading) {
    return(
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }

  //Second page to add Users to group
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
                  <Text style={[styles.postContent, {marginLeft: 10}]}>
                    {item?.firstname + ' ' + item?.lastname}
                  </Text>
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
          style={styles.navButtonContainer}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >   
          <TouchableOpacity style={styles.backButton} onPress={() => setGoNext(false)}>
            <Icon name="arrow-back" size={25}/>
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={addGroup}>
            <Text style={styles.navButtonText}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }

  //Page to set Metadata: group image, groupName, description & privacy
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

          <TouchableOpacity style={styles.privacyOptionContainer} onPress={() => setPrivacy('Public')}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-open" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Public</Text>
              <Text>Anyone can find and join.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={privacy === 'Public' ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privacyOptionContainer}  onPress={() => setPrivacy('Private')}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-closed" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Private</Text>
              <Text>Anyone can find. Request to join.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={privacy === 'Private' ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privacyOptionContainer}  onPress={() => setPrivacy('Hidden')}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-closed" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Hidden</Text>
              <Text>Invite Only.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={privacy === 'Hidden' ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.navButtonContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >   
        <TouchableOpacity style={styles.nextButton} onPress={() => setGoNext(true)}>
          <Text style={styles.navButtonText}>Next</Text>
          <Icon name="arrow-forward" size={25}/>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CreateGroup;