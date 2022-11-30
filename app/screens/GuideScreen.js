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

function GuideScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Guide Screen</Text>
      <Button title="Next " onPress={() => navigation.navigate("Mode")} />
    </View>
  );
}

export default GuideScreen;
