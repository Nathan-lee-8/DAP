import { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, 
  KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

import client from '../client';
import  { updateGroup } from '../customGraphql/customMutations';
import { moderateText } from '../customGraphql/customQueries';

import { AuthContext } from '../context/AuthContext';
import ImgComponent from '../components/ImgComponent';
import { imagePicker, getImgURI } from '../components/addImg';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

/**
 * Displays the group name, image, description and privacy and allows the user
 * to make changes to each of these fields.
 * 
 * @param group - The group that is being edited
 */
const EditGroup = ( {route, navigation} : any ) => {
  const group = route.params.group;
  const [ loading, setLoading ] = useState(false);
  const [ filepath, setFilepath ] = useState<string>(group.groupURL);
  const [ name, setName ] = useState<string>(group.groupName);
  const [ description, setDescription ] = useState<string>(group.description);
  const [ type, setType ] = useState(group.type);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  //If filepath is not matching, uploads to s3 and returns new filepath. Then checks if name, 
  //description, image, or privacy is changed and updates the group. Navigates back to group.
  const handleEditGroup = async () => {
    //show success message if user saves with no updates 
    if(name === group.groupName && description === group.description 
      && filepath === group.groupURL && group.type === type
    ){
      Alert.alert('Success', 'Group updated successfully')
      return;
    }

    //moderate groupName if updated
    if(name !== group.groupName){
      const flagged = await textModeration(name);
      if(flagged){
        Alert.alert('Warning', 'Group name is flagged for sensitive content. Please remove ' + 
          'sensitive content and review our community guidelines before posting.'
        )
        return;
      }
    }
    //moderate description if updated
    if(description !== group.description){
      const descriptionFlagged = await textModeration(description);
      if(descriptionFlagged){
        Alert.alert('Warning', 'Description is flagged for sensitive content. Please remove ' + 
          'sensitive content and review our community guidelines before posting.'
        )
        return;
      }
    }

    try{
      setLoading(true);
      var currURI = filepath;
      if(filepath !== group.groupURL){
        var tempFilepath = await getImgURI(filepath, 
          `public/processing/groupPictures/${group.id}.jpg`)
        if(tempFilepath) currURI = tempFilepath;
      }
      if(name !== group.groupName || description !== group.description || 
        filepath !== group.groupURL || group.type !== type 
      ){
        await client.graphql({
          query: updateGroup,
          variables: {
            input: {
              id: group.id,
              groupName: name,
              nameLowercase: name.toLowerCase(),
              description: description,
              groupURL: currURI,
              isPublic: type !== 'Hidden',
              type: type
            }
          },
          authMode: 'userPool'
        })
        Alert.alert('Success', 'Group updated successfully')
      }
    } catch {
      Alert.alert('Error', 'There was an issue updating the group');
    } finally{
      setLoading(false);
      navigation.goBack();
    }
  }

  //Opens image picker to update group image
  const getFilePath = async () => {
    var uri = await imagePicker();
    if(uri === null){ 
      Alert.alert("Alert", "No image selected")
      return;
    };
    setFilepath(uri);      
  }

  //uses openAI textmoderation to moderate text and return whether that text should be 
  //flagged or not
  const textModeration = async (name: string) => {
    try{
      const data = await client.graphql({
        query: moderateText,
        variables:{
          text: name,
        }
      })
      const modResults = data.data.moderateText;
      return modResults ? modResults.flagged : true;
    } catch (err) {
      console.log('Error', err);
    }
    return true;
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