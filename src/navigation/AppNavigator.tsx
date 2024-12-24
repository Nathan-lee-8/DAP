import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SignInParamList, LoggedInParamList, MessagingStackParamList, 
  FindUserParamList, TopTabParamList, SignInTopTabParamList, HomeParamList
} from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
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
import LogOutButton from '../components/LogOutButton';
import ProfilePicture from '../components/ProfilePicture';
import Icon from '@react-native-vector-icons/ionicons'

const SignInStack = createNativeStackNavigator<SignInParamList>();
const SignInTopTab = createMaterialTopTabNavigator<SignInTopTabParamList>();

const Tab = createBottomTabNavigator<LoggedInParamList>();
const HomeStack = createNativeStackNavigator<HomeParamList>();
const MessageStack = createNativeStackNavigator<MessagingStackParamList>();
const FindUserStack = createNativeStackNavigator<FindUserParamList>();
const TopTabStack = createMaterialTopTabNavigator<TopTabParamList>();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { isSignedIn, profileURL } = authContext;

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="HomeScreen" component={HomeScreen}
            options={{
              title: 'Home',
              headerShown: false,
              lazy: true,
              tabBarIcon: () => <Icon name="home-outline" size={30} color="grey" />
            }}/>
          <Tab.Screen name="MessageScreens" component={MessageScreens} 
            options={{
              title: 'Messages',
              headerShown: false,
              lazy: true,
              tabBarIcon: () => <Icon name="chatbubbles-outline" size={30} color="grey" />
              }} />
          <Tab.Screen name="CreatePost" component={CreatePost} 
            options={{
              title: 'Create Post',
              lazy: true,
              tabBarIcon: () => <Icon name="create-outline" size={30} color="grey" />
              }} />
          <Tab.Screen name="ProfileScreens" component={ProfileScreens} 
            options={{
              title: 'Find Users',
              headerShown: false,
              lazy: true,
              tabBarIcon: () => <Icon name="search-outline" size={30} color="grey" />
              }} />
          <Tab.Screen name="EditProfile" component={EditProfile}
            options={{
              title: 'Profile', 
              lazy: true,
              tabBarIcon: () => <ProfilePicture uri={profileURL}size={30}/>,
              headerRight: LogOutButton
            }} />
        </Tab.Navigator>
      ) : (
        <SignInTopTab.Navigator>
          <SignInTopTab.Screen name="SignInRoute" component={SignInNav} 
            options={{title: 'Sign In'}} />
          <SignInTopTab.Screen name="SignUpRoute" component={SignUpNav} 
            options={{title: 'Sign Up'}} />
        </SignInTopTab.Navigator>
      )}
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  return(
    <HomeStack.Navigator initialRouteName='Home' >
      <HomeStack.Screen name="Home" component={HomeTopNav}/>
      <HomeStack.Screen name="ViewHomeProf" component={ViewProfiles}
        options={{title: 'Profile'}}/>
    </HomeStack.Navigator>
  )
}

const ProfileScreens = () => {
  return (
    <FindUserStack.Navigator initialRouteName='FindUsers' >
      <FindUserStack.Screen name="FindUsers" component={FindUsers} 
        options={{title: 'Search User'}}/>
      <FindUserStack.Screen name="ViewProfiles" component={ViewProfiles} 
        options={{title: 'Profile'}}/>
    </FindUserStack.Navigator>
  )
}

const HomeTopNav = () => {
  return (
    <TopTabStack.Navigator>
      <TopTabStack.Screen name="Market" component={Home} initialParams={{category: "Market"}}
        options={{title: 'Market'}} />
      <TopTabStack.Screen name="Jobs" component={Home} initialParams={{category: "Jobs"}}
        options={{title: 'Jobs'}} />
      <TopTabStack.Screen name="Volunteer" component={Home} initialParams={{category: "Volunteer"}}
        options={{title: 'Volunteer'}} />
    </TopTabStack.Navigator>
  )
}

const MessageScreens = () => {
  return (
    <MessageStack.Navigator initialRouteName='Messaging' >
      <MessageStack.Screen name="Messaging" component={Messaging} 
        options={{title: 'Messages'}} />
      <MessageStack.Screen name="ChatRoom" component={ChatRoom} 
        options={{title: 'Messages'}}/>
      <MessageStack.Screen name="CreateChat" component={CreateChat}
        options={{title: 'Create New Chat'}}/>
    </MessageStack.Navigator>
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
