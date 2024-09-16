import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from '../firebase';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
    }
  }, []);

  const saveProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.updateProfile({ displayName: name });
      alert('Profile updated successfully!');
    }
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput value={email} editable={false} placeholder="Email" />
      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
};

export default ProfileScreen;
