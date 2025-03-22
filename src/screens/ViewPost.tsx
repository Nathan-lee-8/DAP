import { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, 
  Platform, Alert } from 'react-native';

import client from '../client';
import { createComment, deleteComment } from '../customGraphql/customMutations';
import { getPost } from '../customGraphql/customQueries';
import { Post } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';
import moment from 'moment';
import ImgComponent from '../components/ImgComponent';
import FormatPost from '../components/FormatPost';

const ViewPost = ( {route} : any) => {
  const postID = route.params.postID;
  const [postData, setPostData] = useState<Post>();
  const [comment, setComment] = useState<string>("");
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

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
    if(comment === ""){
      Alert.alert("Alert", "Please enter a message.");
      return;
    }
    try {
      await client.graphql({
        query: createComment,
        variables: {
          input: {
            content: comment,
            postID: postID,
            userID: currUser.id
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

  const handleDeleteComment = (commentID: string) => {
    Alert.alert('Confirm', 'Delete comment?', [
      {
        text: "Cancel",
        style: "cancel"
      },
      { 
        text: "Delete", 
        onPress: async () => {
          try{
            await client.graphql({
              query: deleteComment,
              variables: {
                input: {
                  id: commentID
                }
              },
              authMode: 'userPool'
            });
            console.log(commentID, "successfully deleted comment");
          }catch (error){ 
            console.log(error)
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      {postData && <FormatPost item={postData} groupData={postData?.group ? [postData.group] : []}/>}
      <FlatList
        data={postData?.comments?.items}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {currUser.id === item?.user?.id && 
              <Icon name="trash-outline" style={styles.postOptions} size={20} color={'black'}
                onPress={() => handleDeleteComment(item.id)}
              />
            }
            <View style={styles.profileSection}>
              <ImgComponent uri={item?.user?.profileURL || 'defaultUser'} style={styles.postProfileImg}/>
              <View style={styles.profileText}>
              <Text style={styles.postAuthor}>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
            <Text style={styles.postDate}>{moment(item?.createdAt).fromNow()}</Text>
          </View>
          </View>
            <Text style={styles.postContent}>{item?.content}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Comments Available</Text>
          </View>
        )}
        scrollEnabled
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.addCommentSection}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      > 
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
      </KeyboardAvoidingView>
    </View>
  )
}

export default ViewPost;