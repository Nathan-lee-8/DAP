import { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import client from '../client';
import { getGroup } from '../graphql/queries';
import { useEffect } from "react";
import { Group } from '../API'
import styles from '../styles/Styles'
import ProfilePicture from "../components/ProfilePicture";
import Icon from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { GlobalParamList } from "../types/rootStackParamTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from 'moment';

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
  }, [groupID]);

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const createGroupPost = () => {
    navigation.navigate('CreatePost', {groupID: groupID});
  }
  const clickPost = (currPostID : any) => {
    navigation.navigate('ViewPost', {postID: currPostID});
  }

  return (
    <View style={styles.container}>
      <View style={styles.groupImgContainer}>
        <ProfilePicture uri={group?.groupURL ? group?.groupURL : undefined} 
          size={100} style={styles.groupImg}/>
      </View>
      <Text style={styles.groupTitle}>{group?.groupName}</Text>
      <TouchableOpacity onPress={createGroupPost} style={{flexDirection: 'row', marginTop: -25}}>
        <TextInput
          style={styles.msgInput}
          placeholder="Post content..."
          editable={false}
        />
        <Icon name="send" size={30} style={styles.msgButton}/>
      </TouchableOpacity>
      <FlatList
        data={group?.posts?.items}
        renderItem={(item) => {
          var URL = item.item?.user?.profileURL ? item.item?.user?.profileURL : undefined;
          return(
            <TouchableOpacity style={[styles.postContainer]} onPress={() => clickPost(item.item?.id)}>
              <View style={styles.profileSection}>
                <ProfilePicture uri={URL} size={30}/>
                <View style={styles.textContainer}>
                  <Text style={styles.postAuthor}>{item.item?.user?.firstname + " " + item.item?.user?.lastname}</Text>
                </View>
              </View>
              <Text style={styles.postDate}>{moment(item?.item?.createdAt).fromNow()}</Text>
              <Text style={styles.postTitle}>{item.item?.title}</Text>
              <Text style={styles.postContent}>{item.item?.title}</Text>
              <Text>{item.item?.comments?.items.length} comments</Text>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Posts Available</Text>
          </View>
        )}
      />
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
                <Text style={styles.postAuthor}>{user?.firstname + " " + user?.lastname}</Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

export default ViewGroup;