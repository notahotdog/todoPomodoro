import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function UserProfileScreen({ navigation }) {
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
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
      onLayout={onLayoutRootView}
    >
      <Text style={styles.titleText}>Alice </Text>
      <MaterialCommunityIcons
        name="face-woman-profile"
        size={50}
        style={{ paddingBottom: "10%" }}
        color="black"
      />
      <Text style={styles.paragraphText}>Profile </Text>
      <Text
        style={styles.paragraphText}
        // onPress={() => navigation.navigate("ChangeMode")}
        onPress={() => navigation.navigate("Mode")}
      >
        Change Mode
      </Text>
      {/* <Text
        style={styles.paragraphText}
        onPress={() => navigation.navigate("BlockNotification")}
      >
        Block Notification
      </Text> */}
      <Text
        style={styles.paragraphText}
        onPress={() => navigation.navigate("Guide")}
      >
        Help
      </Text>
      <Text
        style={styles.paragraphText}
        onPress={() => navigation.navigate("LogIn")}
      >
        Sign Out
      </Text>
    </View>
  );
}

export default UserProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
    marginTop: 50,
  },
  titleText: {
    fontSize: 40,
    paddingBottom: "5%",
    fontFamily: "OpenSans-Bold",
  },

  paragraphText: {
    width: "70%",
    fontFamily: "OpenSans-Light",
    fontSize: 20,
  },
});
