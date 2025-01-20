import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParam = {
  Recorder: undefined;
  Black: undefined;
  List: undefined;
  VideoPlayer: { videoUri: string };
};

type HandleDeleteVideoArgs = {
  videoUri: string;
  navigation: NativeStackNavigationProp<RootStackParam, "VideoPlayer">;
};

export async function handleDeleteVideo({
  videoUri,
  navigation,
}: HandleDeleteVideoArgs) {
  showDeleteAlert(async () => {
    try {
      const path = FileSystem.documentDirectory + videoUri;
      await FileSystem.deleteAsync(path);
      navigation.goBack();
    } catch (error) {
      console.error("削除エラー:", error);
    }
  });
}

function showDeleteAlert(onConfirm: () => void) {
  Alert.alert(
    "削除確認",
    "この動画を削除してもよろしいですか？",
    [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "削除",
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
}
