import { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/login-bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
      className="justify-center items-center"
    >
      <View className="w-11/12 max-w-md flex justify-center items-center py-6">

        <View className="w-full mb-4">
          <View className="flex-row items-center mb-1">
            <Ionicons name="mail" size={18} color="#064e3b" className="mr-1" />
            <Text className="text-green-800 font-semibold">Email</Text>
          </View>
          <TextInput
            placeholder="Enter email"
            className="w-full border-b border-green-700 text-black pb-1"
            keyboardType="email-address"
          />
        </View>

        <View className="w-full mb-2">
          <View className="flex-row items-center mb-1">
            <Ionicons name="lock-closed-outline" size={18} color="#064e3b" className="mr-1" />
            <Text className="text-green-800 font-semibold">Password</Text>
          </View>
          <View className="flex-row items-center border-b border-green-700 pb-1">
            <TextInput
              placeholder="Enter password"
              className="flex-1 text-black"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pl-2">
              {showPassword ? (
                <Ionicons name="eye-off-outline" size={20} color="#4B5563" />
              ) : (
                <Ionicons name="eye-outline" size={20} color="#4B5563" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="w-full mb-4 items-end">
          <Text className="text-sm text-gray-600">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full bg-green-800 rounded-lg py-3 mb-4">
          <Text className="text-white text-center text-base font-semibold">Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full">
          <Text className="text-sm text-center text-gray-600">Not have account?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
