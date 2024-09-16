import axios from 'axios';

const fetchJobs = async (query, location) => {
  const options = {
    method: 'GET',
    url: 'https://jobsearch-api.p.rapidapi.com/jobs',
    params: { query, location },
    headers: {
      'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
      'X-RapidAPI-Host': 'jobsearch-api.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.jobs;
  } catch (error) {
    console.error(error);
  }
};

export default fetchJobs;
