import React from "react";
import { View, StyleSheet, Text } from "react-native";

function UserProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alice </Text>
      <Text>Profile </Text>
      <Text onPress={() => navigation.navigate("ChangeMode")}>Change Mode</Text>
      <Text onPress={() => navigation.navigate("BlockNotification")}>
        Block Notification
      </Text>
      <Text onPress={() => navigation.navigate("Guide")}>Help</Text>
      <Text>Sign Out</Text>
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
});
