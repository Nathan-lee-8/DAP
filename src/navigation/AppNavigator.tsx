import { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signOut } from 'aws-amplify/auth';
import SignIn from '../screens/SignInScreen';
import Home from '../screens/HomeScreen';
import CreatePost from '../screens/CreatePost';
import Verify from '../screens/Verify';
import FindUsers from '../screens/FindUsers';
import Messaging from '../screens/Messaging';
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import ChatRoom from '../screens/ChatRoom';
import ViewProfiles from '../screens/ViewProfiles';
import CreateChat from '../screens/CreateChat';
import { RootStackParamList, SignedInTabParamList, MessagingStackParamList,
  FindUserParamList } from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator<SignedInTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const MessageStack = createNativeStackNavigator<MessagingStackParamList>();
const FindUserStack = createNativeStackNavigator<FindUserParamList>();

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
        <Tab.Navigator screenOptions={{headerRight: LogOutButton}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="CreatePost" component={CreatePost} 
            options={{title: 'Create Post'}} />
          <Tab.Screen name="MessageScreens" component={MessageScreens} 
            options={{title: 'Messages', headerShown: false}} />
          <Tab.Screen name="ProfileScreens" component={ProfileScreens} 
            options={{title: 'Search Users', headerShown: false}} />
          <Tab.Screen name="EditProfile" component={EditProfile}
            options={{title: 'Edit Profile'}}  />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn}
            options={{title: 'Sign In'}}  />
          <Stack.Screen name="Verify" component={Verify} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} 
            options={{title: 'Reset Password'}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const MessageScreens = () => {
  return (
    <MessageStack.Navigator initialRouteName='Messaging' >
      <MessageStack.Screen name="Messaging" component={Messaging} 
        options={{title: 'Messages', headerRight: LogOutButton}} />
      <MessageStack.Screen name="ChatRoom" component={ChatRoom} 
        options={{title: 'Messages'}}/>
      <MessageStack.Screen name="CreateChat" component={CreateChat}
        options={{title: 'Create New Chat'}}/>
    </MessageStack.Navigator>
  )
}

const ProfileScreens = () => {
  return (
    <FindUserStack.Navigator initialRouteName='FindUsers' >
      <FindUserStack.Screen name="FindUsers" component={FindUsers} 
        options={{title: 'Search User', headerRight: LogOutButton}}/>
      <FindUserStack.Screen name="ViewProfiles" component={ViewProfiles} 
        options={{title: 'Profile'}}/>
    </FindUserStack.Navigator>
  )
}

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
