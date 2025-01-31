import { View, Text } from 'react-native';
import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ProfilePicture';

const ViewProfiles = ( { route } : any) => {
    const targetUser = route.params?.user;
    if(!targetUser) return (<View><Text style={styles.noResultsMsg}>Error: User not found</Text></View>);

    const profileURL = targetUser.profileURL === null ? undefined: targetUser.profileURL;
    const creationDate = targetUser.createdAt ? new Date(targetUser.createdAt).toLocaleDateString() : "unknown";

    return(
        <View style={styles.container}>
            <View style={[styles.profileSection, {marginBottom: 25}]}>
                <ProfilePicture uri={profileURL} size={100} />
                <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{targetUser.firstname} {targetUser.lastname}</Text>
                    <Text style={styles.postContact}>{targetUser.email}</Text>
                    <Text style={styles.postContact}>Phonenumber: {targetUser.phonenumber}</Text>
                    <Text style={styles.postContact}>User since {creationDate}</Text>
                </View>
            </View>
            <UserPosts userID={targetUser.id} />
        </View>
        
    )
}

export default ViewProfiles;