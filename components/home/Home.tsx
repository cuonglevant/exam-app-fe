import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { View } from 'react-native';

import { COLORS } from '../constants/colors';
import { Header } from '../ui/Header';
import { HomeButton } from '../ui/HomeButton';

// Định nghĩa kiểu cho navigation stack
// Nếu bạn có nhiều screen, hãy thêm vào đây
type RootStackParamList = {
  CameraScreen: undefined;
  HistoryScreen: undefined;
  CreateExamScreen: undefined;
  SettingScreen: undefined;
};

export default function Home() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 justify-start bg-white p-0">
      <Header title={route.name} />
      <View className="flex-1 px-2 pt-6">
        <HomeButton
          icon="camera"
          label="Chấm bài"
          bgColor={COLORS.beige}
          onPress={() => navigation.navigate('CameraScreen')}
        />
        <View className="h-4" />
        <HomeButton
          icon="document-text-outline"
          label="Lịch sử kết quả"
          bgColor={COLORS.beige}
          onPress={() => navigation.navigate('HistoryScreen')}
        />
        <View className="h-4" />
        <HomeButton
          icon="add"
          label="Tạo đề"
          bgColor={COLORS.beige}
          onPress={() => navigation.navigate('CreateExamScreen')}
        />
        <View className="h-4" />
        <HomeButton
          icon="settings"
          label="Cài đặt"
          bgColor={COLORS.beige}
          onPress={() => navigation.navigate('SettingScreen')}
        />
      </View>
    </View>
  );
}
