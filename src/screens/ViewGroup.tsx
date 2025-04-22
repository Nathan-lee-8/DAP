import { useState, useCallback, useContext, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal,
  RefreshControl, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import client from '../client';
import { getGroup } from '../customGraphql/customQueries';
import { createUserGroup, deleteUserGroup, deletePost, deleteGroup, createReport
 } from '../customGraphql/customMutations';
import { Group, Post, UserGroup, User } from '../API'

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles'
import ProfilePicture from "../components/ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import FormatPost from "../components/FormatPost";
import LinearGradient from "react-native-linear-gradient";
import SearchBar from "../components/SearchBar";
import ImgComponent from "../components/ImgComponent";

const ViewGroup = ( {route, navigation} : any) => {
  const groupID = route.params.groupID;
  const [ group, setGroup ] = useState<Group>();
  const [ post, setPosts ] = useState<Post[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ myUserGroup, setMyUserGroup ] = useState<UserGroup>();
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ inviteModalVisible, setInviteModalVisible ] = useState(false);
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ reportMessage, setReportMessage ] = useState("");
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const [ users, setUsers] = useState<User[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const [ options, setOptions ] = useState(['View Members', 'Report', 'Leave']);
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
      const userData = groupData.members?.items?.map((item: any) => item.user);
      if(userData) setUsers(userData);
      if(posts) setPosts(posts);
      const myUserGroup = groupData.members?.items?.find((member) => member?.user?.id === currUser.id);
      if(myUserGroup) setMyUserGroup(myUserGroup);
      if(!myUserGroup){
        if(group?.isPublic){
          setOptions(['View Members', 'Report']);
        }else {
          setOptions(['Report']);
        }
      }else if(myUserGroup?.role  === 'Owner' || myUserGroup?.role === 'Admin'){
        setOptions(['View Members', 'Invite', 'Edit', 'Delete'])
      }else if(myUserGroup?.role === 'Admin'){
        setOptions(['View Members', 'Invite', 'Edit', 'Report', 'Leave'])
      }
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
  
  const handleJoinGroup = async () => {
    if(myUserGroup !== undefined) return;

    if(group?.isPublic){
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

  const handleOptionButton = (option: string) => {
    setModalVisible(false);
    if(option === 'View Members'){
      navigation.navigate('ViewMembers', {group: group});
    }else if(option === 'Edit'){
      handleEditGroup();
    }else if(option === 'Invite'){
      setInviteModalVisible(true);
    }else if(option === 'Leave'){
      handleLeaveGroup();
    }else if(option === 'Delete'){
      handleDeleteGroup();
    }else if(option === 'Report'){
      setReportModalVisible(true);
    }else{
      Alert.alert(option, 'Not implemented yet');
    }
  }

  const handleEditGroup = () => {
    navigation.navigate('EditGroup', {group: group});
  }

  const handleLeaveGroup = () => {
    Alert.alert(
      "Leave Group",
      "Are you sure you want to leave this group?",
      [
        {
          text: "Cancel",
        },
        { text: "Leave", onPress: leaveGroup}
      ]
    );
  }

  const leaveGroup = async () => {
    const userGroupID = myUserGroup?.id;
    if(!userGroupID) return;
    try{
      await client.graphql({
        query: deleteUserGroup,
        variables: {
          input: {
            id: userGroupID
          }
        },
        authMode: 'userPool'
      });
      console.log('user removed');
      navigation.reset({
        index: 0,
        routes: [ { name: 'MainTabs', params: { screen: 'Groups' } } ]
      });
    } catch (error: any) {
      console.log('Error', error.message);
    }
  }   

  const handleInvite = async () => {
    if(addedMembers.length === 0 ) {
      Alert.alert('Error', 'No members selected');
      return;
    }
    setInviteModalVisible(false);
    const memberIDs = addedMembers.map((item: any) => item.id);
    for(const memberID of memberIDs){
      try{
        await client.graphql({
          query: createUserGroup,
          variables: {
            input: {
              userID: memberID,
              groupID: groupID,
              role: 'Member'
            }
          },
          authMode: 'userPool'
        });
        console.log('userAdded');
      } catch (error){
        console.log(error);
      }
    }
    setAddedMembers([]);
    fetchCurrentData();
    Alert.alert('Success', 'Group updated successfully');
  }

  const handleDeleteGroup = () => {
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
        },
        { text: "Delete", onPress: deleteGroupAndPosts}
      ]
    );
  }

  const deleteGroupAndPosts = async () => {
    if(!group){
      Alert.alert('Error', 'Error deleting group');
      return;
    }
    // delete all Group Posts
    const postIDs = group.posts ? group.posts?.items.map((item: any) => item.id) : [];
    for(const postID of postIDs){
      try{
        await client.graphql({
          query: deletePost,
          variables: {
            input: {
              id: postID
            }
          },
          authMode: 'userPool'
        })
        console.log(postID, " post deleted");
      } catch (error) {
        console.log(error);
      }
    }
    // delete all user Groups
    const participantIDs = group.members ? group.members?.items.map((item : any) => item.id) : [];
    for(const partID of participantIDs){
      try{
        await client.graphql({
          query: deleteUserGroup,
          variables: {
            input: {
              id: partID
            }
          },
          authMode: 'userPool'
        })
        console.log(partID, " userGroup deleted");
      } catch (error) {
        console.log(error);
      }
    }
    // Delete group
    try{
      await client.graphql({
        query: deleteGroup,
        variables: {
          input: {
            id: group.id
          }
        },
        authMode: 'userPool'
      })
      console.log(group.id, " group deleted");
    } catch (error) {
      console.log(error);
    }
    navigation.pop(2);
    Alert.alert('Success', 'Group successfully deleted')
  }

  const handleAddMember = async (user: User) => {
    setAddedMembers([...addedMembers, user]);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  const removeMember = (user: User) => {
    setAddedMembers(addedMembers => addedMembers.filter(item => item !== user));
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const handleReport = async () => {
    if(reportMessage === "") return;
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: groupID,
            reportedItemType: "Group",
            reason: reportMessage, // UPDATE REASON WITH TYPES
            message: reportMessage,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Report sent successfully');
      setReportModalVisible(false);
    }catch(error){
      Alert.alert('Error', 'Failed to send report');
    }
  }

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const headerComp = () => {
    return( 
      <View>
        <View style={styles.groupInfoContainer}>
          <Icon name="ellipsis-horizontal-sharp" style={styles.postOptions} size={20} 
            color={'black'}
            onPress={() => setModalVisible(true)}
          />
          <View>
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
            {group?.members?.items.length && group?.members?.items.length > 5 && (
              <Icon name="ellipsis-horizontal-circle-sharp" size={38} 
                style={{position: 'absolute', top: 5, left: 80}}
              />
            )}
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text>{group?.members?.items.length} members </Text>
            {group?.isPublic ? (
              <Icon name="lock-open" size={18}/>
            ) : (
              <Icon name="lock-closed" size={18}/>
            )}
          </View>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
            {myUserGroup !== undefined ? (
              <Text style={{textAlign: 'center'}}>Joined</Text>
            ) : !group?.isPublic ? (
              <Text style={{textAlign: 'center', fontSize: 12}}>Request Join</Text>
            ) : (
              <Text style={{textAlign: 'center'}}>Join Group</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={createGroupPost} style={styles.postContentTouchable}>
          <ProfilePicture style={styles.postContentImg} uri={currUser.profileURL || 'defaultUser'}/>
          <Text style={styles.postContentInput}>Post Content...</Text>
          <Icon name="send" size={30} style={styles.postContentButton}/>
        </TouchableOpacity>
      </View>
    )
  }
  
  if(!group?.isPublic && myUserGroup === undefined){
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} style={{alignSelf: 'center'}}/>
        <Text style={styles.groupHeader}>Groups</Text>
      </TouchableOpacity>
      <View style={styles.groupImgContainer}>
        <ProfilePicture style={styles.groupImg} uri={group?.groupURL || 'defaultGroup'}/>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.94)', 'rgba(255, 255, 255, 0.1)', 'rgba(0,0,0,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      </View>
        {headerComp()}
        <Text style={styles.contentText}>Private Group</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} style={{alignSelf: 'center'}}/>
        <Text style={styles.groupHeader}>Groups</Text>
      </TouchableOpacity>
      <View style={styles.groupImgContainer}>
        <ProfilePicture style={styles.groupImg} uri={group?.groupURL || 'defaultGroup'}/>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.94)', 'rgba(255, 255, 255, 0.1)', 'rgba(0,0,0,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      </View>
      <FlatList
        ListHeaderComponent={headerComp}
        data={post}
        renderItem={({item}) => {
          if(!item) return <View></View>
          return(
            <FormatPost item={item} />
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

      
      {/* Options Modal */}
      <Modal
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={options}
              keyExtractor={(option) => option}
              style={{height: 'auto', width: '100%'}}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={styles.optionButton} 
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          
          <TouchableOpacity style={styles.closeOverlayButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Invite User Modal */}
      <Modal 
        transparent={true} 
        visible={inviteModalVisible} 
        onRequestClose={() => setInviteModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.searchModalOverlay}>
          <View style={styles.searchModalHeader}>
            <TouchableOpacity onPress={() => setInviteModalVisible(false)} style={styles.closeSearchButton}>
              <Text style={styles.closeSearchButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Search User</Text>
          </View>
          <View style={styles.searchModalContainer}>
            <SearchBar userPressed={handleAddMember} remove={[...addedMembers, ...users]}/>
            <View style={{marginTop: 'auto'}}>
              <FlatList
                ref={flatListRef}
                data={addedMembers}
                horizontal
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity style={styles.removeIcon} onPress={() => removeMember(item)}>
                        <Icon name="remove-circle-outline" size={25}/>
                      </TouchableOpacity>
                      <ImgComponent style={styles.addedUserImg} uri={item.profileURL || 'defaultUser'}/>
                    </View>
                  )
                }}
                keyboardShouldPersistTaps='handled'
              />
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
            >
              <TouchableOpacity style={styles.buttonBlack} onPress={handleInvite}>
                <Text style={styles.buttonTextWhite}>Invite</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>  
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      >
        <View style={styles.reportModalOverLay}>
          <View style={styles.reportModalContainer}>
            <Icon style={styles.closeReportModalButton} name={'close-outline'} size={30} 
              onPress={() => setReportModalVisible(false)}
            /> 
            <Text style={styles.title}>Report</Text>
            <Text style={styles.reportModalText}>
              Thank you for keeping DAP communities safe. What is the purpose of this report?
            </Text>
            <TextInput
              value={reportMessage}
              onChangeText={setReportMessage}
              style={styles.reportInput}
              placeholder="Add a note"
              multiline={true}
            />
            <TouchableOpacity style={styles.reportModalButton} onPress={handleReport}>
              <Text style={{textAlign: 'center', fontSize: 18}}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ViewGroup;