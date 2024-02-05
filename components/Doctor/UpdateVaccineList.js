// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import config from '../config';

// const UpdateVaccineList = () => {

//     const [vaccineList, setVaccineList] = useState([]);
//     const [newVaccine, setNewVaccine] = useState('');
//     const [isEditMode, setIsEditMode] = useState(false);

//     useEffect(() => {
//         // Fetch the current vaccine list
//         axios.get(`${config.API_BASE_URL}/getVaccineList`)
//             .then(response => {
//                 console.log('Vaccine list response:', response.data);
//                 setVaccineList(response.data.vaccineList);
//             })
//             .catch(error => {
//                 console.error('Error fetching vaccine list:', error);
//             });
//     }, []);

    
//     const handleSaveChanges = () => {
//         // Send the updated vaccine list to the server
//         axios.put(`${config.API_BASE_URL}/updateVaccineList`, {
//             vaccineList,
//         })
//         .then(response => {
//             console.log('Save Changes Response Data:', response.data);
    
//             // Display a success message from the response data
//             Alert.alert('List updated Successfully' );
    
//             setIsEditMode(false); // Disable edit mode
//         })
//         .catch(error => {
//             console.error(error);
//             // Handle error
//         });
//     };
    
    
//     const handleAddVaccine = () => {
//         // Add the new vaccine to the list
//         setVaccineList([...vaccineList, newVaccine]);
//         setNewVaccine(''); // Clear the input field
//     };
        

//     const handleRemoveVaccine = (index, itemName) => {
//         // Show an alert before removing the vaccine
//         Alert.alert(
//             'Delete Vaccine',
//             `Do you want to delete ${itemName}?`,
//             [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                     text: 'Yes',
//                     onPress: () => {
//                         // Remove the vaccine at the specified index
//                         const updatedVaccineList = [...vaccineList];
//                         updatedVaccineList.splice(index, 1);
//                         setVaccineList(updatedVaccineList);
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     };


//     const renderVaccineItem = ({ item, index }) => {
//         return (
//             <View style={styles.listContainer}>
//                 <Text style={{ flex: 1, color: 'black' }}>{item}</Text>
//                 {isEditMode && (
//                     <TouchableOpacity onPress={() => handleRemoveVaccine(index, item)}>
//                         <Icon name="trash" size={24} color="red" />
//                     </TouchableOpacity>
//                 )}
//             </View>
//         );
//     };


//     return (
//         <View style={{ flex: 1 }}>
//             {isEditMode && (
//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         value={newVaccine}
//                         onChangeText={text => setNewVaccine(text)}
//                         placeholder=" Add another vaccine"
//                         placeholderTextColor="gray"
//                     />
//                     <TouchableOpacity onPress={handleAddVaccine}>
//                         <View style={styles.addButton}>
//                             <Text style={{ color: 'white' }}>Add</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             )}

//             <FlatList
//                 data={vaccineList}
//                 renderItem={renderVaccineItem}
//                 keyExtractor={(item, index) => index.toString()}
//             />

//             <TouchableOpacity
//                 style={[styles.button, { backgroundColor: isEditMode ? 'green' : '#E38B29', }]}
//                 onPress={() => {
//                     if (isEditMode) {
//                         handleSaveChanges();
//                     }
//                     setIsEditMode(prev => !prev);
//                 }}
//             >
//                 <Text style={{ color: isEditMode ? 'white' : 'black', }}>{isEditMode ? 'Save Changes' : 'Edit'}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     listContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 40,
//         marginLeft: 20,
//         marginVertical: 15,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         marginBottom: 20,
//         marginRight: 40,
//         marginTop: 20,
//     },
//     input: {
//         flex: 1,
//         height: 40,
//         borderColor: 'gray',
//         color: 'black',
//         borderWidth: 1,
//         marginRight: 10,
//         marginLeft: 20,
//     },
//     button: {
//         borderRadius: 100,
//         width: 150,
//         alignSelf: 'center',
//         alignItems: 'center',
//         paddingVertical: 15,
//         marginTop: 30,
//         marginBottom: 10,
//     },
//     addButton: {
//         backgroundColor: 'green',
//         padding: 10,
//         alignItems: 'center',
//         borderRadius: 15,
//     },
// });

