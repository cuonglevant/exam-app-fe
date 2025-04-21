import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { Colors } from "constants/Colors";
import { Camera, useCameraPermission } from 'react-native-vision-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const answer = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraActive, setCameraActive] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const status = await requestPermission();
      console.log("Camera permission:", status);
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View>
        <Text>Không có quyền truy cập camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Đáp án",
          headerStyle: { backgroundColor: Colors.green },
          headerTintColor: Colors.beige,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
      <View>
      {cameraActive ? (
        <Camera
          style={{ flex: 1, marginTop: insets.top }}
          device={Camera.getAvailableCameraDevices()[0]}
          isActive={true}
        />
      ) : (
        <View>
          <TouchableOpacity onPress={() => router.push("/screens/CameraScreen")}>
            <Text>Mở Camera</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </SafeAreaView>
  );
};

export default answer;
