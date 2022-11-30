import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  Button,
  TextInput,
} from "react-native";

function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = React.useState("default email");
  const [password, onChangePassword] = React.useState("default password");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login </Text>
      <Text>Welcome Back meow</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />
      <Text>{email}</Text>
      <Text>{password}</Text>

      <Button title="Login" onPress={() => navigation.navigate("Mode")} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
