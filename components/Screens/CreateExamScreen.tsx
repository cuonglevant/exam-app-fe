import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';

import { Header } from '../ui/Header';

export default function CreateExamScreen() {
  const route = useRoute();
  return (
    <View className="flex-1 bg-white">
      <Header title={route.name} />
    </View>
  );
}
