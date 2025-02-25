import { View, Text, FlatList } from "react-native";
import styles from '../styles/Styles';
import ImgComponent from "../components/ImgComponent";

const ViewMembers = ({route } : any) => {
  const userData = route.params.userData;
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
            </View>
          )
        }}
      />
    </View>
  );
}

export default ViewMembers;