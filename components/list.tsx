import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import { handleShare } from "@/utils/sharing";
import { handleDelete } from "@/hooks/deleteVideos";

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

  async function loadVideos() {
    try {
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory || ""
      );
      const mp4Files = files.filter((file) => file.endsWith(".mp4")).sort();
      setVideoFiles(mp4Files);
    } catch (error) {
      console.error("動画ファイル読み込みエラー：", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadVideos();
    }, [])
  );

  function handleWatch(videoUri: string) {
    navigation.navigate("VideoPlayer", { videoUri });
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {videoFiles
          .slice()
          .reverse()
          .map((item, index) => (
            <View key={index} style={styles.videoContainer}>
              <TouchableOpacity
                onPress={() => handleDelete(item, setVideoFiles)}
              >
                <Text style={styles.videoButton}>🚮</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShare(item)}>
                <Text style={styles.videoButton}>📲</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleWatch(item)}>
                <Text style={styles.videoName}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  scroll: {
    padding: 10,
  },

  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 10,
  },
  videoButton: {
    fontSize: width * 0.08,
    padding: height * 0.002,
    marginRight: 10,
  },
  videoName: {
    fontSize: width * 0.04,
    padding: height * 0.002,
  },
});
