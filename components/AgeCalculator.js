// //perfectly working
// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text, TextInput } from 'react-native';

// const AgeCalculator = ({ selectedDate, enteredAge, onAgeChange }) => {
//   const [age, setAge] = useState('');

//   useEffect(() => {
//     // Perform age calculation when selectedDate changes
//     // You can use the same calculateAge function from the previous example
//     console.log('Selected Date:', selectedDate);
//     calculateAge(selectedDate);
//   }, [selectedDate]);

//   const calculateAge = (birthdate) => {
//     if (!birthdate) {
//       setAge(''); // Handle case where birthdate is not selected
//       return;
//     }
  
//     // Convert birthdate string to Date object
//     const birthdateDate = new Date(birthdate.replace(/\//g, '-'));
  
//     // Get current date
//     const currentDate = new Date();
  
//     // Calculate age
//     let age = currentDate.getFullYear() - birthdateDate.getFullYear();
//     const monthDiff = currentDate.getMonth() - birthdateDate.getMonth();
//     const dayDiff = currentDate.getDate() - birthdateDate.getDate();
  
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--; // Adjust age if birthday hasn't occurred yet this year
//     }
  
//     // Calculate months
//     let months = (currentDate.getMonth() + 12 - birthdateDate.getMonth()) % 12;
//     if (dayDiff < 0) {
//       months--; // Adjust months if birthday hasn't occurred yet this month
//     }
  
//     //Update age state
//     setAge(`${age} years ${months} months`);
//     onAgeChange(`${age} years ${months} months`);
//     // setAge(`${age}.${months}`);
//     // onAgeChange(`${age}.${months}`);

//   };
  
  
//   return (
//     <View style={styles.ageContainer}>
//       {selectedDate ? (
//         <Text style={styles.ageText}>{selectedDate}</Text>
//       ) : (
//         <TextInput
//           placeholder="Enter Age"
//           placeholderTextColor="gray"
//           style={styles.ageInput}
//           onChangeText={(text) => onAgeChange(text)}
//           value={enteredAge}
//           keyboardType="numeric"
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     ageContainer: {
//       marginTop: 0,
//     },
//     ageInput: {
//       fontSize: 15,
//       color: 'black',
//       borderBottomWidth: 1,
//       marginTop: 5,
//       marginLeft: '40%',
//     },
//     ageText: {
//       fontSize: 15,
//       color: 'black',
//       marginTop: 5,
//     },
//   });

// export default AgeCalculator; 


//perfectly working
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


const AgeCalculator = ({ selectedDate, enteredAge, onAgeChange }) => {
  const [age, setAge] = useState('');


  useEffect(() => {
    // Perform age calculation when selectedDate changes
    // You can use the same calculateAge function from the previous example
    console.log('Selected Date Age:', selectedDate);
    calculateAge(selectedDate);
  }, [selectedDate]);


  const calculateAge = (birthdate) => {
    if (!birthdate) {
      setAge(''); // Handle case where birthdate is not selected
      return;
    }
 
    // Convert birthdate string to Date object
    const birthdateDate = new Date(birthdate.replace(/\//g, '-'));
 
    // Get current date
    const currentDate = new Date();
 
    // Calculate age
    let age = currentDate.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthdateDate.getMonth();
    const dayDiff = currentDate.getDate() - birthdateDate.getDate();
 
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // Adjust age if birthday hasn't occurred yet this year
    }
 
    // Calculate months
    let months = (currentDate.getMonth() + 12 - birthdateDate.getMonth()) % 12;
    if (dayDiff < 0) {
      months--; // Adjust months if birthday hasn't occurred yet this month
    }
 
    //Update age state
    setAge(`${age} years ${months} months`);
    onAgeChange(`${age} years ${months} months`);
    // setAge(`${age}.${months}`);
    // onAgeChange(`${age}.${months}`);


  };
 
 
  return (
    <View style={styles.ageContainer}>
      {selectedDate ? (
        <Text style={styles.ageText}>{selectedDate}</Text>
      ) : (
        <TextInput
          placeholder="Enter Age"
          style={styles.ageInput}
          onChangeText={(text) => onAgeChange(text)}
          value={enteredAge}
          keyboardType="numeric"
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    ageContainer: {
      marginTop: 0,
    },
    ageInput: {
      fontSize: RFValue(13),
      color: 'black',
      borderBottomWidth: 1,
      marginTop: '5%',
      marginLeft: 'auto',
    },
    ageText: {
      fontSize: RFValue(13),
      color: 'black',
      marginTop: '5%',
    },
  });


export default AgeCalculator;
