import { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import styles from '../styles/Styles';
import client from '../client';
import { getChat } from '../graphql/queries';
import { createMessage } from '../graphql/mutations';
import { onCreateMessage } from '../graphql/subscriptions';
import  { Message } from '../API';

type ChatRoomProps = NativeStackScreenProps<MessagingStackParamList, 'ChatRoom'>;

const ChatRoom = ( { route }: ChatRoomProps) => {
    const UserChat = route.params.userChat;
    const [messages, setMessages] = useState<Message[]>([]);
    const [currMessage, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchChat = async () => {
            try{
                const chat = await client.graphql({
                    query: getChat,
                    variables: { id: UserChat.chatID },
                });
                console.log("chat fetched", chat.data.getChat);
                //@ts-ignore
                setMessages(chat.data.getChat?.messages?.items);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        fetchChat();

        const subscription = client.graphql({
            query: onCreateMessage,
            variables: {
                filter: { chatID: { eq: UserChat.chatID } }, // Scope to the current chat
            },
        }).subscribe({
            next: ({ value }: any) => {
                const newMessage = value?.data.onCreateMessage;
                setMessages((prev) => [...prev, newMessage]);
            },
            error: (err: any) => console.error("Subscription error:", err),
        });
    
        return () => subscription.unsubscribe(); // Clean up the subscription
    }, []);

    const sendMessage = async () => {
        try {
            const msgData = await client.graphql({
                query: createMessage,
                variables: {
                    input: {
                        senderID: UserChat.userID,
                        content: currMessage,
                        chatID: UserChat.chatID,
                    },
                },
            });
            setMessages((prev) => [...prev, msgData.data.createMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            // Optionally mark the message as "unsent"
        }
    };

    const getMsgStyle = (id: string) => {
        if(id === UserChat.userID) return styles.myMessage;
        return styles.otherMessage;
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{UserChat.chat?.name}</Text>
            <FlatList
                data={messages}
                renderItem={({ item }) => {
                    const messageStyle = getMsgStyle(item.senderID);
                    return (
                        <View>
                            <Text style={styles.timestamp}>{item?.createdAt}</Text>
                            <View style={messageStyle}>
                                <Text>{item?.content}</Text>
                            </View>
                        </View>
                )}}
            />
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                autoCapitalize='sentences'
                onChangeText={setMessage}
            />
            <Button title="Send" onPress={sendMessage}/>
        </View>
    )
}

export default ChatRoom;