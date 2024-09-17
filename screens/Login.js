import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in successfully
        const user = userCredential.user;
        Alert.alert("Login successful!");
        navigation.navigate("Home"); // Navigate to home screen
      })
      .catch((error) => {
        Alert.alert("Error:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageText}>Job<Text style={styles.scout}>Scout</Text></Text>
        <Image source={require("../assets/logoFinal.png")} style={styles.image} />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.btnLogin} onPress={handleLogin}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUp}>
        <Text
          style={styles.signUpText}
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have an account? SignUp
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  imageText: {
    marginBottom: 10,
    fontSize: 30,
    color: '#111827',
    fontWeight: 'bold',
  },
  scout: {
    color: '#D61F69',
    fontWeight: 'bold',

  },
  imageContainer: {
    alignItems: "center", 
    marginBottom: 20, 
  },
  image: {
    width: 140,
    height: 120,
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    textAlign: "start",
    color: '#111827',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  btnContainer: {
    marginBottom: 10,
    backgroundColor: "#D61F69",
    padding: 10,
    alignItems: "center",
    color: "white",
  },
  btnLogin: {
    color: "white",
  },
  signUp: {
    backgroundColor: "#D61F69",
    padding: 10,
    alignItems: "center",
  },
  signUpText: {
    color: "white",
  },
});