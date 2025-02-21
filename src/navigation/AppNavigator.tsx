import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Welcome from '../screens/Welcome';
import EditGroup from '../screens/EditGroup';
import ViewMembers from '../screens/ViewMembers';
import LogOutButton from '../components/LogOutButton';
import ImageComponent from '../components/ImgComponent';
import Icon from '@react-native-vector-icons/ionicons';

const SignInStack = createNativeStackNavigator();
const GlobalStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

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
          <GlobalStack.Screen name="MainTabs" component={BottomTabs} options={{headerShown: false, title: "Home"}}/>
          <GlobalStack.Screen name="ViewProfile" component={ViewProfiles} options={{title: "Profile"}}/>
          <GlobalStack.Screen name="ChatRoom" component={ChatRoom} options={{title: 'Messages'}}/>
          <GlobalStack.Screen name="CreateChat" component={CreateChat} options={{title: 'Create Chat'}}/>
          <GlobalStack.Screen name="CreateGroup" component={CreateGroup} options={{title: 'Create Group'}}/>
          <GlobalStack.Screen name="ViewGroup" component={ViewGroup} options={{title: 'Group'}}/>
          <GlobalStack.Screen name="CreatePost" component={CreatePost} options={{title: 'Create Post'}}/>
          <GlobalStack.Screen name="ViewPost" component={ViewPost} options={{title: 'Post'}}/>
          <GlobalStack.Screen name="EditGroup" component={EditGroup} options={{title: 'Edit Group'}}/>
          <GlobalStack.Screen name="ViewMembers" component={ViewMembers} options={{title: 'View Members'}}/>
        </GlobalStack.Navigator>
      ) : (
        <SignInStack.Navigator initialRouteName='Welcome'>
          <SignInStack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
          <SignInStack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In', headerTitleAlign: 'center'}} />
          <SignInStack.Screen name="SignUp" component={SignUp} options={{title: 'Sign Up', headerTitleAlign: 'center'}} />
          <SignInStack.Screen name="Verify" component={Verify} options={{headerTitleAlign: 'center'}}/>
          <SignInStack.Screen name="ResetPassword" component={ResetPassword} options={{title: 'Reset Password', headerTitleAlign: 'center'}} />
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
    <BottomTab.Navigator screenOptions={{headerTitleAlign: 'center'}} >
      <BottomTab.Screen name="Home" component={Home}
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="home-outline" size={30} />
        }}/>
      <BottomTab.Screen name="Messages" component={Messaging} 
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="chatbubbles-outline" size={30} />
          }} />
      <BottomTab.Screen name="Groups" component={Groups} 
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="people-outline" size={30} />
          }} />
      <BottomTab.Screen name="Search" component={Search} 
        options={{
          lazy: true,
          headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="search-outline" size={30} />
          }} />
      <BottomTab.Screen name="Profile" component={EditProfile}
        options={{
          headerTitleAlign:'center',
          headerShown: true,
          tabBarIcon: () => <ImageComponent uri={profileURL ? profileURL : 'defaultUser'}/>,
          headerRight: LogOutButton
        }} />
    </BottomTab.Navigator>
  )
}

export default AppNavigator;
