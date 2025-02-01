import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { createComment } from '../graphql/mutations';
import { getPost } from '../graphql/queries';
import client from '../client';
import styles from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';
import { Post } from '../API';
import ProfilePicture from '../components/ProfilePicture';

const ViewPost = ( {route} : any) => {
  const postID = route.params.postID;
  const [postData, setPostData] = useState<Post | null>();
  const [comment, setComment] = useState<string>("");
  const fetchPost = async () => {
    try {
      const { data } = await client.graphql({
        query: getPost,
        variables: { 
          id: postID 
        },
        authMode: 'userPool'
      });
      console.log(data);
      setPostData(data.getPost);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, [postID]);

  const navigation = useNavigation();
  const goBackButton = () => {
    navigation.goBack();
  }

  const postComment = async () => {
    if(!postData?.userID) return;
    try {
      const { data } = await client.graphql({
        query: createComment,
        variables: {
          input: {
            content: comment,
            postID: postID,
            userID: postData?.userID
          }
        },
        authMode: 'userPool'
      });
      console.log(data);
      setComment("");
      fetchPost();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={goBackButton}>
        <Icon name="arrow-back" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{postData?.title}</Text>
      <Text>{postData?.content}</Text>
      {postData?.postURL ? (
        <ProfilePicture 
          uri={postData?.postURL[0] ? postData?.postURL[0] : undefined} 
          style={styles.groupImgContainer}
          size={25}
        />
      ):( null )}
      <FlatList
        data={postData?.comments?.items}
        renderItem={(item) => (
          <View>
            <Text>{item.item?.content}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Comments Available</Text>
          </View>
        )}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.msgInput}
          placeholder="Add a comment"
          multiline={true}
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={postComment} style={styles.msgButton}>
          <Icon name="send" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ViewPost;