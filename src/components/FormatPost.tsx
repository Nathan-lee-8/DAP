import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Alert, 
  Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { GlobalParamList, LoggedInParamList } from "../types/rootStackParamTypes";
import { Post, Group } from "../API";
import moment from "moment";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import { deletePost, deleteComment } from "../graphql/mutations";
import client from "../client";

const FormatPost = ( {item, groupData} : {item : Post, groupData?: Group[]}) => {
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const nav2 = useNavigation<NativeStackNavigationProp<LoggedInParamList>>();
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  var options = ["Report"];
  if(item.userID === currUser.id){
    options = ["Report", "Edit", "Delete"];
  }

  const clickPost = (item : string) => {
    navigation.navigate('ViewPost', { postID: item });
  }
  const visitProfile = (item : any) => {
    if(item.user.id === currUser.id){
      nav2.navigate('Profile');
    }else{
      navigation.navigate('ViewProfile', { user: item.user });
    }
  }

  const getGroupName = ( id? : string) => {
    const res = groupData?.flatMap(group => {
      if(group.id === id){
        return group.groupName;
      }
    })
    return res;
  }

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (width * 0.88)); // Calculate the index of the current image
    setCurrentIndex(index);
  };

  const handleShare = () => {
    Alert.alert('Not implemented')
  }

  //delete all post and comments
  const handleDelete = async () => {
    if(item.comments){
      item.comments.items.map( async (comment: any) => {
        try{
          await client.graphql({
            query: deleteComment,
            variables: {
              input: {
                id: comment.id
              }
            },
            authMode: 'userPool'
          });
          console.log(comment.id, "successfully deleted");
        }catch (error : any){
          console.log(error);
        }
      })
    }
    if(item){
      try{
        await client.graphql({
          query: deletePost,
          variables: {
            input: {
              id: item.id
            }
          },
          authMode: 'userPool'
        });
        console.log(item.id, "successfully deleted");
      }catch (error : any){
        console.log(error);
      }
    }
  }

  const handleOptionButton = (option: string) => {
    setModalVisible(false);
    if(option === "Edit"){
      navigation.navigate('EditPost', { currPost: item});
    }else if(option === "Delete"){
      Alert.alert('Alert','Are you sure you would like to delete this', [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => handleDelete() }
      ])
    }
    else{
      Alert.alert(option, "not implemented");
    }
  }
  
  return (  
    <View style={styles.postContainer}>
      <Icon name="ellipsis-horizontal-sharp" style={styles.postOptions} size={20} 
        color={'black'}
        onPress={() => setModalVisible(true)}
      />
      {item?.user?.firstname ? (
        <TouchableOpacity style={styles.profileSection} onPress={() => clickPost(item.id)}> 
          <TouchableOpacity onPress={() => visitProfile(item)}>
            <ImgComponent uri={item.user.profileURL} style={styles.postProfileImg}/>
          </TouchableOpacity>
          <View style={styles.profileText}>
            {groupData ? (
              <View style={styles.postAuthor}>
                <Text style={styles.bold} onPress={() => visitProfile(item)}>
                  {item.user.firstname + " " + item.user.lastname}
                </Text>
                <Text> posted in </Text>
                <Text style={styles.bold} onPress={() => navigation.navigate('ViewGroup', {groupID: item.groupID})}>
                  {getGroupName(item.groupID)}
                </Text>
              </View>
            ) : (
              <Text>{item.user.firstname + " " + item.user.lastname}</Text>
            )}
            <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.postAuthor}>
          <Text style={styles.bold} onPress={() => navigation.navigate('ViewGroup', {groupID: item.groupID})}>
            {getGroupName(item.groupID)}
          </Text>
      </View>
      )}
      
      <TouchableOpacity  onPress={ () => clickPost(item.id)}>
        <Text style={styles.postContent} numberOfLines={5}>{item.content}</Text>
      </TouchableOpacity>
      {item.postURL &&
        <View>
          <FlatList
            data={item.postURL}
            renderItem={({ item }) => (
              <View>
                <ImgComponent uri={item || 'defautUser'} 
                  style={{
                    width: width * 0.90,
                    height: 200,
                    marginRight: 10,
                  }} 
                />
              </View>
            )}
            horizontal={true}
            contentContainerStyle={styles.postImgContainer}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.paginationContainer}>
            {item.postURL.length > 1 && item?.postURL.map((_, index) => (
              <View key={index} style={[ styles.dot, currentIndex === index && styles.activeDot ]}>
              </View>
            ))}
          </View>
        </View>
      }

      <TouchableOpacity style={styles.interactSection} onPress={() => clickPost(item.id)}>
        <View style={styles.commentSection}>
          <Icon name="chatbubble-outline" size={15}/>
          <Text> {item.comments?.items.length}</Text>
        </View>
        <TouchableOpacity style={styles.shareSection} onPress={handleShare}>
          <Icon name="arrow-redo-outline" size={15}/>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.postModelOverlay}>
          <View style={styles.postModalContainer}>
            <FlatList
              data={options}
              keyExtractor={(option) => option}
              renderItem={({ item: option }) => (
                <TouchableOpacity 
                  style={[styles.buttonWhite, {paddingHorizontal: 100}]} 
                  onPress={() => handleOptionButton(option)}
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
};

export default FormatPost;