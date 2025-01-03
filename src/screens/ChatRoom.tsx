import { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity,
     ActivityIndicator } from 'react-native';
import styles from '../styles/Styles';
import client from '../client';
import { getChat } from '../graphql/queries';
import { createMessage, updateUserChat } from '../graphql/mutations';
import { onCreateMessage } from '../graphql/subscriptions';
import  { Message } from '../API';
import ProfilePicture from '../components/ProfilePicture';
import { Participant } from '../types/rootStackParamTypes'
import { AuthContext } from '../context/AuthContext';

const ChatRoom = ( { route } : any) => {
    const UserChat = route.params.userChat;
    const [messages, setMessages] = useState<Message[]>([]);
    const [currMessage, setMessage] = useState<string>('');
    const flatListRef = useRef<FlatList<Message>>(null);
    const [nextToken, setNextToken] = useState<string | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [participants, setParticipants] = useState<Participant[] | undefined>([]);
    const [chatName, setChatName] = useState<string | undefined>('');
    const msgCountRef = useRef<number>(0);
    const targetChatIDref = useRef<string | undefined>('');
    const messageRef = useRef<string>('');
    const msgSent = useRef<boolean>(false);

    const authContext = useContext(AuthContext);
    if(!authContext){
        console.log("Auth context not defined");
        return;
    }
    const userId = authContext.userId;

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
            console.log("chat fetched from chatroom");
            const chatData = chat.data.getChat;

            const fetchedMessages: Message[] = (chatData?.messages?.items || []).filter(
                (message): message is Message => message !== null
            );
            setMessages((prev) => {
                const newMessages = fetchedMessages.filter((msg) => !prev.some((prevMsg) => prevMsg.id === msg.id));
                if(newMessages[0]) messageRef.current = newMessages[0].content; 
                return [...prev, ...newMessages];  // Add only new messages
            });
            setNextToken(chatData?.messages?.nextToken);

            let participantData = chatData?.participants?.items;
            setParticipants(participantData);
            if(UserChat.chat.isGroup) setChatName(chatData?.name);
            else(participantData?.forEach((participant) => {
                let part = participant?.user;
                if(part?.id !== userId){
                    setChatName(part?.firstname + " " + part?.lastname);
                    targetChatIDref.current = participant?.id;
                    if(participant?.unreadMessageCount) msgCountRef.current = participant?.unreadMessageCount;
                } 
            }));
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChat();
        const subscription = client.graphql({
            query: onCreateMessage,
            variables: {
                filter: { chatID: { eq: UserChat.chatID } }, // Scope to the current chat
            },
            authMode: 'userPool'
        }).subscribe({
            next: (value : any) => {
                const newMessage = value?.data.onCreateMessage;
                setMessages((prev) => {
                    if(!newMessage) return prev;
                    const existing = prev.find((msg) => msg?.id === newMessage?.id);
                    if (existing) return prev;
                    return [...prev, newMessage];
                });
                if(newMessage.content) messageRef.current = newMessage.content;
                msgSent.current = true;
                scrollToBottom();
            },
            error: (err: any) => console.error("Subscription error:", err),
        });
    
        return () => {
            if (messageRef.current && msgSent.current) {
                const updateLastMessage = async () => {
                    try {
                        await client.graphql({
                            query: updateUserChat, // GraphQL mutation to update last message
                            variables: {
                                input: {
                                    id: UserChat.id,
                                    lastMessage: messageRef.current, // You may need to adjust based on your schema
                                    unreadMessageCount: 0
                                },
                            },
                            authMode: 'userPool'
                        });
                        if(targetChatIDref.current){
                            await client.graphql({
                                query: updateUserChat, // GraphQL mutation to update last message
                                variables: {
                                    input: {
                                        id: targetChatIDref.current,
                                        lastMessage: messageRef.current, // You may need to adjust based on your schema
                                        unreadMessageCount: msgCountRef.current
                                    },
                                },
                                authMode: 'userPool'
                            });
                        }
                        console.log("Last message updated in chat data");
                    } catch (error) {
                        console.error("Error updating last message:", error);
                    }
                };
                updateLastMessage();
            }
            subscription.unsubscribe(); // Clean up the subscription
        } 
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
            msgCountRef.current = msgCountRef.current + 1;
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

    const getMsgContainerStyle = (id: string) => {
        if(id === UserChat.userID) return styles.myMessageContainer;
        return styles.otherMessageContainer;
    }

    return(
        <View style={styles.container}>
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            <Text style={styles.title}>{chatName}</Text>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if(!item){
                        console.warn("Undefined items in messages list");
                        return null;
                    }
                    let profURL;
                    if(participants){
                        const part = participants.find(
                            (participant) => participant?.user?.id === item?.senderID
                        );
                        if(part?.user?.profileURL === null){ 
                            profURL = part?.user?.profileURL || undefined;
                        }
                    }
                    const textContent = item?.content || "Message content not available";
                    return (
                        <View style={getMsgContainerStyle(item?.senderID)}>
                            {item?.senderID !== UserChat.userID  && <ProfilePicture uri={profURL} size={35}/>}
                            <View style={getMsgStyle(item?.senderID)}>
                                <Text>{textContent}</Text>
                            </View>
                            {item?.senderID === UserChat.userID  && <ProfilePicture uri={profURL} size={35}/>}
                        </View>
                )}}
                onEndReached={ () => {
                    if(nextToken) fetchChat();
                }}
                onEndReachedThreshold={0.5}
                inverted
            />
            <View style={{flexDirection: 'row'}}> 
                <TextInput
                    style={styles.textInput}
                    placeholder={'Type a message'}
                    value={currMessage}
                    autoCapitalize='sentences'
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity style={styles.msgButton} onPress={sendMessage} >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatRoom;