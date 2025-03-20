import { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, FlatList,
   Platform, KeyboardAvoidingView, Modal } from 'react-native';

import client from '../client';
import  { deleteUserGroup, updateGroup, updateUserGroup } from '../customGraphql/customMutations';
import { UserGroup} from '../API';

import { AuthContext } from '../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import styles from '../styles/Styles';

const EditGroup = ( {route, navigation} : any ) => {
  const group = route.params.group;
  const [ loading, setLoading ] = useState(false);
  const [ filepath, setFilepath ] = useState<string>(group.groupURL);
  const [ name, setName ] = useState<string>(group.groupName);
  const [ description, setDescription ] = useState<string>(group.description);
  const [ members, setMembers ] = useState<UserGroup[]>(group.members?.items);
  const [ isPublic, setIsPublic ] = useState(group.isPublic);
  const [ removedMembers, setRemovedMembers ] = useState<string[]>([]);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ updateRoleIDs, setUpdateRoleIDs ] = useState<string[]>([]);
  const [ selectedUserGroup, setSelected ] = useState<UserGroup>();
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const getFilePath = async () => {
    var uri = await imagePicker();
    if(uri === null){ 
      Alert.alert("Alert", "No image selected")
      return;
    };
    setFilepath(uri);      
  }

  const handleEditGroup = async () => {
    try{
      setLoading(true);
      var currURI = filepath;
      if(filepath !== group.groupURL){
        var tempFilepath = await getImgURI(filepath, 
          `public/groupPictures/${group.id}/profile/${Date.now()}.jpg`)
        currURI = 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + tempFilepath;
      }
      if(name !== group.groupName || description !== group.description || 
        filepath !== group.groupURL ||group.isPublic !== isPublic 
      ){
        await client.graphql({
          query: updateGroup,
          variables: {
            input: {
              id: group.id,
              groupName: name,
              description: description,
              groupURL: currURI,
              isPublic: isPublic
            }
          },
          authMode: 'userPool'
        })
        console.log(group.id, "updated successfully");
      }
      for(const member of removedMembers){
        await client.graphql({
          query: deleteUserGroup,
          variables: {
            input: { id: member }
          },
          authMode: 'userPool'
        })
        console.log(member, "removed successfully");
      }

      for(const member of members ) { 
        if(updateRoleIDs.includes(member.id)){
          await client.graphql({
            query: updateUserGroup,
            variables: {
              input: { 
                id: member.id,
                role: member.role
              }
            },
            authMode: 'userPool'
          })
          console.log(member.id, "updated successfully");
        }
      }
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
      navigation.pop(2);
      Alert.alert('Success', 'Group updated successfully')
    }
  }

  const updateRole = (userChat: any) => {
    if(userChat.role === 'Owner'){
      var count = 0;
      for(const member of members){
        if(member.role === 'Owner'){
          count++;
        }
      }
      if(count <= 1){
        Alert.alert(
          'Error', 'Please give ownership to another member before changing Owner role'
        )
        return;
      }
    }
    setModalVisible(true);
    setSelected(userChat);
  }

  const handleOptionButton = (option : string) => {
    if (selectedUserGroup) {
      // Update the role of the selected participant
      setMembers((members) =>
        members.map((member) => {
          if(member.id === selectedUserGroup.id && member.role !== option){
            if(!updateRoleIDs.includes(member.id)){
              setUpdateRoleIDs([...updateRoleIDs, member.id]);
            }
            return {...member, role: option};
          }else{
            return member;
          }
        })
      );
    }
    setModalVisible(false);
  };

  const removeMember = ( item: UserGroup) => {
    setRemovedMembers((removedMembers) => [...removedMembers, item.id]);
    setMembers(members.filter((member) => member.id !== item.id));
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  const header = () => { 
    return (
      <View>
        <TouchableOpacity style={styles.groupImgContainer} onPress={getFilePath}>
          <ImgComponent uri={filepath} style={styles.groupImg}/>
          <Text style={styles.addImageText}>Add Img</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {marginBottom: 5}]}
          value={name}
          placeholder={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.longInput, {marginBottom: 0}]}
          value={description}
          multiline={true}
          placeholder={description || 'No description'}
          onChangeText={setDescription}
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
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
              {currUser.id !== item?.userID && item.role !== 'Owner' ? (
                <TouchableOpacity style={{marginRight: 10}} onPress={() => removeMember(item)}>
                  <Icon name="person-remove-outline" size={18}/>
                </TouchableOpacity>
              ) : (
                <View style={{width: 30}}></View>
              )}
              <ImgComponent uri={item?.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
              </View>
              <TouchableOpacity style={styles.roleContainer} onPress={() => updateRole(item)}>
                <Text style={styles.roleText}>{item.role}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        ListHeaderComponent={header()}
        keyboardShouldPersistTaps='handled'
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >   
        <TouchableOpacity style={styles.buttonBlack} onPress={handleEditGroup}>
          <Text style={styles.buttonTextWhite}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={["Owner", "Admin", "Member"]}
              keyExtractor={(option) => option}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.buttonWhite} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <TouchableOpacity style={styles.buttonBlack} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonTextWhite}>Close</Text>
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default EditGroup;