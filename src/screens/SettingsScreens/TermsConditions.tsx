import { View, Text, TouchableOpacity } from 'react-native'
import { WebView } from "react-native-webview";
import styles from '../../styles/Styles';
import Icon from '@react-native-vector-icons/ionicons';

const Terms = (route: any) => {
  const section = route.route.params.section;
  const navigation = route.navigation;
  const uri = `https://daplegal.s3.us-west-2.amazonaws.com/legal.html#${section}`;
  return (
    <View style={styles.container}>
      <View style={styles.header}/>
      <TouchableOpacity style={styles.backBtn} onPress={() => {navigation.goBack()}}>
        <Icon name={'arrow-back'} size={25} color={'black'}/>
        <Text style={styles.backText}>
          {section === 'privacy-policy' ? 'Privacy Policy'
            : section === 'community-guidelines' ? 'Community Guidelines'
            : 'Terms of Service'
          }
        </Text>
      </TouchableOpacity>

      <WebView 
        source={{ uri: uri}} 
        style={{ flex: 1 }}
      />

    </View>
  );
}

export default Terms;