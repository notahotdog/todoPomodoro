import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.js";
import UserContext from "../context/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input } from "@rneui/themed";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Alert,
} from "react-native";

function SignUpScreen({ navigation }) {
  const [text, setText] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.titleText}> Sign Up </Text>
      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
        }}
      >
        <View style={{ backgroundColor: "white", flex: 0.8 }}>
          <Text> Already a Member? </Text>
        </View>
        <View style={{ backgroundColor: "white", flex: 0.2 }}>
          <Text onPress={() => navigation.navigate("LogIn")}> Sign In</Text>
        </View>
      </View>

      <Input
        onChangeText={(value) => setText(value)}
        placeholder="email"
        style={{
          borderColor: "lightgray",
          borderWidth: 1,
          width: "80%",
          height: "5%",
        }}
      />
      <Input
        onChangeText={(value) => setText(value)}
        placeholder="password"
        style={{
          borderColor: "lightgray",
          borderWidth: 1,
          width: "80%",
          height: "5%",
        }}
      />
      <Button title="Sign up" onPress={() => navigation.navigate("Guide")} />
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
