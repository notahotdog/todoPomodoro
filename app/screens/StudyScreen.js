import React, { useState, useEffect, useCallback } from "react";
import {
  Icon,
  Dialog,
  Button,
  Slider,
  ListItem,
  CheckBox,
  Input,
} from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { updateFirebaseState } from "../backend/firebase";
import { convertToTimeFormat } from "../backend/Parser";

function StudyScreen({ navigation }) {
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

  //Pomodoro Setting Dialog
  const [settingsVisible, setSettingsVisible] = useState(false);
  const toggleSettingsDialog = () => {
    setSettingsVisible(!settingsVisible);
  };

  //Modal Add task Dialog
  const [taskAddVisible, setTaskAddVisible] = useState(false);
  const toggleAddTaskDialog = () => {
    setTaskAddVisible(!taskAddVisible);
  };

  //Settings for Max/Min available time select
  const maxMin = {
    tiMax: 50,
    tiMin: 1,
    sbMax: 10,
    sbMin: 1,
    lbMax: 59,
    lbMin: 1,
    olMax: 10,
    olMin: 1,
  };

  //Preset settings value at initialisation
  const settingsPreset = {
    ti: 1,
    sb: 1,
    lb: 1,
    ol: 2,
  };

  //Sample task list at initialisation
  const taskList = [
    {
      uid: 0,
      title: "Do assignment 1",
      // description: "Complete assignment  1 by 2 pm",
      description: "Complete before dinner",
      date: "01/11/12",
      completed: false,
    },
    {
      uid: 1,
      title: "Do assignment 2",
      description: "Complete by thursday",
      date: "12/12/22",
      completed: false,
    },
    {
      uid: 2,
      title: "Do assignment 3",
      description: "Complete asap ",
      date: "13/12/22",
      completed: false,
    },
  ];

  const [todoList, setTodoList] = useState(taskList); //sets todoList
  const [uidCtr, setUidCtr] = useState(3); //used to keep track of the uid of the different tasks

  //addTask
  const [addTaskTitle, setAddTaskTitle] = useState("");
  const [addTaskDescription, setAddTaskDescription] = useState("");
  const [addTaskDate, setAddTaskDate] = useState("");

  //Pomodoro Data
  const [timeInterval, setTimeInterval] = useState(settingsPreset.ti);
  const [shortBreak, setShortBreak] = useState(settingsPreset.sb);
  const [longBreak, setLongBreak] = useState(settingsPreset.lb);
  const [oneLoop, setOneLoop] = useState(settingsPreset.ol);

  //Store in a list and clear previous data
  function addTask() {
    if (addTaskTitle == "" || addTaskDescription == "") {
      // if (addTaskTitle == "" || addTaskDescription == "" || addTaskDate == "") {
      alert("Fields cannot be empty");
      return;
    }
    const newTask = {
      uid: uidCtr,
      title: addTaskTitle,
      description: addTaskDescription,
      date: addTaskDate,
      completed: false,
    };
    setUidCtr(uidCtr + 1);
    const updatedTodoList = [...todoList, newTask];
    setTodoList(updatedTodoList);
    setAddTaskTitle("");
    setAddTaskDescription("");
    setAddTaskDate("");
    toggleAddTaskDialog();
  }

  function deleteTask(uid) {
    const id = uid;
    let updatedTodoList = [];
    todoList.forEach((item, i) => {
      if (item.uid != id) {
        updatedTodoList = [...updatedTodoList, item];
      }
    });
    setTodoList(updatedTodoList);
  }

  function setTaskComplete(uid) {
    let updatedTodoList = [];
    todoList.forEach((item, i) => {
      if (item.uid == uid) {
        const toggleFalse = {
          uid: item.uid,
          title: item.title,
          description: item.description,
          date: item.date,
          completed: false,
        };

        const toggleTrue = {
          uid: item.uid,
          title: item.title,
          description: item.description,
          date: item.date,
          completed: true,
        };
        let tempItem;
        if (item.completed) {
          tempItem = { ...toggleFalse };
        } else {
          tempItem = { ...toggleTrue };
        }
        updatedTodoList = [...updatedTodoList, tempItem];
      } else {
        updatedTodoList = [...updatedTodoList, item];
      }
    });
    setTodoList(updatedTodoList);
  }

  //Navigate to the the Pomodoro Page TODO- Refactor to just include the uid
  function navigateToTaskPomodoro(item) {
    const dataPassed = { ...item, timeInterval, shortBreak, longBreak };
    navigation.navigate("StudyPomodoro", dataPassed);
  }

  const [enableLongBreak, setEnableLongBreak] = useState(false); //used to trigger longBreak pane

  //Triggers a new checkComplete with every re-render
  useEffect(() => {
    checkCompleted();
  });

  const [noTaskCompleted, setNoTaskCompleted] = useState(1);

  function checkCompleted() {
    var checkCtr = oneLoop;
    var completedCtr = 0;
    todoList.forEach((item, i) => {
      if (item.completed == true) {
        completedCtr += 1;
      }
    });
    setNoTaskCompleted(completedCtr);
    if (checkCtr == completedCtr) {
      setEnableLongBreak(true);
    } else {
      setEnableLongBreak(false);
    }
  }

  function deleteCompleted() {
    let newTodoList = [];
    todoList.forEach((item, i) => {
      if (item.completed == false) {
        newTodoList = [...newTodoList, item];
      }
    });
    setTodoList(newTodoList);
  }

  function startLongBreak() {
    //Set firebase db here - 3
    updateFirebaseState("task1", "3");
    //Navigates through the checkcomplete and deletes item that are not in
    toggleLongBreakDialog();
    setBreakStarted(true);
  }

  const [longBreakDialogVisible, setLongBreakDialogVisible] = useState(false); //Break Dialog for longBreak
  const toggleLongBreakDialog = () => {
    setLongBreakDialogVisible(!longBreakDialogVisible);
  };

  const [breakTimeLeft, setBreakTimeLeft] = useState(longBreak);
  const [breakCompleted, setBreakCompleted] = useState(false);
  const toggleBreakCompletedDialog = () => {
    deleteCompleted();
    setBreakCompleted(!breakCompleted);
  };

  const [breakStarted, setBreakStarted] = useState(false);

  useEffect(() => {
    if (breakTimeLeft == 0 && breakStarted) {
      setBreakCompleted(true);
      setLongBreakDialogVisible(false);
    }
    if (!breakTimeLeft) return; // exit when we reach 0
    const breakIntervalId = setInterval(() => {
      setBreakTimeLeft(breakTimeLeft - 1); //save intervalId to clear the interval when component re-renders
    }, 1000); //CHANGE HERE - to speed up/slow down actual break countdown
    return () => clearInterval(breakIntervalId); //clear interval on rerender to avoid memory leaks
  }, [breakTimeLeft]); //add timeLeft as a dependency to re-run the effect when we update
  function startLongBreakSession() {
    var breaktime = parseInt(longBreak) * 60; //Convert minutes to seconds
    setBreakTimeLeft(breaktime);
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
      <Dialog
        isVisible={longBreakDialogVisible}
        onBackdropPress={toggleLongBreakDialog}
      >
        <Dialog.Title title="Have a Break" />
        <View style={{ paddingBottom: "5%", backgroundColor: "white" }}>
          <Text>
            Break Duration left:{" "}
            {/* {secondsToHms((parseInt(breakTimeLeft) / 1000).toFixed(0))}{" "} */}
            {convertToTimeFormat(breakTimeLeft)} mins
          </Text>
        </View>

        <Button title="Start Break Session" onPress={startLongBreakSession} />
        <View style={{ paddingTop: "5%", backgroundColor: "white" }}>
          <Text>
            Its important to meditate sometimes and let your brain have a rest!
          </Text>
        </View>
      </Dialog>
      <Dialog
        isVisible={breakCompleted}
        onBackdropPress={toggleBreakCompletedDialog}
      >
        <Dialog.Title title="Long Break Completed" />
        <Text>Hope you enjoyed your rest </Text>

        <Button
          // style={{ paddingTop: "50%" }}
          title="Return"
          onPress={() => toggleBreakCompletedDialog()}
        />
      </Dialog>
      <View style={styles.headerView}>
        <View style={styles.antdIcon}>
          <AntDesign
            name="user"
            size={30}
            color="black"
            style={{ paddingTop: "15%" }}
            onPress={() => navigation.navigate("UserProfile")}
          />
        </View>

        <Text style={styles.titleText}>My To-do List</Text>
      </View>
      <View style={styles.todoListView}>
        <ScrollView style={{ width: "100%" }}>
          {todoList.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title onPress={() => navigateToTaskPomodoro(item)}>
                  {item.title}
                </ListItem.Title>
              </ListItem.Content>
              <Icon
                name="delete"
                type="antd"
                onPress={() => deleteTask(item.uid)}
              />
              <CheckBox
                center
                checked={item.completed}
                onPress={() => setTaskComplete(item.uid)}
              />
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>

        <View style={styles.buttonPos}>
          <Button
            title="Add Task "
            color="secondary"
            onPress={toggleAddTaskDialog}
          />
        </View>

        <Dialog
          isVisible={taskAddVisible}
          onBackdropPress={toggleAddTaskDialog}
        >
          <Dialog.Title title="Add Pomodoro Task" />
          <Text>Task Title: {addTaskTitle}</Text>
          <Input
            placeholder=" "
            maxLength={19}
            onChangeText={(value) => setAddTaskTitle(value)}
          />
          <Text>Description: {addTaskDescription}</Text>
          <Input
            placeholder=" "
            maxLength={22}
            onChangeText={(value) => setAddTaskDescription(value)}
          />
          {/* <Text>Date {addTaskDate}</Text>
          <Input
            placeholder=" "
            onChangeText={(value) => setAddTaskDate(value)}
          /> */}

          <Dialog.Actions>
            <Dialog.Button title="Add Task" onPress={addTask} />
          </Dialog.Actions>
        </Dialog>
      </View>
      <View style={styles.myPodoroTimerView}>
        <View style={styles.pomodoroHeader}>
          <View style={styles.pomodoroHeaderSettings}>
            <AntDesign
              name="setting"
              size={30}
              color="black"
              style={{ paddingLeft: "5%", paddingTop: "10%" }}
              onPress={toggleSettingsDialog}
            />
          </View>
          <View style={styles.pomodoroHeaderTitle}>
            <Text style={styles.pomodoroHeaderTitleText}>My Pomodoro </Text>
          </View>
        </View>
        <View style={styles.pomodoroBody}>
          <Text style={styles.paragraphText}>
            Session Interval : {convertToTimeFormat(timeInterval * 60)} mins
          </Text>
          <Text style={styles.paragraphText}>
            Short Break Duration : {convertToTimeFormat(shortBreak * 60)} mins
          </Text>
          <Text style={styles.paragraphText}>
            Long Break Duration : {convertToTimeFormat(longBreak * 60)} mins
          </Text>
          <Text style={styles.paragraphText}>
            Pomodoro Completed: {noTaskCompleted} / {oneLoop}
          </Text>

          {enableLongBreak ? (
            <Button
              title="Start Long Break "
              color="primary"
              style={{ width: "60%", alignSelf: "center", paddingTop: "10%" }}
              onPress={startLongBreak}
            />
          ) : (
            <Button
              title="Long Break Disabled"
              color="warning"
              type="outline"
              style={{ width: "60%", alignSelf: "center", paddingTop: "10%" }}
              onPress={() => alert("Please complete some task")}
            />
          )}
        </View>

        <Dialog
          isVisible={settingsVisible}
          onBackdropPress={toggleSettingsDialog}
        >
          <Dialog.Title title="Pomodoro Setting " />
          <Text> Session Interval: {timeInterval} mins</Text>

          <View>
            <Slider
              value={timeInterval}
              onValueChange={setTimeInterval}
              maximumValue={maxMin.tiMax}
              minimumValue={maxMin.tiMin}
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20 }}
                    color={"red"}
                  />
                ),
              }}
            />
          </View>

          <Text> Short Break Time : {shortBreak} mins</Text>
          <View>
            <Slider
              value={shortBreak}
              onValueChange={setShortBreak}
              maximumValue={maxMin.sbMax}
              minimumValue={maxMin.sbMin}
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20 }}
                    color={"red"}
                  />
                ),
              }}
            />
          </View>
          <Text> Long Break Time : {longBreak} mins</Text>
          <View>
            <Slider
              value={longBreak}
              onValueChange={setLongBreak}
              maximumValue={maxMin.lbMax}
              minimumValue={maxMin.lbMin}
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20 }}
                    color={"red"}
                  />
                ),
              }}
            />
          </View>
          <Text> One Loop : {oneLoop} times </Text>
          <View>
            <Slider
              value={oneLoop}
              onValueChange={setOneLoop}
              maximumValue={maxMin.olMax}
              minimumValue={maxMin.olMin}
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 20 }}
                    color={"red"}
                  />
                ),
              }}
            />
          </View>
          <Dialog.Actions>
            <Dialog.Button
              title="Confirm Update"
              onPress={() => toggleSettingsDialog()}
            />
          </Dialog.Actions>
        </Dialog>
      </View>
    </View>
  );
}
export default StudyScreen;
const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: "white",
  },
  headerView: {
    width: "90%",
    flex: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  todoListView: {
    width: "90%",
    flex: 3.5,
    backgroundColor: "white",
  },
  myPodoroTimerView: {
    width: "90%",
    flex: 2,
    // backgroundColor: "yellow",
    paddingTop: "5%",
  },

  buttonPos: {
    width: "60%",
    // backgroundColor: "red",
    alignSelf: "center",
    paddingBottom: "5%",
  },
  pomodoroHeader: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
  },

  pomodoroHeaderSettings: {
    // backgroundColor: "red",
    flex: 1,
  },
  pomodoroHeaderTitle: {
    paddingRight: "10%",
    // backgroundColor: "purple",
    flex: 7,
  },

  pomodoroBody: {
    flex: 4,
    // backgroundColor: "blue",
  },
  pomodoroHeaderTitleText: {
    // backgroundColor: "",
    alignSelf: "center",
    fontSize: 25,
    fontFamily: "OpenSans-Bold",
  },
  antdIcon: {
    flex: 0.3,
    // backgroundColor: "yellow",
  },
  titleText: {
    // bottom: 0,
    // backgroundColor: "red",
    alignSelf: "center",
    widt: "100%",

    fontSize: 25,
    fontFamily: "OpenSans-Bold",
    flex: 0.7,
  },

  paragraphText: {
    width: "80%",
    fontFamily: "OpenSans-Light",
    fontSize: 19,
  },
});
