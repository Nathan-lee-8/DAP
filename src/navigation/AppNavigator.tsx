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
import ViewPost from '../screens/ViewPost';
import CreatePost from '../screens/CreatePost';
import Search from '../screens/Search';
import LogOutButton from '../components/LogOutButton';
import ProfilePicture from '../components/ProfilePicture';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';
import EditGroup from '../screens/EditGroup';

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
        <GlobalStack.Navigator screenOptions={{headerShown: false}}>
          <GlobalStack.Screen name="MainTabs" component={BottomTabs}/>
          <GlobalStack.Screen name="ViewProfile" component={ViewProfiles} options={{title: "Profile"}}/>
          <GlobalStack.Screen name="ChatRoom" component={ChatRoom} options={{title: 'Messages'}}/>
          <GlobalStack.Screen name="CreateChat" component={CreateChat} options={{title: 'Create Chat'}}/>
          <GlobalStack.Screen name="CreateGroup" component={CreateGroup} options={{title: 'Create Group'}}/>
          <GlobalStack.Screen name="ViewGroup" component={ViewGroup} options={{title: 'Group'}}/>
          <GlobalStack.Screen name="CreatePost" component={CreatePost} options={{title: 'Create Post'}}/>
          <GlobalStack.Screen name="ViewPost" component={ViewPost} options={{title: 'Post'}}/>
          <GlobalStack.Screen name="EditGroup" component={EditGroup} options={{title: 'Edit Group'}}/>
        </GlobalStack.Navigator>
      ) : (
        <SignInStack.Navigator screenOptions={{headerShown: false}}>
          <SignInStack.Screen name="SignIn" component={SignInTopTabs} options={{title: 'Sign In'}} />
          <SignInStack.Screen name="Verify" component={Verify}/>
          <SignInStack.Screen name="ResetPassword" component={ResetPassword} />
        </SignInStack.Navigator>
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
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen name="Home" component={Home}
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="home-outline" size={30} color="grey" />
        }}/>
      <BottomTab.Screen name="Messages" component={Messaging} 
        options={{
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
          headerShown: true,
          tabBarIcon: () => <ProfilePicture uri={profileURL} size={30}/>,
          headerRight: LogOutButton
        }} />
    </BottomTab.Navigator>
  )
}

const SignInTopTabs = () => {
  return(
    <SignInTopTab.Navigator style={styles.topTab}>
      <SignInTopTab.Screen name="SignInRoute" component={SignIn} options={{title: 'Sign In'}} />
      <SignInTopTab.Screen name="SignUpRoute" component={SignUp} options={{title: 'Sign Up'}} />
    </SignInTopTab.Navigator>
  )
}

export default AppNavigator;
