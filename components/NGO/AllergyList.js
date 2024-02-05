import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllergyList = () => {
  const [isChecked, setIsChecked] = useState({
    Dust: false,
    Milk: false,
    Asthma: false,
    Skin: false,
    Egg: false,
    Soy: false,
    Peanut: false,
  });

  const toggleCheckbox = (allergy) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [allergy]: !prevState[allergy],
    }));
  };

  return (
    <View style={{ padding: 30 }}>
      {Object.entries(isChecked).map(([allergy, checked]) => (
        <TouchableOpacity key={allergy} onPress={() => toggleCheckbox(allergy)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Icon
              name={checked ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={checked ? '#E38B29' : 'black'}
            />
            <Text style={{ fontSize: 15, color: checked ? '#E38B29' : 'black', marginLeft: 10 }}>
              {allergy}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AllergyList;