import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import config from '../config';


const Remark = ({ navigation }) => {


    const route = useRoute();
      const childFullName = route.params.childFullName;


    const [diagnosis, setDiagnosis] = useState('');
    const [cause, setCause] = useState('');
    const [treatment, setTreatment] = useState('');
    const [advice, setAdvice] = useState('');
   // const [symptoms, setSymptoms] = useState('');
    const [otherSy, setOtherSy] = useState('');
    //const [sign, setSign] = useState('');
    const [otherSi, setOtherSi] = useState('');
    // const [selectedSymptoms, setSelectedSymptoms] = useState('');
    // const [selectedSign, setSelectedSign]= useState('');


    // const symptomsList = ['Abdominal pain', 'Blurring vision', 'Bodyache', 'Chest pain', 'Dizziness', 'Dyspnea', 'Fatigue', 'Leg pain', 'Loss of appetite', 'Palpitations', 'Shortness of breath', 'Sweating', 'Tingling'];
    // const signList = ['Skin pallor', 'Lower conjunctiva pallor', 'Cold hand', 'Shortness of breath', 'Sore tongue', 'Smooth tongue', 'Cheilosis', 'Brittle nails', 'IDA (iron deficiency anemia)'];


    // const toggleSymptom = (symptom) => {
    //     const isSelected = selectedSymptoms.includes(symptom);
    //     if (isSelected) {
    //         // Remove the symptom if it's already selected
    //         setSelectedSymptoms((prevSymptoms) =>
    //             prevSymptoms.filter((prevSymptom) => prevSymptom !== symptom)
    //         );
    //     } else {
    //         // Add the symptom if it's not selected
    //         setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
    //     }
    // };


    // const toggleSigns = (Signs) => {
    //     const isSelected = selectedSign.includes(Signs);
    //     if (isSelected) {
    //         // Remove the Signs if it's already selected
    //         setSelectedSign((prevSign) =>
    //             prevSign.filter((prevSign) => prevSign !== Signs)
    //         );
    //     } else {
    //         // Add the Signs if it's not selected
    //         setSelectedSign((prevSign) => [...prevSign, Signs]);
    //     }
    // };



    useEffect(() => {
        const fetchRemarkData = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/displayRemarksData/${childFullName}`);
                console.log('Full URL:', `${config.API_BASE_URL}/displayRemarkData/${childFullName}`);
                const data = response.data.data;


                // Set individual state for each field
                setDiagnosis(data.diagnosis);
                setCause(data.cause);
                setTreatment(data.treatment);
                setAdvice(data.advice);
                setSymptoms(data.symptoms);
                setSign(data.sign);
            } catch (error) {
                console.error('Error fetching Remark data:', error);
            }
        };
        fetchRemarkData();
    }, [childFullName]); // Include 'name' as a dependency , [name]


    const onSubmitPressed = async () => {
        console.log('Data to be sent:', { childFullName, symptoms, sign, diagnosis, cause, advice, treatment });
        console.log('sign in');


        try {
            const response = await axios.post(`${config.API_BASE_URL}/remarks`, {
                childFullName: childFullName,
                symptoms: symptoms,
                sign: sign,
                diagnosis: diagnosis,
                advice: advice,
                treatment: treatment,
                cause: cause,
            });
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            navigation.navigate('UpdateChildDetails');
        } catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
        }
    };


    return (
        <ScrollView>
          

            <View style={{ paddingVertical: '3%',  flexDirection:'row',
        marginTop: '3%',}}>
                <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput style = {[styles.input, { color: 'gray'}]}
                    value={childFullName}
                    editable={false}>
                </TextInput>
            </View>
            {/* <View style={styles.line}></View> */}
            

            <View style={styles.line}></View>

                {/* <View tyle={styles.root}>
                    <Text style={styles.textf}>Symptoms/लक्षणे</Text>
                    {symptomsList.map((symptom, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10  }}>
                            <CheckBox
                                value={selectedSymptoms.includes(symptom)}
                                onValueChange={() => toggleSymptom(symptom)}
                            />
                            <Text style={{ marginLeft: 8, color: 'black' }}>{symptom}</Text>
                        </View>
                    ))}
                </View> */}


                <View style={styles.root}>
                    <Text style={styles.textf}>Symptoms/लक्षणे</Text>
                    <TextInput
                        style={styles.input}
                        value={otherSy}
                        placeholder="Enter Symptoms"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setOtherSy(text)}
                    />
                </View>


               
                {/* <View tyle={styles.root}>
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
                </View> */}

                <View style={styles.root}>
                    <Text style={styles.textf}> Sign/लक्षणे</Text>
                    <TextInput
                        style={styles.input}
                        value={otherSi}
                        placeholder="Enter Sign"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setOtherSi(text)}
                    />
                </View>



                <View style={styles.root}>
                    <Text style={styles.textf}>Diagnosis/निदान</Text>
                    <TextInput
                        style={styles.input}
                        value={diagnosis}
                        placeholder="Diagnosis by Doctor"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setDiagnosis(text)}
                    />
                </View>


                <View style={styles.root}>
                    <Text style={styles.textf}>Cause/कारण</Text>
                    <TextInput
                        style={[styles.input]}
                        value={cause}
                        placeholder="Cause of disease"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setCause(text)}
                    />
                </View>


                <View style={styles.root}>
                    <Text style={styles.textf}>Treatment/उपचार</Text>
                    <TextInput
                        style={[styles.input]}
                        value={treatment}
                        placeholder="Treatment suggested"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setTreatment(text)}
                    />
                </View>


                <View style={styles.root}>
                    <Text style={styles.textf}>Advice/सल्ला</Text>
                    <TextInput
                        style={[styles.input]}
                        value={advice}
                        placeholder="Doctor's Advice"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setAdvice(text)}
                    />
                </View>


                <TouchableOpacity style={styles.button} onPress={onSubmitPressed}>
                    <Text style={styles.btnnext}>Submit</Text>
                </TouchableOpacity>
         {/* </View> */}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    // Styles go here
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
        flexDirection: 'row',
        marginTop: '3%',
    },
    textf: {
        marginTop: '5%',
        marginLeft: '4%',
        fontSize: RFValue(13),
        color: 'black'
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: '5%',
        marginTop: '20%',
        backgroundColor: '#E38B29',
        width: '50%',
        alignSelf: 'center',
        marginBottom: '15%',
        borderRadius: 20,
        marginRight: '10%',
    },
    btnnext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: RFValue(13),
    },
    input: {
        borderBottomWidth: 1,
        height: 'auto',
        marginTop: 'auto',
        width: '50%',
        borderRadius: 0,
        color: 'black',
        padding: '3%',
        marginLeft: 'auto',
    },
    inputs: {
        borderBottomWidth: 1,
        color: 'white',
        height: 40,
        marginTop: 12,
        width: 200,
        borderRadius: 0,
        color: 'black',
        width: 350


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


export default Remark;



