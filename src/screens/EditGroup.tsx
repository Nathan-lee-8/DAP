import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator,
   TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';
import ProfilePicture from '../components/ImgComponent';
import getImgURI from '../components/addImg';
import styles from '../styles/Styles';
import  { deleteUserGroup, updateGroup } from '../graphql/mutations';
import client from '../client';
import { UserChat } from '../API';

const EditGroup = ( {route}: any) => {
  const group = route.params.group;
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgText, setImgText] = useState("Add Img");
  const [ filepath, setFilepath ] = useState<string>(group.groupURL);
  const [ name, setName ] = useState<string>(group.groupName);
  const [ description, setDescription ] = useState<string>(group.description);
  const [ members, setMembers ] = useState<UserChat[]>(group.members?.items);
  const [ removedMembers, setRemovedMembers ] = useState<string[]>([]);

  const getFilePath = async () => {
    try{
      setImgLoading(true);
      var path = await getImgURI(`groupProfile/${group.id}/${Date.now()}_profile.jpg`);
      if(path){
        setFilepath("https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/" + path);      
        setImgText('');
      }
    } catch(error){
      console.log(error);
    }finally{
      setImgLoading(false);
    }
  }

  const handleEditGroup = async () => {
    try{
      setLoading(true);
      await client.graphql({
        query: updateGroup,
        variables: {
          input: {
            id: group.id,
            groupName: name,
            description: description,
            groupURL: filepath
          }
        },
        authMode: 'userPool'
      })
      console.log("Group updated successfully");
      for(const member of removedMembers){
        await client.graphql({
          query: deleteUserGroup,
          variables: {
            input: { id: member }
          },
          authMode: 'userPool'
        })
        console.log("Member removed successfully");
      }
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
      handleGoBack();
    }
  }

  const removeMember = ( item: UserChat) => {
    setRemovedMembers((removedMembers) => [...removedMembers, item.id]);
    setMembers(members.filter((member) => member.id !== item.id));
  }

  const navigation = useNavigation();
  const handleGoBack = () => { 
    navigation.goBack();
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />
  
  return (
    <View style={styles.container}>
      {imgLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.groupImgContainer} onPress={getFilePath}>
          <ProfilePicture uri={group?.groupURL ? group?.groupURL : 'defaultGroup'} style={styles.groupImg}/>
          <Text style={styles.addImageText}>{imgText}</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        value={name}
        placeholder={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.longInput}
        value={description}
        placeholder={description ? description : 'No description'}
        onChangeText={setDescription}
      />
      <Text>{members.length} Members</Text>
      <FlatList
        data={members}
        renderItem={(item) => {
          var user = item.item?.user;
          var profileURL = user?.profileURL ? user?.profileURL : undefined;
          return(
            <View style={[styles.postContainer, styles.profileSection]}>
              <ProfilePicture uri={profileURL ? profileURL : 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{user?.firstname + " " + user?.lastname}</Text>
              </View>
              <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => removeMember(item.item)}>
                <Icon name="person-remove-outline" size={20}/>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <TouchableOpacity style={styles.buttonBlack} onPress={handleEditGroup}>
        <Text style={styles.buttonTextWhite}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EditGroup;