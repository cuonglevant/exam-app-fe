import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import { Header } from '../ui/Header';

export default function CameraScreen() {
  const route = useRoute();
  const device = useCameraDevices().find((d) => d.position === 'back');
  const [permission, setPermission] = useState<'authorized' | 'denied' | 'not-determined'>(
    'not-determined'
  );

  useEffect(() => {
    Camera.requestCameraPermission().then((status) => {
      let permissionStatus: 'authorized' | 'denied' | 'not-determined';
      if (status === 'granted') {
        permissionStatus = 'authorized';
      } else if (status === 'denied') {
        permissionStatus = 'denied';
      } else {
        permissionStatus = 'not-determined';
      }
      setPermission(permissionStatus);
    });
  }, []);

  return (
    <View className="flex-1 bg-black">
      <Header title={route.name} />
      {permission === 'authorized' && device && (
        <Camera style={{ flex: 1 }} device={device} isActive />
      )}
    </View>
  );
}
