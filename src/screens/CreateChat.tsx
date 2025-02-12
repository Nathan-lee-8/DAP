import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import { createChat, createUserChat, createMessage, deleteChat, deleteMessage,
    deleteUserChat } from '../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from '@aws-amplify/auth';
import { GlobalParamList } from '../types/rootStackParamTypes';
import { User } from '../API';
import Icon from '@react-native-vector-icons/ionicons';
import SearchBar from '../components/SearchBar';

//TODO: Add rollback in case of failure, create Loading screen
const CreateChat = ( { route }: any) => {
    const initalUser = route.params.user ? [route.params.user] : [];
    const [ targetUsers, setTargetUsers ] = useState<User[]>(initalUser);
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();

    const authContext = useContext(AuthContext);
    if(!authContext) {
        console.log("Auth context not defined");
        return null;
    }
    const { userId } = authContext;

    const createChatRoom = async () => {
        if(message === '') return;
        else if( targetUsers.length === 0) {
            Alert.alert("No target selected.");
            return;
        }
        var chatID = null;
        var firstMsgID = null;
        const addedMembers = [];

        try{
            setLoading(true);
            const cognitoID = await getCurrentUser();

            const chat = await client.graphql({
                query: createChat,
                variables: {
                    input: {
                        name: "default",
                        isGroup: targetUsers.length > 1,
                    }
                },
                authMode: 'userPool'
            });
            console.log("chat created");
            chatID = chat.data.createChat.id;

            const myUserChat = await client.graphql({
                query: createUserChat,
                variables:{
                    input:{
                        userID: userId,
                        chatID: chat.data.createChat.id,
                        ownerID: cognitoID.userId,
                        unreadMessageCount: 0,
                        lastMessage: message
                    }
                },
                authMode: 'userPool'
            })
            console.log("senderChat created");
            addedMembers.push(myUserChat.data.createUserChat.id);

            targetUsers.map(async (user : User) => {
                let targetOwnerID = user.owner;
                if(!targetOwnerID ) return;
                const targetUserChat = await client.graphql({
                    query: createUserChat,
                    variables:{
                        input:{
                            userID: user.id,
                            chatID: chat.data.createChat.id,
                            ownerID: targetOwnerID,
                            unreadMessageCount: 1,
                            lastMessage: message
                        }
                    },
                    authMode: 'userPool'
                })
                console.log(user.firstname + " chat created");
                addedMembers.push(targetUserChat.data.createUserChat.id);
            })

            const msgData = await client.graphql({
                query: createMessage,
                variables:{
                    input:{
                        senderID: userId,
                        content: message,
                        chatID: chat.data.createChat.id,
                    }
                },
                authMode: 'userPool'
            })
            console.log("Msg sent")
            firstMsgID = msgData.data.createMessage.id;

            navigation.reset({
                index: 1,
                routes: [
                    { name: 'MainTabs', params: {screen: 'Messages'} },
                    { name: 'ChatRoom', params: { chatID: chat.data.createChat.id } 
                }],
            });
        } catch (error: any) {
            rollBack(addedMembers, chatID, firstMsgID);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const rollBack = async (addedMembers: string[], chatID: string | null, firstMsgID: string | null) => {
        //Delete Members (Userchats)
        if(firstMsgID){
            try{
                await client.graphql({
                    query: deleteMessage,
                    variables: {
                        input: {
                            id: firstMsgID
                        }
                    },
                    authMode:'userPool'
                })
            } catch (error) {
                console.log(`Failed to rollback first message ID: ${firstMsgID}:`, error);
            }
        }

        if(addedMembers.length > 0){
            for( const member of addedMembers){
                try{
                    await client.graphql({
                        query: deleteUserChat,
                        variables: {
                            input: {
                                id: member
                            }
                        },
                        authMode:'userPool'
                    })
                } catch (error) {
                    console.log(`Failed to rollback member ID: ${member}:`, error);
                }
            }
        }
        
        //delete Chat
        if(chatID){
            try{
                await client.graphql({
                    query: deleteChat,
                    variables: {
                        input: {
                            id: chatID
                        }
                    },
                    authMode:'userPool'
                })
            } catch (error) {
                console.log(`Failed to rollback chat ID: ${chatID}:`, error);
            }
        }
    }

    const handleUserSelected = ( user: User) => {
        if(targetUsers.includes(user))return;
        setTargetUsers([...targetUsers, user]);
    }

    const handleRemoveUser = (userID: string) => {
        setTargetUsers(targetUsers.filter((user) => user.id !== userID));
    }

    if(loading) return <Text style={styles.container}>Loading...</Text>;

    return(
        <View style={[styles.container, {justifyContent: "flex-end"}]}> 
            <SearchBar userPressed={handleUserSelected}/>
            <FlatList
                data={targetUsers}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Text>{item.item.firstname} {item.item.lastname} </Text>
                        <TouchableOpacity onPress={() => handleRemoveUser(item.item.id)}>
                            <Icon name="remove-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Text style={[styles.contentText, {marginBottom: 'auto'}]}></Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.msgInput}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.msgButton} onPress={createChatRoom} >
                    <Icon name="send" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateChat;