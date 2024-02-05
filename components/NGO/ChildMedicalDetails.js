// import React, { useState } from 'react';
// import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// import axios from 'axios';
// import VaccineList from './VaccineList';
// import AllergyList from './AllergyList';
// import config from '../config';

// const ChildMedicalDetails = ({ navigation }) => {

//     const [childID, setChildID] = useState('');
//     const [vaccination, setVaccination] = useState('');
//     const [allergy, setAllergy] = useState('');
//     const [majorIllness, setMajorIllness] = useState('');
//     const [operativeIntervention, setOperativeIntervention] = useState('');
//     const [showList, setShowList] = useState(false);
//     const [showAllergyList, setShowAllergyList] = useState(false);


//     const toggleVaccine = () => {
//         setShowList(!showList);
//     };

//     const toggleAllergy = () => {
//         setShowAllergyList(!showAllergyList);
//     };

//     const onSubmitPressed = async () => {

//         console.log('Data to be sent:', { childID, vaccination, allergy, majorIllness, operativeIntervention });
//         console.log('sign in')
//         //http://192.168.137.127:8080/api/generalmedical -> moblie
//         //http://192.168.0.103:8080/api/generalmedical -> wifi
//         try {
//             const response = await axios.post(`${config.API_BASE_URL}/generalmedical`, {
//             childID: childID,
//             vaccination: vaccination,
//             allergy: allergy,
//             majorIllness: majorIllness,
//             operativeIntervention: operativeIntervention,
//             });

//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             navigation.navigate('NGO'); 

//         } catch (error) {
//             console.error('API request error:', error);
//             // Handle error, e.g., show an error message
//         }
//     }

//     return (
        
//         <ScrollView >
        
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Child ID/{"\n"}बालक क्रमांक</Text>
//                     <TextInput 
//                         style = {[styles.input, { marginLeft: 48 }]}   
//                         placeholder="Enter Child ID"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setChildID(text)}
//                         value={childID}>
//                     </TextInput>
//                 </View>  


//                 <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
//                     <Text style = {styles.subHeading}>Vaccine List</Text>
//                 </TouchableOpacity>
                
//                 {showList && <VaccineList/>}


//                 <TouchableOpacity style={styles.select} onPress={toggleAllergy}>
//                     <Text style = {styles.subHeading}>Allergy List</Text>
//                 </TouchableOpacity>
                
//                 {showAllergyList && <AllergyList/>}


//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Major Illness/{"\n"}मुख्य आजार</Text>
//                     <TextInput 
//                         style = {[styles.input, { marginLeft: 30 }]}   
//                         placeholder="Enter Major Illness"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setMajorIllness(text)}
//                         value={majorIllness}>
//                     </TextInput>
//                 </View> 

                
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Operative{"\n"}Intervention/{"\n"}संचालनिक प्रवर्तन</Text>
//                     <TextInput 
//                         style = {[styles.input, { marginLeft: 28 }]}   
//                         placeholder="Enter Operative Intervention"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setOperativeIntervention(text)}
//                         value={operativeIntervention}>
//                     </TextInput>
//                 </View> 


//                 <TouchableOpacity style = {styles.button} onPress={onSubmitPressed}>
//                     <Text style = {styles.btnnext}>Submit</Text>
//                 </TouchableOpacity>

//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     root: {
//         padding: 10, 
//         flexDirection:'row',
//         marginTop: 10,
//     },
//     textf:{
//         marginTop:15,
//         marginRight:10,
//         fontSize:15,
//         color:'black'
//     }, 
//     button: {
//         alignSelf: 'stretch',
//         alignItems: 'center',
//         padding:20,
//         marginTop:50,
//         backgroundColor: '#E38B29',
//         width: 200,
//         alignSelf: 'center',
//         marginBottom:10,
//         borderRadius:20
//     },
//     btnnext: {
//         color: 'black',
//         fontWeight: 'bold',
//     },
//     input: {
//         borderBottomWidth:1, 
//         height: 40,
//         marginTop: 12, 
//         width: 200,
//         borderRadius:0,
//         color:'black',
//         padding:10,
//     },
//     subHeading: {
//         flex: 1,
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: "black",
//     },
//     select: {
//         alignItems: 'center',
//         padding:20,
//         marginTop:50,
//         backgroundColor: '#E38B29',
//         width: 200,
//         marginBottom:10,
//         borderRadius:20,
//         alignSelf: 'flex-start', 
//         marginLeft: 10
//     }
// });

