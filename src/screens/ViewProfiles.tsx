import { View, Text } from 'react-native';
import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ImgComponent';

const ViewProfiles = ( { route } : any) => {
    const targetUser = route.params?.user;
    if(!targetUser) return (<View><Text style={styles.noResultsMsg}>Error: User not found</Text></View>);

    const profileURL = targetUser.profileURL === null ? undefined: targetUser.profileURL;
    const creationDate = targetUser.createdAt ? new Date(targetUser.createdAt).toLocaleDateString() : "unknown";
    
    return(
        <View style={styles.container}>
            <View style={styles.viewUserProfileSection}>
                <ProfilePicture uri={profileURL} style={styles.viewProfileURL}/>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.postAuthor}>{targetUser.firstname} {targetUser.lastname}</Text>
                    <Text style={styles.userContact}>{targetUser.email}</Text>
                    <Text style={styles.userContact}>Phonenumber: {targetUser.phonenumber}</Text>
                    <Text style={styles.userContact}>User since {creationDate}</Text>
                </View>
            </View>
            <UserPosts userID={targetUser.id} />
        </View>
        
    )
}

export default ViewProfiles;