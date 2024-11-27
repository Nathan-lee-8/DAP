import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import styles from '../styles/Styles';

type CreateChatProps = NativeStackScreenProps<MessagingStackParamList, 'CreateChat'>;

// Create a TextInput at the bottom of the screen
// Create a chat room once the user sends the chat message.
const CreateChat = ( { route }: CreateChatProps) => {
    const [ message, setMesesage ] = useState('');
    const user = route.params.user;

    const createChatRoom = () => {
        console.log('TRYING');
    }

    return(
        <View>
            <Text>Chat Room: {user.email}</Text>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={message}
                onChangeText={setMesesage}
            />
            <Button title="Send" onPress={createChatRoom} />
        </View>
    )
}

export default CreateChat;