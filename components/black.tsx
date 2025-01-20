import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParam = {
  Recorder: undefined;
  Black: undefined;
  List: undefined;
  VideoPlayer: { videoUri: string };
};

type VideoPlayerNavigationProp = NativeStackNavigationProp<
  RootStackParam,
  "Black"
>;

export default function Black({
  navigation,
  route,
}: {
  navigation: VideoPlayerNavigationProp;
  route: any;
}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
      headerLeft: () => (
        <Button
          title="戻る"
          color="#444444"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
