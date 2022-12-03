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

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
  console.log("Starting App");

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
        <Stack.Screen name="Pomodoro" component={PomodoroScreen} />
        <Stack.Screen name="SetPomodoro" component={SetPomodoroScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="ChangeMode" component={ChangeModeScreen} />
        <Stack.Screen
          name="BlockNotification"
          component={BlockNotificationScreen}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
