import { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { followingsByUser } from "../graphql/queries";
import { Following } from '../API';
import client from '../client';
import styles from '../styles/Styles';
import ProfilePicture from './ProfilePicture';

/**
 * TODO: Add fetch limits, use next token to retrieve next values on scroll
 *       Add indicator if no data found. 
 */
const ListUsers = ( {route}: any) => {
    const userId = route.params?.userID;
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
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={users}
                    renderItem={({ item }) => {
                        let user = item.followedUser;
                        let name = user?.firstname + ' ' + user?.lastname;
                        let userURL = user?.profileURL || undefined;

                        return (
                            <View style={styles.searchUserContainer}>
                                <View style={styles.listUserContainer}>
                                    <ProfilePicture uri={userURL} size={50}/>
                                    <Text style={[styles.postContent, {marginLeft: 10}]}>{name}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            )}
        </View>
    )
}

export default ListUsers;