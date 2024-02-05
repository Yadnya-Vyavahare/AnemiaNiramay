import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import config from './config';
const VisitDetails = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/visits`) // Replace with your actual backend URL
      .then((response) => response.json())
      .then((data) => setVisits(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <View>
      <Text>Visit Details:</Text>
      <FlatList
        data={visits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Gastrointestinal: {item.gastrointestinal}</Text>
            <Text>Liver: {item.liver}</Text>
            {/* Add similar lines for other fields */}
          </View>
        )}
      />
    </View>
  );
};

export default VisitDetails;
