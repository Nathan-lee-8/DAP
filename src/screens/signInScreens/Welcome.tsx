import { View, Text, TouchableOpacity, Platform } from 'react-native';
import styles from '../../styles/Styles';
import ImgComponent from '../../components/ImgComponent';

//Initial welcome screen, navigates to SignIn or SignUp screens
const Welcome = ({route} : any) => {
  const navigation = route.navigation;

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  }

  return (
    <View style={[styles.container, {padding: 20, paddingTop: Platform.OS === 'ios' ? 70 : 10}]}>
      <View style={{flexDirection: 'row'}}>
        <ImgComponent uri="logo" style={styles.logo}/>
        <Text style={styles.logoText}> DAP </Text>
      </View>
      <Text style={styles.announcement}>Interact with your community.</Text>
      <View style={{marginTop: 'auto'}}>
        <TouchableOpacity style={styles.buttonWhite} onPress={handleSignIn}>
          <Text style={styles.buttonTextBlack}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome;