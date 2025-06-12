import { useContext } from 'react';
import { View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';

import Welcome from '../screens/signInScreens/Welcome';
import SignIn from '../screens/signInScreens/SignInScreen';
import SignUp from '../screens/signInScreens/SignUpScreen';
import Verify from '../screens/signInScreens/Verify';
import ResetPassword from '../screens/signInScreens/ResetPassword';
import CreateUser from '../screens/signInScreens/CreateUser';

import Home from '../screens/HomeScreen';
import Groups from '../screens/Groups';
import Messaging from '../screens/Messaging';
import EditProfile from '../screens/EditProfile';
import ChatRoom from '../screens/ChatRoom';
import ViewProfiles from '../screens/ViewProfiles';
import CreateChat from '../screens/CreateChat';
import CreateGroup from '../screens/CreateGroup';
import ViewGroup from '../screens/ViewGroup';
import ViewPost from '../screens/ViewPost';
import CreatePost from '../screens/CreatePost';
import Search from '../screens/Search';
import EditGroup from '../screens/EditGroup';
import ViewMembers from '../screens/ViewMembers';
import ViewChatMembers from '../screens/ViewChatMembers';
import EditPost from '../screens/EditPost';
import EditChat from '../screens/EditChat';
import ImageComponent from '../components/ImgComponent';

const SignInStack = createNativeStackNavigator();
const GlobalStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const linking = { 
  prefixes: ['dap://'], // The custom scheme your app is listening for
  config: {
    screens: {
      Welcome: 'signout',
      Home: 'signin'
    }
  },
}

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { isSignedIn, currUser } = authContext;

  return (
    <NavigationContainer linking={linking}>
      {isSignedIn && currUser ? ( //Signed in Screens
        <GlobalStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <GlobalStack.Screen name="MainTabs" component={BottomTabs} options={{headerShown: false, title: "Home"}}/>
          <GlobalStack.Screen name="ViewProfile" component={ViewProfiles} options={{title: "Profile"}}/>
          <GlobalStack.Screen name="ChatRoom" component={ChatRoom} 
            options={{title: 'Messages', headerShown: false}}/>
          <GlobalStack.Screen name="CreateChat" component={CreateChat} options={{title: 'Create Chat'}}/>
          <GlobalStack.Screen name="CreateGroup" component={CreateGroup} options={{title: 'Create Group'}}/>
          <GlobalStack.Screen name="ViewGroup" component={ViewGroup} 
            options={{title: 'Group', headerShown: false}}
          />
          <GlobalStack.Screen name="CreatePost" component={CreatePost} options={{title: 'Create Post'}}/>
          <GlobalStack.Screen name="ViewPost" component={ViewPost} options={{title: 'Post'}}/>
          <GlobalStack.Screen name="EditGroup" component={EditGroup} options={{title: 'Edit Group'}}/>
          <GlobalStack.Screen name="ViewMembers" component={ViewMembers} options={{title: 'View Members'}}/>
          <GlobalStack.Screen name="EditPost" component={EditPost} options={{title: 'Edit Post'}}/>
          <GlobalStack.Screen name="ViewChatMembers" component={ViewChatMembers} options={{title: 'Members'}}/>
          <GlobalStack.Screen name="EditChat" component={EditChat} options={{title: 'Edit Chat'}}/>
        </GlobalStack.Navigator>
      ) : isSignedIn && !currUser ? ( //Screens User has not created an account
        <SignInStack.Navigator initialRouteName='CreateUser' >
          <SignInStack.Screen name="CreateUser" component={CreateUser} options={{headerShown: false}} />
        </SignInStack.Navigator>
      ) : ( //Sign-in Sign-up Screens
        <SignInStack.Navigator initialRouteName='Welcome' >
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

/** Bottom Tab Screens */
const BottomTabs = () => {
  const authContext = useContext(AuthContext);
  const currUser = authContext?.currUser;
  if(!currUser) return;

  return(
    <BottomTab.Navigator screenOptions={{headerTitleAlign: 'center'}} >
      <BottomTab.Screen name="Home" component={Home}
        options={{ lazy: true, headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="home-outline" size={30} />
        }}/>
      <BottomTab.Screen name="Messages" component={Messaging} 
        options={{ lazy: true, headerTitleAlign:'center',
          tabBarIcon: () => {
            return(
              <View>
                <Icon name="chatbubbles-outline" size={30} />
                {currUser.unreadChatCount > 0 && 
                  <View style={{
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
                  }}/>
                }
              </View>
            )
          }
        }} />
      <BottomTab.Screen name="Groups" component={Groups} 
        options={{ lazy: true, headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="people-outline" size={30} />
        }} />
      <BottomTab.Screen name="Search" component={Search} 
        options={{ lazy: true, headerTitleAlign:'center',
          tabBarIcon: () => <Icon name="search-outline" size={30} />
        }} />
      <BottomTab.Screen name="Profile" component={EditProfile}
        options={{ lazy: true, headerTitleAlign:'center',
          tabBarIcon: () => <ImageComponent uri={currUser.profileURL || 'defaultUser'}/>
        }} />
    </BottomTab.Navigator>
  )
}

export default AppNavigator;
