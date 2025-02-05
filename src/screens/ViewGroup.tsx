import { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
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
  const [group, setGroup] = useState<Group>();
  const [viewMenu, setViewMenu] = useState(false);
  const [ viewMembers, setViewMembers ] = useState(false);
  const fetchCurrentData = async () => {
    try{
      const currGroup = await client.graphql({
        query: getGroup,
        variables: {
          id: groupID
        },
        authMode:'userPool'
      })
      console.log("fetched from viewgroup");
      if(currGroup.data.getGroup == null) {
        console.log("Group is null");
        return;
      }
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

  const handleGoBack = () => {
    navigation.goBack();
  }
  
  const handleMenuPress = ( option : string) => {
    if(option === 'Edit Group') handleEditGroup();
    else if(option === 'Leave Group'){
      Alert.alert('Confirm', 'Are you sure you want to leave this group?',
        [ { text: 'Cancel' }, { text: 'OK'} ]
      );
    };
  }

  const handleEditGroup = () => {
    if(group) navigation.navigate('EditGroup', {group: group})
    else Alert.alert("Group not found");
  }

  if(viewMembers){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setViewMembers(false)} style={styles.goBackButton} >
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton} >
        <Icon name="arrow-back" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setViewMenu(!viewMenu)} style={styles.menuTopRightNav} >
        <Icon name="ellipsis-horizontal-sharp" size={24} />
      </TouchableOpacity>
      <FlatList
        data={['Edit Group', 'Leave Group']}
        renderItem={(item)=>{
          if(!viewMenu) return null;
          return(
            <TouchableOpacity style={styles.menuTopRightItem} onPress={() => handleMenuPress(item.item)}>
              <Text style={{fontSize:18}}>{item.item}</Text>
            </TouchableOpacity>
          )
        }}
        style={styles.menuTopRightList}
      />
      <View style={styles.groupImgContainer}>
        <ProfilePicture uri={group?.groupURL ? group?.groupURL : undefined} 
          size={100} style={styles.groupImg}/>
      </View>
      <View style={styles.groupMembersContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.label}>{group?.groupName}</Text>
          <TouchableOpacity style={{marginLeft: 'auto', flexDirection: 'row'}} onPress={() => setViewMembers(true)}>
            <Text>{group?.members?.items.length} members </Text>
            <Icon name="arrow-forward" size={25}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{group?.description}</Text>
          <View style={{marginLeft: 'auto'}}>
            <FlatList
              key={group?.members?.items.length}
              data={group?.members?.items ? group?.members?.items.slice(0,5) : []}
              renderItem={(item) => {
                var user = item.item?.user;
                var profileURL = user?.profileURL ? user?.profileURL : undefined;
                return(
                  <ProfilePicture uri={profileURL} size={30}/>
                )
              }}
              numColumns={5}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={createGroupPost} style={{flexDirection: 'row'}}>
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
    </View>
  )
}

export default ViewGroup;