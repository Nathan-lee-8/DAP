import { useContext, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert,
 KeyboardAvoidingView, TextInput, Platform } from "react-native";
import styles from "../styles/Styles";
import { useEffect } from "react";

import client from "../client";
import { commentsByPost } from "../customGraphql/customQueries";
import { createComment, createReply, updateComment, updateReply 
  } from "../customGraphql/customMutations";
import { Comment } from "../API";

import Icon from '@react-native-vector-icons/ionicons';
import { AuthContext } from '../context/AuthContext';
import CommentComp from '../components/commentComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListComments = ({postID, header, customPadding}: any) => {
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ comment, setComment ] = useState<string>('');
  const [ keyboardTarget, setKeyboardTarget ] = useState("Comment");
  const [ replyTarget, setReplyTarget ] = useState<any>();
  const flatListRef = useRef<FlatList>(null);
  const scrollTargetRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput>(null);
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
    fetchComments();
  }, []);

  const postComment = async () => {
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
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  const postReply = async () => {
    try {
      await client.graphql({
        query: createReply,
        variables: {
          input: {
            content: comment,
            commentID: replyTarget.id,
            userID: currUser.id
          }
        },
        authMode: 'userPool'
      });
      console.log("posted Reply");
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }

  const handleEditComment = async () => {
    try{
      await client.graphql({
        query: updateComment,
        variables: {
          input: {
            id: replyTarget.id,
            content: comment,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Comment edited successfully');
    } catch (error) {
      Alert.alert('Error', 'There was an issue updating this comment');
    }
  }

  const handleEditReply = async () => { 
    try{
      await client.graphql({
        query: updateReply,
        variables: {
          input: {
            id: replyTarget.id,
            content: comment,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Comment edited successfully');
    } catch (error) {
      Alert.alert('Error', 'There was an issue updating this comment');
    }
  }

  const handleKeyboard = (item: any, target: string, index: number) => {
    if (index !== -1) {
      scrollTargetRef.current = index;
    }
    if(inputRef.current?.isFocused){
      flatListRef.current?.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.3,
      });
    }
    inputRef.current?.focus();
    setKeyboardTarget(target);
    setReplyTarget(item);
  }

  const handleSend = async () => {
    if(comment === ""){
      Alert.alert("Alert", "Please enter a message.");
      return;
    }
    if(keyboardTarget === "Comment"){
      await postComment();
    } else if(keyboardTarget === "Reply"){
      await postReply();
    } else if(keyboardTarget === "Edit"){
      await handleEditComment();
    }else if(keyboardTarget === "Edit Reply"){
      await handleEditReply();
    }
    setComment("");
    setKeyboardTarget("Comment");
    fetchComments();
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (  
    <View style={{flex:1}}> 
      <FlatList
        ref={flatListRef}
        data={comments}
        renderItem={({ item, index }) => {
          return (
            <CommentComp item={item} handleKeyboard={handleKeyboard} refreshComments={fetchComments} index={index}/>
          )
        }}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.noResultsMsg}>No Comments Available</Text>
          </View>
        )}
        scrollEnabled
        ListHeaderComponent={header}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? customPadding : 0}
      >
        <View style={styles.addCommentSection}>
          {keyboardTarget !== "Comment" && 
            <View style={styles.inputTargetContainer}>
              <Icon style={{position:'absolute', right: 10, top: 5, zIndex: 1}} name="close-outline" size={25}
                onPress={() => setKeyboardTarget("Comment")}
              />
              {keyboardTarget === "Reply" ? (
                <Text style={styles.inputTargetText} numberOfLines={1}>
                  Replying to @{replyTarget.user.firstname + " " + replyTarget.user.lastname}
                  </Text>
              ) : keyboardTarget === "Edit"  || keyboardTarget === "Edit Reply" ? (
                <Text style={styles.inputTargetText}>Edit comment:</Text>
              ) : null}
            </View>
          }
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={inputRef}
              style={keyboardTarget === "Comment" ? styles.commentInput : styles.commentInputUnrounded}
              placeholder="Add a comment"
              multiline={true}
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
              onFocus={() => {
                if (scrollTargetRef.current !== null && flatListRef.current) {
                  setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                      index: scrollTargetRef.current!,
                      animated: true,
                      viewPosition: 0.3,
                    });
                    scrollTargetRef.current = null;
                  }, 150); // Delay helps ensure layout is stable
                }
              }}
            />
            <Icon style={styles.commentButton} name="send" size={30} onPress={handleSend} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
};

export default ListComments;