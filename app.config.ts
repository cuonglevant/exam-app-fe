import { ExpoConfig, ConfigContext } from "expo/config";

const config: ExpoConfig = {
  name: "my-app",
  slug: "my-app",
  android: {
    package: "com.albion.myapp",
  },
  plugins: [
    [
      "react-native-vision-camera",
      {
        cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera.",
        enableMicrophonePermission: true,
        microphonePermissionText: "$(PRODUCT_NAME) needs access to your Microphone.",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "a4812b97-ec69-4c35-a913-6dab55e481e3",
    },
  },
};

export default config;
