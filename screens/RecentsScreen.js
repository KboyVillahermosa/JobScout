// RecentsScreen.js

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { db } from "../firebase"; // Adjust the import path if necessary
import { collection, addDoc } from "firebase/firestore";
import { requestAsync } from "expo-auth-session/build/Fetch";
import LottieView from "lottie-react-native";
import { Card } from "react-native-paper";

export default function RecentsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
      });
      Alert.alert("Success", "Message sent successfully!", [{ text: "OK" }]);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Could not send message. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <ScrollView>
      <View style={styles.contactHeader}>
        <View style={styles.contactContent}>
          <Card>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          </Card>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Get in Touchhhh</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="Email"
        />
        <TextInput
          style={styles.inputMessage}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
        <Button title="Send Message" onPress={handleSubmit} color={"#D61F69"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  contactHeader: {
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputMessage: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlign: "start",
    bottom: 0,
  },
});
