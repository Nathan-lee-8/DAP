import { View, Text, StyleSheet } from 'react-native';

const FindUsers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Find User Profiles </Text>
    </View>
  );
};

//Styles for FindUser page
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    }, 
  });

export default FindUsers;