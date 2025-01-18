import { View, Text } from "react-native";
import client from '../client';
import { getGroup } from '../graphql/queries';
import { useEffect } from "react";

const ViewGroup = ({route} : any) => {
  const groupID = route.params.groupID;
  const fetchCurrentData = async () => {
    try{
      const currGroup = await client.graphql({
        query: getGroup,
        variables: {
          id: groupID
        },
        authMode:'userPool'
      })
      console.log(currGroup.data.getGroup);
    } catch (error: any) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    fetchCurrentData();
  }, []);


  return (
    <View>
      <Text>Group Page</Text>
    </View>
  )
}

export default ViewGroup;