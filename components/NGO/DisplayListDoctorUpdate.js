// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import config from '../config';


// const DisplayListDoctorUpdate = ({ navigation }) => {
//     const [kishoriVarg, setKishoriVarg] = useState('');
//     const [doctorFullName, setDoctorFullName] = useState([]);
//     const [filter, setFilter] = useState('');
 
//     useEffect(() => {
//       if (kishoriVarg) {
//         fetchData();
//       }
//     }, [kishoriVarg]);
 
//     // const fetchData = async () => {
//     //   try {
//     //     const response = await axios.get(`http://192.168.108.127:8080/api/children?kishoriVarg=${kishoriVarg}`);
       
//     //     console.log('Response from server:', response.data);
 
//     //     // Verify if the data has the expected structure
//     //     if (response.data && response.data.data && Array.isArray(response.data.data)) {
//     //       const firstStudent = response.data.data[0];
//     //       console.log('First student:', firstStudent);
//     //     }
 
//     //     // Sort the childFullName array in ascending order based on the 'childFullName' property
//     //     const sortedChildFullName = response.data.data.sort((a, b) => a.childFullName.localeCompare(b.childFullName));
 
//     //     setChildFullName(sortedChildFullName);
//     //   }
//     //   catch (error) {
//     //     console.error('Axios error:', error);
//     //   }
//     // };


//     const fetchData = async () => {
//         try {
//           const response = await axios.get(`${config.API_BASE_URL}/doctor?kishoriVarg=${kishoriVarg}`);
         
//           console.log('Response from server:', response.data);
     
//           // Verify if the data has the expected structure
//           if (response.data && response.data.data && Array.isArray(response.data.data)) {
//             const firstDoctor = response.data.data[0];
//             console.log('First student:', firstDoctor);
//           }
     
//           // Sort the childFullName array in ascending order based on the 'childFullName' property
//           const sortedDoctorFullName = response.data.data.sort((a, b) => a.doctorFullName.localeCompare(b.doctorFullName));
     
//           setDoctorFullName(sortedDoctorFullName);
//         }
//         catch (error) {
//           console.error('Axios error:', error);
//         }
//       };
     
 
//     const filteredDoctorFullName = doctorFullName.filter(item => item.doctorFullName.toLowerCase().includes(filter.toLowerCase()));
 
//     const renderItem = ({ item }) => (
//       <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
//         <Text style={{ color: 'black' }}>{item.doctorFullName}</Text>
//       </TouchableOpacity>
//     );
 
//     // const handlePress = (item) => {
//     //   const { kishoriVarg, childFullName } = item;
//     //   navigation.navigate('UpdateChild', { name: `${kishoriVarg} - ${childFullName}` });
//     // };


//     const handlePress = (item) => {
//         const { doctorFullName } = item;
//         console.log('Item:', item);
//         console.log('Doctor Name:', doctorFullName);
//         navigation.navigate('UpdateDoctor', { name: doctorFullName });
//       };
     
     
     
     
     
 
//     return (
//       <View style={styles.container}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Enter Kishori Varg </Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Hadapsar"
//             placeholderTextColor="gray"
//             value={kishoriVarg}
//             onChangeText={(text) => setKishoriVarg(text)}
//           />
//         </View>
       
//         {kishoriVarg && (
//           <>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Filter by Doctor Name </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Type name to filter"
//                 placeholderTextColor="gray"
//                 value={filter}
//                 onChangeText={(text) => setFilter(text)}
//               />
//             </View>
         
//             <FlatList
//               data={filteredDoctorFullName}
//               renderItem={renderItem}
//               keyExtractor={(item) => `${item.kishoriVarg}-${item.doctorFullName}`}
//             />
//           </>
//         )}
//       </View>
//     );
//   };
 
//   const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     marginTop: 50,
//     flexDirection: 'column',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderBottomWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     marginLeft: 10,
//     color: 'black'
//     // marginTop: -25
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   listItem: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   label: {
//     fontSize: 20,
//     marginBottom: 10,
//     //marginTop: -20,
//     marginLeft: 10,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: '#E38B29',
//     padding: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     marginTop: 10,
//   },
// });


// export default DisplayListDoctorUpdate;



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import axios from 'axios';
import config from '../config';


const DisplayListDoctorUpdate = ({ navigation }) => {
    const [kishoriVarg, setKishoriVarg] = useState('');
    const [doctorFullName, setDoctorFullName] = useState([]);
    const [filter, setFilter] = useState('');
 
    useEffect(() => {
      if (kishoriVarg) {
        fetchData();
      }
    }, [kishoriVarg]);


    const fetchData = async () => {
        try {
          const response = await axios.get(`${config.API_BASE_URL}/doctor?kishoriVarg=${kishoriVarg}`);
         
          console.log('Response from server:', response.data);
     
          // Verify if the data has the expected structure
          if (response.data && response.data.data && Array.isArray(response.data.data)) {
            const firstDoctor = response.data.data[0];
            console.log('First student:', firstDoctor);
          }
     
          // Sort the childFullName array in ascending order based on the 'childFullName' property
          const sortedDoctorFullName = response.data.data.sort((a, b) => a.doctorFullName.localeCompare(b.doctorFullName));
     
          setDoctorFullName(sortedDoctorFullName);
        }
        catch (error) {
          console.error('Axios error:', error);
        }
      };
     
 
    const filteredDoctorFullName = doctorFullName.filter(item => item.doctorFullName.toLowerCase().includes(filter.toLowerCase()));
 
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.doctorFullName}</Text>
      </TouchableOpacity>
    );
 
    // const handlePress = (item) => {
    //   const { kishoriVarg, childFullName } = item;
    //   navigation.navigate('UpdateChild', { name: `${kishoriVarg} - ${childFullName}` });
    // };


    const handlePress = (item) => {
        const { doctorFullName } = item;
        console.log('Item:', item);
        console.log('Doctor Name:', doctorFullName);
        navigation.navigate('UpdateDoctor', { doctorFullName: doctorFullName });
      };
     
     
     
     
     
 
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kishori Varg </Text>
          <TextInput
            style={styles.input}
            placeholder="KV Name"
            placeholderTextColor="gray"
            value={kishoriVarg}
            onChangeText={(text) => setKishoriVarg(text)}
          />
        </View>
       
        {kishoriVarg && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Doctor Name </Text>
              <TextInput
                style={styles.input}
                placeholder="Filter by name"
                placeholderTextColor="gray"
                value={filter}
                onChangeText={(text) => setFilter(text)}
              />
            </View>
         
            <FlatList
              data={filteredDoctorFullName}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.kishoriVarg}-${item.doctorFullName}`}
            />
          </>
        )}
      </View>
    );
  };
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: '3%',
      marginTop: '3%',
      flexDirection: 'column',
      elevation: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      margin: heightPercentageToDP('1%'),
    },
    input: {
      height: 'auto',
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: '8%',
      paddingRight: 'auto',
      marginLeft: '10%',
      textAlign: 'left',
      fontSize: RFValue(15),
      color: 'black',
      // marginTop: -25
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItem: {
      padding: '16%',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    label: {
      fontSize: RFValue(15),
      marginBottom: '10%',
      //marginTop: -20,
      marginLeft: '5%',
      color: 'black',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#E38B29',
      padding: '5%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginTop: '2%',
    },
});


export default DisplayListDoctorUpdate;