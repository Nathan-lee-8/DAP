import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator,
   TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';
import ProfilePicture from '../components/ProfilePicture';
import { getImgURI } from '../components/addImg';
import styles from '../styles/Styles';
import  { updateGroup } from '../graphql/mutations';
import client from '../client';

const EditGroup = ( {route}: any) => {
  const group = route.params.group;
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgText, setImgText] = useState("Add Img");
  const [ filepath, setFilepath ] = useState<string>(group.groupURL);
  const [ name, setName ] = useState<string>(group.groupName);
  const [ description, setDescription ] = useState<string>(group.description);
  //const [ members, setMembers ] = useState<string[]>(group.members?.items?.map((member: any) => member.id));

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
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
      handleGoBack();
    }
  }

  const navigation = useNavigation();
  const handleGoBack = () => { 
    navigation.goBack();
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton} >
        <Icon name="arrow-back" size={24} />
      </TouchableOpacity>
      {imgLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.groupImgContainer} onPress={getFilePath}>
          <ProfilePicture uri={group?.groupURL ? group?.groupURL : undefined} 
            size={100} style={styles.groupImg}/>
          <Text style={styles.addImageText}>{imgText}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.label}>Group Name: </Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Description: </Text>
      <TextInput
        style={styles.longInput}
        value={description}
        placeholder={description ? description : 'No description'}
        onChangeText={setDescription}
      />
      <Text>{group.members?.items?.length} Members</Text>
      <FlatList
        data={group?.members?.items}
        renderItem={(item) => {
          var user = item.item?.user;
          var profileURL = user?.profileURL ? user?.profileURL : undefined;
          return(
            <View style={[styles.postContainer, styles.profileSection]}>
              <ProfilePicture uri={profileURL} size={30}/>
              <View style={styles.textContainer}>
                <Text style={styles.postAuthor}>{user?.firstname + " " + user?.lastname}</Text>
              </View>
              <TouchableOpacity style={{marginLeft: 'auto'}}>
                <Icon name="person-remove-outline" size={20}/>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <TouchableOpacity style={styles.createGroupButton} onPress={handleEditGroup}>
        <Text style={styles.createGroupButtonText}>Save Changes</Text>
        <Icon name="arrow-forward-circle-outline" size={25}/>
      </TouchableOpacity>
    </View>
  )
}

export default EditGroup;