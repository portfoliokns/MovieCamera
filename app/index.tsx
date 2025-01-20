import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recorder from "@/components/recorder";
import Black from "@/components/black";
import List from "@/components/list";
import VideoPlayer from "@/components/videoPlayer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Recorder">
      <Stack.Screen
        name="Recorder"
        component={Recorder}
        options={{ title: "録画" }}
      />
      <Stack.Screen name="Black" component={Black} options={{ title: "" }} />
      <Stack.Screen name="List" component={List} options={{ title: "一覧" }} />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{ title: "視聴" }}
      />
    </Stack.Navigator>
  );
}
