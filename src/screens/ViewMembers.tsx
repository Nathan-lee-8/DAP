import { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalParamList } from "../types/rootStackParamTypes";
import { AuthContext } from "../context/AuthContext";

const ViewMembers = ({route } : any) => {
  const userData = route.params.userData;
  const group = route.params.group;
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  const myUserGroup = userData.find((item: any) => item?.user?.id === currUser.id);

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const handleEditGroup = () => {
    navigation.navigate('EditGroup', {group: group});
  }

  const handleLeaveGroup = () => {
    //Delete user chat
    //if last userchat left in group, delete the group
  }

  const handleAddMember = () => {
    //navigate to new page or conditional rendering to remove/add members 
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.contentText, {marginTop: 20, marginBottom: 20}]}>Members</Text>
      <FlatList
        data={userData}
        renderItem={({ item }) => {
          return(
            <View style={[styles.postContainer, styles.profileSection]}>
              <ImgComponent uri={ item.user.profileURL || 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{item.user.firstname + " " + item.user.lastname}</Text>
              </View>
              <Text style={styles.memberText}>{item.role}</Text>
            </View>
          )
        }}
      />
      {(myUserGroup?.role === 'Admin' || myUserGroup?.role === 'Owner') && 
        <View>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleAddMember}>
            <Text style={styles.buttonTextBlack}>Add Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWhite} onPress={handleEditGroup}>
            <Text style={styles.buttonTextBlack}>Edit Group</Text>
          </TouchableOpacity>
        </View>
      }
      <TouchableOpacity style={styles.buttonWhite} onPress={handleLeaveGroup}>
        <Text style={styles.buttonTextBlack}>Leave Group</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ViewMembers;