import { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, FlatList, TouchableOpacity 
} from 'react-native';

import client from '../../client';
import { createReport } from '../../customGraphql/customMutations';

import { AuthContext } from '../../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../../styles/Styles';

const ReportScreen = ({navigation} : any) => {
  const [ reportMessage, setReportMessage ] = useState('');
  const [ type, setType ] = useState('Select type');
  const [ typePressed, setTypePressed ] = useState(false);

  const [ reason, setReason ] = useState('Select purpose');
  const [ reasonPressed, setReasonPressed ] = useState(false);

  const [ reportedItemName, setReportedItemName ] = useState('');
  const {currUser} = useContext(AuthContext)!;
  if(!currUser) return;

  const handleReport = async () => {
    if(reason === 'Select purpose'){
      Alert.alert('Error', 'Please select a reason');
      return;
    }
    if(type === 'Select type'){
      Alert.alert('Error', 'Please select a type');
    }
    try{
      await client.graphql({
        query: createReport,
        variables: {
          input: {
            reporterID: currUser.id,
            reportedItemID: '123',
            reportedItemType: type,
            reason: reason,
            message: reportMessage,
          }
        },
        authMode: 'userPool'
      })
      Alert.alert('Success', 'Report sent successfully');
    }catch(error){
      Alert.alert('Error', 'Failed to send report');
    }
  }

  const handleSelected = (option: string) => {
    setType(option);
    setTypePressed(false);
  }

  const handleSelectedReason = (option: string) => {
    setReason(option);
    setReasonPressed(false);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={25} color={'black'}/>
        <Text style={styles.backText}>Report</Text>
      </TouchableOpacity>
      <View style={{height: 40}}/>
      <Text style={styles.reportModalText}>
        What are we reporting? 
      </Text>
      <TouchableOpacity style={styles.dropdownContainer} 
        onPress={() => setTypePressed(!typePressed)}
      >
        <Text style={{marginRight: 5}}>{type}</Text>
        <Icon name={!typePressed ? 'chevron-down' : 'chevron-up'} size={15} />
      </TouchableOpacity>
      {typePressed && 
        <View style={[styles.dropdownList, {top: 100}]}>
          <FlatList
            data={['User', 'Group', 'Chat', 'Post', 'Other']}
            renderItem={({ item }) => {
              if(!typePressed) return null;
              var currStyle = (item === type) ? 
                styles.dropDownSelected : styles.dropdownItem;
              return(
                <TouchableOpacity style={currStyle} onPress={() => handleSelected(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
            )}}
          />
        </View>
      } 
      <Text style={styles.reportModalText}>
        Thank you for keeping DAP communities safe. What is the purpose of this report?
      </Text>
      <TouchableOpacity style={styles.dropdownContainer} 
        onPress={() => setReasonPressed(!reasonPressed)}
      >
        <Text style={{marginRight: 5}}>{reason}</Text>
        <Icon name={!reasonPressed ? 'chevron-down' : 'chevron-up'} size={15} />
      </TouchableOpacity>
      {reasonPressed && 
        <View style={styles.dropdownList}>
          <FlatList
            data={['Bullying', 'Suicide or self-harm', 'Violence or hate', 
              'Nudity or sexual behavior', 'Scam/Fraud', 'False information',
              'Intellectual property', 'Other']}
            renderItem={({ item }) => {
              if(!reasonPressed) return null;
              var currStyle = (item === reason) ? 
                styles.dropDownSelected : styles.dropdownItem;
              return(
                <TouchableOpacity style={currStyle} onPress={() => handleSelectedReason(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
            )}}
          />
        </View>
      } 
      <Text style={styles.reportModalText}>
        Please enter a name for the reported item if applicable
      </Text>
      <TextInput
        value={reportedItemName}
        onChangeText={setReportedItemName}
        style={styles.reportItemNameInput}
        placeholder="Item name"
      />
 
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