import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from 'components/Screens/CameraScreen';
import CreateExamScreen from 'components/Screens/CreateExamScreen';
import HistoryScreen from 'components/Screens/HistoryScreen';
import SettingScreen from 'components/Screens/SettingScreen';
import { StatusBar } from 'expo-status-bar';

import Home from './components/home/Home';
import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="CreateExamScreen" component={CreateExamScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
