import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Score = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <Text>Open camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Score;
