import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="answer" />
      <Stack.Screen name="camera" />
    </Stack>
  ); 
}
