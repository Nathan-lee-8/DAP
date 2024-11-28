import { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import styles from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import { createChat, createUserChat } from '../graphql/mutations';

type CreateChatProps = NativeStackScreenProps<MessagingStackParamList, 'CreateChat'>;

const CreateChat = ( { route }: CreateChatProps) => {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        console.log("Auth context not defined");
        return null;
    }

    const currUserId = authContext.userId;
    const [ message, setMesesage ] = useState('');
    const user = route.params.user;

    const createChatRoom = async () => {
        try{
            const chat = await client.graphql({
                query: createChat,
                variables: {
                    input: {
                        name: user.firstname + " " + user.lastname,
                        isGroup: false,
                    }
                }
            });
            console.log("chat created", chat.data.createChat.id);
            const res1 = await client.graphql({
                query: createUserChat,
                variables:{
                    input:{
                        userID: currUserId,
                        chatID: chat.data.createChat.id,
                        unreadMessageCount: 0,
                    }
                }
            })
            console.log("senderChat created", res1.data.createUserChat);
            const res2 = await client.graphql({
                query: createUserChat,
                variables:{
                    input:{
                        userID: user.id,
                        chatID: chat.data.createChat.id,
                        unreadMessageCount: 1,
                    }
                }
            })
            console.log("recieverChat created", res2.data.createUserChat);
        } catch (error: any) {
            console.log(error.message);
        }
        console.log(message);
    }

    return(
        <View style={styles.container}> 
            <Text style={styles.title}> Messaging: {user.firstname} {user.lastname}</Text>
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