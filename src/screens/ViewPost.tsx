import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { createComment } from '../graphql/mutations';
import { getPost } from '../graphql/queries';
import client from '../client';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import { Post } from '../API';
import moment from 'moment';
import ImgComponent from '../components/ImgComponent';
import FormatPost from '../components/FormatPost';

const ViewPost = ( {route} : any) => {
  const postID = route.params.postID;
  const [postData, setPostData] = useState<Post>();
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

      if(data.getPost) setPostData(data.getPost);
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
      <View style={styles.postContainer}>
        <View style={styles.profileSection}>
          <ImgComponent uri={postData?.user?.profileURL ? postData?.user?.profileURL : 'defaultUser'} style={styles.postProfileImg}/>
          <View style={styles.profileText}>
            <Text style={styles.postAuthor}> {postData?.user?.firstname} {postData?.user?.lastname} </Text>
          <Text style={styles.postDate}> {moment(postData?.createdAt).fromNow()}</Text>
          </View>
        </View>
          <Text style={styles.postContent}>{postData?.content}</Text>
          {postData?.postURL && postData?.postURL[0] &&
            <ImgComponent uri={postData?.postURL[0]} style={styles.postImgContainer} />
          }
      </View>
      <FlatList
        data={postData?.comments?.items}
        renderItem={(item) => (
          <View style={styles.postContainer}>
            <View style={styles.profileSection}>
              <ImgComponent uri={item.item?.user?.profileURL ? item.item?.user?.profileURL : 'defaultUser'} style={styles.postProfileImg}/>
              <View style={styles.profileText}>
              <Text style={styles.postAuthor}>{item?.item?.user?.firstname + " " + item?.item?.user?.lastname}</Text>
            <Text style={styles.postDate}>{moment(item?.item?.createdAt).fromNow()}</Text>
          </View>
            </View>
            
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
      <View style={styles.addCommentSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          multiline={true}
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={postComment} style={styles.commentButton}>
          <Icon name="send" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ViewPost;