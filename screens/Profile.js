import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { db } from '../firebase'; // Ensure your firebase configuration is correctly imported

const Profile = () => {
  const navigation = useNavigation(); // Access navigation using the hook
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = getAuth().currentUser; // Get the current user
        if (user) {
          const docRef = doc(db, 'userData', user.uid); // Reference to the user's data in Firestore
          const docSnap = await getDoc(docRef); // Fetch the document

          if (docSnap.exists()) {
            setProfileData(docSnap.data()); // Set the profile data state with the fetched data
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData(); // Fetch the data when the component mounts
  }, []);

  // Show a loading state if profile data is not yet loaded
  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Loading profile data...</Text>
      </View>
    );
  }

  // Render the profile data once it's loaded
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profileData.profileImageUrl && (
        <Image source={{ uri: profileData.profileImageUrl }} style={styles.image} />
      )}
      <Text style={styles.text}>Name: {profileData.name}</Text>
      <Text style={styles.text}>Age: {profileData.age}</Text>
      <Text style={styles.text}>Location: {profileData.location}</Text>
      <Text style={styles.text}>Email: {profileData.email}</Text>
      <Text style={styles.text}>Phone Number: {profileData.phoneNumber}</Text>
      {profileData.cvUrl && (
        <Text style={styles.text}>CV: {profileData.cvUrl}</Text>
      )}

      <Button title="Edit Profile" onPress={() => navigation.navigate('ProfileCompletion')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Profile;