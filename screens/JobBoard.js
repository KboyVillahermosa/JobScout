import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator, PaperProvider } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const searchJobs = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: { 
          query: searchQuery, 
          location: location,
          num_pages: '1' 
        },
        headers: {
          'X-RapidAPI-Key': '73e2260d8cmshc17285a275c812ap10ec6djsn301f833294f7',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.job_title ?? 'No title'}</Text>
      <Text>{item.employer_name ?? 'No employer name'}</Text>
      <Text>{item.location ?? 'No location'}</Text>
      <Text>Expires: {item.expiration_date ?? 'No expiration date'}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('JobDescription', { job: item })}
        style={styles.viewButton}
      >
        View Job Description
      </Button>
    </View>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label="Search for jobs"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
       
        <TouchableOpacity style={styles.contentSearch}>
        <Text  onPress={searchJobs} style={styles.searchButton}>
          Search
        </Text>
        </TouchableOpacity>
       
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <FlatList
            data={jobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.job_id}
            style={styles.jobList}
          />
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,

  },
  contentSearch: {
    alignItems: 'center',
    backgroundColor: '#D61F69',
  },
  searchButton: {
    padding: 10,
    color: 'white',
  },
  jobList: {
    marginTop: 20,
  },
  jobItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    elevation: 1,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#D61F69',
  },
});
