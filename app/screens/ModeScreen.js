import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { useFonts } from "expo-font";
import { storeHighScore, updateState } from "../backend/firebase";

function ModeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.parentView} onLayout={onLayoutRootView}>
      <View style={styles.titlePos}>
        <Text style={styles.titleText}>Choose Mode </Text>
      </View>
      <View style={styles.subtitlePos}>
        <Text style={styles.paragraphText}>
          You can change your current Mode in the settings later!
        </Text>
      </View>
      <View style={styles.buttonPos}>
        <View style={styles.workButton}>
          <Button
            title="Work "
            color="secondary"
            onPress={() => navigation.navigate("Work")}
          />
        </View>
        <View style={styles.studyButton}>
          <Button
            title="Study "
            color="primary"
            onPress={() => navigation.navigate("Work")}
          />
        </View>
        <Button
          title="Send Data "
          color="secondary"
          // onPress={() => storeHighScore("samantha", "on")}
          onPress={() => updateState("task1", "1")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: "white",
  },
  titlePos: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  subtitlePos: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPos: {
    flex: 4,
    backgroundColor: "white",
    justifyContent: "flex-start",
    flexDirection: "column",
    top: 0,
  },
  workButton: {
    paddingTop: "20%",
    backgroundColor: "white",
    alignSelf: "center",
    width: "60%",
  },
  studyButton: {
    paddingTop: "10%",
    width: "60%",
    backgroundColor: "white",
    alignSelf: "center",
  },

  titleText: {
    position: "absolute",
    bottom: 0,
    marginTop: "auto",
    fontSize: 35,
    fontFamily: "OpenSans-Bold",
    flex: 1,
  },

  paragraphText: {
    width: "70%",
    fontFamily: "OpenSans-Light",
    fontSize: 20,
  },
});

export default ModeScreen;
