import React from "react";
import { View } from "react-native-web";

//Handle Pomodoro Countdown Function
function PomodoroScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Pomodoro Screen</Text>
    </View>
  );
}

export default PomodoroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
    marginTop: 50,
  },
});