// export default ChildMedicalDetails;


// import React, { useState } from 'react';
// import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import config from '../config';


// const ChildMedicalDetails = ({ navigation }) => {


//     const [childID, setChildID] = useState('');
//     const [vaccination, setVaccination] = useState('');
//     const [allergy, setAllergy] = useState('');
//     const [majorIllness, setMajorIllness] = useState('');
//     const [operativeIntervention, setOperativeIntervention] = useState('');
//     const [vaccineList, setVaccineList] = useState([]);
//     const [allergyList, setAllergyList] = useState([]);




//     const toggleVaccine = async () => {
//         try {
//             const response = await axios.get(`${config.API_BASE_URL}/getVaccineListNgo`);
//             console.log('API Response:', response);


//             // Check the structure of the response.data
//             if (response.data && response.data.vaccineList) {
//                 setVaccineList(response.data.vaccineList.map((vaccine) => ({ ...vaccine, checked: false })));
//             } else {
//                 console.error('Invalid response structure:', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching vaccine data:', error.message);
//             // Handle the error, e.g., show a message to the user or retry the request
//         }
//     };


//     const handleCheckboxChange = (vaccineID) => {
//         setVaccineList((prevList) =>
//             prevList.map((vaccine) =>
//                 vaccine.vaccineID === vaccineID ? { ...vaccine, checked: !vaccine.checked } : vaccine
//             )
//         );
//     };




//     const toggleAllergy = async () => {
//         try {
//             const response = await axios.get(`${config.API_BASE_URL}/getAllergyListNgo`);
//             console.log('API Response:', response);


//             // Check the structure of the response.data
//             if (response.data && response.data.allergyList) {
//                 setAllergyList(response.data.allergyList.map((allergy) => ({ ...allergy, checked: false })));
//             } else {
//                 console.error('Invalid response structure:', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching allergy data:', error.message);
//             // Handle the error, e.g., show a message to the user or retry the request
//         }
//     };


//     const handleAllergyCheckboxChange = (allergyID) => {
//         setAllergyList((prevList) =>
//             prevList.map((allergy) =>
//                 allergy.allergyID === allergyID ? { ...allergy, checked: !allergy.checked } : allergy
//             )
//         );
//     };




//     const onSubmitPressed = async () => {


//         console.log('Data to be sent:', { childID, vaccination, allergy, majorIllness, operativeIntervention });
//         console.log('sign in')
       
//         try {
           
//             const response = await axios.post(`${config.API_BASE_URL}/generalmedical`, {
//             ChildID: childID,
//             // vaccination: vaccination,
//             // allergy: allergy,
//             Vaccination: vaccineList.filter(item => item.checked).map(item => item.vaccineName),
//             Allergy: allergyList.filter(item => item.checked).map(item => item.allergyName),
//             MajorIllness: majorIllness,
//             OperativeIntervention: operativeIntervention,
//             });


//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             navigation.navigate('SignInPage');


//         } catch (error) {
//             console.error('API request error:', error);
//             // Handle error, e.g., show an error message
//         }
//     }


//     return (


       
       


//         <ScrollView style={{flex: 1}}>
// <View style={styles.container}>
       
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Child Name/{"\n"}पूर्ण नाव</Text>
//                     <TextInput
//                         style = {styles.input}  
//                         placeholder="Child Name"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setChildID(text)}
//                         value={childID}>
//                     </TextInput>
//                 </View>  




//                 <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
//         <Text style={styles.subHeading}>Vaccine List</Text>
//       </TouchableOpacity>


