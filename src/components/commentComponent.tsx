import { useState, useContext } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, Alert, TextInput, 
  Pressable } from 'react-native';

import client from '../client';
import { deleteComment, createReport, deleteReply } from '../customGraphql/customMutations';

import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';
import moment from 'moment';
import ImgComponent from './ImgComponent';
import { AuthContext } from '../context/AuthContext';

const CommentComp = ( {item, handleKeyboard, refreshComments, index } : any) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ options, setOptions ] = useState(["Report"]);
  const [ reportMessage, setReportMessage ] = useState("");
  const [ reportModalVisible, setReportModalVisible ] = useState(false);
  const [ itemPressed, setItemPressed ] = useState<any>();
  const [ darkened, setDarkened ] = useState(false);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;

  const handleOptionButton = (option: string) => {
    setModalVisible(false);
    if(option === "Report"){
      setReportModalVisible(true);
    } else if(option === "Edit"){
      if(itemPressed) handleKeyboard(itemPressed, "Edit Reply", index)
      else handleKeyboard(item, "Edit", index);
      setDarkened(true);
      setTimeout(() => {
        setDarkened(false);
      }, 1000);
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
      if(itemPressed){
        await client.graphql({
          query: deleteReply,
          variables: {
            input: {
              id: itemPressed.id
            }
          },
          authMode: 'userPool'
        })
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

  const handleReport = async () => {
    if(reportMessage === "") return;
    var itemType = (itemPressed) ?  "Reply" : "Comment";
    var currItemID = (itemPressed) ? itemPressed.id : item.id;
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: currItemID,
            reportedItemType: itemType,
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

  const handleReplyLongPress = ( replyData: any) => { 
    if(replyData.userID === currUser.id){
      setOptions(["Edit", "Delete"]);
    } else {
      setOptions(["Report"]);
    }
    setItemPressed(replyData);
    setModalVisible(true);
  }

  const handleCommentPress = () => {
    if(item.userID === currUser.id){
      setOptions(["Edit", "Delete"]);
    
    }else{
      setOptions(["Report"]);
    }
    setModalVisible(true);
  }

  const handleReply = (item: any, index: number) => {
    handleKeyboard(item, "Reply", index);
    setDarkened(true);
    setTimeout(() => {
      setDarkened(false);
    }, 1000);
  }

  const getCompactTimeAgo = (date : string) => {
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
      <Pressable onLongPress={handleCommentPress}
        style={({ pressed }) => [
          styles.profileSection,
          { opacity: pressed ? 0.5 : 1 }
        ]}
        >
        <ImgComponent style={styles.commentUserImg} uri={item?.user?.profileURL || 'defaultUser'}/>
        <View style={styles.profileText}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.bold, {fontWeight: 500}]}>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
            <Text style={styles.commentDate}>{getCompactTimeAgo(item.createdAt)}</Text>
          </View>
          <Text style={[styles.postContent, {marginBottom: 0}]}>{item?.content}</Text>
          <TouchableOpacity style={{marginBottom:5}} onPress={() => handleReply(item, index)}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <FlatList
        data={item.replies.items}
        renderItem={(reply) => {
          const replyData = reply.item;
          return(
            <Pressable onLongPress={() => handleReplyLongPress(replyData)}
              style={({ pressed }) => [
                {marginLeft: 40},
                { opacity: pressed ? 0.5 : 1 }
              ]}
            >
              <View style={styles.profileSection}>
                <ImgComponent uri={replyData?.user?.profileURL || 'defaultUser'}/>
                <View style={styles.profileText}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.bold, {fontWeight: 500}]}>{replyData?.user?.firstname + " " + replyData?.user?.lastname}</Text>
                    <Text style={styles.commentDate}>{getCompactTimeAgo(replyData.createdAt)}</Text>
                  </View>
                  <Text style={styles.postContent}>{replyData?.content}</Text>
                  <TouchableOpacity style={{marginBottom:5}} onPress={() => handleReply(item, index)}>
                    <Text style={styles.replyText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          )
        }}
      />

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
