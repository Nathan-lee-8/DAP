import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FindUserParamList } from '../types/rootStackParamTypes';

type ViewProfileProps = NativeStackScreenProps<FindUserParamList, 'ViewProfiles'>;

const ViewProfiles = ( { route }: ViewProfileProps) => {
    const user = route.params.user;
    return(
        <View>
            <Text>Email: {user.email}</Text>
            <Text>Name: {user.firstname} {user.lastname}</Text>
            <Text>Phonenumber: {user.phonenumber}</Text>
            <Text>id: {user.id}</Text>
            <Text>Created At: {user.createdAt}</Text>
            <Text>Last Updated: {user.updatedAt}</Text>
        </View>
    )
}

export default ViewProfiles;