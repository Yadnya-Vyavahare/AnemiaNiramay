// import React, { useState } from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { useRoute } from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkbox';
// import axios from 'axios';
// import config from '../config';


// const CreateRemarks =({navigation}) =>{




//     const route = useRoute();
//     const name = route.params.name;


//     const [diagnosis, setDiagnosis] = useState('');
//     const [cause, setCause] = useState('');
//     const [treatment, setTreatment] = useState('');
//     const [advice, setAdvice] = useState('');
//     //const [symptoms, setSymptoms] = useState('');
//     const [sign, setSign] = useState('');
//     const [symptom, setSymptom] = useState(false);
//     const [AdviceError, setAdviceError] = useState(false);
//     //const [symptoms, setSymptoms] = useState('');
//     const [otherSy, setOtherSy] = useState('');
//    // const [sign, setSign] = useState('');
//     const [otherSi, setOtherSi] = useState('');
//     const [selectedSymptoms, setSelectedSymptoms] = useState('');
//     const [selectedSign, setSelectedSign]= useState('');


//     const symptomsList = ['Abdominal pain', 'Blurring vision', 'Bodyache', 'Chest pain', 'Dizziness', 'Dyspnea', 'Fatigue', 'Leg pain', 'Loss of appetite', 'Palpitations', 'Shortness of breath', 'Sweating', 'Tingling'];
//     const signList = ['Skin pallor', 'Lower conjunctiva pallor', 'Cold hand', 'Shortness of breath', 'Sore tongue', 'Smooth tongue', 'Cheilosis', 'Brittle nails', 'IDA (iron deficiency anemia)'];

//     const toggleSymptom = (symptom) => {
//         const isSelected = selectedSymptoms.includes(symptom);
//         if (isSelected) {
//             // Remove the symptom if it's already selected
//             setSelectedSymptoms((prevSymptoms) =>
//                 prevSymptoms.filter((prevSymptom) => prevSymptom !== symptom)
//             );
//         } else {
//             // Add the symptom if it's not selected
//             setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
//         }
//     };

//     const toggleSigns = (Signs) => {
//         const isSelected = selectedSign.includes(Signs);
//         if (isSelected) {
//             // Remove the Signs if it's already selected
//             setSelectedSign((prevSign) =>
//                 prevSign.filter((prevSign) => prevSign !== Signs)
//             );
//         } else {
//             // Add the Signs if it's not selected
//             setSelectedSign((prevSign) => [...prevSign, Signs]);
//         }
//     };


//     const onSubmitPressed = async() => {


//         console.log('Data to be sent:', { name,symptoms, sign,diagnosis,cause,advice,treatment  });
//         console.log('sign in')
   
//         try {
//             const response = await axios.post(`${config.API_BASE_URL}/remarks`, {
//                 name: name,
//                 symptoms: symptoms,
//                 sign: sign,
//                 diagnosis: diagnosis,
//                 advice: advice,
//                 treatment: treatment,
//                 cause: cause,
               
//             });
//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             navigation.navigate('UpdateChildDetails');
//         }
//         catch (error) {
//             console.error('API request error:', error);
//             // Handle error, e.g., show an error message
//         }
//     };



   
//     return (
//         <ScrollView >


//         <View style={styles.container}>


//             <View style={{ paddingVertical: '3%',  flexDirection:'row',
//         marginTop: '3%',}}>
//                 <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput style = {[styles.input, { color: 'gray'}]}
//                     value={name}
//                     editable={false}>
//                 </TextInput>
//             </View>
//             <View style={styles.line}></View>


//             {/* <View style={styles.root}>
//                 <Text style={styles.textf}>Symptoms/लक्षणे</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput style = {styles.input}
//                     value={symptoms}  placeholder="Symptoms"
//                     placeholderTextColor="gray"
//                     onChangeText={(text) => setSymptoms (text)}>
//                 </TextInput>
//             </View>{symptom ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid symptom *</Text>:null}
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Sign/चिन्ह</Text>
//                 <TextInput style = {styles.input}
//                     value={sign}  placeholder="Signs"
//                     placeholderTextColor="gray"
//                     onChangeText={(text) => setSign (text)}>
//                 </TextInput>
//             </View>
//  */}
//             <View style={styles.line}></View>
//                 <View tyle={styles.root}>
//                     <Text style={styles.textf}>Symptoms/लक्षणे</Text>
//                     {symptomsList.map((symptom, index) => (
//                         <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
//                             <CheckBox
//                                 value={selectedSymptoms.includes(symptom)}
//                                 onValueChange={() => toggleSymptom(symptom)}
//                             />
//                             <Text style={{ marginLeft: 8 }}>{symptom}</Text>
//                         </View>
//                     ))}
//                 </View>


