import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VaccineList = () => {
  const [isChecked, setIsChecked] = useState({
    BCG: false,
    "Hep B1": false,
    OPV: false,
    "Influenza 1": false,
    "Influenza 2": false,
    "Typhoid Conjugate Vaccine": false,
    "Hepatitis A- 1": false,
    "PCV Booster": false,
    "HPV (2 doses)": false,
    "Annual Influenza Vaccine": false,
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

export default VaccineList;