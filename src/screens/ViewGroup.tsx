import { useState, useLayoutEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import client from '../client';
import { getGroup } from '../graphql/queries';
import { useEffect } from "react";
import { Group, Post } from '../API'
import styles from '../styles/Styles'
import ProfilePicture from "../components/ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { GlobalParamList } from "../types/rootStackParamTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FormatPost from "../components/FormatPost";

const ViewGroup = ({route} : any) => {
  const groupID = route.params.groupID;
  const [group, setGroup] = useState<Group>();
  const [post, setPosts] = useState<Post[]>([]);
  const [viewMenu, setViewMenu] = useState(false);
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
      let posts = currGroup.data.getGroup.posts?.items?.filter((item): item is Post => item !== null);
      posts = posts?.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      if(posts) setPosts(posts);
    } catch (error: any) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    fetchCurrentData();
  }, [groupID]);

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setViewMenu(!viewMenu)} >
          <Icon name="ellipsis-horizontal-sharp" size={30} color={'black'}/>
        </TouchableOpacity>
      ),
    })
  })

  const createGroupPost = () => {
    navigation.navigate('CreatePost', {groupID: groupID});
  }

  const handleViewMembers = () => {
    if(group?.members) navigation.navigate('ViewMembers', {userData: group?.members.items});
    else Alert.alert("Unable to Retrieve member data");
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

  const headerComp = () => {
    return( 
      <View>
        <View style={styles.groupImgContainer}>
          <ProfilePicture uri={group?.groupURL ? group?.groupURL : 'defaultGroup'} style={styles.groupImg}/>
        </View>
        <View style={styles.groupMembersContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>{group?.groupName}</Text>
            <TouchableOpacity style={{marginLeft: 'auto', flexDirection: 'row'}} onPress={handleViewMembers}>
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
                    <ProfilePicture uri={profileURL? profileURL : 'defaultUser'}/>
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
      </View>
    )
  }

  return (
    <View style={styles.container}>
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