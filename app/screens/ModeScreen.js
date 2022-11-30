import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";

function ModeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.baseText}>Mode Screen</Text>
      <Button title="Work " onPress={() => navigation.navigate("Work")} />
      <Button title="Study " onPress={() => navigation.navigate("Work")} />
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
