import { useContext, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert,
  KeyboardAvoidingView, TextInput, Platform } from "react-native";
import styles from "../styles/Styles";
import { useEffect } from "react";

import client from "../client";
import { commentsByPost } from "../customGraphql/customQueries";
import { createComment } from "../customGraphql/customMutations";
import { Comment } from "../API";

import ImgComponent from './ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';

const ListComments = ({postID}: any) => {
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ comment, setComment ] = useState<string>('');
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return <ActivityIndicator size="large" color="#0000ff" />;

  const fetchComments = async () => {
    try{
      const commentData = await client.graphql({
        query: commentsByPost,
        variables: {
          postID: postID
        },
        authMode:'userPool'
      })
      const commentList = commentData.data.commentsByPost.items;
      setComments(commentList);
      console.log('fetched from notifications');
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

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
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (  
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
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
};

export default ListComments;