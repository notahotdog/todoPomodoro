import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "@rneui/themed";

const HomeScreen = () => {
  const [message, setMessage] = useState("");
  const [childMessage, setChildMessage] = useState("Random Message");

  const navigation = useNavigation();
  const route = useRoute();

  //Submits the message
  const goToMessageScreen = () => {
    navigation.navigate("Message", {
      message,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent</Text>
      <TextInput
        placeholder="Enter your message here"
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.input}
      />
      <Button title="Submit" onPress={goToMessageScreen} color="green" />
      <Divider width={5} />
      <Text style={styles.title}>{childMessage}</Text>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "green",
    marginTop: 50,
  },
  input: {
    width: "75%",
    padding: 10,
    marginTop: 20,
    color: "#000",
  },
});
