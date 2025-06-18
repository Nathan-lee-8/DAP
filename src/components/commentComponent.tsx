import { useState, useContext } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, Alert, Pressable 
} from 'react-native';

import client from '../client';
import { deleteComment, deleteReply } from '../customGraphql/customMutations';
import { Reply } from '../API';

import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import moment from 'moment';
import ImgComponent from './ImgComponent';
import Report from './Report';

/**
 * Displays the comment and all replies to the given comment.
 * Press and hold the comment or a reply for a list of options to either delete, edit, 
 * report, or reply to the comment/reply
 * 
 * @param item - The current comment to display and its' nested replies
 * @param keyboardTarget - function to set the keyboard target, index, and type so the 
 *  ListComments component knows which reply or comment to target & scroll to and 
 *  whether the user wants to reply or edit 
 * @param refreshComments - function to pull latest comment list after a delete
 * @param index - The position of the comment in list
 */
const CommentComp = ( {comment, keyboardTarget, refreshComments, index} : any) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ options, setOptions ] = useState(["Report"]);
  const [ targetReply, setTargetReply ] = useState<Reply>(); 
  const [ darkened, setDarkened ] = useState(false);

  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;
  /**
   * Sets the options that are displayed when the user long presses a comment or reply
   * and sets the target reply if a reply is pressed, then opens the options modal.
   * Allows edits and deletes if users owns the item but only reports if not.
   * @param replyData - the item if a reply is pressed, empty if the comment is pressed
   */
  const handleLongPress = (replyData?: any) => { 
    if(replyData){
      if(replyData.userID === currUser.id){
        setOptions(["Edit", "Delete"]);
      } else {
        setOptions(["Report"]);
      }
      setTargetReply(replyData);
    }else{
      if(comment.userID === currUser.id){
        setOptions(["Edit", "Delete"]);
      }else{
        setOptions(["Report"]);
      }
      setTargetReply(undefined);
    }
    setModalVisible(true);
  }

  /**
   * Handles the option selected by the user:
   * Report - opens the report modal
   * Edit - sets the keyboards target to edit the comment or reply
   * Delete - deletes the comment or reply
   * @param option - The current option selected by the User
   */
  const handleOptionButton = (option: string) => {
    setModalVisible(false);
    if(option === "Report") {
      setReportModalVisible(true);
    }else if(option === "Edit"){
      if(targetReply) keyboardTarget(targetReply, "Edit Reply", index)
      else keyboardTarget(comment, "Edit", index);
      setDarkened(true);
      setTimeout(() => {
        setDarkened(false);
      }, 1000);
    }else if(option === "Delete"){
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
            onPress: () => handleDeleteComment(comment.id)
          }
        ]
      );
    }
  }

  /**
   * Deletes a reply if user is targeting a reply and deletes the comment if not.
   * Lambda deletes replies on comment deletion
   * @param itemID the item we want to delete
   */
  const handleDeleteComment = async (itemID: string) => {
    try{
      if(targetReply){
        await client.graphql({
          query: deleteReply,
          variables: {
            input: {
              id: targetReply.id
            }
          },
          authMode: 'userPool'
        })
        setTargetReply(undefined);
      }else{
        await client.graphql({
          query: deleteComment,
          variables: {
            input: {
              id: itemID
            }
          },
          authMode: 'userPool'
        })
      }
      Alert.alert('Success', "Comment deleted");
      refreshComments();
    } catch (error) {
      Alert.alert('Error', "Error deleting comment");
    }
  }

  /**
   * Sets the keyboard target to this comment for the listComments component to 
   * know which comment to reply to
   * @param index - The current position of this comment
   */
  const handleReply = (index: number) => {
    keyboardTarget(comment, "Reply", index);
    setDarkened(true);
    setTimeout(() => {
      setDarkened(false);
    }, 1000);
  }

  // Helper function to format the date of the reply/comment into a x-days ago format
  const getCompactTimeAgo = (date: string) => {
    const now = moment();
    const created = moment.utc(date).local();
    const duration = moment.duration(now.diff(created));
 
    const weeks = Math.floor(duration.asWeeks());
    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes());
    
    if (weeks >= 1) {
      return `${weeks}w`;
    } else if (days >= 1) {
      return `${days}d`;
    } else if (hours >= 1) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  return(
    <View style={darkened ? styles.commentContainerPressed : styles.commentContainer}>
      {/* Display comment content */}
      <Pressable onLongPress={() => handleLongPress()}
        style={({ pressed }) => [styles.profileSection, { opacity: pressed ? 0.5 : 1 }]}
      >
        <ImgComponent style={styles.commentUserImg} 
          uri={comment?.user?.profileURL || 'defaultUser'}
        />
        <View style={styles.profileText}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.bold, {fontWeight: 500}]}>
              {comment?.user?.firstname + " " + comment?.user?.lastname}
            </Text>
            <Text style={styles.commentDate}>
              {getCompactTimeAgo(comment.createdAt)}
            </Text>
          </View>
          <Text style={[styles.postContent, {marginBottom: 0}]}>{comment?.content}</Text>
          <TouchableOpacity style={{marginBottom:5}} onPress={() => handleReply(index)}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      
      {/* Display replies to comment */}
      <FlatList
        data={comment.replies.items}
        renderItem={({item}) => {
          return(
            <Pressable onLongPress={() => handleLongPress(item)}
              style={({ pressed }) => [{marginLeft: 40}, { opacity: pressed ? 0.5 : 1 }]}
            >
              <View style={styles.profileSection}>
                <ImgComponent uri={item.user?.profileURL || 'defaultUser'}/>
                <View style={styles.profileText}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.bold, {fontWeight: 500}]}>
                      {`${item.user?.firstname} ${item.user?.lastname}`}
                    </Text>
                    <Text style={styles.commentDate}>
                      {getCompactTimeAgo(item.createdAt)}
                    </Text>
                  </View>
                  <Text style={styles.postContent}>{item.content}</Text>
                  <TouchableOpacity style={{marginBottom:5}} 
                    onPress={() => handleReply(index)}
                  >
                    <Text style={styles.replyText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          )
        }}
      />

      {/* Options Modal */}
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
                  onPress={() => handleOptionButton(option)}
                >
                  <Text style={styles.buttonTextBlack}>{option}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.closeOverlayButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      >
        <Report 
          type={(targetReply) ?  "Reply" : "Comment"} 
          itemID={(targetReply) ? targetReply.id : comment.id} 
          setReportModalVisible={setReportModalVisible}
        />
      </Modal>
    </View>
  )
}


export default CommentComp;