//       {vaccineList.length > 0 && (
//                 <View style={{paddingLeft: '10%'}}>
//                     {vaccineList.map((item) => (
//                         <TouchableOpacity
//                             key={item.vaccineID}
//                             style={styles.checkboxContainer}
//                             onPress={() => handleCheckboxChange(item.vaccineID)}
//                         >
//                             <Icon
//                                 name={item.checked ? 'check-box' : 'check-box-outline-blank'}
//                                 size={25}
//                                 color={item.checked ? '#E38B29' : 'black'}
//                             />
//                             <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
//                                 {item.vaccineName}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             )}


//             <TouchableOpacity style={styles.select} onPress={toggleAllergy}>
//                 <Text style={styles.subHeading}>Allergy List</Text>
//             </TouchableOpacity>


//             {allergyList.length > 0 && (
//                 <View style={{ paddingLeft: '10%' }}>
//                     {allergyList.map((item) => (
//                         <TouchableOpacity
//                             key={item.allergyID}
//                             style={styles.checkboxContainer}
//                             onPress={() => handleAllergyCheckboxChange(item.allergyID)}
//                         >
//                             <Icon
//                                 name={item.checked ? 'check-box' : 'check-box-outline-blank'}
//                                 size={25}
//                                 color={item.checked ? '#E38B29' : 'black'}
//                             />
//                             <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
//                                 {item.allergyName}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             )}




//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Major Illness/{"\n"}मुख्य आजार</Text>
//                     <TextInput
//                         style = {styles.input}  
//                         placeholder="Enter Major Illness"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setMajorIllness(text)}
//                         value={majorIllness}>
//                     </TextInput>
//                 </View>


               
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Operative{"\n"}Intervention/{"\n"}संचालनिक प्रवर्तन</Text>
//                     <TextInput
//                         style = {styles.input}  
//                         placeholder="Enter Operative Intervention"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setOperativeIntervention(text)}
//                         value={operativeIntervention}>
//                     </TextInput>
//                 </View>




//                 <TouchableOpacity style = {styles.button} onPress={onSubmitPressed}>
//                     <Text style = {styles.btnnext}>Submit</Text>
//                 </TouchableOpacity>
//                 </View>
//                 </ScrollView>
               
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         elevation: 10,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         margin: heightPercentageToDP('1%'),
//         paddingVertical: '3%',
//         paddingHorizontal: '3%',
//     },
//     root: {
//         padding: '3%',
//         flexDirection:'row',
//         marginTop: '3%',
//     },
//     textf:{
//         marginTop:'3%',
//         marginRight:'3%',
//         fontSize: RFValue(13),
//         color:'black'
//     },
//     button: {
//         alignSelf: 'stretch',
//         alignItems: 'center',
//         padding:'5%',
//         marginTop:'20%',
//         backgroundColor: '#E38B29',
//         width: '50%',
//         alignSelf: 'center',
//         marginBottom:'10%',
//         borderRadius:20,
//     },
//     btnnext: {
//         color: 'black',
//         fontWeight: 'bold',
//         fontSize: RFValue(15),
//     },
//     input: {
//         borderBottomWidth:1,
//         color: 'white',
//         height: 'auto',
//         marginTop: '1%',
//         width: '50%',
//         borderRadius:0,
//         color:'black',
//         padding:'1%',
//         marginLeft: 'auto',
//     },
//     subHeading: {
//         flex: 1,
//         fontSize: RFValue(15),
//         fontWeight: 'bold',
//         color: "black",
//     },
//     select: {
//         alignItems: 'center',
//         padding:'5%',
//         marginTop:'5%',
//         backgroundColor: '#E38B29',
//         width: '50%',
//         marginBottom:'3%',
//         borderRadius:20,
//         alignSelf: 'flex-start',
//         marginLeft: '5%',
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: '5%',
//         paddingTop: '2%',
//     },
//     checkboxLabel: {
//         marginLeft: '5%',
//         fontSize: RFValue(13),
//         color: 'black',
//     },
// });


