import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import { createChat, createUserChat, createMessage } from '../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from '@aws-amplify/auth';
import { GlobalParamList } from '../types/rootStackParamTypes';

//TODO: Add rollback in case of failure, create Loading screen
const CreateChat = ( { route }: any) => {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        console.log("Auth context not defined");
        return null;
    }
    const { userId } = authContext;
    const targetUser = route.params.user;

    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList, 'ChatRoom'>>();

    var targetDisplayName = targetUser.email;
    if(targetUser.firstname) targetDisplayName = targetUser.firstname;
    if(targetUser.lastname) targetDisplayName += " " + targetUser.lastname;

    const createChatRoom = async () => {
        try{
            setLoading(true);
            const cognitoID = await getCurrentUser();
            let cognitoIDs = [cognitoID.userId];
            let targetOwnerID = targetUser.owner;
            if(!targetOwnerID) {
                console.log("No taget owner ID");
                Alert.alert("Error no ownerID");
                return;
            }
            cognitoIDs.push(targetOwnerID);
            const chat = await client.graphql({
                query: createChat,
                variables: {
                    input: {
                        name: "default",
                        isGroup: false,
                    }
                },
                authMode: 'userPool'
            });
            console.log("chat created", chat.data.createChat);
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
            console.log("senderChat created", myUserChat.data.createUserChat);
            const targetUserChat = await client.graphql({
                query: createUserChat,
                variables:{
                    input:{
                        userID: targetUser.id,
                        chatID: chat.data.createChat.id,
                        ownerID: targetOwnerID,
                        unreadMessageCount: 1,
                        lastMessage: message
                    }
                },
                authMode: 'userPool'
            })
            console.log("recieverChat created", targetUserChat.data.createUserChat);
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
            console.log("Sent Message:", msgData.data.createMessage)
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'MainTabs'},
                    { name: 'ChatRoom', params: { userChat: myUserChat.data.createUserChat } 
                }],
            });
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    if(loading) return <Text style={styles.container}>Loading...</Text>;

    return(
        <View style={[styles.container, {justifyContent: "flex-end"}]}> 
            <Text style={[styles.title, {flex: 1}]}>{targetDisplayName}</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.msgInput}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.msgButton} onPress={createChatRoom} >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateChat;