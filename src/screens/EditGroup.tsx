import { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, 
  KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import client from '../client';
import  { updateGroup } from '../customGraphql/customMutations';

import { AuthContext } from '../context/AuthContext';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const EditGroup = ( {route, navigation} : any ) => {
  const group = route.params.group;
  const [ loading, setLoading ] = useState(false);
  const [ filepath, setFilepath ] = useState<string>(group.groupURL);
  const [ name, setName ] = useState<string>(group.groupName);
  const [ description, setDescription ] = useState<string>(group.description);
  const [ isPublic, setIsPublic ] = useState(group.isPublic);
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
        filepath !== group.groupURL || group.isPublic !== isPublic 
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
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
      navigation.goBack();
      Alert.alert('Success', 'Group updated successfully')
    }
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <TouchableOpacity style={styles.groupImgContainer} onPress={getFilePath}>
          <ImgComponent uri={filepath} style={styles.groupImg}/>
          <View style={styles.addImageTextContainer}>
            <Text style={styles.addImageText}>Update Img</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {marginTop: 10}]}
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
        <View style={styles.groupPrivacyContainer}>
          <Text style={[styles.privacyText, {padding: 10}]}>Visibility</Text>

          <TouchableOpacity style={styles.privacyOptionContainer} onPress={() => setIsPublic(true)}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-open" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Public</Text>
              <Text>Anyone can find and join.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={isPublic ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.privacyOptionContainer}  onPress={() => setIsPublic(false)}>
            <Icon style={{alignSelf: 'center', marginRight: 5}} name="lock-closed" size={20}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.privacyText}>Private</Text>
              <Text>Anyone can find. Request to join.</Text>
            </View>
            <View style={styles.privacyIcon}>
              <View style={!isPublic ? styles.privacyIconSelected : null}/>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{marginTop: 'auto'}}
      >
        <TouchableOpacity style={styles.buttonBlack} onPress={handleEditGroup}>
          <Text style={styles.buttonTextWhite}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default EditGroup;