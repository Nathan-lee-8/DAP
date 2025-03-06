import { useState, useCallback, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert,
  ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import client from '../client';
import { getGroup } from '../graphql/queries';
import { createUserGroup } from "../graphql/mutations";
import { Group, Post, UserGroup } from '../API'
import styles from '../styles/Styles'
import ProfilePicture from "../components/ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import FormatPost from "../components/FormatPost";
import { AuthContext } from "../context/AuthContext";

const ViewGroup = ( {route, navigation} : any) => {
  const groupID = route.params.groupID;
  const [ group, setGroup ] = useState<Group>();
  const [ post, setPosts ] = useState<Post[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ myUserGroup, setMyUserGroup ] = useState<UserGroup>()
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  const fetchCurrentData = async () => {
    try{
      const currGroup = await client.graphql({
        query: getGroup,
        variables: {
          id: groupID
        },
        authMode:'userPool'
      })
      const groupData = currGroup.data.getGroup;
      console.log("fetched from viewgroup");
      if(groupData == null) {
        console.log('error', 'Group is null');
        return;
      }
      setGroup(groupData);
      let posts = groupData.posts?.items?.filter((item): item is Post => item !== null);
      posts = posts?.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      if(posts) setPosts(posts);
      const myUserGroup = groupData.members?.items?.find((member) => member?.user?.id === currUser.id)
      if(myUserGroup) setMyUserGroup(myUserGroup);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCurrentData();
    }, [])
  );

  const createGroupPost = () => {
    navigation.navigate('CreatePost', {groupID: groupID});
  }

  const handleViewMembers = () => {
    if(group?.members) navigation.navigate('ViewMembers', {group: group});
    else Alert.alert("Unable to Retrieve member data");
  }
  
  const handleJoinGroup = async () => {
    if(myUserGroup !== undefined) return;

    if(group?.isPublic === null || group?.isPublic){
      try{
        await client.graphql({
          query: createUserGroup,
          variables: {
            input: {
              userID: currUser.id,
              role: "Member",
              groupID: groupID
            }
          },
          authMode: 'userPool'
        })
        Alert.alert('Success', 'Group joined successfully.');
        fetchCurrentData();
      } catch (error){ 
        console.log('Error', error);
      }
    }else{
      //request to join
      Alert.alert('not implemented yet');
    }
  }


  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const headerComp = () => {
    return( 
      <View>
        <View style={styles.groupImgContainer}>
          <ProfilePicture style={styles.groupImg} uri={group?.groupURL || 'defaultGroup'}/>
        </View>
        <View style={styles.groupInfoContainer}>
          <View style={styles.groupTextSection}>
            <Text style={styles.groupNameText}>{group?.groupName}</Text>
            <Text style={styles.groupDescriptionText}>{group?.description}</Text>
          </View>
          <View style={styles.groupMembersContainer}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleViewMembers}>
              <Text>{group?.members?.items.length} members </Text>
              <Icon name="arrow-forward" size={20}/>
            </TouchableOpacity>
            <FlatList
              key={group?.members?.items.length}
              data={group?.members?.items ? group?.members?.items.slice(0,3) : []}
              renderItem={({ item }) => 
                <ProfilePicture uri={item?.user?.profileURL ||'defaultUser'}/>
              }
              numColumns={5}
            />
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
              {myUserGroup !== undefined ? (
                <Text style={{textAlign: 'center'}}>Joined</Text>
              ) : group?.isPublic !== null && !group?.isPublic ? (
                <Text style={{textAlign: 'center'}}>Request Join</Text>
              ) : (
                <Text style={{textAlign: 'center'}}>Join Group</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={createGroupPost} style={styles.postContentTouchable}>
          <Text style={styles.postContentInput}>Post Content...</Text>
          <Icon name="send" size={30} style={styles.postContentButton}/>
        </TouchableOpacity>
      </View>
    )
  }
  
  if(group?.isPublic !== null && !group?.isPublic && myUserGroup === undefined){
    return (
      <View style={styles.container}>
        {headerComp()}
        <Text style={styles.contentText}>Private Group</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={headerComp}
        data={post}
        renderItem={(item) => {
          if(item.item === null) return <View></View>
          return(
            <FormatPost item={item.item} />
          )
        }}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Posts Available</Text>
          </View>
        )}
      />
    </View>
  )
}

export default ViewGroup;