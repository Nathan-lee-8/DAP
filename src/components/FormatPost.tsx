import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
  
  return (
    <View style={styles.postContainer}>
      {item?.user?.firstname ? (
        <View style={styles.profileSection}> 
          <TouchableOpacity onPress={() => visitProfile(item)}>
            <ImgComponent uri={item.user.profileURL} style={styles.postProfileImg}/>
          </TouchableOpacity>
          <View style={styles.profileText}>
            {groupData ? (
              <Text style={styles.postAuthor}>
                <Text style={styles.bold}>{item.user.firstname + " " + item.user.lastname}</Text>
                <Text> posted in </Text>
                <Text style={styles.bold}>{getGroupName(item.groupID)}</Text>
              </Text>
            ) : (
              <Text>{item.user.firstname + " " + item.user.lastname}</Text>
            )}
            <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
          </View>
        </View>
      ) : null}
      
      <TouchableOpacity  onPress={ () => clickPost(item.id)}>
        <Text style={styles.postContent} numberOfLines={5}>{item.content}</Text>
        {item.postURL && item.postURL[0] && <ImgComponent uri={item.postURL[0]} style={styles.postImgContainer} />}

        <View style={styles.interactSection}>
          <View style={styles.commentSection}>
            <Icon name="chatbubble-outline" size={15}/>
            <Text> {item.comments?.items.length}</Text>
          </View>
          <View style={styles.shareSection}>
            <Icon name="arrow-redo-outline" size={15}/>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  )
};

export default FormatPost;