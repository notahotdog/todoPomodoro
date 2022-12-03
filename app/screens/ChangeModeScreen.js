import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { Switch } from "@rneui/themed";

function ChangeMode({ navigation }) {
  const [checked, setChecked] = useState(false);
  const toggleSwitch = () => {
    setChecked(!checked);
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Change Mode Screen</Text>
      <Button title="Work" onPress={() => navigation.navigate("Work")} />
      <Button title="Study" onPress={() => navigation.navigate("Work")} />
      <Switch value={checked} onValueChange={(value) => setChecked(value)} />
    </View>
  );
}

export default ChangeMode;
