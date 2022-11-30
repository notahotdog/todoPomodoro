import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://picsum.photos/200/300/?blur",
      }}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default WelcomeScreen;
