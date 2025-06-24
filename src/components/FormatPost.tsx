import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Alert, Modal 
} from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, useDerivedValue, 
  runOnJS } from 'react-native-reanimated';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Video from "react-native-video";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalParamList } from "../types/rootStackParamTypes";

import client from "../client";
import { deletePost } from "../customGraphql/customMutations";
import { Post } from "../API";

import { AuthContext } from "../context/AuthContext";
import Icon from "@react-native-vector-icons/ionicons";
import moment from "moment";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import Comments from './ListComments';
import Report from "./Report";

/**
 * Component to take the current Post and display all the Post owner information, 
 * the post content, and the interaction section. Click media to open full screen 
 * view of media and click comments to open full screen view of comments. Click
 * ellipses to view options to edit, delete, or report the post.
 * 
 * @param post - The current post to display
 * @param destination - Display location: 'Home', 'Profile', 'Group', or 'ViewPost'
 * @param refresh - function to refresh list/screen that post is deleted from
 */
const FormatPost = ( {post, destination, refresh} : 
  {post: Post, destination: string, refresh?: any} ) => {
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const { width } = Dimensions.get('window');
  const [ customPadding, setCustomPadding ] = useState(310);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ imageModalVisible, setImageModalVisible ] = useState(false);
  const [ commentModalVisible, setCommentModalVisible ] = useState(false);
  const [ reportModalVisible, setReportModalVisible ] = useState(false);

  const [ options, setOptions ] = useState(["Report"]);
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  //Sets the options and allows edits and deletes if user owns the post
  useEffect(() => {
    if(post.user?.id === currUser.id || post.userID === currUser.id){
      setOptions(["Edit", "Delete"]);
    }
  }, [currUser])

  //handles the option that the user pressed in the option modal: Edit, Delete, Report
  const handleOptionButton = (option: string) => {
    setModalVisible(false);
    if(option === "Edit"){
      navigation.navigate('EditPost', { currPost: post});
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

  //delete all post and comments
  const handleDelete = async () => {
    if(post){
      try{
        await client.graphql({
          query: deletePost,
          variables: {
            input: { id: post.id }
          },
          authMode: 'userPool'
        });
        if(destination === 'ViewPost'){
          navigation.goBack();
        }else{
          if(refresh) refresh();
        }
        Alert.alert('Success', 'Post deleted successfully');
      } catch {
        Alert.alert('Error', 'There was an issue deleting the post');
      }
    }
  }

  //Navigates to full page display of the given post unless already there
  const clickPost = (itemID : string) => {
    if(destination !== 'ViewPost'){
      navigation.navigate('ViewPost', { postID: itemID });
    }
  }
  
  //navigates to the profile of the user unless it is the current user
  const visitProfile = () => {
    if(!post.user || post.user.id === currUser.id) return;
    navigation.navigate('ViewProfile', { userID: post.user.id });
  }

  //opens the sharing UI to allow User to share the post 
  const handleShare = async () => {
    try {
      const downloadedFiles = post.postURL ? 
        await Promise.all(post.postURL
          .filter((url): url is string => typeof url === 'string')
          .map(downloadMediaToLocal)) : [];
  
      const shareOptions = {
        title: 'Check out this post!',
        message: post.content,
        urls: downloadedFiles.length > 0 ? downloadedFiles : undefined,
      };
      await Share.open(shareOptions);
    } catch {
      Alert.alert('Error', 'Failed to share post.')
    }
  }

  //Helper function to download the file to local to prepare sharing
  const downloadMediaToLocal = async (url: string): Promise<string> => {
    const filename = url.split('/').pop() || `file_${Date.now()}`;
    const localPath = `${RNFS.TemporaryDirectoryPath}${filename}`;
  
    await RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise;
    return `file://${localPath}`;
  };

  //helper to know index of media while scrolling through
  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (width * 0.88));
    setCurrentIndex(index);
  };


  //Helpers to snap image to fit on scroll
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

  //Helpers to adjust height of images if keyboard is displayed or not
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
      {destination !== 'Profile' && post.user ? ( // if displayed anywhere but Profile
        <TouchableOpacity style={styles.profileSection} onPress={() => clickPost(post.id)}> 
          <TouchableOpacity onPress={visitProfile}>
            <ImgComponent uri={post.user.profileURL} style={styles.postProfileImg}/>
          </TouchableOpacity>
          <View style={styles.profileText}>
            {destination !== 'Group' && post.group ? ( // if displayed not in groups show groupname
              <View style={styles.postAuthor}>
                <Text style={styles.bold} 
                  onPress={visitProfile}
                  numberOfLines={1}
                >
                  {post.user.firstname + " " + post.user.lastname}
                </Text>
                <Text> posted in </Text>
                <Text style={styles.bold} 
                  onPress={() => {
                    if(post.group) navigation.navigate('ViewGroup', {groupID: post.group.id})
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {post.group.groupName}
                </Text>
              </View>
            ) : ( // If displayed in groups omit groupname
              <Text>{post.user.firstname + " " + post.user.lastname}</Text>
            )}
            <Text style={styles.postDate}>{moment(post.createdAt).fromNow()}</Text>
          </View>
          <Icon name="ellipsis-horizontal-sharp" style={styles.postOptions} size={20} 
            color={'black'}
            onPress={() => setModalVisible(true)}
          />
        </TouchableOpacity>
      ) : ( // Posts displayed in 'Profile' 
        <View style={styles.postAuthor}>
          <Text style={styles.bold} onPress={() => navigation.navigate('ViewGroup', {groupID: post.groupID})}>
            {post.group?.groupName}
          </Text>
          <Icon name="ellipsis-horizontal-sharp" style={styles.postOptions} size={20} color={'black'}
            onPress={() => setModalVisible(true)}
          />
        </View>
      )}
      
      <TouchableOpacity  onPress={ () => clickPost(post.id)}>
        <Text style={styles.postContent} numberOfLines={5}>{post.content}</Text>
      </TouchableOpacity>

      {/* Post media display list */}
      {post.postURL &&
        <View>
          <FlatList
            data={post.postURL}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                {item?.endsWith('.mp4') ? (
                  <Video source={{uri: item}} style={{width: width - 30, height: 200}}
                    resizeMode="cover" repeat={true}
                  />
                ):(
                  <ImgComponent uri={item || 'defautUser'} 
                    style={{ width: width - 30, height: 200 }} 
                  />
                )}
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
            {post.postURL.length > 1 && post?.postURL.map((_, index) => (
              <View key={index} style={[ styles.dot, currentIndex === index && styles.activeDot ]}/>
            ))}
          </View>
        </View>
      }

      {/* Interaction section for sharing and View comments */}
      <TouchableOpacity style={styles.interactSection} onPress={() => clickPost(post.id)}>
        <View style={styles.commentSection}>
          <Icon name="chatbubble-outline" size={15}/>
          <Text> {post.commentCount}</Text>
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
              data={post.postURL}
              renderItem={({ item }) => (
                <View>
                  {item?.endsWith('.mp4') ? (
                    <Video source={{ uri: item }} style={{ width: width, height: '100%' }}
                      resizeMode="contain" controls
                    />
                  ):(
                    <ImgComponent uri={item || 'defautUser'} 
                      style={{
                        width: width,
                        height: '100%'
                      }} 
                      resizeMode={"contain"}
                    />
                  )}
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
              {post.postURL && post?.postURL.length > 1 && post?.postURL?.map((_, index) => (
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
                    <Comments postID={post.id} customPadding={customPadding} />
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
        <Report
          type={"Post"}
          itemID={post.id}
          setReportModalVisible={setReportModalVisible}
        />
      </Modal>
    </View>
  )
};

export default FormatPost;