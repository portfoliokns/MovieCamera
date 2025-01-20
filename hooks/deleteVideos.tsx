import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";

export async function handleDelete(
  videoUri: string,
  setVideoFiles: React.Dispatch<React.SetStateAction<string[]>>
) {
  showDeleteAlert(async () => {
    try {
      const path = FileSystem.documentDirectory + videoUri;
      await FileSystem.deleteAsync(path);
      setVideoFiles((prevFiles) =>
        prevFiles.filter((file) => file !== videoUri)
      );
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
