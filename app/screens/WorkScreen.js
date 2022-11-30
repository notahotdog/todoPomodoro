import React from "react";
import { Icon } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";

function WorkScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Work Screen</Text>
      <Text>My TodoList</Text>
      <AntDesign name="user" size={24} color="black" />
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
      <Text>My Pomodoro </Text>

      <AntDesign name="setting" size={24} color="black" />
    </View>
  );
}

export default WorkScreen;
