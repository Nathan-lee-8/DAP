import { View, Text } from 'react-native';
import styles from '../styles/Styles';
import SearchBar from '../components/SearchBar';


const Search = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  )
}


export default Search;