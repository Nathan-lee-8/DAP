import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { SignInParamList } from '../../types/rootStackParamTypes';
import styles from '../../styles/Styles';
import ImgComponent from '../../components/ImgComponent';

const Welcome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  return (
    <View style={[styles.container, {padding: 20, paddingTop: Platform.OS === 'ios' ? 70 : 10}]}>
      <View style={{flexDirection: 'row'}}>
        <ImgComponent uri="logo" style={styles.logo}/>
        <Text style={styles.logoText}> DAP </Text>
      </View>
      <Text style={styles.announcement}>Interact with your community.</Text>
      <View style={{marginTop: 'auto'}}>
        <TouchableOpacity style={styles.buttonBlack} onPress={handleSignUp}>
          <Text style={styles.buttonTextWhite}> Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWhite} onPress={handleSignIn}>
          <Text style={styles.buttonTextBlack}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome;