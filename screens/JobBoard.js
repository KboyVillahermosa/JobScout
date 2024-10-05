import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Icon } from 'react-native';
import { TextInput, Button, ActivityIndicator, PaperProvider, IconButton } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


// Array for popular job categories with links
const popularWorks = [
  { id: '1', title: 'Frontend Development', link: 'https://www.linkedin.com/jobs/search/?keywords=frontend%20developer', icon: 'code-tags' },
  { id: '2', title: 'Fullstack Development', link: 'https://www.linkedin.com/jobs/search/?keywords=fullstack%20developer', icon: 'developer-mode' },
  { id: '3', title: 'Backend Development', link: 'https://www.linkedin.com/jobs/search/?keywords=backend%20developer', icon: 'cloud' },
  { id: '4', title: 'UI/UX Design', link: 'https://www.linkedin.com/jobs/search/?keywords=uiux%20designer', icon: 'design-services' },
];

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Function to fetch jobs
  const searchJobs = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: searchQuery || 'software developer', 
          location: location || 'remote',             
          num_pages: '1',
        },
        headers: {
          'X-RapidAPI-Key': '2383f72fb6msh6426b331d6e5dfdp16cbaejsneea70d45b3a7',
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

  useEffect(() => {
    searchJobs();
  }, []);

  // Function to render each popular work item
  const renderPopularWorkItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.popularWorkCard} 
      onPress={() => Linking.openURL(item.link)}>
      <Text style={styles.popularWorkTitle}>{item.title}</Text>
    </TouchableOpacity>
  );


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
        
        <TouchableOpacity style={styles.contentSearch} onPress={searchJobs}>
          <Text style={styles.searchButton}>Search</Text>
        </TouchableOpacity>

        {/* Popular Works Section */}
        <View style={styles.popularWorksContainer}>
          <Text style={styles.popularWorksTitle}>Popular Works</Text>
          <FlatList
            data={popularWorks}
            renderItem={renderPopularWorkItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularWorksList}
          />
        </View>

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
  popularWorksContainer: {
    marginVertical: 20,
  },
  popularWorksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popularWorksList: {
    paddingHorizontal: 5,
  },
  popularWorkCard: {
    backgroundColor: '#D61F69',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  popularWorkTitle: {
    color: 'white',
    fontWeight: 'bold',
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
