import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f7f7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: '#333',
  },
  dropdownButtonStyle: {
    width: 240,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    margin: 5,
  },
  dropdownButtonTxtStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  dropdownItemStyle: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#151E26',
  },
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
  postType: {
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
  postCategory:{
    fontSize: 12,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  searchUserContainer: {
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
  avatar: {
    marginLeft: 'auto',
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  textEmail: {
    fontSize: 13,
    color: '#666',
    marginLeft: 10,
  },
  button: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 10,
    marginLeft: 'auto',
  },
  buttonText: { 
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
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
});

export default styles;