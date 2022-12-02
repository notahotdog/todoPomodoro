import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Dialog, LinearProgress } from "@rneui/themed";

//Handle Pomodoro Countdown Function
function PomodoroScreen({ route, navigation }) {
  const { uid, title, description, date, completed, timeInterval, shortBreak } =
    route.params;
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!timeLeft) return; // exit when we reach 0

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

  //Start pomodoro session
  function startSession() {
    var timeLeft = parseInt(timeInterval) * 60; //Convert minutes to seconds
    setTimeLeft(timeLeft);
  }

  //Handle displays for seconds
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

  //Return decimal point
  function progressUpdate() {
    var percentage = 1 - timeLeft / (timeInterval * 60);
    return percentage;
  }

  //Break Dialog
  const [breakDialogVisible, setBreakDialogVisible] = useState(false);
  const toggleBreakDialog = () => {
    setBreakDialogVisible(!breakDialogVisible);
  };

  // //Set timer for break
  const [breakTimeLeft, setBreakTimeLeft] = useState(shortBreak);

  // //Start short Break session

  const [time, setTime] = useState(0);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  function startShortBreakSession() {
    const TIME_IN_MILISECONDS_TO_COUNTDOWN = 60 * shortBreak * 1000;
    setTime(TIME_IN_MILISECONDS_TO_COUNTDOWN);
  }
  const INTERVAL_IN_MILISECONDS = 100;

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
    <View style={styles.container}>
      <Text>Pomodoro Screen</Text>
      <LinearProgress
        style={{ marginVertical: 10 }}
        value={progressUpdate()}
        color="primary"
        variant="determinate"
        width="70%" // trackColor="green"
      />

      {/* <Text>
        UID: {uid}, Title: {title}, Description: {description}, Date: {date},
        Completed: {completed}
      </Text> */}
      <Button title="Start Session" onPress={startSession} />
      <View>
        <Text>Objective: {title}</Text>
        <Text>Task Description: {description}</Text>
        <Text>Interval: {timeInterval} mins</Text>
        <Text>Total time left: {secondsToHms(timeLeft)} </Text>
      </View>
      <Text>timeLeft: {timeLeft}</Text>
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
        <Text>Break Duration left: {secondsToHms(breakTimeLeft)} </Text>
        <Text>break time left: {breakTimeLeft}</Text>
        <Button title="Start Break Session" onPress={startShortBreakSession} />
        <Text>
          Its important to meditate sometimes and let you brain have a rest!
        </Text>
        <Text> {(time / 1000).toFixed(1)}s</Text>
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
});
