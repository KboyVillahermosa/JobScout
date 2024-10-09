// AlbumsScreen.js
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';

export default function AlbumsScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('Categories'); // Navigate to CategoriesScreen
  };

  return (
    <ImageBackground
      source={require('../assets/pexels.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}> <Text style={styles.jobsCount}>5,000+ Jobs</Text> Are Waiting for You</Text>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Overlay with semi-transparent background color
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  continueButton: {
    backgroundColor: '#D61F69', 
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  jobsCount:{
    color: '#D61F69',

  },
});
