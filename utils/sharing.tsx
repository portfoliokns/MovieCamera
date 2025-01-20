import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function handleShare(videoUri: string) {
  try {
    const fileUri = FileSystem.documentDirectory + videoUri;
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      alert("共有できません");
    }
  } catch (error) {
    console.error("共有エラー:", error);
  }
}
