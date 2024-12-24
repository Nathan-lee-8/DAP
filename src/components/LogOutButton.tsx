import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "aws-amplify/auth";
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
      await signOut();
      logout();
    } catch (error) {
      console.log('error signing out: ', error);
    };
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  );
};

export default LogOutButton;