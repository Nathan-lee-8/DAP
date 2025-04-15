import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Alert, 
  Modal } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalParamList } from "../types/rootStackParamTypes";

import client from "../client";
import { deletePost, deleteComment } from "../customGraphql/customMutations";
import { Post, Group } from "../API";

import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";
import Comments from './ListComments';

const FormatPost = ( {item, groupData} : {item : Post, groupData?: Group[]}) => {
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const { width } = Dimensions.get('window');
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ imageModalVisible, setImageModalVisible ] = useState(false);
  const [ commentModalVisible, setCommentModalVisible ] = useState(false);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  var options = ["Report"];
  if(item.user?.id === currUser.id || item.userID === currUser.id){
    options = ["Edit", "Delete"];
  }

  const clickPost = (itemID : string) => {
    navigation.navigate('ViewPost', { postID: itemID });
  }
  
  const visitProfile = (item : any) => {
    if(item.user.id === currUser.id) return;
    navigation.navigate('ViewProfile', { userID: item.user.id });
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
          console.log(comment.id, "successfully deleted comment");
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
        console.log(item.id, "successfully deleted post");
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
                <Text style={styles.bold} 
                  onPress={() => visitProfile(item)}
                  numberOfLines={1}
                >
                  {item.user.firstname + " " + item.user.lastname}
                </Text>
                <Text> posted in </Text>
                <Text style={[styles.bold, {flexShrink: 1}]} 
                  onPress={() => navigation.navigate('ViewGroup', {groupID: item.groupID})}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
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
              <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                <ImgComponent uri={item || 'defautUser'} 
                  style={{
                    width: width - 30,
                    height: 200,
                  }} 
                />
              </TouchableOpacity>
            )}
            horizontal={true}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
          />
          <View style={styles.paginationContainer}>
            {item.postURL.length > 1 && item?.postURL.map((_, index) => (
              <View key={index} style={[ styles.dot, currentIndex === index && styles.activeDot ]}/>
            ))}
          </View>
        </View>
      }

      <TouchableOpacity style={styles.interactSection} onPress={() => clickPost(item.id)}>
        <View style={styles.commentSection}>
          <Icon name="chatbubble-outline" size={15}/>
          <Text> {item.commentCount}</Text>
        </View>
        <TouchableOpacity style={styles.shareSection} onPress={handleShare}>
          <Icon name="arrow-redo-outline" size={15}/>
        </TouchableOpacity>
      </TouchableOpacity>

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

      <Modal 
        animationType="slide"
        transparent={true} 
        visible={imageModalVisible} 
        onRequestClose={() => setImageModalVisible(false)}  
      >
        <View style={styles.imageOverlay}>
          <View style={styles.imageModalContainer}>
            <View style={styles.imageModalHeader}>
              <Icon style={styles.editProfileButton} name="close-outline" size={40}
                onPress={() => setImageModalVisible(false)}
              />
            </View>
            <FlatList
              data={item.postURL}
              renderItem={({ item }) => (
                <View>
                  <ImgComponent uri={item || 'defautUser'} 
                    style={{
                      width: width,
                      height: '100%'
                    }} 
                    resizeMode={"contain"}
                  />
                </View>
              )}
              horizontal={true}
              onScroll={onScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="center"
            />
            <View style={styles.paginationContainer}>
              {item.postURL && item?.postURL.length > 1 && item?.postURL?.map((_, index) => (
                <View key={index} style={[ styles.dot, currentIndex === index && styles.activeDot ]}/>
              ))}
              <Icon name="chatbubble-outline" size={40} style={styles.imageCommentIcon} color={'grey'}
                onPress={() => setCommentModalVisible(true)}
              />
            </View>
            <Modal 
              animationType="slide"
              transparent={true} 
              visible={commentModalVisible} 
              onRequestClose={() => setCommentModalVisible(false)}  
            >
              <View style={styles.commentModalOverlay}>
                <TouchableOpacity style={styles.commentModalHeader} onPress={() => setCommentModalVisible(false)}/>
                <View style={styles.commentModalContainer}>
                  <Text style={styles.title}>Comments</Text>
                  <Comments postID={item.id}/>
                </View>
              </View>
            </Modal>

          </View>
        </View>
      </Modal>
    </View>
  )
};

export default FormatPost;