//                 <View style={styles.root}>
//                     <Text style={styles.textf}>Other Symptoms/लक्षणे</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={otherSy}
//                         placeholder="Other Symptoms than above"
//                         placeholderTextColor="gray"
//                         onChangeText={(text) => setOtherSy(text)}
//                     />
//                 </View>
               
//                 <View tyle={styles.root}>
//                     <Text style={styles.textf}>Sign/चिन्ह</Text>
//                     {signList.map((Signs, index) => (
//                         <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
//                             <CheckBox
//                                 value={selectedSign.includes(Signs)}
//                                 onValueChange={() => toggleSigns(Signs)}
//                             />
//                             <Text style={{ marginLeft: 8 }}>{Signs}</Text>
//                         </View>
//                     ))}
//                 </View>

//                 <View style={styles.root}>
//                     <Text style={styles.textf}>Other Sign/लक्षणे</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={otherSi}
//                         placeholder="Other Sign than above"
//                         placeholderTextColor="gray"
//                         onChangeText={(text) => setOtherSi(text)}
//                     />
//                 </View>


//             <View style={styles.root}>
//                 <Text style={styles.textf}>Diagnosis/निदान</Text>
//                 <TextInput style = {styles.input}
//                     value={diagnosis}  placeholder="Diagnosis by Doctor"
//                     placeholderTextColor="gray"
//                     onChangeText={(text) => setDiagnosis (text)}>
//                 </TextInput>
//             </View>
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Cause/कारण</Text>
//                 <TextInput style = {[styles.input]}
//                     value={cause}  placeholder="Cause of disease"
//                     placeholderTextColor="gray"
//                     onChangeText={(text) => setCause (text)}>
//                 </TextInput>
//             </View>
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Treatment/उपचार</Text>
//                 <TextInput style = {[styles.input]}
//                     value={treatment} placeholder="Treatment suggested"
//                     placeholderTextColor="gray"
//                     onChangeText={(text) => setTreatment (text)}>
//                 </TextInput>
//             </View>
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Advice/सल्ला</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput style = {[styles.input]}
//                     value={advice} placeholder="Doctor's Advice"
//                     placeholderTextColor="gray"
//                     onChangeText={(text) => setAdvice (text)}>
//                 </TextInput>
//             </View>{AdviceError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid Advice *</Text>:null}
//             <TouchableOpacity style = {styles.button}  onPress = {onSubmitPressed} >
//                 <Text style = {styles.btnnext}>Submit</Text>
//             </TouchableOpacity>


           
// </View>
           
//             </ScrollView>
//             );




// }




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
//         paddingVertical: '3%',
//         flexDirection:'row',
//         marginTop: '3%',
//     },
//     textf:{
//         marginTop:'5%',
//         marginLeft:'4%',
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
//         marginBottom:'15%',
//         borderRadius:20,
//         marginRight: '10%',
//     },
//     btnnext: {
//         color: 'black',
//         fontWeight: 'bold',
//         fontSize: RFValue(13),
//     },
//     input: {
//         borderBottomWidth:1,
//         height: 'auto',
//         marginTop: 'auto',
//         width: '50%',
//         borderRadius:0,
//         color:'black',
//         padding:'3%',
//         marginLeft: 'auto',
//     },
//     inputs: {
//         borderBottomWidth:1,
//         color: 'white',
//         height: 40,
//         marginTop: 12,
//         width: 200,
//         borderRadius:0,
//         color:'black',
//         width:350
       
//     },
//     line: {
//         borderBottomColor: 'black',
//         borderBottomWidth: 1.7,
//         width: '96%',
//         marginVertical: '3%',
//         alignSelf: 'flex-start',
//         marginLeft: '3%',
//     },
// });
// export default CreateRemarks;

import React, { useState,useContext } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import config from '../config';
import { AuthContext } from '../AuthContext';