// export default ChildMedicalDetails;



import React, { useState,useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import config from '../config';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';


const ChildMedicalDetails = ({ navigation }) => {
 
    const route = useRoute();
    const childFullName = route.params.childFullName;
    
    const { userName } = useContext(AuthContext);
    console.log("THis is the", userName)
    const [childID, setChildID] = useState('');
    const [vaccination, setVaccination] = useState('');
    const [allergy, setAllergy] = useState('');
    const [majorIllness, setMajorIllness] = useState('');
    const [operativeIntervention, setOperativeIntervention] = useState('');
    const [vaccineList, setVaccineList] = useState([]);
    const [allergyList, setAllergyList] = useState([]);
    const [hemoglobin, setHemoglobin] = useState('');
    const [MCV, setMCV] = useState('');
    const [bmi, setBmi] = useState("");
    const [heightError, setHeightError] = useState(false);
    const [weightError, setWeightError] = useState(false);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    
    const [menstrualHistory, setMenstrualHistory] = useState('');


    const onCalculateBMIPressed = async () => {
        // Extract only the child name from the full name
     
        if (!height || height <= 0) {
            setHeightError(true);
        } else if (height) {
            setHeightError(false);
        }
     
        if (!weight || weight <= 0) {
            setWeightError(true);
        } else if (weight) {
            setWeightError(false);
        }
     
        if (height && weight) {
           
            console.log('Validation Passed');
     
            const bmiValue = weight / ((height / 100) * (height / 100));
            setBmi(bmiValue.toFixed(1));
        }
    };




    const toggleVaccine = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/getVaccineListNgo`);
            console.log('API Response:', response);


            // Check the structure of the response.dataen
            if (response.data && response.data.vaccineList) {
                setVaccineList(response.data.vaccineList.map((vaccine) => ({ ...vaccine, checked: false })));
            } else {l
                console.error('Invalid response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching vaccine data:', error.message);
            // Handle the error, e.g., show a message to the user or retry the request
        }
    };


    const handleCheckboxChange = (vaccineID) => {
        setVaccineList((prevList) =>
            prevList.map((vaccine) =>
                vaccine.vaccineID === vaccineID ? { ...vaccine, checked: !vaccine.checked } : vaccine
            )
        );
    };




    const toggleAllergy = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/getAllergyListNgo`);
            console.log('API Response:', response);


            // Check the structure of the response.data
            if (response.data && response.data.allergyList) {
                setAllergyList(response.data.allergyList.map((allergy) => ({ ...allergy, checked: false })));
            } else {
                console.error('Invalid response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching allergy data:', error.message);
            // Handle the error, e.g., show a message to the user or retry the request
        }
    };


    const handleAllergyCheckboxChange = (allergyID) => {
        setAllergyList((prevList) =>
            prevList.map((allergy) =>
                allergy.allergyID === allergyID ? { ...allergy, checked: !allergy.checked } : allergy
            )
        );
    };




    // const onSubmitPressed = async () => {


    //     console.log('Data to be sent:', { childID, vaccination, allergy, majorIllness, operativeIntervention });
    //     console.log('sign in')
       
    //     try {
           
    //         const response = await axios.post(`${config.API_BASE_URL}/generalmedical`, {
    //         ChildID: childID,
    //         // vaccination: vaccination,
    //         // allergy: allergy,
    //         Vaccination: vaccineList.filter(item => item.checked).map(item => item.vaccineName),
    //         Allergy: allergyList.filter(item => item.checked).map(item => item.allergyName),
    //         MajorIllness: majorIllness,
    //         OperativeIntervention: operativeIntervention,
    //         });


    //         console.log(response.data.message);
    //         // Handle success, e.g., show a success message or navigate to another screen
    //         navigation.navigate('SignInPage');


    //     } catch (error) {
    //         console.error('API request error:', error);
    //         // Handle error, e.g., show an error message
    //     }
    // }

    const onSubmitPressed = async () => {


        console.log('Data to be sent:', {childFullName , vaccination, allergy, majorIllness, operativeIntervention });
        console.log('sign in')
       
        try {
           
            const response = await axios.post(`${config.API_BASE_URL}/childMedical`, {
            childFullName: childFullName,
            // vaccination: vaccination,
            // allergy: allergy,
            vaccination: vaccineList.filter(item => item.checked).map(item => item.vaccineName),
            allergy: allergyList.filter(item => item.checked).map(item => item.allergyName),
            majorIllness: majorIllness,
            operativeIntervention: operativeIntervention,
            hemoglobin: hemoglobin,
            MCV: MCV,
            bmi: bmi,
            height: height,
            weight: weight,
            menstrualHistory: menstrualHistory,
            userName:userName
            });


            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
           
            Alert.alert(
                'Success',
                'Data updated successfully',
                [
                  { text: 'OK', onPress: () =>  navigation.navigate('NGO') }
                ],
                { cancelable: false }
              );
         


        } catch (error) {
           
            // Handle error, e.g., show an error message

            if (error.response && error.response.status === 500) {
                Alert.alert(
                    'Failed to create medical details',
                    'child details already exists',
                    [
                      { text: 'OK', onPress: () => console.log('OK') }
                    ],
                    { cancelable: false }
                  );
        
            }
         
             else{
              // Show error message
              Alert.alert(
                'Error',
                'Error updating data. Please try again.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
            }
        }
    }



    return (


       
       


        <ScrollView style={{flex: 1}}>
<View style={styles.container}>
       
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Child Name/{"\n"}पूर्ण नाव</Text>
                    <TextInput
                        style = {styles.input}  
                        placeholder="Child Name"
                        editable={false}
                        value={childFullName}>
                    </TextInput>
                </View>  


                <View style={styles.root}>                  
                <Text style={styles.textf}>Height(cm)/{"\n"}उंची(सेमी)</Text>
                <TextInput style = {styles.input}
                    keyboardType='numeric'
                    placeholder="Height in cm"
                    placeholderTextColor="gray"
                    value={height}
                    onChangeText={(text) => setHeight(text)}>
                </TextInput>
            </View>


            {heightError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid height *</Text>:null}




            <View style={styles.root}>                  
                <Text style={styles.textf}>Weight(Kg.)/{"\n"}वजन(किलो.)</Text>
                <TextInput
                    style = {styles.input}
                    keyboardType='numeric'
                    placeholder="Weight in kg"
                    placeholderTextColor="gray"
                    value={weight}
                    onChangeText={(text) => setWeight (text)}>
                </TextInput>
            </View>  


            {weightError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid weight *</Text>:null}
           


            <View style={styles.root}>                  
                <Text style={styles.textf}>BMI</Text>
                <TouchableOpacity style = {styles.calculateButton} onPress={onCalculateBMIPressed}  >
                    <Text style = {styles.btnnext}>Calculate</Text>
                </TouchableOpacity>
                <TextInput
                    style = {styles.displayBMI}  
                    editable={false}>
                    {bmi}
                </TextInput>
            </View>




                <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
        <Text style={styles.subHeading}>Vaccine List</Text>
      </TouchableOpacity>


      {vaccineList.length > 0 && (
                <View style={{paddingLeft: '10%'}}>
                    {vaccineList.map((item) => (
                        <TouchableOpacity
                            key={item.vaccineID}
                            style={styles.checkboxContainer}
                            onPress={() => handleCheckboxChange(item.vaccineID)}
                        >
                            <Icon
                                name={item.checked ? 'check-box' : 'check-box-outline-blank'}
                                size={25}
                                color={item.checked ? '#E38B29' : 'black'}
                            />
                            <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
                                {item.vaccineName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}


            <TouchableOpacity style={styles.select} onPress={toggleAllergy}>
                <Text style={styles.subHeading}>Allergy List</Text>
            </TouchableOpacity>


            {allergyList.length > 0 && (
                <View style={{ paddingLeft: '10%' }}>
                    {allergyList.map((item) => (
                        <TouchableOpacity
                            key={item.allergyID}
                            style={styles.checkboxContainer}
                            onPress={() => handleAllergyCheckboxChange(item.allergyID)}
                        >
                            <Icon
                                name={item.checked ? 'check-box' : 'check-box-outline-blank'}
                                size={25}
                                color={item.checked ? '#E38B29' : 'black'}
                            />
                            <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
                                {item.allergyName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}




            <View style={styles.root}>                  
                <Text style={styles.textf}>Hemoglobin{"\n"}(HB)</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Hemoglobin"
                    placeholderTextColor="gray"
                    onChangeText={text => setHemoglobin(text)}  
                    value={hemoglobin}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>MCV</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="MCV"
                    placeholderTextColor="gray"
                    onChangeText={text => setMCV(text)}  
                    value={MCV}>
                </TextInput>
            </View>      




            <View style={styles.root}>                  
                <Text style={styles.textf}>Menstrual History</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Menstrual History"
                    placeholderTextColor="gray"
                    onChangeText={text => setMenstrualHistory(text)}  
                    value={menstrualHistory}>
                </TextInput>
            </View>


                <View style={styles.root}>                  
                    <Text style={styles.textf}>Major Illness/{"\n"}मुख्य आजार</Text>
                    <TextInput
                        style = {styles.input}  
                        placeholder="Enter Major Illness"
                        placeholderTextColor="gray"
                        onChangeText={text => setMajorIllness(text)}
                        value={majorIllness}>
                    </TextInput>
                </View>


               
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Operative{"\n"}Intervention/{"\n"}संचालनिक प्रवर्तन</Text>
                    <TextInput
                        style = {styles.input}  
                        placeholder="Enter Operative Intervention"
                        placeholderTextColor="gray"
                        onChangeText={text => setOperativeIntervention(text)}
                        value={operativeIntervention}>
                    </TextInput>
                </View>




                <TouchableOpacity style = {styles.button} onPress={onSubmitPressed}>
                    <Text style = {styles.btnnext}>Submit</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
               
    );
};


const styles = StyleSheet.create({
    container: {
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: heightPercentageToDP('1%'),
        paddingVertical: '3%',
        paddingHorizontal: '3%',
    },
    root: {
        padding: '3%',
        flexDirection:'row',
        marginTop: '3%',
    },
    textf:{
        marginTop:'3%',
        marginRight:'3%',
        fontSize: RFValue(13),
        color:'black'
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:'5%',
        marginTop:'20%',
        backgroundColor: '#E38B29',
        width: '50%',
        alignSelf: 'center',
        marginBottom:'10%',
        borderRadius:20,
    },
    btnnext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: RFValue(15),
    },
    input: {
        borderBottomWidth:1,
        color: 'white',
        height: 'auto',
        marginTop: '1%',
        width: '50%',
        borderRadius:0,
        color:'black',
        padding:'1%',
        marginLeft: 'auto',
    },
    subHeading: {
        flex: 1,
        fontSize: RFValue(15),
        fontWeight: 'bold',
        color: "black",
    },
    select: {
        alignItems: 'center',
        padding:'5%',
        marginTop:'5%',
        backgroundColor: '#E38B29',
        width: '50%',
        marginBottom:'3%',
        borderRadius:20,
        alignSelf: 'flex-start',
        marginLeft: '5%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
        paddingTop: '2%',
    },
    checkboxLabel: {
        marginLeft: '5%',
        fontSize: RFValue(13),
        color: 'black',
    },
    calculateButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:'3%',
        marginTop:'5%',
        backgroundColor: '#E38B29',
        width: '40%',
        alignSelf: 'center',
        marginBottom:'3%',
        borderRadius:20,
        marginLeft: '3%',
    },
    displayBMI: {
        borderBottomWidth:1,
        color: '#2c6975',
        height: 'auto',
        marginTop: '4%',
        width: '25%',
        borderRadius:10,
        color:'black',
        padding:'3%',
        marginLeft:'8%',
    },
});


export default ChildMedicalDetails;