// export default UpdateVaccineList;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import config from '../config';


const UpdateVaccineList = () => {


    const [vaccineList, setVaccineList] = useState([]);
    const [newVaccine, setNewVaccine] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() => {
        // Fetch the current vaccine list
        axios.get(`${config.API_BASE_URL}/getVaccineList`)
            .then(response => {
                console.log('Vaccine list response:', response.data);
                setVaccineList(response.data.vaccineList);
            })
            .catch(error => {
                console.error('Error fetching vaccine list:', error);
            });
    }, []);


   
    const handleSaveChanges = () => {
        // Send the updated vaccine list to the server
        axios.put(`${config.API_BASE_URL}/updateVaccineList`, {
            vaccineList,
        })
        .then(response => {
            console.log('Save Changes Response Data:', response.data);
   
            // Display a success message from the response data
            Alert.alert('Vaccine List updated successfully', response.data.message);
   
            setIsEditMode(false); // Disable edit mode
        })
        .catch(error => {
            console.error(error);
            // Handle error
        });
    };
   
   
    const handleAddVaccine = () => {
        // Add the new vaccine to the list
        setVaccineList([...vaccineList, newVaccine]);
        setNewVaccine(''); // Clear the input field
    };
       


    const handleRemoveVaccine = (index, itemName) => {
        // Show an alert before removing the vaccine
        Alert.alert(
            'Delete Vaccine',
            `Do you want to delete ${itemName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => {
                        // Remove the vaccine at the specified index
                        const updatedVaccineList = [...vaccineList];
                        updatedVaccineList.splice(index, 1);
                        setVaccineList(updatedVaccineList);
                    },
                },
            ],
            { cancelable: false }
        );
    };




    const renderVaccineItem = ({ item, index }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={{ flex: 1, color: 'black', fontSize: RFValue(13), }}>{item}</Text>
                {isEditMode && (
                    <TouchableOpacity onPress={() => handleRemoveVaccine(index, item)}>
                        <Icon name="trash" size={24} color="red"/>
                    </TouchableOpacity>
                )}
            </View>
        );
    };




    return (
        <View style={{ flex: 1 }}>
            {isEditMode && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newVaccine}
                        onChangeText={text => setNewVaccine(text)}
                        placeholder=" Add another vaccine"
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity onPress={handleAddVaccine}>
                        <View style={styles.addButton}>
                            <Text style={{ color: 'white', fontSize: RFValue(15), fontWeight: 'bold' }}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}


            <FlatList
                data={vaccineList}
                renderItem={renderVaccineItem}
                keyExtractor={(item, index) => index.toString()}
            />


            <TouchableOpacity
                style={[styles.button, { backgroundColor: isEditMode ? 'green' : '#E38B29', }]}
                onPress={() => {
                    if (isEditMode) {
                        handleSaveChanges();
                    }
                    setIsEditMode(prev => !prev);
                }}
            >
                <Text style={{ color: isEditMode ? 'white' : 'black', fontSize: RFValue(15), fontWeight: 'bold' }}>{isEditMode ? 'Save Changes' : 'Edit'}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '20%',
        marginLeft: '10%',
        marginVertical: '5%',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: '10%',
        marginRight: '5%',
        marginTop: '10%',
        marginLeft:'auto',
    },
    input: {
        flex: 1,
        height: 'auto',
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: '10%',
        marginLeft: '5%',
        color: 'black',
    },
    button: {
        borderRadius: 100,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: '4%',
        marginTop: '10%',
        marginBottom: '10%',
    },
    addButton: {
        backgroundColor: 'green',
        padding: '10%',
        alignItems: 'center',
        borderRadius: 15,
    },
});


export default UpdateVaccineList;