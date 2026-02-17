import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (!email.includes("@")) {
      alert("Enter valid email");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validate()) {
      navigation.replace("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton title="Login" onPress={handleLogin} />

      <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
        Don't have an account? Signup
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#010101",
    color:'#f1eaea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },
  link: { marginTop: 10, color: "blue" }
});
