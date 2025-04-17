import { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, Alert, TextInput, 
  } from 'react-native';

import client from '../client';
import { deleteComment } from '../customGraphql/customMutations';
import { updateComment, createReport } from '../customGraphql/customMutations';

import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';
import moment from 'moment';
import ImgComponent from './ImgComponent';
import { AuthContext } from '../context/AuthContext';

const CommentComp = ( {item, onFocus } : any) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ editsOn, setEditsOn ] = useState(false);
  const [ message, setMessage ] = useState(item.content);
  const [ options, setOptions ] = useState(["Report"]);
  const [ reportMessage, setReportMessage ] = useState("");
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  useEffect(() => {
    if(item.userID === currUser.id){
      setOptions(["Edit", "Delete"]);
    }
  }, [currUser]);

  const handleOptionButton = (option: string) => {
    setModalVisible(false);
    if(option === "Report"){
      setReportModalVisible(true);
    } else if(option === "Edit"){
      setEditsOn(true);
      onFocus();
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
      Alert.alert('Success', "Comment deleted");
    } catch (error) {
      Alert.alert('Error', "Error deleting comment")
    }
  }

  const handleEditComment = async () => {
    setEditsOn(false);
    if(!message || message === item.content) return;
    try{
      await client.graphql({
        query: updateComment,
        variables: {
          input: {
            id: item.id,
            content: message
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', "Comment updated");
    } catch (error) {
      Alert.alert('Error', "Error updating comment")
    }
  }

  const handleReport = async () => {
    if(reportMessage === "") return;
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: item.id,
            reportedItemType: "Comment",
            reason: reportMessage, // UPDATE REASON WITH TYPES
            message: reportMessage,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Report sent successfully');
      setReportModalVisible(false);
    }catch(error){
      Alert.alert('Error', 'Failed to send report');
    }
  }

  const getCompactTimeAgo = (date : any) => {
    const now = moment();
    const created = moment(date);
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
    <View style={styles.commentContainer}>
      <Icon name="ellipsis-horizontal" size={20} style={styles.postOptions} onPress={() => setModalVisible(true)}/>
      <View style={styles.profileSection}>
        <ImgComponent style={styles.commentUserImg} uri={item?.user?.profileURL || 'defaultUser'}/>
        <View style={styles.profileText}>
          <Text>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
          {editsOn ? (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.editCommentInput}
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity style={styles.saveCommentButton} onPress={() => setEditsOn(false)}>
                <Text style={{color: 'blue'}} onPress={ handleEditComment }>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.postContent}>{item?.content}</Text>
          )}
        </View>
        <Text style={styles.commentDate}>{getCompactTimeAgo(item?.createdAt)}</Text>
      </View>

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
          <TouchableOpacity style={styles.closeOverlayButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonTextBlack}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal 
        transparent={true} 
        visible={reportModalVisible} 
        onRequestClose={() => setReportModalVisible(false)}  
      >
        <View style={styles.reportModalOverLay}>
          <View style={styles.reportModalContainer}>
            <Icon style={styles.closeReportModalButton} name={'close-outline'} size={30} 
              onPress={() => setReportModalVisible(false)}
            /> 
            <Text style={styles.title}>Report</Text>
            <Text style={styles.reportModalText}>
              Thank you for keeping DAP communities safe. What is the purpose of this report?
            </Text>
            <TextInput
              value={reportMessage}
              onChangeText={setReportMessage}
              style={styles.reportInput}
              placeholder="Add a note"
              multiline={true}
            />
            <TouchableOpacity style={styles.reportModalButton} onPress={handleReport}>
              <Text style={{textAlign: 'center', fontSize: 18}}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}


export default CommentComp;
