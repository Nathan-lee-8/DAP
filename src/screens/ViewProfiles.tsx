import { useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ProfilePicture';
import { AuthContext } from '../context/AuthContext';
import { createFollowing } from '../graphql/mutations';
import client from '../client';

const ViewProfiles = ( { route, navigation } : any) => {
    const targetUser = route.params?.user;
    const authContext = useContext(AuthContext);

    if(!authContext) {
        console.log("Auth context not defined");
        return null;
    }
    const { userId } = authContext;


    if(!targetUser) return (<View><Text>Error: User not found</Text></View>);

    const profileURL = targetUser.profileURL === null ? undefined: targetUser.profileURL;
    const creationDate = targetUser.createdAt ? new Date(targetUser.createdAt).toLocaleDateString() : "unknown";

    const follow = async () => {
        try{
            await client.graphql({
                query: createFollowing,
                variables: {
                    input: {
                        userID: userId,
                        followedUserID: targetUser.id
                    },
                },
              });
        } catch (error) {
            console.error('Error following user:', error);
        }
    }

    const viewFollowing = () => {
        navigation.navigate('ViewFollowing', {userID: targetUser.id});
    }
    
    let followNumber = targetUser.followings.items.length;

    return(
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <ProfilePicture uri={profileURL} size={100} />
                <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{targetUser.firstname} {targetUser.lastname}</Text>
                    <Text style={styles.postContact}>{targetUser.email}</Text>
                    <Text style={styles.postContact}>Phonenumber: {targetUser.phonenumber}</Text>
                    <Text style={styles.postContact}>User since {creationDate}</Text>
                    <TouchableOpacity onPress={follow} style={styles.profileButton}>
                        <Text>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={follow} style={styles.profileButton}>
                        <Text>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={viewFollowing} style={styles.following}>
                        <Text>Following: {followNumber}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <UserPosts userID={targetUser.id} />
        </View>
        
    )
}

export default ViewProfiles;