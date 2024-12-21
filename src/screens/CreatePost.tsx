import { useContext, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, 
  ActivityIndicator } from 'react-native';
import { createPost } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import styles from '../styles/Styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TopTabParamList } from '../types/rootStackParamTypes';

const TopTabStack = createMaterialTopTabNavigator<TopTabParamList>();

const CreatePostLogic = ({ route }: any) => {
  const { category: postType } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  if(!authContext) {
    Alert.alert("ERR: Auth context not available.");
    return null;
  };
  const { userId } = authContext;
  const createUserPost = async () => {
    setLoading(true);
    if(title === '') {
      Alert.alert("Title is empty");
      setLoading(false);
      return;
    }else if(content === '') {
      Alert.alert("Content is empty");
      setLoading(false);
      return;
    }
    try{
      const data = await client.graphql({
        query: createPost,
        variables: {
          input: {
            title: title,
            content: content,
            type: postType,
            userID: userId,
          }
        },
        authMode: 'userPool'
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
      <TouchableOpacity style={styles.button} onPress={createUserPost} >
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const CreatePost = () => {
  return (
    <TopTabStack.Navigator>
      <TopTabStack.Screen name="Market" component={CreatePostLogic} initialParams={{category: "Market"}}
        options={{title: 'Market'}} />
      <TopTabStack.Screen name="Jobs" component={CreatePostLogic} initialParams={{category: "Jobs"}}
        options={{title: 'Jobs'}} />
      <TopTabStack.Screen name="Volunteer" component={CreatePostLogic} initialParams={{category: "Volunteer"}}
        options={{title: 'Volunteer'}} />
    </TopTabStack.Navigator>
  );
}

export default CreatePost;