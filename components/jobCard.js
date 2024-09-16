import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const JobCard = ({ job, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{job.title}</Text>
        <Text>{job.company}</Text>
        <Text>{job.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
