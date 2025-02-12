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
  buttonBlack: {
    alignSelf: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    margin: 5,
  },
  buttonWhite: {
    alignSelf: 'center',
    width: '100%', 
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  buttonTextBlack: { 
    fontSize: 14,
    textAlign: 'center',
    color: 'black'
  },
  buttonTextWhite: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf:'center',
    color: 'white'
  },
  announcement: {
    marginTop: 20,
    fontSize: 60,
    fontWeight: 'bold'
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
  noResultsMsg : {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  
  /** Sign in and Sign up page */
  contentText: {
    fontSize: 24,
    marginBottom: 80,
    alignSelf: 'center',
    textAlign: 'center',
  },
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
    marginBottom: 10,
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
  centeredRow:{
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center'
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
  logoutButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 20,
    padding: 10,
  },

  /** User Posts styles */
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 5,
    padding: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileText:{
    marginLeft: 10
  },
  postAuthor: {
    fontSize: 14,
    color: 'Black',
  },
  contentSection: {
    marginBottom: 10,
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
  postDate: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  interactSection : {
    flexDirection: 'row',
  },
  commentSection: {
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  shareSection: {
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 5,
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
  /** Search User Styles  */
  searchUserContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%'
  },
  userTextContainer: {
    paddingHorizontal: 10,
  },
  searchTermList: {
    position: 'absolute',
    top: 0,
    right: 0,
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

  /** List Messages and Groups styles */
  itemContentSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },  
  unreadMsgContainer: {
    backgroundColor: 'lightgrey',
    marginBottom: 5,
  },
  URLSection: {
    width: 30,
    paddingVertical: 10,
  },

  /** chatRoom Styles   */
  messageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  chatRoomName: { 
    fontSize: 20,
    color: 'black',
    padding: 10,
  },
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

  /** Profile Section */
  viewUserProfileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 40,
    backgroundColor: 'white'
  },
  viewProfileURL: {
    height: 100, 
    width: 100, 
    borderRadius: 50
  },
  editProfileURL : { 
    height: 150, 
    width: 150, 
    borderRadius: 75
  },
  userContact: {
    fontSize: 12,
    color: "#888"
  },
  userInfoContainer: {
    paddingHorizontal: 10,
  },
  editProfileButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
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
    alignSelf:'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5,
    marginBottom: 20,
    width: '40%',
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
  menuTopRightList: {
    position: 'absolute',
    top: 0,
    right: 0,
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