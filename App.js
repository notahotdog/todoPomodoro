import * as React from "react";

import SignUpScreen from "./app/screens/SignUpScreen";
import GuideScreen from "./app/screens/GuideScreen";
import LogInScreen from "./app/screens/LogInScreen";
import ModeScreen from "./app/screens/ModeScreen";
import WorkScreen from "./app/screens/WorkScreen";
import SetPomodoroScreen from "./app/screens/SetPomodoroScreen";
import UserProfileScreen from "./app/screens/UserProfileScreen";
import PomodoroScreen from "./app/screens/PomodoroScreen";
import ChangeModeScreen from "./app/screens/ChangeModeScreen";
import BlockNotificationScreen from "./app/screens/BlockNotificationScreen";
import StudyPomodoroScreen from "./app/screens/StudyPomodoroScreen";
import StudyScreen from "./app/screens/StudyScreen";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";

export default function App() {
  console.log("Starting App");

  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  };

  initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
