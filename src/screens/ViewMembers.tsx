import { View, Text, FlatList } from "react-native";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";

const ViewMembers = ({route } : any) => {
  const userData = route.params.userData;
  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>Members</Text>
      <FlatList
        data={userData}
        renderItem={(item) => {
          var user = item.item?.user;
          var profileURL = user?.profileURL ? user?.profileURL : undefined;
          return(
            <View style={[styles.postContainer, styles.profileSection]}>
              <ImgComponent uri={profileURL ? profileURL : 'defaultUser'}/>
              <View style={styles.userInfoContainer}>
                <Text style={styles.postAuthor}>{user?.firstname + " " + user?.lastname}</Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}

export default ViewMembers;