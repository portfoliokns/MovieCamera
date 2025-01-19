import React from "react";
import { View, StyleSheet, Button, Dimensions } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";

type RootStackParam = {
  Recorder: undefined;
  List: undefined;
  VideoPlayer: { videoUri: string };
};

type VideoPlayerNavigationProp = NativeStackNavigationProp<
  RootStackParam,
  "VideoPlayer"
>;

export default function VideoPlayer({
  navigation,
  route,
}: {
  navigation: VideoPlayerNavigationProp;
  route: any;
}) {
  const { videoUri } = route.params;
  const videoPath = FileSystem.documentDirectory + videoUri;
  const player = useVideoPlayer(videoPath, (player) => {
    player.loop = false;
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: width,
    height: height * 0.85,
  },
});
