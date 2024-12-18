import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FindUserParamList } from '../types/rootStackParamTypes';
import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ProfilePicture';

type ViewProfileProps = NativeStackScreenProps<FindUserParamList, 'ViewProfiles'>;

const ViewProfiles = ( { route }: ViewProfileProps) => {
    const user = route.params.user;
    if(user.profileURL === null){
        user.profileURL = undefined;
    }
    const creationDate = new Date(user.createdAt).toLocaleDateString();
    return(
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <ProfilePicture uri={user.profileURL} size={100} />
                <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{user.firstname} {user.lastname}</Text>
                    <Text style={styles.postContact}>{user.email}</Text>
                    <Text style={styles.postContact}>Phonenumber: {user.phonenumber}</Text>
                    <Text style={styles.postContact}>User since {creationDate}</Text>
                </View>
            </View>
            <UserPosts userID={user.id} />
        </View>
        
    )
}

export default ViewProfiles;