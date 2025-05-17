import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View } from 'react-native';

import { COLORS } from '../constants/colors';
import { Header } from '../ui/Header';
import { HomeButton } from '../ui/HomeButton';

type RootStackParamList = {
  CameraScreen: undefined;
  HistoryScreen: undefined;
  CreateExamScreen: undefined;
  SettingScreen: undefined;
};

const buttons = [
  { icon: 'camera' as const, label: 'Chấm bài', screen: 'CameraScreen' },
  { icon: 'document-text-outline' as const, label: 'Lịch sử kết quả', screen: 'HistoryScreen' },
  { icon: 'add' as const, label: 'Tạo đề', screen: 'CreateExamScreen' },
  { icon: 'settings' as const, label: 'Cài đặt', screen: 'SettingScreen' },
];

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 justify-start bg-white p-0">
      <Header title="Trang chủ" />
      <View className="flex-1 px-2 pt-6">
        {buttons.map(({ icon, label, screen }, idx) => (
          <View key={screen}>
            <HomeButton
              icon={icon}
              label={label}
              bgColor={COLORS.beige}
              onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
            />
            {idx < buttons.length - 1 && <View className="h-4" />}
          </View>
        ))}
      </View>
    </View>
  );
}
