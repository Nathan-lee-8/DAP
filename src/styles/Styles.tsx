import { StyleSheet } from 'react-native';

const colorBackground = '#f2f7f7';

const styles = StyleSheet.create({
  /**Overall App styles */
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 20,
    backgroundColor: colorBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: 'black',
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
  topTab: {
    backgroundColor: colorBackground,
    marginTop: 60
  },
  noResultsMsg : {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  goBackButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1,
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
    marginLeft: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: -10,
    marginBottom: 8,
    fontSize: 12,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  searchTermContainer: {
    height: 40,
    width: 60,
    alignContent:'center',
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  searchTermSelected: {
    height: 40,
    width: 60,
    alignContent:'center',
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'grey'
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
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  msgInput: {
    height: 40,
    width: '85%',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },  
  unreadMsgContainer: {
    padding: 15,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },

  /** Profile Section */
  editProfileButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    borderWidth: 1,
    borderColor:  '#007BFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  uploadImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadImageText: {
    position: 'absolute',
    fontSize: 20,
    left: 30,
    top: 60,
    fontWeight: '600',
    color: 'black',
    opacity: 0.6
  },

  /** Groups Section */
  groupImg: {
    width: '100%',
    height: 190,
    alignSelf: 'center',
  },
  groupImgContainer: {
    width: '100%',
    height: 190,
    alignSelf: 'center',
  },
  groupMembersContainer: {
    padding: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  createGroupButton: {
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
  createGroupButtonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
    marginRight: 10,
    marginLeft: 10,
  },
  addImageText: {
    position: 'absolute',
    fontSize: 20,
    top: 60,
    left: 150,
    fontWeight: '600',
    color: 'black',
    opacity: 0.6
  },
  menuTopRightNav: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
  menuTopRightList: {
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 1,
  },
  menuTopRightItem: {
    alignItems: 'flex-end',
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },

/** View Post Section */
  viewPostContainer: {
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 1,
    elevation: 2,
  },
  postImgContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
});


export default styles;