// import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
// import React, { useState } from 'react'
// import Logo from './assets/images/dropdown.png';
// import Logo1 from './assets/images/up-arrow.png'

// const doctorOptions = [
//     { id: 1, title: 'Create new doctor'},
//     { id: 2, title: 'Update existing doctor'},
//     { id: 3, title: 'View doctor details'},
//     { id: 4, title: 'Delete doctor'},
// ];


// const NGODoctorOptions = ({ navigation }) => {

//     const [isClicked, setIsClicked] = useState(false);
//     const [doctor, setDoctor] = useState('Doctor Details');
//     const [data, setData] = useState(doctorOptions);

//     const onItemPressed= () => {
//         navigation.dispatch(CommonActions.navigate('Navigation', { screen: 'login' }));
//     }

//   return (
//     <SafeAreaView style={styles.container}>

//       <TouchableOpacity 
//       style={styles.dropDownSelector}
//       onPress={() => {
//         setIsClicked(!isClicked);
//       }}
//       >
//       <Text>{doctor}</Text>

//         {/* function for inverting dropdown arrow */}
//         {isClicked ? 
//             (<Image source={Logo1} style={styles.arrow}/>)
//             :
//             (<Image source={Logo} style={styles.arrow}/>
//         )}
//       </TouchableOpacity>

//       {isClicked ? (
//         <FlatList
//             style={styles.dropDownArea}
//             data={data}
//             renderItem={({ item, index }) => {
//                 return (
//                 <TouchableOpacity
//                     style={styles.dropData}
//                     onPress={() => {
//                     setDoctor(item.title);
//                     setIsClicked(false);
//                     onItemPressed();
//                     }}
//                 >
//                     <Text>{item.title}</Text>
//                 </TouchableOpacity>
//                 );
//             }}
//             >
//         </FlatList>

//       ) : null}

//     </SafeAreaView>

//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
    
//     dropDownSelector: {
//         width: '90%',
//         height: 50,
//         borderRadius: 10,
//         borderWidth: 0.5,
//         borderColor: '#8e8e8e',
//         alignSelf: 'center',
//         marginTop: 50,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingLeft: 15,
//         paddingRight: 15,
//     },
//     arrow: {
//         width: 20,
//         height: 20,
//     },
//     dropDownArea: {
//         width: '90%',
//         height: 200,
//         borderRadius: 10,
//         marginTop: 20,
//         backgroundColor: '#fff',
//         elevation: 5,
//         alignSelf: 'center',
//     },
//     dropData: {
//         width: '85%',
//         height: 50,
//         borderBottomWidth: 0.2,
//         borderBottomColor: '#8e8e8e',
//         alignSelf: 'center',
//         justifyContent: 'center',
//     },
// });

// export default NGODoctorOptions;