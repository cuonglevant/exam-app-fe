// app/screens/CameraScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, useCameraDevices, PhotoFile } from "react-native-vision-camera";
import { useNavigation } from "expo-router";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  // Xin quyền camera
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "authorized");
    })();
  }, []);

  // Xử lý chụp hình
  const takePhoto = async () => {
    if (cameraRef.current == null) return;
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });
      console.log("Ảnh đã chụp: ", photo);
      setPhoto(photo);
      // Sau khi chụp có thể navigate hoặc xử lý ảnh ở đây
    } catch (e) {
      console.error("Lỗi khi chụp ảnh:", e);
    }
  };

  if (device == null || !hasPermission) {
    return <Text>Đang tải camera...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Nút chụp */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
          <Text style={{ color: "white" }}>📸</Text>
        </TouchableOpacity>
      </View>

      {/* Nút thoát */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeBtn}
      >
        <Text style={{ color: "#fff" }}>← Thoát</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff80",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#00000060",
    padding: 10,
    borderRadius: 10,
  },
});
