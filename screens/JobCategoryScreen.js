import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const JobCategoryScreen = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('ProfileCompletion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Job Categories</Text>
      {/* Replace the following with actual category selection logic */}
      <Text style={styles.category}>Category 1</Text>
      <Text style={styles.category}>Category 2</Text>
      <Text style={styles.category}>Category 3</Text>
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  category: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default JobCategoryScreen;
