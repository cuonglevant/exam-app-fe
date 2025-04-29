import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./components/Home";
import ResultScreen from "./components/Result";
import ScoreScreen from "./components/Score";
import StatisticScreen from 'components/Statistic';
import InfoScreen from "./components/Info";
import ReviewScreen from "./components/Review";

import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Statistic" component={StatisticScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
