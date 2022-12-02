import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

//Handle Pomodoro Countdown Function
function PomodoroScreen({ route, navigation }) {
  const { uid, title, description, date, completed, timeInterval } =
    route.params;
  console.log("Pomdoro Completed:", completed);
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  //Start Pomodoro Session
  function startSession() {
    //Handle logic for converting mins to seconds
    var timeLeft = parseInt(timeInterval) * 60;
    setTimeLeft(timeLeft);
    // setTimeLeft(1000000);
  }

  //Need to handle calculations for time left
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  return (
    <View style={styles.container}>
      <Text>Pomodoro Screen</Text>
      {/* <Text>
        UID: {uid}, Title: {title}, Description: {description}, Date: {date},
        Completed: {completed}
      </Text> */}
      <Button title="Start Session" onPress={startSession} />
      <View>
        <Text>{timeLeft}</Text>
        <Text>Total time left: {secondsToHms(timeLeft)}</Text>
        <Text> {timeInterval}</Text>
      </View>
      <Button title="Session Completed" disabled={true} />
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
