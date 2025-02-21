import { View, Text } from 'react-native';
import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ImgComponent';

const ViewProfiles = ( { route } : any) => {
    const targetUser = route.params?.user;
    if(!targetUser) return (<View><Text style={styles.noResultsMsg}>Error: User not found</Text></View>);

    return(
        <View style={styles.container}>
            <View style={styles.viewUserProfileSection}>
                <ProfilePicture uri={targetUser.profileURL ? targetUser.profileURL : 'defaultUser'} style={styles.viewProfileURL}/>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.postAuthor}>{targetUser.firstname} {targetUser.lastname}</Text>
                    <Text style={styles.userContact}>{targetUser.email}</Text>
                    <Text style={styles.userContact}>Phonenumber: {targetUser.phonenumber}</Text>
                    <Text style={styles.userContact}>User since {targetUser.createdAt ? new Date(targetUser.createdAt).toLocaleDateString() : "unknown"}</Text>
                </View>
            </View>
            <UserPosts userID={targetUser.id} />
        </View>
        
    )
}

export default ViewProfiles;