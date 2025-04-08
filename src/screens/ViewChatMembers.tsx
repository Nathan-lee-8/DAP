import { View, Text, FlatList } from "react-native";
import styles from '../styles/Styles';

import ImgComponent from "../components/ImgComponent";

const ChatMembers = ( {route} : any ) => {
  const chatData = route.params.chatData;
  const userChats = route.params.userChats;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chatData.name}</Text>
      <FlatList
        data={userChats}
        renderItem={({ item }) => {
          return(
            <View style={styles.listMemberContainer}>
              <ImgComponent uri={ item.user?.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item.user?.firstname + " " + item.user?.lastname}</Text>
              </View>
                <Text style={styles.roleText}>{item.role}</Text>
            </View>
          )
        }}
      />
    </View>
  );
}

export default ChatMembers;