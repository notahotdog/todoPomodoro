import React, { useState, useEffect, useCallback } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Dialog, LinearProgress } from "@rneui/themed";
import { useFonts } from "expo-font";
import { storeHighScore, updateFirebaseState } from "../backend/firebase";
import { convertToTimeFormat } from "../backend/Parser";

function StudyPomodoroScreen({ route, navigation }) {
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
    // console.log("check: timeleft", timeLeft);
    if (timeLeft == 0 && assignmentStart) {
      setBreakDialogVisible(true);
    }
    if (!timeLeft) return; // exit when we reach 0
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1); //save intervalId to clear the interval when component re-renders
    }, 500); //CHANGE HERE - to speed up/slow down actual break countdown
    return () => clearInterval(intervalId); //clear interval on rerender to avoid memory leaks
  }, [timeLeft]); //add timeLeft as a dependency to re-run the effect when we update

  const [breakTimeLeft, setBreakTimeLeft] = useState(0);

  useEffect(() => {
    if (breakTimeLeft == 0 && assignmentStart) {
      setBreakCompleted(true);
      setBreakDialogVisible(false);
    }
    if (!breakTimeLeft) return; // exit when we reach 0
    const breakIntervalId = setInterval(() => {
      setBreakTimeLeft(breakTimeLeft - 1); //save intervalId to clear the interval when component re-renders
    }, 100);
    return () => clearInterval(breakIntervalId); //clear interval on rerender to avoid memory leaks
  }, [breakTimeLeft]); //add timeLeft as a dependency to re-run the effect when we update

  //Start Pomodoro session
  function startSession() {
    //Trigger db update here
    updateFirebaseState("task1", "1");
    setAssignmentStart(true);
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

  const toggleBreakDialog = () => {
    setBreakDialogVisible(!breakDialogVisible);
  };

  //a bit wonky this code
  function startShortBreakSession() {
    //Update firebase here -2
    updateFirebaseState("task1", "2");
    var breaktime = parseInt(shortBreak) * 60; //Convert minutes to seconds
    setBreakTimeLeft(breaktime);
  }
  const [breakCompleted, setBreakCompleted] = useState(false);
  const toggleBreakCompletedDialog = () => {
    setBreakCompleted(!breakCompleted);
  };

  const [assignmentStart, setAssignmentStart] = useState(false); //checks if break has started

  const showTimeLeftDisplayComponent = (
    <Text style={styles.paragraphText}>
      {/* Total time left: {secondsToHms(timeLeft)}{" "} */}
      Total time left: {convertToTimeFormat(timeLeft)}{" "}
    </Text>
  );

  const hideTimeLeftDisplayComponent = (
    <Text style={styles.paragraphPromptText}>
      Click below to see remaining time{" "}
    </Text>
  );

  const [timeLeftDisplay, setTimeLeftDisplay] = useState(false);
  const toggleTimeLeftDisplay = () => {
    setTimeLeftDisplay(!timeLeftDisplay);
  };

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
        <Text style={styles.paragraphText}>
          Session Interval: {timeInterval} mins
        </Text>
        {timeLeftDisplay
          ? showTimeLeftDisplayComponent
          : hideTimeLeftDisplayComponent}
        <Button title="Show Timing" onPress={toggleTimeLeftDisplay} />
      </View>
      {/* <Button
        title="Session Completed"
        disabled={timeLeft != 0}
        onPress={toggleBreakDialog}
      /> */}

      <Dialog
        isVisible={breakDialogVisible}
        onBackdropPress={toggleBreakDialog}
      >
        <Dialog.Title title="Have a Break" />
        <View>
          <Text style={{ paddingBottom: "5%" }}>
            Break Duration Left: {convertToTimeFormat(breakTimeLeft)}
          </Text>
        </View>

        <Button title="Start Break Session" onPress={startShortBreakSession} />
        <Text>
          Its important to meditate sometimes and let you brain have a rest!
        </Text>
      </Dialog>
      <Dialog
        isVisible={breakCompleted}
        onBackdropPress={toggleBreakCompletedDialog}
      >
        <Dialog.Title title="Break Completed" />
        <Text>Click Here to return to TaskList</Text>
        <Button title="Return" onPress={() => navigation.navigate("Study")} />
      </Dialog>
    </View>
  );
}

export default StudyPomodoroScreen;

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
  paragraphPromptText: {
    width: "70%",
    fontFamily: "OpenSans-Medium",
    fontSize: 18,
    // fontStyle: "bold",
    color: "#be2596",
  },
});
