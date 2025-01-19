import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recorder from "@/components/recorder";
import List from "@/components/list";
import VideoPlayer from "@/components/videoPlayer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Recorder">
      <Stack.Screen name="Recorder" component={Recorder} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
}
