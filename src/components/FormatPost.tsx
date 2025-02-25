import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { GlobalParamList, LoggedInParamList } from "../types/rootStackParamTypes";
import { Post, Group } from "../API";
import moment from "moment";
import styles from "../styles/Styles";
import ImgComponent from "./ImgComponent";
import Icon from "@react-native-vector-icons/ionicons";

const FormatPost = ( {item, groupData} : {item : Post, groupData?: Group[]}) => {
  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const nav2 = useNavigation<NativeStackNavigationProp<LoggedInParamList>>();
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userId } = authContext;
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickPost = (item : string) => {
    navigation.navigate('ViewPost', { postID: item });
  }
  const visitProfile = (item : any) => {
    if(item.user.id === userId){
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
    const index = Math.floor(contentOffsetX / width); // Calculate the index of the current image
    setCurrentIndex(index);
  };

  const handleShare = () => {
    Alert.alert('Not implemented')
  }
  
  return (
    <View style={styles.postContainer}>
      {item?.user?.firstname ? (
        <TouchableOpacity style={styles.profileSection} onPress={() => clickPost(item.id)}> 
          <TouchableOpacity onPress={() => visitProfile(item)}>
            <ImgComponent uri={item.user.profileURL} style={styles.postProfileImg}/>
          </TouchableOpacity>
          <View style={styles.profileText}>
            {groupData ? (
              <Text style={styles.postAuthor}>
                <TouchableOpacity onPress={() => visitProfile(item)}>
                  <Text style={styles.bold}>{item.user.firstname + " " + item.user.lastname} </Text>
                </TouchableOpacity>
                <Text> posted in </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ViewGroup', {groupID: item.groupID})}>
                  <Text style={styles.bold}>{getGroupName(item.groupID)}</Text>
                </TouchableOpacity>
              </Text>
            ) : (
              <Text>{item.user.firstname + " " + item.user.lastname}</Text>
            )}
            <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      
      <View style={{flex: 1}}>
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
                      width: width,
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
              {item.postURL && item?.postURL.map((_, index) => (
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
      </View>
    </View>
  )
};

export default FormatPost;