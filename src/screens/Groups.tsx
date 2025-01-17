
import { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../styles/Styles';
import client from '../client';
import { AuthContext } from '../context/AuthContext';
import { groupsByUser } from '../graphql/queries';
import { UserGroup } from '../API';

const Groups = () => {
  const [group, setGroup] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(true);
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
      console.log("fetched group data", groupData);
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
      <Text style={styles.title}> Groups </Text>
    </View>
  );
};

export default Groups;
