import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";

const ChatMembers = ( {route} : any ) => {
  const chatData = route.params.chatData;
  const userChats = route.params.userChats;
  const myChat = userChats[0];

  const handleEditChat = () => {
    //navigate to new pgae to edit chat
  }

  const handleLeaveChat = () => {
    //use chatIDs to delete userchat
    //if last userchat in chat, delete chat
  }

  const handleAddMember = () => {
    //navigate to new page
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chatData.name}</Text>
      <FlatList
        data={userChats}
        renderItem={({ item }) => {
          return(
            <View style={styles.postContainer}>
              <View style={[styles.profileSection, {alignItems: 'center'}]}>
                <ImgComponent uri={ item.user.profileURL || 'defaultUser'}/>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.postAuthor}>{item.user.firstname + " " + item.user.lastname}</Text>
                </View>
                <Text style={styles.roleText}>{item.role}</Text>
              </View>
            </View>
          )
        }}
      />
      {(myChat.role === 'Admin' || myChat.role === 'Owner') &&
        <View>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleAddMember}>
            <Text style={styles.buttonTextBlack}>Add Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleEditChat}>
            <Text style={styles.buttonTextBlack}>Edit Chat</Text>
          </TouchableOpacity>
        </View>
      }
      <TouchableOpacity style={styles.buttonWhite} onPress={handleLeaveChat}>
        <Text style={styles.buttonTextBlack}>Leave Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChatMembers;