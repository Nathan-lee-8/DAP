import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Alert, TextInput,
  Modal } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, useDerivedValue,
  runOnJS } from 'react-native-reanimated';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalParamList } from "../types/rootStackParamTypes";

import client from "../client";
import { deletePost, deleteComment, createReport } from "../customGraphql/customMutations";
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
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ reportMessage, setReportMessage ] = useState("");
  const [ options, setOptions ] = useState(["Report"]);
  const [ customPadding, setCustomPadding ] = useState(310);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  useEffect(() => {
    if(item.user?.id === currUser.id || item.userID === currUser.id){
      setOptions(["Edit", "Delete"]);
    }
  }, [currUser])

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

  const handleShare = async () => {
    try {
      // Download all media
      const downloadedFiles = item.postURL
        ? await Promise.all(item.postURL
          .filter((url): url is string => typeof url === 'string')
          .map(downloadMediaToLocal))
        : [];
  
      const shareOptions = {
        title: 'Check out this post!',
        message: item.content,
        urls: downloadedFiles.length > 0 ? downloadedFiles : undefined,
      };
  
      await Share.open(shareOptions);
    } catch (err) {
      console.log('Share error:', err);
    }
  }

  const downloadMediaToLocal = async (url: string): Promise<string> => {
    const filename = url.split('/').pop() || `file_${Date.now()}`;
    const localPath = `${RNFS.TemporaryDirectoryPath}${filename}`;
  
    await RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise;
    return `file://${localPath}`;
  };

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
    }else if(option === "Report"){
      setReportModalVisible(true);
    }else{
      Alert.alert(option, "not implemented");
    }
  }

  const handleReport = async () => {
    if(reportMessage === "") return; 
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: item.id,
            reportedItemType: "Post",
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

  const heightPercent = useSharedValue(70);
  const panComments = Gesture.Pan().onUpdate((event) => {
    if (event.translationY < -100) {
      heightPercent.value = withTiming(92);
    } else if (event.translationY > 100) {
      if(event.translationY > 250 && heightPercent.value === 70){
        runOnJS(setCommentModalVisible)(false);
      }else{
        heightPercent.value = withTiming(70);
      }
    }
  })

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${heightPercent.value}%`,
  }));

  useDerivedValue(() => {
    if (heightPercent.value >= 90) {
      runOnJS(setCustomPadding)(120);
    } else {
      runOnJS(setCustomPadding)(310);
    }
  }, [heightPercent]);
  
  return (  
    <View style={styles.postContainer}>
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
                <Text style={styles.bold} 
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
          <Icon name="ellipsis-horizontal-sharp" style={styles.postOptions} size={20} 
            color={'black'}
            onPress={() => setModalVisible(true)}
          />
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

      {/* Option Modal */}
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

      {/* Image Display Modal */}
      <Modal 
        animationType="slide"
        transparent={true} 
        visible={imageModalVisible} 
        onRequestClose={() => setImageModalVisible(false)}  
      >
        <View style={styles.imageOverlay}>
          <View style={styles.imageModalContainer}>
            <View style={styles.imageModalHeader}>
              <Icon style={styles.closeImageModal} name="close-outline" size={40}
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
                <GestureDetector gesture={panComments}>
                  <Animated.View style={[styles.commentModalContainer, animatedStyle]} >
                    <Text style={styles.title}>Comments</Text>
                    <Comments postID={item.id} customPadding={customPadding} />
                  </Animated.View>
                </GestureDetector>
              </View>
            </Modal>
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
};

export default FormatPost;