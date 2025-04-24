import { AppRegistry } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { name as appName } from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
          <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
