import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, Button as PaperButton } from 'react-native-paper';

const options = [
  { id: 1, label: 'I am seeking a full-time job' },
  { id: 2, label: 'I am seeking a part-time job' },
  { id: 3, label: 'I am a student' },
  { id: 4, label: 'I am looking for internships' },
  { id: 5, label: 'I am open to freelance work' },
  // Add more options as needed
];

const SurveyModal = ({ onComplete }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheckBoxChange = (id) => {
    setSelectedOptions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = () => {
    const answers = Object.keys(selectedOptions)
      .filter(key => selectedOptions[key])
      .map(key => options.find(option => option.id === parseInt(key)).label);
    onComplete(answers);
  };

  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Job Survey</Text>
        <Text style={styles.subtitle}>Please select all that apply:</Text>
        <ScrollView style={styles.scrollView}>
          {options.map(option => (
            <View key={option.id} style={styles.checkboxContainer}>
              <Checkbox
                status={selectedOptions[option.id] ? 'checked' : 'unchecked'}
                onPress={() => handleCheckBoxChange(option.id)}
                color="#D61F69" // Change color for the checkbox
              />
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          ))}
        </ScrollView>
        <PaperButton mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Submit
        </PaperButton>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  scrollView: {
    maxHeight: '70%', // Limit height to make it scrollable
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#D61F69', // Button color
    width: '100%',
  },
});

export default SurveyModal;
