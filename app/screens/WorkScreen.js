import React, { useState } from "react";
import { Icon, Dialog, Button, Text, Slider, ListItem } from "@rneui/themed";
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

  //Set Pomodoro Data
  // const [pomodoroSetting, setPomodoroSetting] = useState({
  //   timeInterval: 20,
  //   shortBreak: 15,
  //   longBreak: 25,
  //   oneLoop: 4,
  // });

  //Pomodoro Data
  const [timeInterval, setTimeInterval] = useState(20);
  const [shortBreak, setShortBreak] = useState(15);
  const [longBreak, setLongBreak] = useState(25);
  const [oneLoop, setOneLoop] = useState(4);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AntDesign
        name="user"
        size={48}
        color="black"
        onPress={() => navigation.navigate("UserProfile")}
      />
      <Text>Work Screen</Text>
      <Text>My TodoList</Text>

      {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
      <Text>My Pomodoro </Text>

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
