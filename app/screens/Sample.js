import { StatusBar } from "expo-status-bar";
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
import WelcomeScreen from "./app/screens/WelcomeScreen";
import SignUpScreen from "./app/screens/SignUpScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Go to SignUpScreen"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

export default function App() {
  console.log("Test Umar");
  const handlePress = () => console.log("Text Clicked 2");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
      {/* <WelcomeScreen /> */}
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js by Umar to start working on your app!</Text>
    //   <Text onPress={() => console.log("Text Clicked")}>Press Me</Text>
    //   <Text onPress={handlePress}>Alternative Method</Text>
    //   <Image source={require("./app/assets/favicon.png")} />
    //   <Image
    //     source={{
    //       width: 200,
    //       height: 300,
    //       uri: "https://picsum.photos/200/300",
    //     }}
    //   />
    //   <Button
    //     title="Click Me"
    //     onPress={() =>
    //       Alert.alert("My Title", "My message", [
    //         { text: "Yes", onPress: () => console.log("Yes") },
    //         { text: "No", onPress: () => console.log("No") },
    //       ])
    //     }
    //   />
    //   <Button
    //     title="Complete Task"
    //     onPress={() =>
    //       Alert.alert("Congrats you completed", "Some side message", [
    //         { text: "Got it" },
    //       ])
    //     }
    //   />
    //   <StatusBar style="auto" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
