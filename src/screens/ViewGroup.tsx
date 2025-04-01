import { useState, useCallback, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator,
  RefreshControl} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import client from '../client';
import { getGroup } from '../customGraphql/customQueries';
import { createUserGroup } from '../customGraphql/customMutations';
import { Group, Post, UserGroup } from '../API'

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles'
import ProfilePicture from "../components/ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import FormatPost from "../components/FormatPost";
import LinearGradient from "react-native-linear-gradient";

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
    navigation.navigate('CreatePost', {groupID: groupID, isPublic: group?.isPublic});
  }

  const handleViewMembers = () => {
    if(!group?.isPublic && myUserGroup === undefined){
      return;
    }
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
      //Send alert to group member or group admin to allow 
      Alert.alert('not implemented yet', 'send a message to the owner to add you to the group');
    }
  }


  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const headerComp = () => {
    return( 
      <View>
        <Icon name="arrow-back" size={25} style={styles.backButton} onPress={() => navigation.goBack()}/>
        <Text style={styles.groupHeader}>Groups</Text>
        <View style={styles.groupImgContainer}>
          <ProfilePicture style={styles.groupImg} uri={group?.groupURL || 'defaultGroup'}/>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.94)', 'rgba(255, 255, 255, 0.1)', 'rgba(0,0,0,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
        </View>
        <TouchableOpacity style={styles.groupInfoContainer} onPress={handleViewMembers}>
          <View style={styles.groupTextSection}>
            <Text style={styles.groupNameText}>{group?.groupName}</Text>
            <Text style={styles.groupDescriptionText}>{group?.description}</Text>
          </View>
          <View style={styles.URLSection}>
            {group?.members?.items.slice(0, 5).map((item, index) => (
              <ProfilePicture uri={item?.user?.profileURL || 'defaultUser'}
                key={index}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: index * 18,
                  height: 30, width: 30, borderRadius: 15,
                }}
              />
            ))}
            {group?.members?.items.length && group?.members?.items.length > 4 && (
              <Icon name="ellipsis-horizontal-circle-sharp" size={38} 
                style={{position: 'absolute', top: 5, left: 80}}
              />
            )}
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text>{group?.memberCount} members </Text>
            {group?.isPublic ? (
              <Icon name="lock-open" size={20}/>
            ) : (
              <Icon name="lock-closed" size={20}/>
            )}
          </View>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
            {myUserGroup !== undefined ? (
              <Text style={{textAlign: 'center'}}>Joined</Text>
            ) : group?.isPublic !== null && !group?.isPublic ? (
              <Text style={{textAlign: 'center', fontSize: 12}}>Request Join</Text>
            ) : (
              <Text style={{textAlign: 'center'}}>Join Group</Text>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity onPress={createGroupPost} style={styles.postContentTouchable}>
          <ProfilePicture style={styles.postContentImg} uri={currUser.profileURL || 'defaultUser'}/>
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
          if(!item.item) return <View></View>
          return(
            <FormatPost item={item.item} />
          )
        }}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Posts Available</Text>
          </View>
        )}
         refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchCurrentData}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#ffffff" 
          />
        }
      />
    </View>
  )
}

export default ViewGroup;