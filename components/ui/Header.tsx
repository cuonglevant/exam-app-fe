import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="h-20 rounded-t-xl bg-orange-500 px-4 py-3">
      <Text className="mt-2 text-2xl font-bold text-white">{title}</Text>
    </View>
  );
}
