import * as React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";
import SignUpScreen from "./app/screens/SignUpScreen";
import GuideScreen from "./app/screens/GuideScreen";
import LogInScreen from "./app/screens/LogInScreen";
import ModeScreen from "./app/screens/ModeScreen";
import WorkScreen from "./app/screens/WorkScreen";
import SetPomodoroScreen from "./app/screens/SetPomodoroScreen";
import HomeScreen from "./app/screens/HomeScreen";
import MessageScreen from "./app/screens/MessageScreen";
import UserProfileScreen from "./app/screens/UserProfileScreen";
import PomodoroScreen from "./app/screens/PomodoroScreen";
import ChangeModeScreen from "./app/screens/ChangeModeScreen";
import BlockNotificationScreen from "./app/screens/BlockNotificationScreen";
import StudyPomodoroScreen from "./app/screens/StudyPomodoroScreen";
import StudyScreen from "./app/screens/StudyScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";

export default function App() {
  console.log("Starting App");
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBN7VYedVb6EhFC06Xybm5iDlnL6ctk7z4",
  //   authDomain: "pomodoro-todolist-c7a8f.firebaseapp.com",
  //   projectId: "pomodoro-todolist-c7a8f",
  //   storageBucket: "pomodoro-todolist-c7a8f.appspot.com",
  //   messagingSenderId: "742290901130",
  //   appId: "1:742290901130:web:bc61317872f8e350a90573",
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyAbynSMfjLUpjqKluFjYM0gesE7dkyKxwo",
    authDomain: "pomodoroapp-ac830.firebaseapp.com",
    databaseURL: "https://pomodoroapp-ac830-default-rtdb.firebaseio.com",
    projectId: "pomodoroapp-ac830",
    storageBucket: "pomodoroapp-ac830.appspot.com",
    messagingSenderId: "230467809032",
    appId: "1:230467809032:web:002be393e1e3e977e506bd",
  };

  initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
        <Stack.Screen name="Work" component={WorkScreen} />
        <Stack.Screen name="WorkPomodoro" component={PomodoroScreen} />
        <Stack.Screen name="SetPomodoro" component={SetPomodoroScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="ChangeMode" component={ChangeModeScreen} />
        <Stack.Screen
          name="BlockNotification"
          component={BlockNotificationScreen}
        />
        <Stack.Screen name="StudyPomodoro" component={StudyPomodoroScreen} />
        <Stack.Screen name="Study" component={StudyScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
