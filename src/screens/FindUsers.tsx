
import { View } from 'react-native';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Styles';

const FindUsers = () => {
  return (
    <View style={styles.container}>
      <SearchBar screen="findUser"/>
    </View>
  );
};

export default FindUsers;
