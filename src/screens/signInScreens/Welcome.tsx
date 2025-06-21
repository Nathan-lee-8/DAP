import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SignInScreenStyles';
import ImgComponent from '../../components/ImgComponent';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignInParamList } from '../../types/rootStackParamTypes';

//Initial welcome screen, navigates to SignIn screen
const Welcome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SignInParamList>>();
  const handleSignIn = () => {
    navigation.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImgComponent uri="logo" style={styles.logo}/>
        <Text style={styles.logoText}> DAP </Text>
      </View>
      <Text style={styles.welcomeMessage}>Interact with your community.</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginBtnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Welcome;