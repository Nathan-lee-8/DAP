import { useContext, useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity, 
  ActivityIndicator } from 'react-native';
import { createPost } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../styles/Styles';

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
  const { userId } = authContext;

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
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <SelectDropdown 
        data={['FreeAndForSale', 'JobListings', 'VolunteerOpportunities']}
        onSelect={(selectedItem) => setPostType(selectedItem)}
        renderButton={(selectedItem) => (
          <TouchableOpacity style={styles.dropdownButtonStyle} >
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem) || 'FreeAndForSale'}
            </Text>
          </TouchableOpacity>
        )}
        renderItem={(item) => (
          <View style={styles.dropdownItemStyle}>
            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
          </View>
        )}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        autoCapitalize='words'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder='Content'
        value={content}
        onChangeText={setContent}
      />
      <Button title="Create Post" onPress={createUserPost}/>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default CreatePost;