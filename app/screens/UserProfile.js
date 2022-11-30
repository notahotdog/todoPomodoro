import React from "react";
import { View, StyleSheet, Text } from "react-native";

function UserProfile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alice </Text>
      <Text>Profile </Text>
      <Text>Change Mode</Text>
      <Text> Block Notification</Text>
      <Text>Help</Text>
      <Text>Sign Out</Text>
    </View>
  );
}

export default UserProfile;
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
