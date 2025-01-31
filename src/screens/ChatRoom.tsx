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
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons'

const ChatRoom = ( { route } : any) => {
    const UserChat = route.params.userChat;
    const [messages, setMessages] = useState<Message[]>([]);
    const [currMessage, setMessage] = useState<string>('');
    const [nextToken, setNextToken] = useState<string | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [chatName, setChatName] = useState<string | undefined>('');
    
    const flatListRef = useRef<FlatList<Message>>(null); //for scroll to bottom
    const msgCountRef = useRef<number>(0);
    const targetChatIDref = useRef<string | undefined>('');
    const lastMsgRef = useRef<string>('');
    const msgSentRef = useRef<boolean>(false);

    const authContext = useContext(AuthContext);
    if(!authContext){
        console.log("Auth context not defined");
        return;
    }
    const userId = authContext.userId;

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
                    //If msg ID already exists:
                    if (prev.find((msg) => msg?.id === newMessage?.id)) return prev;
                    return [...prev, newMessage];
                });
                if(newMessage.content) lastMsgRef.current = newMessage.content;
                scrollToBottom();
            },
            error: (err: any) => console.error("Subscription error:", err),
        });
    
        return () => subscription.unsubscribe(); // Clean up the subscription
    }, []);

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
            const chatData = chat.data.getChat;
            console.log("chat fetched from chatroom");

            //filter out null messages
            const fetchedMessages: Message[] = (chatData?.messages?.items || []).filter(
                (message): message is Message => message !== null
            );
            setMessages((prev) => {
                const newMessages = fetchedMessages.filter((msg) => !prev.some((prevMsg) => prevMsg.id === msg.id));
                if(newMessages[0]) lastMsgRef.current = newMessages[0].content; 
                return [...prev, ...newMessages];
            });
            setNextToken(chatData?.messages?.nextToken);
            let participantData = chatData?.participants?.items;
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

    const navigation = useNavigation();
    const handleGoBack = async () => {
        try{
            if(lastMsgRef.current){
                await client.graphql({
                    query: updateUserChat, // GraphQL mutation to update last message
                    variables: {
                        input: {
                            id: UserChat.id,
                            lastMessage: lastMsgRef.current, // You may need to adjust based on your schema
                            unreadMessageCount: 0
                        },
                    },
                    authMode: 'userPool'
                });
            }
            if(targetChatIDref.current && msgSentRef.current){
                await client.graphql({
                    query: updateUserChat, // GraphQL mutation to update last message
                    variables: {
                        input: {
                            id: targetChatIDref.current,
                            lastMessage: lastMsgRef.current, // You may need to adjust based on your schema
                            unreadMessageCount: msgCountRef.current
                        },
                    },
                    authMode: 'userPool'
                });
            }
        } catch (error) {
            console.error("Error updating last message:", error);
        }
        navigation.goBack();
    }

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
            msgSentRef.current = true;
        } catch (error) {
            console.error("Failed to send message:", error);
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
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton} >
                <Icon name="arrow-back" size={24} />
            </TouchableOpacity>
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
                    let profURL = item?.sender?.profileURL ? item?.sender?.profileURL: undefined;
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
                onEndReachedThreshold={0.4}
                inverted
            />
            <View style={{flexDirection: 'row'}}> 
                <TextInput
                    style={styles.msgInput}
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