
import { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles/Styles';
import client from '../client';
import { AuthContext } from '../context/AuthContext';
import { groupsByUser } from '../graphql/queries';
import { UserGroup } from '../API';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList } from '../types/rootStackParamTypes';
import ProfilePicture from '../components/ProfilePicture';

const Groups = () => {
  const [group, setGroup] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
      if(!authContext) {
          console.log("Auth context not defined");
          return null;
      }
  const { userId } = authContext;
  
  const fetchGroups = async () => {
    setLoading(true);
    try{
      const groups = await client.graphql({
        query: groupsByUser,
        variables: { userID: userId },
        authMode: 'userPool'
      });
      const groupData = groups.data.groupsByUser.items;
      console.log("fetched groups data");
      setGroup(groupData);
    } catch (error: any) {
      console.error("Error fetching user groups:", error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);
  
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

  const createGroup = () => {
    navigation.navigate('CreateGroup');
  }

  const viewGroup = (item: any) => {
    navigation.navigate('ViewGroup', { groupID: item.group.id });
  }

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={createGroup}>
        <Icon name="add-circle-outline" size={30}/>
      </TouchableOpacity>
      <FlatList
        data={group}
        renderItem={({ item }) => {
          var groupURL = item.group?.groupURL ? item.group?.groupURL : undefined;
          return (
          <TouchableOpacity onPress={() => viewGroup(item)}>
            <View style={styles.postContainer}>
              <View style={styles.profileSection}>
                  
                <ProfilePicture uri={groupURL} size={45}/>
                <View style={styles.textContainer}>
                  <Text style={styles.groupTitle}>{item.group?.groupName}</Text>
                  <Text style={styles.postContact}>description here</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}}
      />
    </View>
  );
};

export default Groups;