const CreateRemarks =({navigation}) => {
    const route = useRoute();
    const childFullName = route.params.childFullName;

    const [symptomList, setSymptomList] = useState([]);
    const [diagnosis, setDiagnosis] = useState('');
    const [cause, setCause] = useState('');
    const [treatment, setTreatment] = useState('');
    const [advice, setAdvice] = useState('');
    const { userName } = useContext(AuthContext);
  
    const [symptom, setSymptom] = useState(false);
    const [AdviceError, setAdviceError] = useState(false);
    
  //  const [symptoms, setSymptoms] = useState('');
    const [otherSy, setOtherSy] = useState('');
    const [sign, setSign] = useState('');
    const [otherSi, setOtherSi] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState('');
    const [selectedSign, setSelectedSign]= useState('');

    //
    // const [symptomList1, setSymptomList2] = useState([
    //     { symptomID: 1, symptoms: 'Abdominal pain', checked: false },
    //     { symptomID: 2, symptoms: 'Blurring vision', checked: false },
    //     // Add other symptoms as needed
    //   ]);



    const symptomsList = ['Abdominal pain', 'Blurring vision', 'Bodyache', 'Chest pain', 'Dizziness', 'Dyspnea', 'Fatigue', 'Leg pain', 'Loss of appetite', 'Palpitations', 'Shortness of breath', 'Sweating', 'Tingling'];
    const signList = ['Skin pallor', 'Lower conjunctiva pallor', 'Cold hand', 'Shortness of breath', 'Sore tongue', 'Smooth tongue', 'Cheilosis', 'Brittle nails', 'IDA (iron deficiency anemia)'];


    const toggleSymptom = (symptom) => {
        const isSelected = selectedSymptoms.includes(symptom);
        if (isSelected) {
            // Remove the symptom if it's already selected
            setSelectedSymptoms((prevSymptoms) =>
                prevSymptoms.filter((prevSymptom) => prevSymptom !== symptom)
            );
        } else {
            // Add the symptom if it's not selected
            setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
        }
    };


    const toggleSigns = (Signs) => {
        const isSelected = selectedSign.includes(Signs);
        if (isSelected) {
            // Remove the Signs if it's already selected
            setSelectedSign((prevSign) =>
                prevSign.filter((prevSign) => prevSign !== Signs)
            );
        } else {
            // Add the Signs if it's not selected
            setSelectedSign((prevSign) => [...prevSign, Signs]);
        }
    };

    
    const toggleVaccine = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/getSymptomistNgo`);
            console.log('API Response:', response);


            // Check the structure of the response.dataen
            if (response.data && response.data.symptomList) {
                setSymptomList(response.data.symptomList.map((symptom) => ({ ...symptom, checked: false })));
            } else {l
                console.error('Invalid response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching symptom data:', error.message);
            // Handle the error, e.g., show a message to the user or retry the request
        }
    };




    const handleCheckboxChange = (symptomID) => {
        // setSymptomList((prevList) =>
        //     prevList.map((symptom) =>
        //     symptom.symptomID === symptomID ? { ...symptom, checked: !symptom.checked } : symptom
        //     )
        // );
        setSymptomList((prevList) =>
      prevList.map((item) =>
        item.symptomID === symptomID ? { ...item, checked: !item.checked } : item
      )
    );
    };


    const onSubmitPressed = async() => {




        console.log('Data to be sent:', { childFullName,symptom, sign,diagnosis,cause,advice,treatment  });
        console.log('sign in')
   
        try {
            const response = await axios.post(`${config.API_BASE_URL}/remarks`, {
                childFullName: childFullName,
                //symptom:  symptomsList.filter(item => item.checked).map(item => item.symptom),
                symptom: symptomList.filter(item => item.checked).map(item => item.symptoms),
                sign: sign,
                diagnosis: diagnosis,
                advice: advice,
                treatment: treatment,
                cause: cause,
                userName:userName,
               
            });
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            navigation.navigate('UpdateChildDetails', {childFullName : childFullName});
        }
        catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
        }
        console.log(symptom);
    };

   
    return (
        <ScrollView >


        <View style={styles.container}>




            <View style={{ paddingVertical: '3%',  flexDirection:'row',
        marginTop: '3%',}}>
                <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput style = {[styles.input, { color: 'black'}]}
                    value={childFullName}
                    editable={false}>
                </TextInput>
            </View>
          {/* <View style={styles.line}></View> */}




            {/* <View style={styles.root}>
                <Text style={styles.textf}>Symptoms/लक्षणे</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput style = {styles.input}
                    value={symptoms}  placeholder="Symptoms"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setSymptoms (text)}>
                </TextInput>
            </View>{symptom ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid symptom *</Text>:null}
            <View style={styles.root}>
                <Text style={styles.textf}>Sign/चिन्ह</Text>
                <TextInput style = {styles.input}
                    value={sign}  placeholder="Signs"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setSign (text)}>
                </TextInput>
            </View> */}


{/* <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
        <Text style={styles.subHeading}>Symptom List</Text>
      </TouchableOpacity>


      {symptomList.length > 0 && (
                <View style={{paddingLeft: '10%'}}>
                    {symptomList.map((item) => (
                        <TouchableOpacity
                            key={item.symptomID}
                            style={styles.checkboxContainer}
                            onPress={() => handleCheckboxChange(item.symptomID)}
                        >
                            <Icon
                                name={item.checked ? 'check-box' : 'check-box-outline-blank'}
                                size={25}
                                color={item.checked ? '#E38B29' : 'black'}
                            />
                            <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
                                {item.symptoms}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )} */}


    {/* <View>
      <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
        <Text style={styles.subHeading}>Symptom List</Text>
      </TouchableOpacity>

      {symptomList.length > 0 && (
        <View style={{ paddingLeft: '10%' }}>
          {symptomList.map((item) => (
            <TouchableOpacity
              key={item.symptomID}
              style={styles.checkboxContainer}
              onPress={() => handleCheckboxChange(item.symptomID)}
            >
              <Icon
                name={item.checked ? 'check-box' : 'check-box-outline-blank'}
                size={25}
                color={item.checked ? '#E38B29' : 'black'}
              />
              <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
                {item.symptoms}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View> */}






{/* <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
        <Text style={styles.subHeading}>Vaccine List</Text>
      </TouchableOpacity>


      {symptomList.length > 0 && (
                <View style={{paddingLeft: '10%'}}>
                    {symptomList.map((item) => (
                        <TouchableOpacity
                            key={item.symptomID}
                            style={styles.checkboxContainer}
                            onPress={() => handleCheckboxChange(item.symptomID)}
                        >
                            <Icon
                                name={item.checked ? 'check-box' : 'check-box-outline-blank'}
                                size={25}
                                color={item.checked ? '#E38B29' : 'black'}
                            />
                            <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
                                {item.symptomS}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )} */}

<View style={styles.line}></View>
                <View tyle={styles.root}>
                    <Text style={styles.textf}>Symptoms/लक्षणे</Text>
                    {symptomsList.map((symptom, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <CheckBox
                                value={selectedSymptoms.includes(symptom)}
                                onValueChange={() => toggleSymptom(symptom)}
                            />
                            <Text style={{ marginLeft: 8 , color: 'black' }}>{symptom}</Text>
                        </View>
                    ))}
                </View>


                <View style={styles.root}>
                    <Text style={styles.textf}>Symptoms/लक्षणे</Text>
                    <TextInput
                        style={styles.input}
                        value={otherSy}
                        placeholder="Enter other Symtoms"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setOtherSy(text)}
                    />
                </View>


               
                <View tyle={styles.root}>
                    <Text style={styles.textf}>Sign/चिन्ह</Text>
                    {signList.map((Signs, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <CheckBox
                                value={selectedSign.includes(Signs)}
                                onValueChange={() => toggleSigns(Signs)}
                            />
                            <Text style={{ marginLeft: 8 , color: 'black' }}>{Signs}</Text>
                        </View>
                    ))}
                </View> 


                <View style={styles.root}>
                    <Text style={styles.textf}>Sign/लक्षणे</Text>
                    <TextInput
                        style={styles.input}
                        value={otherSi}
                        placeholder="Enter other Signs"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setOtherSi(text)}
                    />
                </View> 



            <View style={styles.root}>
                <Text style={styles.textf}>Diagnosis/निदान</Text>
                <TextInput style = {styles.input}
                    value={diagnosis}  placeholder="Diagnosis by Doctor"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setDiagnosis (text)}>
                </TextInput>
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Cause/कारण</Text>
                <TextInput style = {[styles.input]}
                    value={cause}  placeholder="Cause of disease"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setCause (text)}>
                </TextInput>
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Treatment/उपचार</Text>
                <TextInput style = {[styles.input]}
                    value={treatment} placeholder="Treatment suggested"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setTreatment (text)}>
                </TextInput>
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Advice/सल्ला</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput style = {[styles.input]}
                    value={advice} placeholder="Doctor's Advice"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setAdvice (text)}>
                </TextInput>
            </View>{AdviceError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid Advice *</Text>:null}
            <TouchableOpacity style = {styles.button}  onPress = {onSubmitPressed} >
                <Text style = {styles.btnnext}>Submit</Text>
            </TouchableOpacity>




           
</View>
           
            </ScrollView>
            );

                    }















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
        paddingVertical: '3%',
        flexDirection:'row',
        marginTop: '3%',
    },
    textf:{
        marginTop:'5%',
        marginLeft:'4%',
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
        marginBottom:'15%',
        borderRadius:20,
        marginRight: '10%',
    },
    btnnext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: RFValue(13),
    },
    input: {
        borderBottomWidth:1,
        height: 'auto',
        marginTop: 'auto',
        width: '50%',
        borderRadius:0,
        color:'black',
        padding:'3%',
        marginLeft: 'auto',
    },
    inputs: {
        borderBottomWidth:1,
        color: 'black',
        height: 40,
        marginTop: 12,
        width: 200,
        borderRadius:0,
       
        width:350
       
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1.7,
        width: '96%',
        marginVertical: '3%',
        alignSelf: 'flex-start',
        marginLeft: '3%',
    },
});
export default CreateRemarks;
