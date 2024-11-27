import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types/rootStackParamTypes';

type ChatRoomProps = NativeStackScreenProps<MessagingStackParamList, 'ChatRoom'>;

const ChatRoom = ( { route }: ChatRoomProps) => {
    return(
        <View>
            <Text>Chat Room: {route.params.user.email}</Text>
        </View>
    )
}

export default ChatRoom;