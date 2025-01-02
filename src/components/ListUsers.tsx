import { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { followingsByUser } from "../graphql/queries";
import { Following } from '../API';
import client from '../client';
import styles from '../styles/Styles';

/**
 * TODO: Add fetch limits, use next token to retrieve next values on scroll
 *       Add indicator if no data found. 
 */
const ListUsers = ( {route}: any) => {
    const userId = route.params?.userId;
    const [users, setUsers] = useState<Following[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFollowings();
    }, []);

    const fetchFollowings = async () => {
        try{
            const data = await client.graphql({
                query: followingsByUser,
                variables: { userID: userId}
            });
            console.log('fetched from getFollowers');
            setUsers(data.data.followingsByUser.items)
        } catch (error: any){
            console.log(error);
            return <View><Text>Error fetching Data</Text></View>;
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> {userId} is Following: </Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={users}
                    renderItem={({ item }) => {
                    return (
                        <View style={styles.postContainer}>
                        <Text style={styles.postType}>{item.followedUserID}</Text>
                        <Text style={styles.postContent}>{item.owner}</Text>
                        </View>
                    )}}
                />
            )}
        </View>
    )
}

export default ListUsers;