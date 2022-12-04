import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Dialog, LinearProgress } from "@rneui/themed";
import { useFonts } from "expo-font";

function PomodoroScreen({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  const { uid, title, description, date, completed, timeInterval, shortBreak } =
    route.params;

  //Converts seconds to - hour-minutes-seconds
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

  //Pomodoro Countdown
  const [timeLeft, setTimeLeft] = useState(0); // initialize timeLeft with the seconds prop
  useEffect(() => {
    if (!timeLeft) return; // exit when we reach 0
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1); //save intervalId to clear the interval when component re-renders
    }, 1000);
    return () => clearInterval(intervalId); //clear interval on rerender to avoid memory leaks
  }, [timeLeft]); //add timeLeft as a dependency to re-run the effect when we update

  //Start Pomodoro session
  function startSession() {
    var timeLeft = parseInt(timeInterval) * 60; //Convert minutes to seconds
    setTimeLeft(timeLeft);
  }

  //Returns progress update as a decimal point
  function progressUpdate() {
    var percentage = 1 - timeLeft / (timeInterval * 60);
    return percentage;
  }

  //Break
  const [breakDialogVisible, setBreakDialogVisible] = useState(false); //Break Dialog
  // const [breakTimeLeft, setBreakTimeLeft] = useState(shortBreak);

  const toggleBreakDialog = () => {
    setBreakDialogVisible(!breakDialogVisible);
  };

  //Break Logic
  const [time, setTime] = useState(0);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const INTERVAL_IN_MILISECONDS = 100;

  function startShortBreakSession() {
    const TIME_IN_MILISECONDS_TO_COUNTDOWN = 60 * shortBreak * 1000;
    setTime(TIME_IN_MILISECONDS_TO_COUNTDOWN);
  }
  useEffect(() => {
    const countDownUntilZero = () => {
      setTime((prevTime) => {
        if (prevTime <= 0) return 0;

        const now = Date.now();
        const interval = now - referenceTime;
        setReferenceTime(now);
        return prevTime - interval;
      });
    };
    setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
  }, [time]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.titleText}> {title}</Text>
      <View style={styles.progressBar}>
        <LinearProgress
          style={{ marginVertical: 10 }}
          value={progressUpdate()}
          color="primary"
          variant="determinate"
          width="70%"
        />
      </View>

      {/* <Text>
        UID: {uid}, Title: {title}, Description: {description}, Date: {date},
        Completed: {completed}
      </Text> */}
      <Button title="Start Session" onPress={startSession} />
      <View>
        <Text style={styles.paragraphText}>Objective: {title}</Text>
        <Text style={styles.paragraphText}>
          Task Description: {description}
        </Text>
        <Text style={styles.paragraphText}>Interval: {timeInterval} mins</Text>
        <Text style={styles.paragraphText}>
          Total time left: {secondsToHms(timeLeft)}{" "}
        </Text>
      </View>
      <Button
        title="Session Completed"
        disabled={timeLeft != 0}
        onPress={toggleBreakDialog}
      />

      <Dialog
        isVisible={breakDialogVisible}
        onBackdropPress={toggleBreakDialog}
      >
        <Dialog.Title title="Have a Break" />
        <Text>
          Break Duration left: {secondsToHms((time / 1000).toFixed(0))}{" "}
        </Text>

        <Button title="Start Break Session" onPress={startShortBreakSession} />
        <Text>
          Its important to meditate sometimes and let you brain have a rest!
        </Text>
      </Dialog>
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
  progressBar: {
    width: "70%",
    backgroundColor: "red,",
  },
  titleText: {
    fontSize: 35,
    fontFamily: "OpenSans-Bold",
  },
  paragraphText: {
    width: "70%",
    fontFamily: "OpenSans-Light",
    fontSize: 18,
  },
});
