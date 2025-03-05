import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert,
   TextInput, FlatList, Platform, KeyboardAvoidingView
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import styles from '../styles/Styles';
import  { deleteUserGroup, updateGroup } from '../graphql/mutations';
import client from '../client';
import { UserChat } from '../API';

const EditGroup = ( {route, navigation} : any ) => {
  const group = route.params.group;
  const [ loading, setLoading ] = useState(false);
  const [ filepath, setFilepath ] = useState<string>(group.groupURL);
  const [ name, setName ] = useState<string>(group.groupName);
  const [ description, setDescription ] = useState<string>(group.description);
  const [ members, setMembers ] = useState<UserChat[]>(group.members?.items);
  const [ removedMembers, setRemovedMembers ] = useState<string[]>([]);

  const getFilePath = async () => {
    try{
      setLoading(true);
      var uri = await imagePicker();
      if(uri === null) throw new Error('No image selected');
      setFilepath(uri);      
    } catch(error: any){
      Alert.alert(error.message);
    }finally{
      setLoading(false);
    }
  }

  const handleEditGroup = async () => {
    try{
      setLoading(true);
      var currURI = await getImgURI( filepath, `public/groupPictures/${group.id}/profile/${Date.now()}.jpg`);
      await client.graphql({
        query: updateGroup,
        variables: {
          input: {
            id: group.id,
            groupName: name,
            description: description,
            groupURL: 'https://commhubimagesdb443-dev.s3.us-west-2.amazonaws.com/' + currURI
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
  
  const updateRole = (userChat: any) => {
    console.log(userChat);
  }

  const removeMember = ( item: UserChat) => {
    setRemovedMembers((removedMembers) => [...removedMembers, item.id]);
    setMembers(members.filter((member) => member.id !== item.id));
  }

  const handleGoBack = () => { 
    navigation.goBack();
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
          style={styles.input}
          value={name}
          placeholder={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.longInput}
          value={description}
          multiline={true}
          placeholder={description || 'No description'}
          onChangeText={setDescription}
        />
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
              <TouchableOpacity style={{marginRight: 10}} onPress={() => removeMember(item)}>
                <Icon name="person-remove-outline" size={18}/>
              </TouchableOpacity>
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
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >   
        <TouchableOpacity style={styles.buttonBlack} onPress={handleEditGroup}>
          <Text style={styles.buttonTextWhite}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default EditGroup;