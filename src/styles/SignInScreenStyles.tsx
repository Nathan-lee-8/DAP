import { StyleSheet, Platform, Dimensions } from 'react-native';

const colorBackground = '#f2f7f7';
const colorPrimary = 'white';

// const backgroundDark = '#181C14'
// const primaryDark = '#3C3D37'
// const textDark = 'white'
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  /** Welcome Screen Styles */
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colorPrimary,
  },
  header: {
    height: Platform.OS === 'ios' ? 50 : 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems:'center',
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 35,
    marginLeft: 10,
  }, 
  welcomeMessage: {
    marginTop: 20,
    fontSize: 60,
    fontWeight: 'bold'
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
  
  /** Sign in Screen styles */
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 10,
    padding: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  backText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 500
  },
  logoLarge: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: '40%',
  },
  loginText:{
    fontSize: 30,
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    justifyContent: 'center',
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
  longInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(148, 148, 148, 0.19)'
  },   
  seePasswordIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    opacity: 0.6
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
    textAlign: 'center',
    justifyContent:'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  googleLoginText: {
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
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  overLayText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});



export default styles;