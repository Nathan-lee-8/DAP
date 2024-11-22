import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

/**
 * TODO: Load page feed with current users messages. 
 *       Populate search with users. 
 */
const MessageUsers = () => {
  const [search, setSearch] = useState<string | any>('');



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Search for users..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
});

export default MessageUsers;
