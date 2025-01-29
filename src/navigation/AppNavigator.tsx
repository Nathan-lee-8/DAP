import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SignInParamList, SignInTopTabParamList, LoggedInParamList,
  } from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import Home from '../screens/HomeScreen';
import Verify from '../screens/Verify';
import Groups from '../screens/Groups';
import Messaging from '../screens/Messaging';
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import ChatRoom from '../screens/ChatRoom';
import ViewProfiles from '../screens/ViewProfiles';
import CreateChat from '../screens/CreateChat';
import CreateGroup from '../screens/CreateGroup';
import ViewGroup from '../screens/ViewGroup';
import CreatePost from '../screens/CreatePost';
import Search from '../screens/Search';
import LogOutButton from '../components/LogOutButton';
import ProfilePicture from '../components/ProfilePicture';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';

const SignInStack = createNativeStackNavigator<SignInParamList>();
const SignInTopTab = createMaterialTopTabNavigator<SignInTopTabParamList>();

const GlobalStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator<LoggedInParamList>();

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
        <GlobalStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <GlobalStack.Screen name="MainTabs" component={BottomTabs} options={{headerShown: false}}/>
          <GlobalStack.Screen name="ViewProfile" component={ViewProfiles} options={{title: "Profile"}}/>
          <GlobalStack.Screen name="ChatRoom" component={ChatRoom} options={{title: 'Messages'}}/>
          <GlobalStack.Screen name="CreateChat" component={CreateChat} options={{title: 'Create Chat'}}/>
          <GlobalStack.Screen name="CreateGroup" component={CreateGroup} options={{title: 'Create Group'}}/>
          <GlobalStack.Screen name="ViewGroup" component={ViewGroup} 
            options={{title: 'Group'}}/>
          <GlobalStack.Screen name="CreatePost" component={CreatePost} options={{title: 'Create Post'}}/>
        </GlobalStack.Navigator>
      ) : (
        <SignInTopTab.Navigator style={styles.topTab}>
          <SignInTopTab.Screen name="SignInRoute" component={SignInNav} options={{title: 'Sign In'}} />
          <SignInTopTab.Screen name="SignUpRoute" component={SignUpNav} options={{title: 'Sign Up'}} />
        </SignInTopTab.Navigator>
      )}
    </NavigationContainer>
  )
};

const BottomTabs = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { profileURL } = authContext;
  return(
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home}
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="home-outline" size={30} color="grey" />
        }}/>
      <BottomTab.Screen name="Messaging" component={Messaging} 
        options={{
          title: 'Messages',
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="chatbubbles-outline" size={30} color="grey" />
          }} />
      <BottomTab.Screen name="Groups" component={Groups} 
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="people-outline" size={30} color="grey" />
          }} />
      <BottomTab.Screen name="Search" component={Search} 
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="search-outline" size={30} color="grey" />
          }} />
      <BottomTab.Screen name="Profile" component={EditProfile}
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <ProfilePicture uri={profileURL} size={30}/>,
          headerRight: LogOutButton
        }} />
    </BottomTab.Navigator>
  )
}

const SignInNav = () => {
  return(
    <SignInStack.Navigator initialRouteName='SignIn' >
      <SignInStack.Screen name="SignIn" component={SignIn} 
        options={{headerShown: false}}/>
      <SignInStack.Screen name="ResetPassword" component={ResetPassword} 
        options={{title: 'Reset Password'}}/>
    </SignInStack.Navigator>
  )
}

const SignUpNav = () => {
  return( 
    <SignInStack.Navigator initialRouteName='SignUp' >
      <SignInStack.Screen name="SignUp" component={SignUp} 
        options={{headerShown: false}}/>
      <SignInStack.Screen name="Verify" component={Verify} 
      options={{title: 'Verify'}}/>
    </SignInStack.Navigator>
  )
}

export default AppNavigator;
