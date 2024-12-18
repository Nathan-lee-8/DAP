import { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
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
    const flatListRef = useRef<FlatList<Message>>(null);
    const [nextToken, setNextToken] = useState<string | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchChat = async () => {
        setLoading(true);
        try{
            const chat = await client.graphql({
                query: getChat,
                variables: { 
                    id: UserChat.chatID, 
                    messagesLimit: 20, 
                    messagesNextToken: nextToken,
                },
                authMode: 'userPool'
            });
            console.log("chat fetched");
            const fetchedMessages: Message[] = (chat.data.getChat?.messages?.items || []).filter(
                (message): message is Message => message !== null
            );
            setMessages((prev) => {
                const newMessages = fetchedMessages.filter((msg) => !prev.some((prevMsg) => prevMsg.id === msg.id));
                return [...prev, ...newMessages];  // Add only new messages
            });
            setNextToken(chat.data.getChat?.messages?.nextToken); 
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMessages([]);
        fetchChat();
    }, [UserChat.chatID]);

    useEffect(() => {
        const subscription = client.graphql({
            query: onCreateMessage,
            variables: {
                filter: { chatID: { eq: UserChat.chatID } }, // Scope to the current chat
            },
            authMode: 'userPool'
        }).subscribe({
            next: ({ value }: any) => {
                const newMessage = value?.data.onCreateMessage;
                setMessages((prev) => {
                    if(!newMessage) return prev;
                    const existing = prev.find((msg) => msg?.id === newMessage?.id);
                    if (existing) return prev;
                    return [...prev, newMessage];
                });
                scrollToBottom();
            },
            error: (err: any) => console.error("Subscription error:", err),
        });
    
        return () => subscription.unsubscribe(); // Clean up the subscription
    }, [UserChat.chatID]);

    const sendMessage = async () => {
        if(currMessage === '')return;
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
                authMode: 'userPool'
            });
            setMessages((prev) => [msgData.data.createMessage, ...prev]);
            setMessage('');
            scrollToBottom();
        } catch (error) {
            console.error("Failed to send message:", error);
            // Optionally mark the message as "unsent"
        }
    };

    const scrollToBottom = () => {
        flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
        });
    };

    const getMsgStyle = (id: string) => {
        if(id === UserChat.userID) return styles.myMessage;
        return styles.otherMessage;
    }

    return(
        <View style={styles.container}>
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            <Text style={styles.title}>{UserChat.chat?.name}</Text>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const messageStyle = getMsgStyle(item?.senderID);
                    return (
                        <View>
                            <Text style={styles.timestamp}>{item?.createdAt}</Text>
                            <View style={messageStyle}>
                                <Text>{item?.content}</Text>
                            </View>
                        </View>
                )}}
                onEndReached={ () => {
                    if(nextToken) fetchChat();
                }}
                onEndReachedThreshold={0.5}
                inverted
            />
            <TextInput
                style={styles.input}
                placeholder={'Type a message'}
                value={currMessage}
                autoCapitalize='sentences'
                onChangeText={(text) => setMessage(text)}
            />
            <Button title="Send" onPress={sendMessage}/>
        </View>
    )
}

export default ChatRoom;