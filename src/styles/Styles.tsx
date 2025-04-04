import { StyleSheet, Platform, Dimensions } from 'react-native';

const colorBackground = '#f2f7f7';
const colorPrimary = 'white';
const textColor = 'black';

// const backgroundDark = '#181C14'
// const primaryDark = '#3C3D37'
// const textDark = 'white'
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  /**Overall App styles */
  container: {
    flex: 1,
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
  buttonTextBlue: {
    fontSize: 16,
    color: 'blue'
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
    color: textColor,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: textColor,
    margin: 20,
    textAlign: 'center'
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  
  /** Sign in and Sign up page */
  contentText: {
    fontSize: 24,
    marginBottom: 60,
    color: textColor,
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
    backgroundColor: colorPrimary
  },
  longInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: colorPrimary
  },
  centeredRow:{
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    width: '100%',
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
    backgroundColor: colorPrimary,
    height: 40,
    marginRight: 10,
    padding: 10,
  },

  /** User Posts styles */
  postContainer: {
    backgroundColor: colorPrimary,
    margin: 5,
    marginBottom: 0,
    padding: 10,
    flexShrink: 1
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  postProfileImg: {
    height: 35,
    width: 35,
    borderRadius: 18
  },
  profileText:{
    marginLeft: 10,
  },
  postAuthor: {
    fontSize: 14,
    color: 'Black',
    flexDirection: 'row',
    width: width * 0.65,
    flexWrap: 'wrap',
  },
  postDate: {
    fontSize: 12,
    color: '#888',
  },
  bold: {
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  postImg: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  postImgContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none'
  },
  interactSection: {
    flexDirection: 'row',
    marginTop: 5,
  },
  commentSection: {
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    alignItems: 'center'
  },
  shareSection: {
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 5,
    marginLeft: 'auto',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },    
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
    backgroundColor: 'lightgrey',
  },
  activeDot: {
    backgroundColor: 'gray', // Change this color for active dot
  },
  postOptions: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 1,
    padding: 5,
  },

  /** Modal styles */
  postModelOverlay:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  postModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionButton: {
    width: '100%',
    paddingHorizontal: 10,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeOverlayButton: {
    marginBottom: 50,
    height: 50,
    width: '90%',
    backgroundColor: colorPrimary,
    borderRadius: 10,
    justifyContent: 'center',
  },
  searchModalOverlay: {
    flex: 1,
    justifyContent:'flex-end'
  },
  searchModalContainer: {
    width: width,
    height: '85%',
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  searchModalHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 50,
  },
  modalTitle: {
    fontSize: 18,
    margin: 15,
  },
  closeSearchButton: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  closeSearchButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  addedUserImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  addedUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addedUserText: {
    fontSize: 16,
  },
  notificationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  notificationHeader:{
    height: '10%',
  },
  notificationContainer: {
    flex: 1,
    backgroundColor: colorBackground
  },
  imageOverlay:{
    flex: 1,
    justifyContent:'flex-end'
  },
  imageModalHeader:{
    marginTop: 60, 
  },
  imageModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colorBackground
  },
  imageCommentIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1
  },
  commentModalOverlay:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  commentModalHeader:{
    height: '30%',
  },
  commentModalContainer:{
    width: width,
    height: '85%',
    backgroundColor: colorBackground,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  /** View Post Section */
  addCommentSection: {
    flexDirection: 'row',
    marginBottom: Platform.OS === 'ios' ? 40 : 0,
  },
  commentInput: {
    height: 35,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: colorPrimary,
    borderRadius: 5,
    padding: 7,
  },
  commentButton: {
    marginLeft: 10,
  },

  /** Create Post Styles*/
  contentInput: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 40,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: colorPrimary
  },
  postImageContainer: {
    paddingRight: 10,
    paddingTop:10,
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 5,
    paddingBottom: 5,
    zIndex: 1
  },

  /** List Messages and Groups styles */
  itemContentSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },  
  unreadMsgContainer: {
    backgroundColor: 'lightgrey',
    marginBottom: 5,
    padding: 10,
    paddingHorizontal: 20,
  },
  unreadMsgdot : {
    position: 'absolute',
    top: 25,
    left: 5,
  },
  URLSection: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    paddingVertical: 10,
  },
  memberText: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  createButton: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 'auto'
  },

  /** chatRoom Styles   */
  messageHeaderContainer: {
    height: Platform.OS === 'ios' ? 120 : 40,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: colorPrimary,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  },
  chatRoomName: { 
    fontSize: 20,
    color: 'black',
    padding: 10,
    width: width * 0.66
  },
  myMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 5,
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
    alignItems: 'center',
    marginLeft: 5,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  systemMessage:{
    color: 'grey',
    fontSize: 12,
    alignSelf: 'center',
    margin: 5,
  },
  timestamp: {
    fontSize: 9,
    color: '#666',
    alignSelf: 'center',
    verticalAlign: 'middle',
    margin: 5,
  },
  editNameContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20
  },
  chatNameText: {
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
  },

  /** Groups Section */
  groupImg: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  groupImgContainer: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  backContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
  },
  groupHeader:{
    fontSize: 24,
    marginLeft: 10,
  },
  groupInfoContainer: {
    padding: 10,
    paddingTop: 5,
    margin: 5,
    marginBottom: 0,
    backgroundColor: colorPrimary,
  },
  groupMembersContainer: {
  }, 
  joinButton: {
    padding: 5,
    width: width * 0.22,
    borderWidth: 1,
    borderColor: '#888',
    marginTop: 10,
    backgroundColor: colorBackground
  },
  groupNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColor,
  },
  groupDescriptionText: {
    fontSize: 14,
    color: textColor,
    width: '90%'
  },
  postContentTouchable: {
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    marginBottom: 0,
    justifyContent: 'center',
    backgroundColor: colorPrimary
  },
  postContentImg:{
    alignSelf: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10
  },
  postContentButton: {
    marginLeft: 10,
  },
  postContentInput: {
    height: 35,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: colorBackground,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlignVertical: 'center',
    alignSelf: 'center',
    lineHeight: 35,
    fontSize: 14,
    color: textColor,
    fontWeight: 300
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
    top: 20,
    left: 120,
    fontWeight: '600',
    color: 'black',
    opacity: 0.8
  },
  addMemberText: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15,
    right: 10,
    alignItems: 'center'
  },
  listMemberContainer: {
    flexDirection: 'row',
    backgroundColor: colorPrimary,
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
  },
  roleContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    width: 'auto',
    marginLeft: 'auto'
  },
  roleText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginLeft: 'auto'
  },
  removeChatIcon: {
    position: 'absolute',
    top: 15,
    right: 5,
    zIndex: 1
  },
  groupPrivacyContainer:{
    flexDirection: 'row',
    padding: 10,
  },
  privacyText:{
    fontSize: 16,
    color: 'black',
  },
  privacyIcon:{
    width: 16,
    height: 16,
    borderRadius: 8,
    margin: 5,
    marginLeft: 15,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  privacyIconSelected:{
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  privacyIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  privacyIconText: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  privacyIconTextSelected: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  privacyIconContainerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
  privacyIconContainerNotSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },

  /** Search User Styles  */
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: colorPrimary
  },
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
    backgroundColor: colorPrimary,
    width: '100%'
  },
  userTextContainer: {
    paddingHorizontal: 10,
  },
  searchTermList: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
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
    backgroundColor: colorPrimary,
    zIndex: 1
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
    backgroundColor: 'grey',
    zIndex: 1
  },

  /** Explore Section */
  exploreGroupContainer: {
    display: 'flex',
    backgroundColor: colorPrimary,
    width: width * 0.475,
    height: 200,
    margin: 5,
  },
  exploreImg: {
    width: '100%',
    height: '78%',
    objectFit: 'cover'
  },
  exploreTitle:{
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 5
  },
  exploreDescription:{
    flexDirection: 'row',
    position: 'absolute',
    fontSize: 15,
    top: 5,
    left: 5,
    zIndex: 1,
    paddingRight: 5
  },
  exploreMembers:{
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 12,
    fontWeight: '400'
  },

  /** Profile Section */
  viewUserProfileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: colorPrimary,
    marginBottom: 10,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: colorPrimary,
  },
  messageUserButton: {
    width: width * 0.16,
    borderWidth: 1,
    borderColor: '#888',
    padding: 5,
    backgroundColor: '#f2f7f7',
  },
  viewProfileURL: {
    height: 80, 
    width: 80, 
    borderRadius: 40
  },
  editProfileURL : { 
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userContact: {
    fontSize: 12,
    color: "#888"
  },
  userInfoContainer: {
    paddingHorizontal: 10,
    width: width * 0.60
  },
  uploadImage: {
    alignSelf: 'center',
    margin: 10,
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
  editProfileButton: {
    position: 'absolute',
    right: 5,
    top: 0,
    width: 'auto',
    padding: 10,
    zIndex: 1
  },

});


export default styles;