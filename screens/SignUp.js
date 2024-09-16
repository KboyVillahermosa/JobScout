// screens/SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        Alert.alert('Sign up successful!');
        navigation.navigate('Login'); // Navigate to login after signup
      })
      .catch((error) => {
        Alert.alert('Error:', error.message);
      });
  };

  return (
    <View style={styles.container}>
       <View style={styles.imageContainer}>
        <Text style={styles.imageText}>Job<Text style={styles.scout}>Scout</Text></Text>
        <Image source={require("../assets/logoFinal.png")} style={styles.image} />
      </View>
      <Text style={styles.signUpTitles}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.signUp}>
        <Text style={styles.signUpText} onPress={handleSignUp}>SignUp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.alreadyAcc}>
        <Text style={styles.signUpText} onPress={() => navigation.navigate("Login")}>Already have an Account?</Text>
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
  signUpTitles: {
    marginBottom: 10,
    fontSize: 25,
    textAlign: "start",
    color: '#111827',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  signUp: {
    backgroundColor: '#D61F69',
    padding: 10,
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
  },
  alreadyAcc: {
   marginTop: 10,
   backgroundColor: '#D61F69',
   padding: 10,
   alignItems: 'center',
  },
});
