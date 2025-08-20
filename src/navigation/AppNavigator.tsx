import { useContext } from 'react';
import { View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import styles from '../styles/Styles';

import Welcome from '../screens/signInScreens/Welcome';
import SignIn from '../screens/signInScreens/SignInScreen';
import SignUp from '../screens/signInScreens/SignUpScreen';
import Verify from '../screens/signInScreens/Verify';
import ResetPassword from '../screens/signInScreens/ResetPassword';
import CreateUser from '../screens/signInScreens/CreateUser';

import Home from '../screens/bottomTabScreens/HomeScreen';
import Groups from '../screens/bottomTabScreens/Groups';
import Messaging from '../screens/bottomTabScreens/Messaging';
import Search from '../screens/bottomTabScreens/Search';
import EditProfile from '../screens/bottomTabScreens/EditProfile';

import ViewChat from '../screens/ViewChat';
import ViewProfiles from '../screens/ViewProfiles';
import CreateChat from '../screens/CreateChat';
import CreateGroup from '../screens/CreateGroup';
import ViewGroup from '../screens/ViewGroup';
import ViewPost from '../screens/ViewPost';
import CreatePost from '../screens/CreatePost';
import EditGroup from '../screens/EditGroup';
import ViewGroupMembers from '../screens/ViewGroupMembers';
import ViewChatMembers from '../screens/ViewChatMembers';
import EditPost from '../screens/EditPost';
import EditChat from '../screens/EditChat';
import ImageComponent from '../components/ImgComponent';

import ProfileSettings from '../screens/SettingsScreens/ProfileSettings';
import NotificationSettings from '../screens/SettingsScreens/NotificationSettings';
import ReportScreen from '../screens/SettingsScreens/ReportScreen';
import TermsConditions from '../screens/SettingsScreens/TermsConditions';
import BlockedUsers from '../screens/SettingsScreens/BlockedUsers';

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
        <GlobalStack.Navigator screenOptions={{headerShown: false}}>
          <GlobalStack.Screen name="MainTabs" component={BottomTabs}/>
          <GlobalStack.Screen name="ViewProfile" component={ViewProfiles}/>
          <GlobalStack.Screen name="ViewChat" component={ViewChat}/>
          <GlobalStack.Screen name="CreateChat" component={CreateChat}/>
          <GlobalStack.Screen name="CreateGroup" component={CreateGroup}/>
          <GlobalStack.Screen name="ViewGroup" component={ViewGroup}/>
          <GlobalStack.Screen name="CreatePost" component={CreatePost}/>
          <GlobalStack.Screen name="ViewPost" component={ViewPost} />
          <GlobalStack.Screen name="EditGroup" component={EditGroup} />
          <GlobalStack.Screen name="ViewGroupMembers" component={ViewGroupMembers}/>
          <GlobalStack.Screen name="EditPost" component={EditPost}/>
          <GlobalStack.Screen name="ViewChatMembers" component={ViewChatMembers}/>
          <GlobalStack.Screen name="EditChat" component={EditChat}/>
          {/* Settings tabs */}
          <GlobalStack.Screen name="Settings" component={ProfileSettings}/>
          <GlobalStack.Screen name="NotificationSettings" component={NotificationSettings}/>
          <GlobalStack.Screen name="Report" component={ReportScreen}/>
          <GlobalStack.Screen name="Terms" component={TermsConditions}/>
          <GlobalStack.Screen name="BlockedUsers" component={BlockedUsers}/>
        </GlobalStack.Navigator>
      ) : isSignedIn && !currUser ? ( //Screens User has not created an account
        <SignInStack.Navigator initialRouteName='CreateUser' >
          <SignInStack.Screen name="CreateUser" component={CreateUser} options={{headerShown: false}}/>
        </SignInStack.Navigator>
      ) : ( //Sign-in Sign-up Screens
        <SignInStack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
          <SignInStack.Screen name="Welcome" component={Welcome} />
          <SignInStack.Screen name="SignIn" component={SignIn}/>
          <SignInStack.Screen name="SignUp" component={SignUp} />
          <SignInStack.Screen name="Verify" component={Verify}/>
          <SignInStack.Screen name="ResetPassword" component={ResetPassword}/>
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
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen name="Home" component={Home} options={{ lazy: true, 
        tabBarIcon: () => <Icon name="home-outline" size={30} /> }}
      />
      <BottomTab.Screen name="Messages" component={Messaging} options={{ lazy: true,
        tabBarIcon: () => {
          return(
            <View>
              <Icon name="chatbubbles-outline" size={30} />
              {currUser.unreadChatCount > 0 && 
                <View style={styles.unreadChatIcon}/>
              }
            </View>
          )
        }}} 
      />
      <BottomTab.Screen name="Groups" component={Groups} options={{ lazy: true, 
        tabBarIcon: () => <Icon name="people-outline" size={30} /> }}
      />
      <BottomTab.Screen name="Search" component={Search} options={{ lazy: true,
        tabBarIcon: () => <Icon name="search-outline" size={30} /> }} 
      />
      <BottomTab.Screen name="Profile" component={EditProfile} options={{ lazy: true, 
        tabBarIcon: () => <ImageComponent uri={currUser.profileURL || 'defaultUser'}/> }} 
      />
    </BottomTab.Navigator>
  )
}

export default AppNavigator;
