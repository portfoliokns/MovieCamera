import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import { handleShare } from "@/utils/sharing";
import { handleDeleteVideo } from "@/hooks/deleteVideo";

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
    <ScrollView>
      <View style={styles.contentContainer}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleDeleteVideo({ videoUri, navigation })}
          >
            <Text style={styles.videoButton}>🚮</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleShare(videoUri)}>
            <Text style={styles.videoButton}>📲</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    width: width * 0.78,
    height: height * 0.83,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 6,
  },
  videoButton: {
    fontSize: width * 0.08,
    padding: height * 0.002,
    marginHorizontal: 30,
  },
});
