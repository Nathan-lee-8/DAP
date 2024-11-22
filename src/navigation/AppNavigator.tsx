import { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from '../screens/SignInScreen';
import Home from '../screens/HomeScreen';
import CreatePost from '../screens/CreatePost';
import Verify from '../screens/Verify';
import FindUsers from '../screens/FindUsers';
import Messaging from '../screens/Messaging';
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import { RootStackParamList } from '../types/rootStackParamTypes';
import { signOut } from 'aws-amplify/auth';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { isSignedIn } = authContext;
 
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} options={{headerRight: LogOutButton}}/>
          <Tab.Screen name="CreatePost" component={CreatePost} />
          <Tab.Screen name="Messaging" component={Messaging} />
          <Tab.Screen name="FindUsers" component={FindUsers} />
          <Tab.Screen name="EditProfile" component={EditProfile} />
        </Tab.Navigator>
      ): (
        <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Verify" component={Verify}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}/>
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

//Button to handle logout logic
const LogOutButton = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { setSignedIn, logout } = authContext;

  const handleSignOut = async () => {
    try{ 
      await signOut();
      setSignedIn(false);
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

//Styles for LogOut button
const styles = StyleSheet.create({
  button: {
      padding: 10,
      backgroundColor: '#000', // Customize background color as needed
      borderRadius: 5, // Rounded corners
      marginRight: 10, // Add some margin to the right of the button
  },
  buttonText: {
      color: '#fff', // Text color
      fontSize: 16, // Font size
      fontWeight: 'bold', // Font weight
  },
});


export default AppNavigator;
