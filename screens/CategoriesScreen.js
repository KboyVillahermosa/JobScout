import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const categories = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Cooking',
  'Technology',
  'Science',
];

const CategoriesScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      // Deselect category if it's already selected
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      // Add category to the selected list
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNext = () => {
    navigation.navigate('ProfileCompletion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Work Field</Text>

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategories.includes(item) && styles.categoryButtonSelected,
            ]}
            onPress={() => handleCategorySelect(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(item) && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />

      {selectedCategories.length > 0 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
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
    textAlign: 'center',
  },
  categoryButton: {
    padding: 15,
    backgroundColor: 'pink',
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#D61F69', 
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#fff', // Change text color when selected
  },
  nextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#D61F69',
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoriesScreen;
