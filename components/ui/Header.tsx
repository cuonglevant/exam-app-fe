import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{ height: insets.top, backgroundColor: 'transparent' }} />
      <View className="rounded-t-xl bg-orange-500 px-4 py-3">
        <Text className="text-2xl font-bold text-white">{title}</Text>
      </View>
    </>
  );
}
