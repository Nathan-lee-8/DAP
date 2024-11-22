import { AppRegistry } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { name as appName } from './app.json';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return(
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
