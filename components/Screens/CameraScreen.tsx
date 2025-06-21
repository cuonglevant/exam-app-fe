import { useEffect, useState, useRef } from 'react';
import { View, Button, Alert, Text, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';

import { Header } from '../ui/Header';

export default function CameraScreen() {
  const device = useCameraDevices().find((d) => d.position === 'back');
  const [permission, setPermission] = useState<'authorized' | 'denied' | 'not-determined'>(
    'not-determined'
  );
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  // Thêm state để lưu danh sách các ô vuông màu đen
  const [blackBoxes, setBlackBoxes] = useState<Array<{rect: [number, number, number, number], mean_gray?: number}> | null>(null);

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

  // Hàm chụp ảnh
  const cameraRef = useRef<any>(null);
  const takePicture = async () => {
    if (!cameraRef.current) {
      Alert.alert('Camera chưa sẵn sàng');
      return;
    }
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        photo: true,
      });
      // Tạo tên file duy nhất theo timestamp
      const fileName = `answer_sheet_${Date.now()}.jpg`;
      const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(photo.path, newPath);
      await new Promise((res) => setTimeout(res, 200));
      const exists = await RNFS.exists(newPath);
      console.log('Ảnh vừa chụp path:', newPath, 'Tồn tại:', exists);
      if (!exists) {
        Alert.alert('Ảnh không tồn tại trong bộ nhớ!');
        return;
      }
      const photoUri = 'file://' + newPath;
      setPhotoUri(photoUri);
      console.log('Set photoUri:', photoUri);
      uploadImageToServer(photoUri);
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể upload hoặc xử lý ảnh trên server');
      console.error('Lỗi upload:', e, JSON.stringify(e));
    }
  };

  // Hàm upload ảnh lên server
  const uploadImageToServer = async (imagePath: string) => {
    try {
      // Sử dụng nguyên uri (có 'file://') cho Android fetch
      const formData = new FormData();
      formData.append('file', {
        uri: imagePath, // giữ nguyên 'file://'
        name: 'answer_sheet.jpg',
        type: 'image/jpeg',
      } as any);
      console.log('Uploading to:', 'http://192.168.58.220:5000/upload');
      console.log('File path:', imagePath);
      const response = await fetch('http://192.168.58.220:5000/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      setResult(data);
      // Hiển thị danh sách các ô vuông màu đen nếu có
      if (data.black_squares && Array.isArray(data.black_squares)) {
        setBlackBoxes(data.black_squares);
      } else {
        setBlackBoxes([]);
      }
      Alert.alert('Kết quả', `Có ${data.filled} đáp án đã tô trên tổng ${data.total} ô.\nCó ${data.total_black_squares ?? (data.black_squares ? data.black_squares.length : 0)} ô vuông màu đen.`);
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể upload hoặc xử lý ảnh trên server');
      console.error('Lỗi upload:', e, JSON.stringify(e));
    }
  };

  // Hàm test upload file text nhỏ lên server
  const uploadTextFileToServer = async () => {
    try {
      const testFilePath = RNFS.DocumentDirectoryPath + '/test_upload.txt';
      await RNFS.writeFile(testFilePath, 'Hello from React Native!', 'utf8');
      const exists = await RNFS.exists(testFilePath);
      if (!exists) {
        Alert.alert('Test file không tồn tại!');
        return;
      }
      const formData = new FormData();
      formData.append('file', {
        uri: 'file://' + testFilePath,
        name: 'test_upload.txt',
        type: 'text/plain',
      } as any);
      console.log('Uploading test file to:', 'http://192.168.1.4:5000/upload');
      console.log('Test file path:', testFilePath);
      const response = await fetch('http://192.168.1.4:5000/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('Test file upload response status:', response.status);
      const data = await response.json();
      Alert.alert('Test upload thành công', JSON.stringify(data));
    } catch (e) {
      Alert.alert('Lỗi test upload', 'Không thể upload file test');
      console.error('Lỗi test upload:', e, JSON.stringify(e));
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="Chấm bài" />
      {permission === 'authorized' && device && (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          device={device}
          isActive
          photo={true}
        />
      )}
      <Button title="Chụp ảnh" onPress={takePicture} />
      {photoUri && (
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
          <Text style={{ color: 'white', marginBottom: 8 }}>Ảnh vừa chụp:</Text>
          <View style={{ borderWidth: 1, borderColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <Image
              source={{ uri: photoUri }}
              style={{ width: 240, height: 320, resizeMode: 'contain', backgroundColor: '#222' }}
            />
          </View>
        </View>
      )}
      {result && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'white' }}>Tổng số ô: {result.total}</Text>
          <Text style={{ color: 'white' }}>Số ô đã tô: {result.filled}</Text>
        </View>
      )}
      {blackBoxes && blackBoxes.length > 0 && (
        <View style={{ margin: 16 }}>
          <Text style={{ color: 'white', marginBottom: 8 }}>
            Tổng số ô vuông màu đen: {blackBoxes.length}
          </Text>
          {blackBoxes.map((box, idx) => (
            <View key={idx} style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 24, height: 24, backgroundColor: 'black', marginRight: 8, borderWidth: 1, borderColor: '#fff', borderRadius: 4 }} />
              <Text style={{ color: 'white' }}>
                Tọa độ: ({box.rect[0]}, {box.rect[1]})  Kích thước: {box.rect[2]}x{box.rect[3]}
              </Text>
            </View>
          ))}
        </View>
      )}
      <Button title="Test upload file text nhỏ" onPress={uploadTextFileToServer} />
    </View>
  );
}
