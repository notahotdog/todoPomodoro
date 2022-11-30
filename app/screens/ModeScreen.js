import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed";

function ModeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.baseText}>Choose Mode </Text>
      <Text style={styles.baseText}>
        {" "}
        You can change your current Mode in the settings later!
      </Text>
      <Button
        title="Work "
        color="secondary"
        onPress={() => navigation.navigate("Work")}
      />
      <Button
        title="Study "
        color="primary"
        onPress={() => navigation.navigate("Work")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: "bold",
  },
  innerText: {
    color: "red",
  },
});

export default ModeScreen;
