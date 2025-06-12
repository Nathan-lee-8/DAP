import { useContext, useState } from "react";
import { View, Text, Alert, TextInput, TouchableOpacity } from "react-native";

import client from "../client";
import { createReport } from "../customGraphql/customMutations";

import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';
import Icon from "@react-native-vector-icons/ionicons";


/**
 * Report Component that displays a report block that allows the user to write a 
 * report message for the item that is reported.
 * 
 * @param type - The type of item reported: 'post', 'comment', 'group', or 'user'
 * @param itemID - The ID of the item being reported
 * @param setReportModalVisible - Function to set the visibility of the report modal
 */
const Report = ({type, itemID, setReportModalVisible} : 
  {type: string, itemID: string, setReportModalVisible: any}) => {
  const [ reportMessage, setReportMessage ] = useState("");
  const currUser = useContext(AuthContext)?.currUser;
  if(!currUser){
    setReportModalVisible(false);
    Alert.alert('Error', 'User not found');
    return;
  }

  const handleReport = async () => {
    if(reportMessage === "") {
      Alert.alert('Error', 'Please enter a reason for reporting');
      return;
    }
    if(itemID === "") {
      Alert.alert('Error', 'Cannot find' + type + 'to report');
      setReportModalVisible(false);
      return;
    }
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: itemID,
            reportedItemType: type,
            reason: reportMessage, // UPDATE REASON WITH TYPES
            message: reportMessage,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Report sent successfully');
      setReportModalVisible(false);
    }catch(error){
      Alert.alert('Error', 'Failed to send report');
    }
  }

  return (
    <View style={styles.reportModalOverLay}>
      <View style={styles.reportModalContainer}>
        <Icon style={styles.closeReportModalButton} name={'close-outline'} size={30} 
          onPress={() => setReportModalVisible(false)}
        /> 
        <Text style={styles.title}>Report</Text>
        <Text style={styles.reportModalText}>
          Thank you for keeping DAP communities safe. What is the purpose of this report?
        </Text>
        <TextInput
          value={reportMessage}
          onChangeText={setReportMessage}
          style={styles.reportInput}
          placeholder="Add a note"
          multiline={true}
        />
        <TouchableOpacity style={styles.reportModalButton} onPress={handleReport}>
          <Text style={{textAlign: 'center', fontSize: 18}}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Report;