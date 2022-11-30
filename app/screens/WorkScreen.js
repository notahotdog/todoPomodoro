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
      <AntDesign
        name="user"
        size={48}
        color="black"
        onPress={() => navigation.navigate("UserProfile")}
      />
      <Text>Work Screen</Text>
      <Text>My TodoList</Text>

      <Ionicons name="md-checkmark-circle" size={32} color="green" />
      <Text>My Pomodoro </Text>

      <AntDesign name="setting" size={48} color="black" />
    </View>
  );
}
export default WorkScreen;
