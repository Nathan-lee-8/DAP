import { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import styles from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import { createChat, createUserChat, createMessage } from '../graphql/mutations';
import { useNavigation } from '@react-navigation/native';

type CreateChatProps = NativeStackScreenProps<MessagingStackParamList, 'CreateChat'>;

//TODO: Add rollback in case of failure, create Loading screen
const CreateChat = ( { route }: CreateChatProps) => {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        console.log("Auth context not defined");
        return null;
    }

    const currUserId = authContext.userId;
    const [ message, setMesesage ] = useState('');
    const user = route.params.user;
    const navigation = useNavigation<NativeStackNavigationProp<MessagingStackParamList, 'ChatRoom'>>();

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
            const myUserChat = await client.graphql({
                query: createUserChat,
                variables:{
                    input:{
                        userID: currUserId,
                        chatID: chat.data.createChat.id,
                        unreadMessageCount: 0,
                        joinedAt: new Date().toISOString(),
                    }
                }
            })
            console.log("senderChat created", myUserChat.data.createUserChat);
            const targetUserChat = await client.graphql({
                query: createUserChat,
                variables:{
                    input:{
                        userID: user.id,
                        chatID: chat.data.createChat.id,
                        unreadMessageCount: 1,
                        joinedAt: new Date().toISOString(),
                    }
                }
            })
            console.log("recieverChat created", targetUserChat.data.createUserChat);
            const msgData = await client.graphql({
                query: createMessage,
                variables:{
                    input:{
                        senderID: currUserId,
                        content: message,
                        chatID: chat.data.createChat.id,
                    }
                }
            })
            console.log("Sent Message:", msgData.data.createMessage)
            navigation.navigate('ChatRoom', { userChat: myUserChat.data.createUserChat });
        } catch (error: any) {
            console.log(error.message);
        }
        console.log(message);
    }
    
    var displayName = user.email;
    if(user.firstname) displayName = user.firstname;
    if(user.lastname) displayName += " " + user.lastname;

    return(
        <View style={styles.container}> 
            <Text style={styles.title}> Messaging: {displayName}</Text>
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