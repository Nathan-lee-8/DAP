import { useContext, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert,
  Modal, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import styles from "../styles/Styles";
import { useEffect } from "react";

import client from "../client";
import { commentsByPost } from "../customGraphql/customQueries";
import { createComment, deleteComment } from "../customGraphql/customMutations";
import { Comment } from "../API";

import ImgComponent from './ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';

const ListComments = ({postID}: any) => {
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ comment, setComment ] = useState<string>('');
  const [ modalVisible, setModalVisible ] = useState(false);
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
  
  const handleOptionButton = (option: string, item: Comment) => {
    if(option === "Report"){
      Alert.alert("Not Implemented Yet");
    } else if(option === "Edit"){
      Alert.alert("Not Implemented Yet");
    } else if(option === "Delete"){
      Alert.alert(
        "Delete",
        "Are you sure you want Delete this comment?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Delete", 
            onPress: () => handleDeleteComment(item.id)
          }
        ]
      );
    }
    console.log(option)
  }

  const handleDeleteComment = async (itemID: string) => {
    try{
      await client.graphql({
        query: deleteComment,
        variables: {
          input: {
            id: itemID
          }
        },
        authMode: 'userPool'
      })
      console.log("comment deleted");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
 
  }

  if(loading) return <ActivityIndicator size="large" color="#0000ff" />

  return (  
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({ item }) => {
          var options = ["Report"];
          if(item.userID === currUser.id){
            options = ["Edit", "Delete"];
          }
          return (
            <View style={styles.postContainer}>
              <Icon name="ellipsis-horizontal" size={20} style={styles.postOptions} onPress={() => setModalVisible(true)}/>
              <View style={styles.profileSection}>
                <ImgComponent uri={item?.user?.profileURL || 'defaultUser'} style={styles.postProfileImg}/>
                <View style={styles.profileText}>
                  <Text style={styles.postAuthor}>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
                  <Text style={styles.postDate}>{moment(item?.createdAt).fromNow()}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{item?.content}</Text>
              <Modal 
                transparent={true} 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}  
              >
                <View style={styles.postModelOverlay}>
                  <View style={styles.postModalContainer}>
                    <FlatList
                      data={options}
                      keyExtractor={(option) => option}
                      style={{height: 'auto', width: '100%'}}
                      renderItem={({ item: option }) => (
                        <TouchableOpacity 
                          style={styles.optionButton} 
                          onPress={() => handleOptionButton(option, item)}
                        >
                          <Text style={styles.buttonTextBlack}>{option}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  <TouchableOpacity style={styles.closeOverlayButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonTextBlack}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          )
        }}
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