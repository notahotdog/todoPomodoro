import React, { useState, useEffect } from "react";
import {
  Icon,
  Dialog,
  Button,
  Text,
  Slider,
  ListItem,
  CheckBox,
  Input,
} from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

//Create the modal for setting pomodoro time
function WorkScreen({ navigation }) {
  //Modal Popup - Pomodoro Setting
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  //Modal Popup - Add task
  const [taskAddVisible, setTaskAddVisible] = useState(false);
  const toggleAddTaskDialog = () => {
    setTaskAddVisible(!taskAddVisible);
  };

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

  const settingsPreset = {
    ti: 4,
    sb: 5,
    lb: 20,
    ol: 4,
  };

  const taskList = [
    {
      uid: 0,
      title: "Task 1",
      description: "task 1 description",
      date: "01/11/12",
      completed: false,
    },
    {
      uid: 1,
      title: "Task 2",
      description: "task 2 description",
      date: "12/12/22",
      completed: false,
    },
    {
      uid: 2,
      title: "Task 3",
      description: "task 3 description",
      date: "13/12/22",
      completed: false,
    },
  ];

  const [todoList, setTodoList] = useState(taskList); //sets todoList
  const [uidCtr, setUidCtr] = useState(3);

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
    navigation.navigate("Pomodoro", dataPassed);
  }

  const [enableLongBreak, setEnableLongBreak] = useState(false);

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AntDesign
        name="user"
        size={48}
        color="black"
        onPress={() => navigation.navigate("UserProfile")}
      />
      <Text>Work Screen</Text>
      <Text>My TodoList List</Text>

      <Text>My Pomodoro </Text>
      <View style={{ width: "100%" }}>
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
      </View>

      <Button
        title="Add Task "
        color="secondary"
        onPress={toggleAddTaskDialog}
      />
      <Dialog isVisible={taskAddVisible} onBackdropPress={toggleAddTaskDialog}>
        <Dialog.Title title="Pomodoro Setting " />
        <Text>Task Title: {addTaskTitle}</Text>
        <Input
          placeholder=" "
          onChangeText={(value) => setAddTaskTitle(value)}
        />
        <Text>Description: {addTaskDescription}</Text>
        <Input
          placeholder=" "
          onChangeText={(value) => setAddTaskDescription(value)}
        />
        <Text>Date {addTaskDate}</Text>
        <Input
          placeholder=" "
          onChangeText={(value) => setAddTaskDate(value)}
        />

        <Dialog.Actions>
          <Dialog.Button title="Add Task" onPress={addTask} />
        </Dialog.Actions>
      </Dialog>

      <Text>Time Interval :{timeInterval} : 00</Text>
      {/* Pomodoro Completed: {currentInterval} / {oneLoop} */}
      <Text>
        {noTaskCompleted} / {oneLoop}
      </Text>

      <Text>Enable long break: {String(enableLongBreak)}</Text>

      <AntDesign
        name="setting"
        size={48}
        color="black"
        onPress={toggleDialog}
      />
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Pomodoro Setting " />
        <Text> Time Interval: {timeInterval} mins</Text>

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
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
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
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
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
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
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
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color={"red"}
                />
              ),
            }}
          />
        </View>
        <Dialog.Actions>
          <Dialog.Button
            title="Confirm Update"
            onPress={() => console.log("Primary Action Clicked!")}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
export default WorkScreen;
