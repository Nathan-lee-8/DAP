import { useState, useContext } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, Alert, TextInput, 
  } from 'react-native';

import client from '../client';
import { deleteComment } from '../customGraphql/customMutations';
import { updateComment } from '../customGraphql/customMutations';

import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';
import moment from 'moment';
import ImgComponent from './ImgComponent';
import { AuthContext } from '../context/AuthContext';

const CommentComp = ( {item, onFocus } : any) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ editsOn, setEditsOn ] = useState(false);
  const [ message, setMessage ] = useState(item.content);
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser) return;
  var options = (item.userID === currUser.id) ? ["Edit", "Delete"] : ["Report"];

  const handleOptionButton = (option: string) => {
    if(option === "Report"){
      Alert.alert("Not Implemented Yet");
    } else if(option === "Edit"){
      setModalVisible(false);
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

  return(
    <View style={styles.postContainer}>
      <Icon name="ellipsis-horizontal" size={20} style={styles.postOptions} onPress={() => setModalVisible(true)}/>
      <View style={styles.profileSection}>
        <ImgComponent uri={item?.user?.profileURL || 'defaultUser'} style={styles.postProfileImg}/>
        <View style={styles.profileText}>
          <Text style={styles.postAuthor}>{item?.user?.firstname + " " + item?.user?.lastname}</Text>
          <Text style={styles.postDate}>{moment(item?.createdAt).fromNow()}</Text>
        </View>
      </View>
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
    </View>
  )
}


export default CommentComp;
