import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { createComment } from '../graphql/mutations';
import { getPost } from '../graphql/queries';
import client from '../client';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import { Post } from '../API';
import ProfilePicture from '../components/ImgComponent';
import moment from 'moment';

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
      console.log("fetched from ViewPost");
      setPostData(data.getPost);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, [postID]);


  const postComment = async () => {
    if(!postData?.userID) return;
    try {
      await client.graphql({
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
      console.log("posted Comment");
      setComment("");
      fetchPost();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{postData?.title}</Text>
      <View style={styles.viewPostContainer}>
        <Text>{postData?.content}</Text>
        {postData?.postURL ? (
          <ProfilePicture 
            uri={postData?.postURL[0] ? postData?.postURL[0] : 'defaultUser'} 
            style={styles.postImgContainer}
          />
        ):( null )}
      </View>
      <FlatList
        data={postData?.comments?.items}
        renderItem={(item) => (
          <View style={styles.viewPostContainer}>
            <View style={styles.profileSection}>
              <ProfilePicture uri={item.item?.user?.profileURL ? item.item?.user?.profileURL : 'defaultUser'}/>
              <Text style={[styles.postAuthor, {marginLeft: 5}]}>{item.item?.user?.firstname} {item.item?.user?.lastname}</Text>
            </View>
            <Text style={styles.postDate}>{moment(item.item?.createdAt).fromNow()}</Text>
            <Text style={styles.postContent}>{item.item?.content}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Comments Available</Text>
          </View>
        )}
        scrollEnabled
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