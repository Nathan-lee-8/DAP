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
  header: {
    height: Platform.OS === 'ios' ? 110 : 70,
    backgroundColor: colorPrimary
  },
  shortHeader:{
    height: Platform.OS === 'ios' ? 70 : 30,
    backgroundColor: colorPrimary
  },
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
    fontWeight: 400
  },
  buttonBlack: {
    alignSelf: 'center',
    width: width - 20,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
    marginHorizontal: 10,
  }, 
  buttonTextBlack: { 
    fontSize: 14,
    textAlign: 'center',
    color: 'black'
  },
  buttonTextWhite: { 
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  buttonTextBlue: {
    fontSize: 16,
    color: 'blue'
  },
  buttonTextRed: { 
    fontSize: 14,
    textAlign: 'center',
    color: 'red'
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
  unreadChatIcon: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    width: 10,
    height: 10,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  contentText: {
    fontSize: 24,
    marginBottom: 60,
    color: textColor,
    alignSelf: 'center',
    textAlign: 'center',
  },
  longInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: colorPrimary
  },    
  label: {
    marginBottom: 5,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 10,
    borderRadius: 5,
    backgroundColor: colorPrimary
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  overLayText:{
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold'
  },
  processingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    right: 20,
    top: 70
  },

  /** User Posts styles */
  postContainer: {
    backgroundColor: colorPrimary,
    margin: 5,
    marginBottom: 0,
    padding: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignContent:'flex-start',
    marginBottom: 5
  },
  postProfileImg: {
    height: 35,
    width: 35,
    borderRadius: 18,
  },
  profileText:{
    flexShrink: 1,
    marginLeft: 10,
  },
  postAuthor: {
    flexDirection: 'row',
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
    zIndex: 1,
    marginLeft: 'auto',
    paddingLeft: 5,
    paddingBottom: 5,
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
    justifyContent: 'flex-end'
  },
  searchModalSpacer: {
    height: Platform.OS === 'ios' ? '10%': 0
  },
  searchModalContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    marginBottom: 60,
  },
  searchModalHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 70,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: '7%',
  },
  modalTitle: {
    fontSize: 18,
    margin: 15,
  },
  closeSearchButton: {
    position: 'absolute',
    top: 15,
    right: 10,
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
  imageOverlay:{
    flex: 1,
    justifyContent:'flex-end'
  },
  imageModalHeader:{
    height: 0,
  },
  imageModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colorBackground
  },
  closeImageModal: {
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'ios' ? 50 : 10,
    padding: 10,
    zIndex: 1
  },
  imageCommentIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1
  },
  commentModalOverlay:{
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  commentModalHeader:{
    flex: 1
  },
  commentModalContainer:{
    height: '70%',
    backgroundColor: colorBackground,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  reportModalOverLay:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportModalContainer:{
    height: 400,
    width: '80%',
    backgroundColor: colorBackground,
    borderRadius: 10
  },
  reportModalText:{
    fontSize: 16,
    marginHorizontal: 20
  },
  reportInput:{
    flex: 1,
    textAlignVertical: 'top',
    backgroundColor: colorPrimary,
    margin: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  closeReportModalButton: {
    position: 'absolute',
    top: 10,
    padding: 10,
    right: 10,
    zIndex: 1
  },
  reportModalButton:{
    width: '100%',
    justifyContent: 'center',
    height: 50,
    marginTop: 'auto',
    marginBottom: 10
  },
  aboutModalOverlay: {
    flex: 1,
  },
  aboutModalContainer: {
    height: '100%',
    paddingTop: '15%',
    padding: 20,
    backgroundColor: colorBackground
  },

  /* Notification Section */
  notificationModalOverlay:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
  },
  notificationModalContainer:{
    height: '90%',
    width: '100%',
    backgroundColor: colorBackground,
    borderRadius: 10
  },
  notificationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  notificationHeader:{
    height: Platform.OS === 'ios' ? '10%' : '7%',
  },
  notificationContainer: {
    flex: 1,
    backgroundColor: colorBackground
  },
  notificationItem:{
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: colorPrimary,
  },
  unreadItem:{
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: 'lightgrey',
    borderBottomColor: colorPrimary,
    borderBottomWidth: 1,
  },
  removeNotificationIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  expandNotifIcon:{
    position: 'absolute',
    right: 10,
    bottom: 0
  },
  rejectJoinButton:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  acceptJoinButton:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },

  /** comment Section */
  commentUserImg: {
    marginTop: 5,
    height: 35,
    width: 35,
    borderRadius: 18,
  },
  commentContainer: {
    paddingTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: colorPrimary,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  commentContainerPressed:{
    paddingTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: '#ccc'
  },
  parentCommentContainer:{
    flexDirection: 'row',
    alignContent:'flex-start',
  },
  replyContainer:{
    flexDirection: 'row',
    alignContent:'flex-start',
    paddingLeft: 40,
  },
  numReplyText:{
    marginLeft: 40,
    padding: 5,
    paddingTop: 0,
    fontSize: 12,
    color: '#48494B'
  },
  commentDate:{
    marginLeft: 5,
    color: '#888',
  },
  replyText:{
    fontWeight:400,
    fontSize: 12
  },
  addCommentSection: {
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  inputTargetContainer:{
    backgroundColor: colorBackground,
    marginRight: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  }, 
  inputTargetText:{
    fontSize: 14,
    margin: 7,
    marginLeft: 12,
    paddingRight: 25
  },
  commentInput: {
    height: 35,
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: colorPrimary,
    borderRadius: 20,
    padding: 7,
    paddingLeft: 12,
  },
  commentInputUnrounded: {
    height: 35,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: colorPrimary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 7,
    paddingLeft: 12,
  },
  commentButton: {
    marginLeft: 10,
    marginBottom: 10,
    alignSelf: 'center'
  },

  /** Create Post Styles*/
  contentInput: {
    height: 170,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 40,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    textAlignVertical: 'top',
    backgroundColor: colorPrimary
  },
  postFooter:{
    backgroundColor: colorPrimary,
    height: 50,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
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
  addPostImgButton:{
    padding: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  createPostButton: {
    padding: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 'auto',
    backgroundColor: 'black',
    borderRadius: 5,
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
    width: 40,
    height: 40,
  },
  chatImageDefault: {
    height: 40,
    width: 40,
    borderRadius: 20,
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
    paddingTop: Platform.OS === 'ios' ? 70 : 15,
    flexDirection: 'row',
    padding: Platform.OS === 'ios' ? 5 : 15,
    backgroundColor: colorPrimary,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  chatHeaderIcon:{
    height: 35,
    width: 35,
    borderRadius: 20,
  },
  chatRoomName: { 
    fontSize: 20,
    color: 'black',
    padding: 5,
    width: width * 0.66
  },
  msgIcon:{
    height: 30,
    width: 30,
    borderRadius: 20,
    marginBottom: 5
  },
  myMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 5,
    marginBottom: 2,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
    maxWidth: '80%',
  },
  otherMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    marginLeft: 5,
    marginBottom: 2,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    maxWidth: '80%',
  },
  systemMessage:{
    color: 'grey',
    fontSize: 12,
    alignSelf: 'center',
    margin: 5,
  },
  redacted: {
    alignSelf: 'flex-start',
    padding: 10,
    marginLeft: 5,
    fontStyle: 'italic',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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

  /** Create Group section */
  navButtonContainer:{
    marginBottom: Platform.OS === 'ios' ? 60 : 40, 
    margin: 20,
    flexDirection: 'row'
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    padding: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  navButtonText:{
    fontSize: 20,
    color: 'black',
    marginHorizontal: 10
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
    top: Platform.OS === 'ios'? 60 : 20,
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
  joinButton: {
    alignSelf: 'flex-start',
    padding: 5,
    borderWidth: 1,
    borderColor: '#888',
    marginTop: 10,
    backgroundColor: colorBackground
  },
  groupOptionsButton:{
    position: 'absolute',
    top: 0,
    right: 5,
    padding: 5,
    zIndex: 1
  },
  groupNotificationIcon:{
    position: 'absolute',
    top: 0,
    right: 35,
    padding: 5,
    zIndex: 1
  },
  groupNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColor,
    maxWidth: '85%'
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
  addImageTextContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    alignItems : 'center'
  },
  addImageText: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
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
    backgroundColor: colorPrimary,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5
  },
  privacyOptionContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
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
    marginLeft: 'auto',
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
    width: width * 0.2,
    flexDirection: 'row',
    alignItems:'center',
    textAlign:'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#a3a3a3',
    backgroundColor: colorPrimary,
    zIndex: 1
  },
  searchTermSelected: {
    height: 40,
    width: width * 0.2,
    alignItems:'center',
    justifyContent: 'center',
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
    width: '100%',
    height: '78%',
    fontSize: 15,
    paddingRight: 5
  },
  exploreMembers:{
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 12,
    fontWeight: '400'
  },
  showDescriptionIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },

  /** Profile Section */
  viewUserProfileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: colorPrimary,
    marginBottom: 10,
  },
  profileInfoContainer: {
    paddingHorizontal: 10,
    width: width * 0.58
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: colorPrimary,
  },
  messageUserButton: {
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#888',
    padding: 5,
    backgroundColor: colorBackground,
  },
  messageUserText: { 
    textAlign:'center', 
    fontSize: 12
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
    right: 0,
    top: 0,
    width: 'auto',
    padding: 10,
    zIndex: 1
  },

  /** Notification Settings Styles */
  notifSettingContainer: {
    margin: 10,
    backgroundColor: colorPrimary
  },
  notificationCategoryText: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  notificationSettingText:{
    marginRight: 'auto',
    fontSize: 16,
  },

  /** Report Section */
  dropdownContainer: {
    flexDirection: 'row',
    margin: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colorPrimary
  },
  dropdownItem: {
    marginLeft: 20,
    padding: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colorPrimary,
  },
  dropDownSelected: {
    marginLeft: 20,
    padding: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'grey',
  },
  dropdownList: {
    position: 'absolute',
    top: 185,
    left: 0,
    zIndex: 999,
    elevation: 10,  
  },
  reportItemNameInput: {
    justifyContent: 'center',
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: colorPrimary
  },
});


export default styles;