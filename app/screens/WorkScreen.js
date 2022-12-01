import React, { useState } from "react";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

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

  //Test Data
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

  //addTask
  const [addTaskTitle, setAddTaskTitle] = useState("");
  const [addTaskDescription, setAddTaskDescription] = useState("");
  const [addTaskDate, setAddTaskDate] = useState("");

  //Pomodoro Data
  const [timeInterval, setTimeInterval] = useState(20);
  const [shortBreak, setShortBreak] = useState(15);
  const [longBreak, setLongBreak] = useState(25);
  const [oneLoop, setOneLoop] = useState(4);

  const [check, setCheck] = useState(true);

  //Store in a list and clear previous data
  function addTask() {
    console.log("Task Added");

    const obj = {
      uid: 1,
      title: addTaskTitle,
      description: addTaskDescription,
      date: addTaskDate,
      completed: false,
    };

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
              <ListItem.Title>{item.title}</ListItem.Title>
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
          <Dialog.Button
            title="Add Task"
            // onPress={() => console.log("Task Added!")}
            onPress={addTask}
          />
        </Dialog.Actions>
      </Dialog>

      <Text>{timeInterval} : 00</Text>

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
            maximumValue={10}
            minimumValue={0}
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
            maximumValue={10}
            minimumValue={0}
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
            maximumValue={10}
            minimumValue={0}
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
            maximumValue={10}
            minimumValue={0}
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
