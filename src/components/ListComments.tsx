import { useContext, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, TextInput, Platform,
 KeyboardAvoidingView } from "react-native";
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

/** 
 * Retrieves and displays all comments for the given postID. Allows the 
 * user to comment on the post, reply to commments on the post or delete/edit
 * comments/replies. 
 * 
 * @param postID: The PostID of the post to retrieve comments for
 * @param header: either the post itself or 'Notification' header for modal
 * @param customPadding: variable to adjust for modal vs page display
 */
const ListComments = ( {postID, header, customPadding} : any ) => {
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ comment, setComment ] = useState<string>('');
  const [ operation, setOperation ] = useState("Comment");
  const [ replyTarget, setReplyTarget ] = useState<any>();
  const flatListRef = useRef<FlatList>(null);
  const scrollTargetRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput>(null);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return <ActivityIndicator size="large" color="#0000ff" />;

  useEffect(() => {
    fetchComments();
  }, []);

  //retreives all comments for given post
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
    } catch {
      Alert.alert('Error', 'There was an issue fetching comments');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Receives the item, target and index from the comment component when user wants to 
   * modify a comment or reply. Sets the operation and replyTarget states to the given 
   * values and scrolls to the item we want to modify
   * @param item - The Reply or comment we want to modify
   * @param target - The operation: 'Reply', 'Comment', 'Edit', or 'Edit Reply' 
   * @param index - the current index of the comment to scroll to
   */
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
    setOperation(target);
    setReplyTarget(item);
  }

  //Checks if User wants to Comment, Reply, or Edit a comment/reply and calls the 
  //corresponding function
  const handleSend = async () => {
    if(comment === ""){
      Alert.alert("Alert", "Please enter a message.");
      return;
    }
    if(operation === "Comment"){
      await postComment();
    } else if(operation === "Reply"){
      await postReply();
    } else if(operation === "Edit"){
      await handleEditComment();
    }else if(operation === "Edit Reply"){
      await handleEditReply();
    }
    setComment("");
    setOperation("Comment");
    fetchComments();
  }

  //posts the comment to the given post
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
    } catch (error) {
      Alert.alert('Error', 'There was an issue posting this comment');
    }
  }

  //posts a reply to the target comment
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

  //edit the target Comment
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

  //edit the target reply
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

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (  
    <View style={{flex:1}}> 
      {/* List of Comments */}
      <FlatList
        ref={flatListRef}
        data={comments}
        renderItem={({ item, index }) => {
          return (
            <CommentComp item={item} keyboardTarget={handleKeyboard} 
              refreshComments={fetchComments} 
              index={index}
            />
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
      
      {/* Keyboard (TextInput) component */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? customPadding : 0}
      >
        <View style={styles.addCommentSection}>
          {operation !== "Comment" && 
            <View style={styles.inputTargetContainer}>
              <Icon style={{position:'absolute', right: 10, top: 5, zIndex: 1}} 
                name="close-outline" size={25}
                onPress={() => setOperation("Comment")}
              />
              {operation === "Reply" ? (
                <Text style={styles.inputTargetText} numberOfLines={1}>
                  Replying to @{replyTarget.user.firstname} {replyTarget.user.lastname}
                </Text>
              ) : operation === "Edit"  || operation === "Edit Reply" ? (
                <Text style={styles.inputTargetText}>Edit comment:</Text>
              ) : null}
            </View>
          }
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={inputRef}
              style={ operation === "Comment" ? 
                styles.commentInput : styles.commentInputUnrounded
              }
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
                  }, 150); 
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