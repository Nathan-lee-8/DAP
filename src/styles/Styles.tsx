import { StyleSheet } from 'react-native';

const colorBackground = '#f2f7f7';

const styles = StyleSheet.create({
  /**Overall App styles */
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colorBackground,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: '#333',
  },
  buttonCentered: {
    borderRadius: 10,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 10,
    alignSelf: 'center',
    width: '45%',
  },
  buttonText: { 
    fontSize: 14,
    textAlign: 'center',
    color: '#007BFF'
  },
  iconContainer: {
    padding: 20,
    alignSelf: 'baseline',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    padding: 10,
  },
  avatar: {
    marginLeft: 'auto',
  },
  tabView:{
    backgroundColor: 'black',
  },
  topTab: {
    marginTop: 60,
  },

  /** Form Styles */
  formContainer: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  longInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

  /** User Posts styles */
  postContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  textContainer: {
    paddingLeft: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'Black',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: 'Black',
  },
  postContact: {
    fontSize: 12,
    color: '#888',
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    right: 10,
    top: 15,
  },
  postGroup: {
    position: 'absolute',
    right: 10,
    bottom: 15,
  },

  /** Search User Styles  */
  searchUserContainer: {
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 5,
  },

  /** Messaging Styles   */
  myMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  otherMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: 9,
    color: '#666',
    alignSelf: 'center',
    verticalAlign: 'middle',
    margin: 5,
  },
  msgButton: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor:  '#007BFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  textInput: {
    height: 40,
    width: '85%',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },

  /** Groups Section */
  groupProfile: {
    width: '100%',
    height: 170,
    alignSelf: 'center',
  },
  groupProfileContainer: {
    position: 'relative',
    width: '100%',
    height: '28%',
    alignSelf: 'center',
  },
  groupTitle: {
    position: 'absolute',
    fontSize: 20,
    alignContent:'center',
    top: 30,
    left: 30,
    fontWeight: '600',
    color: 'black'
  },
  groupContainer: {
    flexDirection:'row',
    marginVertical: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
  },
  createGroupContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#3c4043',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 24,
    padding: 5,
    marginBottom: 20,
    width: '50%',
  },
  createGroupTitle: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
    marginRight: 10,
    marginLeft: 10,
  },
  addImageContainer: {
    justifyContent:'center'
  },
  uploadImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addImageText: {
    position: 'absolute',
    fontSize: 20,
    top: 60,
    left: 150,
    fontWeight: '600',
    color: 'black'
  },
  createPostImage: {
    height: 150,
    width: 150,
  }
});



export default styles;