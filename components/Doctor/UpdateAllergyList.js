import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import config from '../config';

const UpdateAllergyList = () => {
    const [allergyList, setAllergyList] = useState([]);
    const [newAllergy, setNewAllergy] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        // Fetch the current allergy list
        axios.get(`${config.API_BASE_URL}/getAllergyList`)
            .then(response => {
                console.log('Allergy list response:', response.data);
                setAllergyList(response.data.allergyList);
            })
            .catch(error => {
                console.error('Error fetching allergy list:', error);
            });
    }, []);

    const handleSaveChanges = () => {
        // Send the updated allergy list to the server
        axios.put(`${config.API_BASE_URL}/updateAllergyList`, {
            allergyList,
        })
            .then(response => {
                console.log(response.data);
                Alert.alert('Allergy List updated successfully', response.data.message);
                setIsEditMode(false); // Disable edit mode
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    };

    const handleAddAllergy = () => {
        // Add the new allergy to the list
        setAllergyList([...allergyList, newAllergy]);
        setNewAllergy(''); // Clear the input field
    };


    const handleRemoveAllergy = (index, allergyName) => {
        // Show an alert before removing the allergy
        Alert.alert(
            'Delete Allergy',
            `Do you want to delete ${allergyName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => {
                        // Remove the allergy at the specified index
                        const updatedAllergyList = [...allergyList];
                        updatedAllergyList.splice(index, 1);
                        setAllergyList(updatedAllergyList);
                    },
                },
            ],
            { cancelable: false }
        );
    };


    const renderAllergyItem = ({ item, index }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={{ flex: 1, color: 'black', fontSize: RFValue(13), }}>{item}</Text>
                {isEditMode && (
                    <TouchableOpacity onPress={() => handleRemoveAllergy(index)}>
                        <Icon name="trash" size={24} color="red" />
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
                        value={newAllergy}
                        onChangeText={text => setNewAllergy(text)}
                        placeholder=" Add another allergy"
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity onPress={handleAddAllergy}>
                        <View style={styles.addButton}>
                            <Text style={{ color: 'white', fontSize: RFValue(15), fontWeight: 'bold' }}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={allergyList}
                renderItem={renderAllergyItem}
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

export default UpdateAllergyList;




// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';

// const UpdateAllergyList = () => {
//     const [allergyList, setAllergyList] = useState([]);
//     const [newAllergy, setNewAllergy] = useState('');
//     const [isEditMode, setIsEditMode] = useState(false);

//     useEffect(() => {
//         // Fetch the current allergy list
//         axios.get('http://192.168.150.127:8080/api/getAllergyList')
//             .then(response => {
//                 console.log('Allergy list response:', response.data);
//                 setAllergyList(response.data.allergyList);
//             })
//             .catch(error => {
//                 console.error('Error fetching allergy list:', error);
//             });
//     }, []);

//     const handleSaveChanges = () => {
//         // Send the updated allergy list to the server
//         axios.put('http://192.168.150.127:8080/api/updateAllergyList', {
//             allergyList,
//         })
//             .then(response => {
//                 console.log(response.data);
//                 setIsEditMode(false); // Disable edit mode
//             })
//             .catch(error => {
//                 console.error(error);
//                 // Handle error
//             });
//     };

//     const handleAddAllergy = () => {
//         // Add the new allergy to the list
//         setAllergyList([...allergyList, newAllergy]);
//         setNewAllergy(''); // Clear the input field
//     };

//     const handleRemoveAllergy = (index) => {
//         // Remove the allergy at the specified index
//         const updatedAllergyList = [...allergyList];
//         updatedAllergyList.splice(index, 1);
//         setAllergyList(updatedAllergyList);
//     };

//     const renderAllergyItem = ({ item, index }) => {
//         return (
//             <View style={styles.listContainer}>
//                 <Text style={{ flex: 1, color: 'black', }}>{item}</Text>
//                 {isEditMode && (
//                     <TouchableOpacity onPress={() => handleRemoveAllergy(index)}>
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
//                         value={newAllergy}
//                         onChangeText={text => setNewAllergy(text)}
//                         placeholder=" Add another allergy"
//                     />
//                     <TouchableOpacity onPress={handleAddAllergy}>
//                         <View style={styles.addButton}>
//                             <Text style={{ color: 'white' }}>Add</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             )}

//             <FlatList
//                 data={allergyList}
//                 renderItem={renderAllergyItem}
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
//             <Text style={{ color: isEditMode ? 'white' : 'black', }}>{isEditMode ? 'Save Changes' : 'Edit'}</Text>
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

// export default UpdateAllergyList;