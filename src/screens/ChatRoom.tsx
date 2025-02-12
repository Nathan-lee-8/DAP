import { useEffect, useState, useRef, useContext, useLayoutEffect
 } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity,
     ActivityIndicator } from 'react-native';
import styles from '../styles/Styles';
import client from '../client';
import { getChat } from '../graphql/queries';
import { createMessage, updateUserChat } from '../graphql/mutations';
import { onCreateMessage } from '../graphql/subscriptions';
import  { Message, UserChat } from '../API';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';
import ImgComponent from '../components/ImgComponent';

const ChatRoom = ( { route } : any) => {
    const chatID = route.params.chatID;
    const [nextToken, setNextToken] = useState<string | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currMessage, setMessage] = useState<string>('');
    const [participants, setParticipants] = useState<UserChat[]>([]);
    const [myUserChat, setMyUserChat] = useState<UserChat>();
    const [title, setTitle] = useState<string>('default');
    const [displayURLs, setURLs] = useState<(string | undefined)[]>([]);

    const flatListRef = useRef<FlatList<Message>>(null); //for scroll to bottom
    const msgCountRef = useRef<number>(0);
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
                filter: { chatID: { eq: chatID } }, // Scope to the current chat
            },
            authMode: 'userPool'
        }).subscribe({
            next: (value : any) => {
                const newMessage = value?.data.onCreateMessage;
                setMessages((prev) => {
                    if(!newMessage || prev.find((msg) => msg?.id === newMessage?.id)) return prev;
                    return [...prev, newMessage];
                });
                scrollToBottom();
            },
            error: (err: any) => console.error("Subscription error:", err),
        });
    
        return () => subscription.unsubscribe(); // Clean up the subscription
    }, []);

    useEffect( () => {
        var temptitle = participants.map((item) => `${item.user?.firstname} ${item.user?.lastname}`)
        .filter(Boolean)
        .join(', ');
        setTitle(temptitle);
    }, [participants])

    const fetchChat = async () => {
        setLoading(true);
        try{
            const chat = await client.graphql({
                query: getChat,
                variables: { 
                    id: chatID, 
                    messagesLimit: 20, 
                    messagesNextToken: nextToken,
                },
                authMode: 'userPool'
            });
            const chatData = chat.data.getChat;
            console.log("chat fetched from chatroom");
            if(chatData?.messages){
                setMessages(
                    chatData.messages.items.filter((item): item is Message => item !== null)
                )
            }
            let parts = chatData?.participants?.items.filter(item => item !== null);
            if(parts){
                let URLs: (string | undefined)[] = [];
                setParticipants(parts.filter((item): item is UserChat => {
                    if(item?.userID !== userId) URLs.push(item.user?.profileURL || undefined);
                    return item?.userID !== userId;
                }));
                setURLs(URLs);
                setMyUserChat(parts.find((item): item is UserChat  => item?.userID === userId));
            }
            setNextToken(chatData?.messages?.nextToken);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const navigation = useNavigation();
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={handleGoBack} >
                    <Icon name="arrow-back" size={24} />
                </TouchableOpacity>
            )
        })
    })

    const handleGoBack = async () => {
        try{
            if(msgSentRef.current){
                for(const part of participants){
                    const numUnread = part?.unreadMessageCount ? part?.unreadMessageCount : 0;
                    await client.graphql({
                        query: updateUserChat, // GraphQL mutation to update last message
                        variables: {
                            input: {
                                id: part.id,
                                lastMessage: messages[0].content,
                                unreadMessageCount: numUnread + msgCountRef.current,
                            },
                        },
                        authMode: 'userPool'
                    });
                    
                }
            }
            if(myUserChat){
                const myUnread = myUserChat?.unreadMessageCount ? myUserChat.unreadMessageCount : 0;
                if(myUnread === 0 && messages[0].content === myUserChat.lastMessage) {
                    navigation.goBack();
                    return;
                };
                console.log("nn")
                await client.graphql({
                    query: updateUserChat, // GraphQL mutation to update last message
                    variables: {
                        input: {
                            id: myUserChat?.id,
                            lastMessage: messages[0].content, // You may need to adjust based on your schema
                            unreadMessageCount: 0
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
        if(currMessage === '' || !myUserChat?.chatID) return;
        try {
            const msgData = await client.graphql({
                query: createMessage,
                variables: {
                    input: {
                        senderID: userId,
                        content: currMessage,
                        chatID: myUserChat?.chatID,
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
        if(id === userId) return styles.myMessage;
        return styles.otherMessage;
    }

    const getMsgContainerStyle = (id: string) => {
        if(id === userId) return styles.myMessageContainer;
        return styles.otherMessageContainer;
    }

    return(
        <View style={styles.container}>
            <View style={styles.messageHeaderContainer}>        
                <View style={styles.URLSection}>
                    { displayURLs.length > 1 ? (
                        displayURLs.slice(0, 2).map((uri, index) => (
                            <ImgComponent 
                            key={index} 
                            uri={uri || 'defaultUser'} 
                            style={{ 
                                position: 'absolute', 
                                top: index * 10 - 10,
                                left: index * 10 , 
                                zIndex: displayURLs.length - index,   
                                height: 26,
                                width: 26,
                                borderRadius: 13,
                            }} 
                            />
                        ))
                        ) : (
                            <ImgComponent 
                            uri={displayURLs[0] || 'defaultUser'} 
                            style={{height: 30, width: 30, borderRadius: 16}} 
                            />
                        )}
                        
                    </View>
                <Text style={styles.chatRoomName}>{title}</Text>
            </View>
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    let profURL = item?.sender?.profileURL ? item?.sender?.profileURL: undefined;
                    return (
                        <View>
                            <View style={getMsgContainerStyle(item?.senderID)}>
                                {item?.senderID !== userId && <ImgComponent uri={profURL ? profURL : 'defaultUser'}/>}
                                <View style={getMsgStyle(item?.senderID)}>
                                    <Text>{item?.content}</Text>
                                </View>
                                {item?.senderID === userId && <ImgComponent uri={profURL ? profURL : 'defaultUser'}/>}
                            </View>
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
                    <Icon name="send" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatRoom;