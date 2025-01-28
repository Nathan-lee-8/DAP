import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import client from '../client';
import { getGroup } from '../graphql/queries';
import { useEffect } from "react";
import { Group } from '../API'
import styles from '../styles/Styles'
import ProfilePicture from "../components/ProfilePicture";

const ViewGroup = ({route} : any) => {
  const groupID = route.params.groupID;
  const [group, setGroup] = useState<Group | null>();
  const fetchCurrentData = async () => {
    try{
      const currGroup = await client.graphql({
        query: getGroup,
        variables: {
          id: groupID
        },
        authMode:'userPool'
      })
      console.log(currGroup.data.getGroup);
      setGroup(currGroup.data.getGroup);
    } catch (error: any) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    fetchCurrentData();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group?.groupName}</Text>
      <Text style={styles.title}>Members</Text>
      <FlatList
        data={group?.members?.items}
        renderItem={(item) => {
          var user = item.item?.user;
          var profileURL = user?.profileURL ? user?.profileURL : undefined;
          return(
            <View style={[styles.postContainer, styles.profileSection]}>
              <ProfilePicture uri={profileURL} size={30}/>
              <View style={styles.textContainer}>
              
                <Text style={styles.postAuthor}>{user?.firstname}</Text>
              </View>
            </View>
          )
        }}
      />
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={group?.posts?.items}
        renderItem={(item) => {
          return(
            <View style={[styles.postContainer, styles.profileSection]}>
              <View style={styles.textContainer}>
              
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

export default ViewGroup;