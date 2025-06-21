import { StyleSheet, Platform, Dimensions } from 'react-native';

const colorBackground = '#f2f7f7';
const colorPrimary = 'white';
const textColor = 'black';

// const backgroundDark = '#181C14'
// const primaryDark = '#3C3D37'
// const textDark = 'white'
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  /** Welcome Screen Styles */
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
    backgroundColor: colorPrimary,
  },
  loginBtn:{
    alignSelf: 'center',
    width: width - 40,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 50,
    borderRadius: 5,
  },
  loginBtnText:{
    fontSize: 16,
    textAlign: 'center',
    color: colorPrimary,
  },
  welcomeMessage: {
    marginTop: 20,
    fontSize: 60,
    fontWeight: 'bold'
  },
  logoContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 10,
  }, 
  
  /** Sign in Screen styles */
  logoLarge: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: '30%',
  },
  loginText:{
    fontSize: 30,
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 20
  },
  input: {
    height: 40,
    width: width - 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(148, 148, 148, 0.19)'
  },
  signInBtn:{
    alignSelf: 'center',
    width: width - 40,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 5,
  },
  hyperlink:{
    color: "#007BFF",
    textAlign: 'center'
  },
  googleLoginContainer: {
    width: width - 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#a3a3a3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  centeredRow:{
    marginTop: 15,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center'
  },
  note: {
    marginTop: -10,
    marginBottom: 8,
    fontSize: 12,
  },
});



export default styles;