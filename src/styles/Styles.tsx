import { drop } from 'lodash';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 20,
    },
    dropdownButtonStyle: {
      width: 240,
      height: 40,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      margin: 10,
      alignSelf: 'center',
    },
    dropdownButtonTxtStyle: {
      fontSize: 16,
      fontWeight: '400',
      color: '#151E26',
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      fontSize: 16,
      fontWeight: '400',
      color: '#151E26',
    },
    listUserContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
        borderRadius: 5,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    textEmail: {
        fontSize: 13,
        color: '#666',
        marginLeft: 10,
    },
    button: { 
        backgroundColor: '#007BFF', 
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        borderRadius: 5,
        marginLeft: 'auto',
    },
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 14 
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#0084ff',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      maxWidth: '80%',
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      maxWidth: '80%',
    },
    timestamp: {
      fontSize: 9,
      color: '#666',
      alignSelf: 'center',
      verticalAlign: 'middle',
      margin: 5,
    },
});

export default styles;