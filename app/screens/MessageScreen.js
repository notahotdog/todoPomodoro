import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button, Card, Input } from "@rneui/themed";
import HomeScreen from "./HomeScreen";

const MessageScreen = () => {
  //Maintains the state to be sent

  const [childData, setChildData] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const gotoParentScreen = () => {
    navigation.navigate("Home", { childData });
  };

  return (
    <View style={styles.container}>
      <Text>Message Screen</Text>
      <Text style={styles.title}>{route.params.message}</Text>
      <Text> Response to Parent</Text>
      <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Input
          placeholder="Message "
          onChangeText={(text) => setChildData(text)}
        />
        <Button title="UPDATE" onPress={gotoParentScreen} />
        <Card.Divider />
      </Card>
    </View>
  );
};

export default MessageScreen;

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
