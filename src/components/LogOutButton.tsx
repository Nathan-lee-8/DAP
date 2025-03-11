import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Styles';

//Button to handle logout logic
const LogOutButton = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { logout } = authContext;

  const handleSignOut = async () => {
    try{ 
      logout();
    } catch (error) {
      console.log('error signing out: ', error);
    };
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Text style={styles.buttonTextBlue}>Log Out</Text>
    </TouchableOpacity>
  );
};

export default LogOutButton;