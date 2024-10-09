import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProfileCompletionScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cvUri, setCvUri] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCvPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    if (result.type === 'success') {
      setCvUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    const storage = getStorage();
    const user = getAuth().currentUser;

    if (!name || !age || !location || !email || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      let profileImageUrl = '';
      if (imageUri) {
        const imageRef = ref(storage, `profile_images/${user.uid}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      let cvUrl = '';
      if (cvUri) {
        const cvRef = ref(storage, `cv/${user.uid}`);
        const response = await fetch(cvUri);
        const blob = await response.blob();
        await uploadBytes(cvRef, blob);
        cvUrl = await getDownloadURL(cvRef);
      }

      await setDoc(doc(db, 'userData', user.uid), {
        name,
        age: Number(age),
        location,
        email: user.email,
        phoneNumber,
        profileImageUrl,
        cvUrl,
        isProfileComplete: true,  // Mark profile as complete
      });

      // Navigate to Home after saving
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting profile data:', error);
      alert('An error occurred while saving your profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" style={styles.input} />
      
      <TouchableOpacity style={styles.button}>
        <Button title="Upload Profile Image" onPress={handleImagePick} style={styles.uploadProfile } color={'#D61F69'}/>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </TouchableOpacity>

      <TouchableOpacity  style={styles.button}>
        <Button title="Upload CV" onPress={handleCvPick} color={'#D61F69'} />
        {cvUri && <Text style={styles.cvText}>CV uploaded: {cvUri}</Text>}
      </TouchableOpacity>

      <TouchableOpacity  style={styles.button}>
        <Button title="Submit" onPress={handleSubmit} style={styles.submit} color={'#D61F69'} />
      </TouchableOpacity>

      {/* Skip button to navigate to Home */}
      <TouchableOpacity  style={styles.skip}>
        <Text onPress={() => navigation.navigate('Home')} style={styles.skipContent}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  cvText: {
    marginVertical: 10,
    color: 'green',
    fontSize: 24,
  },
  submit: {
    height: 50,
  },
  skip: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  skipContent: {
    fontSize: 20,
  }
});

export default ProfileCompletionScreen;
