import { useContext, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert, Keyboard,
 KeyboardAvoidingView, TextInput, Platform, TouchableWithoutFeedback } from "react-native";
import styles from "../styles/Styles";
import { useEffect } from "react";

import client from "../client";
import { commentsByPost } from "../customGraphql/customQueries";
import { createComment } from "../customGraphql/customMutations";
import { Comment } from "../API";

import Icon from '@react-native-vector-icons/ionicons';
import { AuthContext } from '../context/AuthContext';
import CommentComp from '../components/commentComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListComments = ({postID, header}: any) => {
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ comment, setComment ] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);
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
      await AsyncStorage.setItem('Comments', JSON.stringify(commentList));
      console.log('fetched comments');
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const loadComments = async () => {
    try{
      const storedComments = await AsyncStorage.getItem('Comments');
      if(storedComments){
        setComments(JSON.parse(storedComments));
        setLoading(false);
        return;
      }
      await fetchComments();
    } catch (error) {
      console.log('Error loading cached news feed', error);
    }
  }

  useEffect(() => {
    loadComments();
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

  const handleEdit = (item: any) => {
    console.log(item);
  }

  const handleReply = (item: any) => {
    console.log(item);
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (  
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={comments}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ flex: 1 }}>
                <CommentComp item={item} editComment={handleEdit} replyComment={handleReply}/>
              </View>
            </TouchableWithoutFeedback>
          )
        }}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Comments Available</Text>
          </View>
        )}
        scrollEnabled
        ListHeaderComponent={header}
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