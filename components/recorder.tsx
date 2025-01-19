import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import React, { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParam = {
  Recorder: undefined;
  List: undefined;
  VideoPlayer: { videoUri: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParam,
  "Recorder"
>;

export default function Recorder({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");

  if (!cameraPermission || !mediaPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>カメラ機能へのアクセス許可が必要です</Text>
        <Button
          onPress={async () => {
            const camera = await requestCameraPermission();
            if (!camera.granted) {
              alert(
                "カメラへのアクセスを許可してください。設定を確認して手動で許可してください。"
              );
            }
          }}
          title="カメラ機能を許可する"
        />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          写真ライブラリへのアクセス許可が必要です
        </Text>
        <Button
          onPress={async () => {
            const media = await requestMediaPermission();
            if (!media.granted) {
              alert(
                "写真ライブラリへのアクセスを許可してください。設定を確認して手動で許可してください。"
              );
            }
          }}
          title="写真ライブラリを許可する"
        />
      </View>
    );
  }

  async function recording() {
    try {
      if (cameraRef.current && !isRecording) {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        if (video.uri) {
          const timestamp = getFormattedDate();
          const fileUri = FileSystem.documentDirectory + `${timestamp}.mp4`;

          await MediaLibrary.saveToLibraryAsync(video.uri);
          await FileSystem.copyAsync({
            from: video.uri,
            to: fileUri,
          });
        }
      } else if (cameraRef.current && isRecording) {
        setIsRecording(false);
        await cameraRef.current.stopRecording();
      }
    } catch (error) {
      console.error("録画エラー:", error);
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        mode="video"
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("List");
            }}
          >
            <Text style={styles.text}>📁</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={recording}>
            <Text style={styles.text}>{isRecording ? "🔴" : "🎥"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>🔄</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    color: "red",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 2,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(173, 216, 230, 0.5)",
    borderColor: "rgba(0, 0, 0)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
