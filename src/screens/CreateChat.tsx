import { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../types/rootStackParamTypes';
import styles from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import client from '../client';
import { createChat, createUserChat, createMessage } from '../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from '@aws-amplify/auth';

type CreateChatProps = NativeStackScreenProps<MessagingStackParamList, 'CreateChat'>;

//TODO: Add rollback in case of failure, create Loading screen
const CreateChat = ( { route }: CreateChatProps) => {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        console.log("Auth context not defined");
        return null;
    }
    const { firstname, lastname, userId, userEmail } = authContext;
    const targetUser = route.params.user;

    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<MessagingStackParamList, 'ChatRoom'>>();

    var displayName = userEmail;
    if(firstname) displayName = firstname;
    if(lastname) displayName += " " + lastname;

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
                        participantIDs: cognitoIDs,
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
                        chatName: targetDisplayName,
                        ownerID: cognitoID.userId,
                        unreadMessageCount: 0,
                        joinedAt: new Date().toISOString(),
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
                        chatName: displayName,
                        ownerID: targetOwnerID,
                        unreadMessageCount: 1,
                        joinedAt: new Date().toISOString(),
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
                    { name: 'Messaging'},
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
        <View style={styles.container}> 
            <Text style={styles.title}>{targetDisplayName}</Text>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Send" onPress={createChatRoom} />
        </View>
    )
}

export default CreateChat;