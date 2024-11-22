import { useContext, useState } from 'react';
import { View, Text, Button, TextInput, Alert, ActivityIndicator, 
  StyleSheet } from 'react-native';
import { createPost } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import SelectDropdown from 'react-native-select-dropdown';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState('FreeAndForSale');

  const authContext = useContext(AuthContext);
  if(!authContext) {
    Alert.alert("ERR: Auth context not available.");
    return null;
  };
  const { userId, firstname, lastname } = authContext;

  const createUserPost = async () => {
    setLoading(true);
    try{
      const data = await client.graphql({
        query: createPost,
        variables: {
          input: {
            title: title,
            content: content,
            type: postType,
            userID: userId,
            userPostsId: userId,
          }
        },
      }); 
      console.log(data);
      setTitle('');
      setContent('');
      Alert.alert("POSTED !")
    } catch (error: any){
      console.log(error);
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <Text>Create Post</Text>
      <SelectDropdown data={['FreeAndForSale', 'JobListings', 'VolunteerOpportunities']}
        onSelect={(selectedItem) => {
          setPostType(selectedItem);
        }}
        renderButton={(selectedItem) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem) || 'FreeAndForSale'}
              </Text>
            </View>
          );
        }}
        renderItem={(item) => {
          return (
            <View style={styles.dropdownItemStyle}>
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <TextInput
        placeholder="Title"
        autoCapitalize='words'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder='Content'
        value={content}
        onChangeText={setContent}
      />
      <Button title="Create Post" onPress={createUserPost}/>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 180,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#151E26',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#151E26',
  },
});

export default CreatePost;