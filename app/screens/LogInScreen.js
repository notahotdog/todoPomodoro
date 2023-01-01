import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import { Button, Input } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("default email");
  const [password, setPassword] = useState("default password");
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
      <Text style={styles.titleText}> Log In </Text>
      <Text style={styles.paragraphText}>~ Welcome Back meow ~</Text>
      <View
        style={{
          width: "100%",
          height: "15%",
          backgroundColor: BACKGROUND_COLOUR,
          padding: 10,
        }}
      >
        <Input
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
          style={styles.emailField}
        />
        <Input
          onChangeText={(value) => setPassword(value)}
          placeholder="Password"
          style={styles.passwordField}
        />
      </View>
      <View>
        <Button
          title="Log In "
          color="#b833ff"
          style={{ borderRadius: 2, overflow: "hidden", paddingTop: "12%" }}
          onPress={() => navigation.navigate("Mode")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          height: "5%",
          backgroundColor: BACKGROUND_COLOUR,
          padding: 5,
        }}
      >
        <View style={{ backgroundColor: BACKGROUND_COLOUR, flex: 0.55 }}>
          <Text style={styles.paragraphText}> Don't have an account?</Text>
        </View>
        <View style={{ backgroundColor: BACKGROUND_COLOUR, flex: 0.3 }}>
          <Text
            style={styles.paragraphText2}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

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
