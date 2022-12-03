import React, { useContext, useState, useCallback } from "react";
import { useFonts } from "expo-font";
import { Button, Input } from "@rneui/themed";

import { StyleSheet, Text, View } from "react-native";

function SignUpScreen({ navigation }) {
  const [text, setText] = useState("");
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const BACKGROUND_COLOUR = "white";

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND_COLOUR,
      }}
      onLayout={onLayoutRootView}
    >
      <Text style={styles.titleText}> Sign Up </Text>
      <View
        style={{
          flexDirection: "row",
          height: "5%",
          backgroundColor: BACKGROUND_COLOUR,
          padding: 5,
        }}
      >
        <View style={{ backgroundColor: BACKGROUND_COLOUR, flex: 0.5 }}>
          <Text style={styles.paragraphText}> Already a Member?</Text>
        </View>
        <View style={{ backgroundColor: BACKGROUND_COLOUR, flex: 0.3 }}>
          <Text
            style={styles.paragraphText2}
            onPress={() => navigation.navigate("LogIn")}
          >
            {" "}
            Log In
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: BACKGROUND_COLOUR,
          padding: 10,
        }}
      >
        <Input
          onChangeText={(value) => setText(value)}
          placeholder="Email"
          style={styles.emailField}
        />
        <Input
          onChangeText={(value) => setText(value)}
          placeholder="Password"
          style={styles.passwordField}
        />
      </View>

      <Button
        title="Sign up"
        color="#b833ff"
        style={{ borderRadius: 5, overflow: "hidden" }}
        onPress={() => navigation.navigate("Guide")}
      />
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  paragraphText: {
    fontFamily: "OpenSans-Light",
    fontSize: 20,
  },
  paragraphText2: {
    fontFamily: "OpenSans-Medium",
    fontWeight: "bold",
    color: "#b833ff",
    fontSize: 20,
  },
  titleText: {
    fontSize: 35,
    fontFamily: "OpenSans-Bold",
  },

  emailField: {
    borderColor: "lightgrey",
    backgroundColor: "white",
    borderWidth: 1,
    width: "20%",
    height: "5%",
  },
  passwordField: {
    borderColor: "lightgrey",
    backgroundColor: "white",
    borderWidth: 1,
    width: "80%",
    height: "5%",
  },
  button: {},
});
