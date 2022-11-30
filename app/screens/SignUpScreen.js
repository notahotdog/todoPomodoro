import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.js";
import UserContext from "../context/UserContext";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";

function SignUpScreen({ navigation }) {
  // const { counter, setCounter } = useContext(AppContext);
  const { isSignedIn, setSignIn } = useContext(UserContext);
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign Up Screen</Text>
      {/* <Button title="Log in" onPress={() => navigation.navigate("LogIn")} /> */}
      {/* <Button title="Sign up" onPress={() => navigation.navigate("Guide")} /> */}
      <Button title="Home Screen" onPress={() => navigation.navigate("Home")} />
      <Text>{isSignedIn}</Text>
      <TextInput
        onChangeText={(value) => setText(value)}
        style={{
          borderColor: "lightgray",
          borderWidth: 1,
          width: "80%",
          height: "10%",
        }}
      ></TextInput>
      <Button
        onPress={() => {
          setSignIn(text);
          console.log("Updated value");
          console.log(isSignedIn);
        }}
        title="Update value in context"
      />
    </View>
  );
}

export default SignUpScreen;
