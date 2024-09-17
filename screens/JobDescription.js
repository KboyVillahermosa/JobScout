import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { Button } from 'react-native-paper';

export default function JobDescription({ route }) {
  const { job } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.jobTitle}>{job.job_title ?? 'No title'}</Text>
        <Text style={styles.companyName}>{job.employer_name ?? 'No employer name'}</Text>
        <Text style={styles.location}>{job.location ?? 'No location'}</Text>
        <Text style={styles.expirationDate}>Expires: {job.expiration_date ?? 'No expiration date'}</Text>
        <Text style={styles.jobDescription}>{job.job_description ?? 'No job description'}</Text>
        <Button
          mode="contained"
          onPress={() => Linking.openURL(job.job_apply_link)}
          style={styles.applyButton}
        >
          Apply
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  expirationDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#D61F69',
  },
});
