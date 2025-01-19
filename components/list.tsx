import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";

type RootStackParam = {
  Recorder: undefined;
  List: undefined;
  VideoPlayer: { videoUri: string };
};

type ListNavigationProp = NativeStackNavigationProp<RootStackParam, "List">;

export default function List({
  navigation,
}: {
  navigation: ListNavigationProp;
}) {
  const [videoFiles, setVideoFiles] = useState<string[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const files = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory || ""
        );
        const mp4Files = files.filter((file) => file.endsWith(".mp4")).sort();
        console.log(mp4Files);
        setVideoFiles(mp4Files);
      } catch (error) {
        console.error("動画ファイル読み込みエラー：", error);
      }
    };
    loadVideos();
  }, []);

  const handleItemPress = (videoUri: string) => {
    console.log(videoUri);
    navigation.navigate("VideoPlayer", { videoUri });
  };

  return (
    <ScrollView>
      <View>
        {videoFiles
          .slice()
          .reverse()
          .map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemPress(item)}>
              <Text>・{item}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}
