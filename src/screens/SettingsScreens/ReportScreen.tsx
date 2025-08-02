import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../../styles/Styles';

const ReportScreen = () => {
  const [ reportMessage, setReportMessage ] = useState('');

  const handleReport = () => {
    console.log('reported')
    // send report to database
  }

  return(
    <View style={styles.container}>
      <View style={{height: 40}}/>
      <Text style={styles.reportModalText}>
        What are we reporting? 
      </Text>
      <Text>User, Group, Chat, Post</Text>
      <Text style={styles.reportModalText}>
        Thank you for keeping DAP communities safe. What is the purpose of this report?
      </Text>
      <Text>Bullying, Suicide or self-harm, Violence or hate, Nudity or sexual behavior, Scam/Fraud, False information, Intellectual property</Text>
 
      <TextInput
        value={reportMessage}
        onChangeText={setReportMessage}
        style={styles.reportInput}
        placeholder="Add a note(optional)"
        multiline={true}
      />
      <TouchableOpacity style={[styles.reportModalButton]} onPress={handleReport}>
        <Text style={{textAlign: 'center', fontSize: 18}}>Report</Text>
      </TouchableOpacity>
      <View style={{height: '20%'}}/>
      
    </View>
  )
}

export default ReportScreen;