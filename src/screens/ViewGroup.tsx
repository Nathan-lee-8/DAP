import { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal,
  ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import client from '../client';
import { getGroup } from '../graphql/queries';
import { Group, Post } from '../API'
import styles from '../styles/Styles'
import ProfilePicture from "../components/ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import { GlobalParamList } from "../types/rootStackParamTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FormatPost from "../components/FormatPost";

const ViewGroup = ({route} : any) => {
  const groupID = route.params.groupID;
  const [ group, setGroup ] = useState<Group>();
  const [ post, setPosts ] = useState<Post[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ modalVisible, setModalVisible ] = useState(false);
  const options = ["Edit Group", "Create Chat", "Leave Group"];

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
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCurrentData();
    }, [])
  );
 
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} >
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

  const handleOptionPress = (option: string) => {
    setModalVisible(false);
    if(option === "Edit Group"){
      if(group) navigation.navigate('EditGroup', {group: group})
      else Alert.alert("Group not found");
    }else if( option === "Leave Group"){
      Alert.alert("Confirm", `Are you sure you want to leave ${group?.groupName}?`,
        [{text: 'Cancel'},{ text: 'Leave', onPress: leaveGroup}]
      )
    }
  }

  const leaveGroup = () => {
    Alert.alert("Not implemented yet");
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
                data={group?.members?.items ? group?.members?.items.slice(0,4) : []}
                renderItem={({ item }) => 
                  <ProfilePicture uri={item?.user?.profileURL ||'defaultUser'}/>
                }
                numColumns={5}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={createGroupPost} style={styles.postContentTouchable}>
          <Text style={styles.postContentInput}>Post Content...</Text>
          <Icon name="send" size={30} style={styles.postContentButton}/>
        </TouchableOpacity>
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
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modelOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(option) => option}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={[styles.buttonWhite, {flex: 1}]} 
                  onPress={() => handleOptionPress(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.buttonBlack} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonTextWhite}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ViewGroup;