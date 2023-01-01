import React, { useCallback } from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { useFonts } from "expo-font";

function GuideScreen({ navigation }) {
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
      onLayout={onLayoutRootView}
    >
      <View style={styles.titlePos}>
        <Text style={styles.titleText}>Guide Screen</Text>
      </View>
      <View style={styles.paragraphPos}>
        <Text style={styles.paragraphText}>
          1. Select between study and work mode
        </Text>
        <Text></Text>
        <Text style={styles.paragraphText}>
          2. Add a task to your task list, configure your pomodoro settings or
          select the task you wish to attempt
        </Text>
        <Text></Text>
        <Text style={styles.paragraphText}>
          3. Start the task and take a break once your study/work session is
          over
        </Text>
        <Text></Text>
      </View>
      <View style={styles.subtitlePos}>
        <Button title="Next " onPress={() => navigation.navigate("Mode")} />
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
    flex: 0.2,
    backgroundColor: "pink",
    alignItems: "center",
  },
  paragraphPos: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
  subtitlePos: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "70%",
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
    width: "100%",
    fontFamily: "OpenSans-Light",
    fontSize: 20,
  },
});

export default GuideScreen;
