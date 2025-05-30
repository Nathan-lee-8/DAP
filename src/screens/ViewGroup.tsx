import { useState, useCallback, useContext, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal,
  RefreshControl, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import client from '../client';
import { getGroup, postsByDate } from '../customGraphql/customQueries';
import { createUserGroup, deleteUserGroup, deletePost, deleteGroup, createReport,
   createNotification, deleteNotification} from '../customGraphql/customMutations';
import { Group, Post, UserGroup, User, Notification, ModelSortDirection } from '../API'

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
  const [ loading, setLoading ] = useState(true);
  const [ group, setGroup ] = useState<Group>();
  const [ post, setPosts ] = useState<Post[]>([]);
  const [ postNextToken, setPostNextToken ] = useState<string | null | undefined>(null);
  const [ users, setUsers] = useState<User[]>([]);
  const [ myUserGroup, setMyUserGroup ] = useState<UserGroup>();
  const [ options, setOptions ] = useState(['Report']);
  const [ requestButtonText, setRequestButtonText ] = useState("Join");
  const [ notifications, setNotifications] = useState<Notification[]>([]);

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ inviteModalVisible, setInviteModalVisible ] = useState(false);
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ notificationModalVisible, setNotificationModalVisible ] = useState(false);

  const [ reportMessage, setReportMessage ] = useState("");
  const [ addedMembers, setAddedMembers ] = useState<User[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) {
    Alert.alert('Error', 'Unable to view group');
    navigation.goBack();
    return;
  }

  useFocusEffect(
    useCallback(() => {
      fetchCurrentData();
    }, [])
  );

  const fetchCurrentData = async () => {
    try{
      //Fetch group data
      const currGroup = await client.graphql({
        query: getGroup,
        variables: {
          id: groupID
        },
        authMode:'userPool'
      })
      
      //Set Group data, return to previous page on error
      const groupData = currGroup.data.getGroup;
      if(groupData == null) {
        Alert.alert('Error', 'Unable to view group');
        navigation.goBack();
        return;
      }
      setGroup(groupData);

      //fetch current posts and set posts & nextToken state
      const currPosts = await client.graphql({
        query: postsByDate,
        variables: {
          groupID: groupID,
          sortDirection: ModelSortDirection.DESC,
          limit: 10,
          nextToken: postNextToken
        }
      })
      setPostNextToken(currPosts.data.postsByDate.nextToken);
      setPosts(currPosts.data.postsByDate.items);

      //get User Data to as array for members in group
      const userData = groupData.members?.items?.map((item: any) => item.user);
      if(userData) setUsers(userData);

      //Get My User Group to see role & set options based on role
      const myUserGroup = groupData.members?.items?.find((member) => 
        member?.user?.id === currUser.id
      );
      if(myUserGroup){ //already in the group
        setMyUserGroup(myUserGroup)
        setRequestButtonText("Joined");
        if(myUserGroup?.role  === 'Owner' || myUserGroup?.role === 'Admin'){
          setOptions(['View Members', 'Invite', 'Edit', 'Delete'])
        }else if(myUserGroup?.role === 'Admin'){
          setOptions(['View Members', 'Invite', 'Edit', 'Report', 'Leave'])
        }else{
          setOptions(['View Members', 'Report', 'Leave'])
        }
      }else{ //not part of group
        if(groupData.type === 'Public'){
          setOptions(['View Members', 'Report']);
          setRequestButtonText('Join Group')
        }else{
          setOptions(['Report']);
          setRequestButtonText('Request Join')
        }
      }

      //Filter out null values and set notifications
      const validNotifications = groupData.notifications?.items.filter(
        (item): item is Notification => item?.targetUser != null
      ) || [];
      setNotifications(validNotifications);

      //see if user has already requested to join group
      groupData.notifications?.items.map((item) => {
        if(item?.targetUser?.id === currUser.id){
          setRequestButtonText("Requested");
        }
      })
    } catch (error: any) {
      Alert.alert('Error', 'Could not find Group');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }

  //Navigate to create Post page
  const createGroupPost = () => {
    navigation.navigate('CreatePost', {groupID: groupID, isPublic: group?.isPublic});
  }
  
  const handleJoinGroup = async () => {
    if(myUserGroup !== undefined || requestButtonText === 'Requested') return;

    if(group?.type === 'Public'){
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
      }catch(error){
        Alert.alert('Error', 'Issue joining Group');
      }
      group?.members?.items.map(async (member) => {
        if(member?.role === 'Admin' || member?.role === 'Owner'){
          client.graphql({
            query: createNotification,
            variables: {
              input: {
                type: 'Group',
                content: currUser.firstname + " " + currUser.lastname 
                  + ' has joined ' + group.groupName,
                userID: member.userID,
                groupID: group.id,
                onClickID: group.id
              }
            },
            authMode: 'userPool'
          }).catch(() => {})
        }
      })
    }else{
      setRequestButtonText('Requested');
      group?.members?.items.map(async (member) => {
        if(member?.role === 'Admin' || member?.role === 'Owner'){
          client.graphql({
            query: createNotification,
            variables: {
              input: {
                type: 'Group',
                content: currUser.firstname + " " + currUser.lastname 
                  + ' has requested to join ' + group.groupName,
                userID: member.userID,
                groupID: groupID,
                targetUserID: currUser.id,
                onClickID: group.id
              }
            },
            authMode: 'userPool'
          }).catch(() => {})
        }
      })
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
      "Leave Group", "Are you sure you want to leave this group?",
      [
        { text: "Cancel" },
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
      navigation.reset({
        index: 0,
        routes: [ { name: 'MainTabs', params: { screen: 'Groups' } } ]
      });
    } catch (error: any) {
      Alert.alert('Error', 'There was an issue leaving the group');
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
        client.graphql({
          query: createNotification,
          variables: {
            input: {
              type: 'Group',
              content: currUser.firstname + " " + currUser.lastname
                + ' added you to ' + group?.groupName,
              userID: memberID,
              groupID: groupID,
              onClickID: groupID
            }
          },
          authMode: 'userPool'
        }).catch(() => {});
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
      "Delete Group", "Are you sure you want to delete this group?",
      [
        { text: "Cancel" },
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

  const handleDeleteNotification = async (itemID: string) => {
    setNotifications(prev => prev.filter(item => item.id !== itemID));
    try{
      await client.graphql({
        query: deleteNotification,
        variables: {
          input: {
            id: itemID
          }
        },
        authMode: 'userPool'
      })
    }catch(error){
      Alert.alert('Error', 'An issue occured while deleting the notification')
    }
  }

  const handleAcceptRequest = async (item: Notification) => {
    if(!item?.targetUser){
      Alert.alert('Error', 'Error accepting request');
      return;
    }
    try{
      await client.graphql({
        query: createUserGroup,
        variables: {
          input: {
            userID: item?.targetUser?.id,
            groupID: groupID,
            role: 'Member'
          }
        },
        authMode: 'userPool'
      })
      await client.graphql({
        query: deleteNotification,
        variables: {
          input: {
            id: item.id
          }
        },
        authMode: 'userPool'
      })
      fetchCurrentData();
      Alert.alert('Success', 'Request accepted');
    }catch(error){
      Alert.alert('Error', 'There was an issue accepting this request');
    }
  }

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const headerComp = () => {
    return( 
      <View>
        <View style={styles.groupInfoContainer}>
          {group?.type === 'Private' && (myUserGroup?.role === 'Owner' || myUserGroup?.role === 'Admin') && 
            <Icon name="notifications-outline" size={20} style={styles.groupNotificationIcon}
              color={group?.notifications && group?.notifications?.items.length > 0 ? 'blue' : 'black'}
              onPress={() => setNotificationModalVisible(true)}
            />
          }
          <Icon name="ellipsis-horizontal-sharp" style={styles.groupOptionsButton} 
            size={20} 
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
            {group?.type === 'Public' ? (
              <Icon name="lock-open" size={18}/>
            ) : group?.type === 'Private' ? (
              <Icon name="lock-closed" size={18}/>
            ) : []}
          </View>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
            <Text>{requestButtonText}</Text>
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
  
  if(myUserGroup === undefined && group?.type !== 'Public'){
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

      {/* Notification Modal */}
      <Modal 
        transparent={true} 
        visible={notificationModalVisible} 
        onRequestClose={() => setNotificationModalVisible(false)}  
      >
        <View style={styles.notificationModalOverlay}>
          <View style={styles.notificationModalContainer}>
            <Icon style={styles.closeReportModalButton} name={'close-outline'} size={30} 
              onPress={() => setNotificationModalVisible(false)}
            /> 
            <Text style={styles.title}>Requests</Text>
            <FlatList
              data={notifications}
              renderItem={({item}) => 
                <View style={styles.notificationItem}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ImgComponent uri={item.targetUser?.profileURL || 'default'}/>
                    <Text style={{fontSize: 20, marginLeft: 10}}>
                      {item.targetUser?.firstname + " " + item.targetUser?.lastname}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                    <TouchableOpacity style={styles.acceptJoinButton}
                      onPress={() => handleAcceptRequest(item)}
                    >
                      <Text>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectJoinButton} 
                      onPress={() => handleDeleteNotification(item.id)}
                    >
                      <Text style={{color: 'red'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              ListEmptyComponent={
                <View>
                  <Text style={styles.noResultsMsg}>No Requests</Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ViewGroup;