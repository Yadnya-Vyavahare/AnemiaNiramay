import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, 
Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import config from "../config";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';




const PhysicalExamination = ({ navigation }) => {




    const route = useRoute();
    const childFullName = route.params.childFullName;




    const [vaccination, setVaccination] = useState('');
    const [allergy, setAllergy] = useState('');
    const [majorIllness, setMajorIllness] = useState('');
    const [operativeIntervention, setOperativeIntervention] = useState('');
    const [vaccineList, setVaccineList] = useState([]);
    const [allergyList, setAllergyList] = useState([]);
    const [hemoglobin, setHemoglobin] = useState('');
    const [MCV, setMCV] = useState('');
    const [upperCount, setUpperCount] = useState('');
    const [lowerCount, setLowerCount] = useState('');
    const [menstrualHistory, setMenstrualHistory] = useState('');
    const [consciousness, setConsciousness] = useState('');
    const [look, setLook] = useState('');
    const [nourishment, setNourishment] = useState('');
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [evening, setEvening] = useState('');
    const [dinner, setDinner] = useState('');
    const [health, setHealth] = useState('');
    const [bodyBuilt, setBodyBuilt] = useState('');
    const [skinColor, setSkinColor] = useState('');
    const [skinTexture, setSkinTexture] = useState('');
    const [weight, setWeight] = useState('');
    const [respiratory, setRespiratory] = useState('');
    const [height, setHeight] = useState('');
    const [pulse, setPulse] = useState('');
    const [bmi, setBmi] = useState("");
    const [dietType, setDietType] = useState('');
    const [heightError, setHeightError] = useState(false);
    const [weightError, setWeightError] = useState(false);
    const [selectedTimeBreak, setSelectedTimeBreak] = useState(null);
    const [selectedTimeLunch, setSelectedTimeLunch] = useState(null);
    const [selectedTimeEve, setSelectedTimeEve] = useState(null);
    const [selectedTimeDin, setSelectedTimeDin] = useState(null);










    const fetchStoredHeight = async () => {


        console.log("BNameree: ", name)
        // Extract only the child name from the full name




        try {
            const response = await fetch(`http://103.175.171.149:8080/fetchHeight/${childFullName}`);
            const data = await response.json();
            console.log(data.storedHeight)
            if (response.ok) {
                const storedHeight = data.storedHeight;
                return storedHeight;
            } else {
                console.error('Error fetching stored height:', data.error);
                return null;
            }
        } catch (error) {
            console.error('Error fetching stored height:', error.message);
            return null;
        }
    };


    useEffect(() => {
        const fetchHeightData = async () => {
            // Extract only the child name from the full name


            const storedHeight = await fetchStoredHeight(name);
            if (storedHeight !== null) {
                // You can use the stored height as needed
                // For example, you might want to set it in the state or perform validations
                console.log('Stored Height:', storedHeight);
            } else {
                // Handle the case where there's an error fetching stored height
                Alert.alert('Error', 'Failed to fetch stored height from the server.');
            }
        };


        // Call fetchHeightData when the component mounts
        fetchHeightData();
    },[childFullName]); // Add dependencies as needed  ,[name]










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
            // Fetch stored height for the child's name
            const storedHeight = await fetchStoredHeight(childFullName);


            if (storedHeight !== null) {
                // Use the stored height for validation
                console.log('User Inputted Height:', parseInt(height));
                console.log('Stored Height:', parseInt(storedHeight));
                console.log('User Height:', height, typeof height);
                console.log('Stored Height:', storedHeight, typeof storedHeight);




                if (parseInt(height) < parseInt(storedHeight)) {
                    // Display an error message with the stored height
                    console.log("in ifff")
                    Alert.alert(
                        'Validation Error',
                        `Please enter a height greater than or equal to the stored height (${storedHeight} cm).`
                    );
                    return;
                }




            } else {
                // Handle the case where there's an error fetching stored height
                Alert.alert('Error', 'Failed to fetch stored height from the server.');
                return;
            }




            console.log('Validation Passed');


            const bmiValue = weight / ((height / 100) * (height / 100));
            setBmi(bmiValue.toFixed(1));
        }
    };








    const toggleVaccine = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/getVaccineListNgo`);
            console.log('API Response:', response);




            // Check the structure of the response.data
            if (response.data && response.data.vaccineList) {
                setVaccineList(response.data.vaccineList.map((vaccine) => ({ ...vaccine, checked: false })));
            } else {
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


    const handleTimeChange = (value) => {
        setSelectedTimeBreak(value);
    };
    const handleTimeChangeOne = (value) => {
        setSelectedTimeLunch(value);
    };
    const handleTimeChangeTwo = (value) => {
        setSelectedTimeEve(value);
    };
    const handleTimeChangeThree= (value) => {
        setSelectedTimeDin(value);
    };








    const onSubmitPressed = () => {
        navigation.navigate('First');
    };








    return (




        <ScrollView showsVerticalScrollIndicator={false}>


            <View style={styles.container}>




                <View style={styles.root}>                  
                <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text>
                <TextInput
                    style = {[styles.input, {marginLeft: '10%', color: 'gray'}]}
                    value={childFullName}
                    editable={false}>
                </TextInput>    
            </View> 






                <View style={styles.root}>
                    <Text style={styles.textf}>Height(cm)/{"\n"}उंची(सेमी)</Text>
                    <TextInput style={[styles.input, { marginLeft: '10%' }]}
                        keyboardType='numeric'
                        placeholder="Height in cm"
                        value={height}
                        onChangeText={(text) => setHeight(text)}>
                    </TextInput>
                </View>




                {heightError ? <Text style={{ color: 'red', marginLeft: 10 }}>*Please enter valid height *</Text> : null}








                <View style={styles.root}>
                    <Text style={styles.textf}>Weight(Kg.)/{"\n"}वजन(किलो.)</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '10%' }]}
                        keyboardType='numeric'
                        placeholder="Weight in kg"
                        value={weight}
                        onChangeText={(text) => setWeight(text)}>
                    </TextInput>
                </View>




                {weightError ? <Text style={{ color: 'red', marginLeft: 10 }}>*Please enter valid weight *</Text> : null}






                <View style={styles.root}>
                    <Text style={styles.textf}>BMI</Text>
                    <TouchableOpacity style={styles.calculateButton} onPress={onCalculateBMIPressed}  >
                        <Text style={styles.btnnext}>Calculate</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.displayBMI}
                        editable={false}>
                        {bmi}
                    </TextInput>
                </View>








                <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
                    <Text style={styles.subHeading}>Vaccine List</Text>
                </TouchableOpacity>




                {vaccineList.length > 0 && (
                    <View style={{ paddingLeft: '10%' }}>
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
                    <Text style={styles.textf}>Respiratory{"\n"}Rate/{"\n"}श्वसन दर</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '12%' }]}
                        value={respiratory}
                        onChangeText={(text) => setRespiratory(text)}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Pulse rate/{"\n"}नाडी दर</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '12%' }]}
                        value={pulse}
                        onChangeText={(text) => setPulse(text)}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Hemoglobin{"\n"}(HB)</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '10%' }]}
                        placeholder="Hemoglobin"
                        onChangeText={text => setHemoglobin(text)}
                        value={hemoglobin}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>MCV</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '23%' }]}
                        placeholder="MCV"
                        onChangeText={text => setMCV(text)}
                        value={MCV}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Menstrual History</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '1%' }]}
                        placeholder="Menstrual History"
                        onChangeText={text => setMenstrualHistory(text)}
                        value={menstrualHistory}>
                    </TextInput>
                </View>




                <View style={styles.root}>
                    <Text style={styles.textf}>Major Illness/{"\n"}मुख्य आजार</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Major Illness"
                        placeholderTextColor="gray"
                        onChangeText={text => setMajorIllness(text)}
                        value={majorIllness}>
                    </TextInput>
                </View>






                <View style={styles.root}>
                    <Text style={styles.textf}>Operative{"\n"}Intervention/{"\n"}संचालनिक प्रवर्तन</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Operative Intervention"
                        placeholderTextColor="gray"
                        onChangeText={text => setOperativeIntervention(text)}
                        value={operativeIntervention}>
                    </TextInput>
                </View>












                <Text style={styles.subHeading1}>Blood Pressure(BP)</Text>




                <View style={styles.line}></View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Upper Count</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '10%' }]}
                        placeholder="Upper Count"
                        onChangeText={text => setUpperCount(text)}
                        value={upperCount}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Lower Count</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '10%' }]}
                        placeholder="Lower Count"
                        onChangeText={text => setLowerCount(text)}
                        value={lowerCount}>
                    </TextInput>
                </View>








                <Text style={styles.subHeading1}>Mental Health</Text>




                <View style={styles.line}></View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Consciousness</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '5%' }]}
                        placeholder="Consciousness"
                        onChangeText={text => setConsciousness(text)}
                        value={consciousness}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Look</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '25%' }]}
                        placeholder="Look"
                        onChangeText={text => setLook(text)}
                        value={look}>
                    </TextInput>
                </View>








                <Text style={styles.subHeading1}>Skin Status</Text>




                <View style={styles.line}></View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Skin Color</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '15%' }]}
                        placeholder="Skin Color"
                        onChangeText={text => setSkinColor(text)}
                        value={skinColor}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Skin Texture</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '10%' }]}
                        placeholder="Skin Texture"
                        onChangeText={text => setSkinTexture(text)}
                        value={skinTexture}>
                    </TextInput>
                </View>








                <Text style={styles.subHeading1}>General Appearance</Text>




                <View style={styles.line}></View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Nourishment</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '10%' }]}
                        placeholder="Nourishment"
                        onChangeText={text => setNourishment(text)}
                        value={nourishment}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Body Built</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '15%' }]}
                        placeholder="Body Built"
                        onChangeText={text => setBodyBuilt(text)}
                        value={bodyBuilt}>
                    </TextInput>
                </View>








                <View style={styles.root}>
                    <Text style={styles.textf}>Health</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '22%' }]}
                        placeholder="Health"
                        onChangeText={text => setHealth(text)}
                        value={health}>
                    </TextInput>
                </View>








                <Text style={styles.subHeading1}>Nutritional History</Text>




                <View style={styles.line}></View>








                <View style={styles.radioContainer}>
                    <Text style={styles.radioLabel}>Diet Type/{"\n"}</Text>
                    <View style={styles.radioButton}>
                        <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '30%' }}>Vegetarian</Text>
                        <RadioButton
                            value="Vegetarian"
                            status={dietType === 'Vegetarian' ? 'checked' : 'unchecked'}
                            onPress={() => setDietType('Vegetarian')}
                            color="#E38B29"
                        />
                    </View>
                </View>




                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%' }}>Non-Vegetarian</Text>
                    <RadioButton
                        value="Non-Vegetarian"
                        status={dietType === 'Non-Veg' ? 'checked' : 'unchecked'}
                        onPress={() => setDietType('Non-Vegetarian')}
                        color="#E38B29"
                    />
                </View>




                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '60%' }}>Both</Text>
                    <RadioButton
                        value="both"
                        status={dietType === 'both' ? 'checked' : 'unchecked'}
                        onPress={() => setDietType('both')}
                        color="#E38B29"
                    />
                </View>




                {/* <View style={styles.root}>                  
                <Text style={styles.textf}>Breakfast</Text>
                <TextInput
                    style = {[styles.input, { marginLeft: '15%' }]}
                    placeholder="Breakfast"
                    onChangeText={text => setBreakfast(text)}
                    value={breakfast}>
                </TextInput>
            </View> */}


                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.root}>
                        <Text style={styles.textf}>Breakfast</Text>
                        {/* Dropdown menu */}
                        <RNPickerSelect
                             style={{
                ...pickerSelectStyles,
                placeholder: {
                    color: 'black', // Set the color of the placeholder text
                },
            }}
                            onValueChange={(value) => handleTimeChange(value)}
                            placeholder={{ label: 'Time', value: null , textcolor: 'blue'}}
                            items={[
                                { label: '7-8 AM', value: '7-8' },
                                { label: '8-9 AM', value: '8-9' },
                                { label: '9-10 AM', value: '9-10' },
                            ]}
                            value={selectedTimeBreak}
                        />
                    </View>
                </View>


                <TextInput
                    style={[styles.input1, { marginLeft: '30%' }]}
                    placeholder="breakfast"
                    onChangeText={(text) => setBreakfast(text)}
                    value={breakfast}
                />




                {/* <View style={styles.root}>
                    <Text style={styles.textf}>Lunch</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '22%' }]}
                        placeholder="Lunch"
                        onChangeText={text => setLunch(text)}
                        value={lunch}>
                    </TextInput>
                </View> */}


                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.root}>
                        <Text style={styles.textf}>Lunch</Text>
                        {/* Dropdown menu */}
                        <RNPickerSelect
                            
                            style={{
                                ...pickerSelectStyles,
                                placeholder: {
                                    color: 'black', // Set the color of the placeholder text
                                },
                            }}
                            onValueChange={(value) => handleTimeChangeOne(value)}
                            placeholder={{ label: 'Time', value: null }}
                            items={[
                                { label: '11-12 AM', value: '11-12' },
                                { label: '12-1 PM', value: '12-1' },
                                { label: '1-2 PM', value: '1-2' },
                            ]}
                            value={selectedTimeLunch}
                        />
                    </View>
                </View>


                <TextInput
                    style={[styles.input1, { marginLeft: '30%' }]}
                    placeholder="Lunch"
                    onChangeText={(text) => setLunch(text)}
                    value={lunch}
                />


                {/* <View style={styles.root}>
                    <Text style={styles.textf}>Evening</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '18%' }]}
                        placeholder="Evening"
                        onChangeText={text => setEvening(text)}
                        value={evening}>
                    </TextInput>
                </View> */}


                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.root}>
                        <Text style={styles.textf}>Evening</Text>
                        {/* Dropdown menu */}
                        <RNPickerSelect
                            style={{
                                ...pickerSelectStyles,
                                placeholder: {
                                    color: 'black', // Set the color of the placeholder text
                                },
                            }}
                            onValueChange={(value) => handleTimeChangeTwo(value)}
                            placeholder={{ label: 'Time', value: null }}
                            items={[
                                { label: '4-5 PM', value: '4-5' },
                                { label: '5-6 PM', value: '5-6' },
                               
                            ]}
                            value={selectedTimeEve}
                        />
                    </View>
                </View>


                <TextInput
                    style={[styles.input1, { marginLeft: '30%' }]}
                    placeholder="Evening"
                    onChangeText={(text) => setEvening(text)}
                    value={evening}
                />


                {/* <View style={styles.root}>
                    <Text style={styles.textf}>Dinner</Text>
                    <TextInput
                        style={[styles.input, { marginLeft: '20%' }]}
                        placeholder="Dinner"
                        onChangeText={text => setDinner(text)}
                        value={dinner}>
                    </TextInput>
                </View> */}


                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.root}>
                        <Text style={styles.textf}>Dinner</Text>
                        {/* Dropdown menu */}
                        <RNPickerSelect
                           style={{
                            ...pickerSelectStyles,
                            placeholder: {
                                color: 'black', // Set the color of the placeholder text
                            },
                        }}
                            onValueChange={(value) => handleTimeChangeThree(value)}
                            placeholder={{ label: 'Time', value: null }}
                            items={[
                                { label: '7-8 PM', value: '7.5-8' },
                                { label: '8-9 PM', value: '8.5-9' },
                                { label: '9-10 PM', value: '9.5-10' },
                            ]}
                            value={selectedTimeDin}
                        />
                    </View>
                </View>


                <TextInput
                    style={[styles.input1, { marginLeft: '30%' }]}
                    placeholder="Dinner"
                    onChangeText={(text) => setDinner(text)}
                    value={dinner}
                />












                <TouchableOpacity style={styles.button} onPress={onSubmitPressed}>
                    <Text style={styles.btnnext}>Submit</Text>
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
        flexDirection: 'row',
        marginTop: '3%',
    },
    input: {
        borderBottomWidth: 1,
        height: 'auto',
        marginTop: '4%',
        width: '60%',
        borderRadius: 10,
        marginLeft: 'auto',
        color: 'black',
        padding: '3%'
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: '5%',
        marginTop: '10%',
        backgroundColor: '#E38B29',
        width: '50%',
        alignSelf: 'center',
        marginBottom: '5%',
        borderRadius: 20
    },
    btnnext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: RFValue(13),
    },
    textf: {
        marginTop: '10%',
        marginRight: '3%',
        fontSize: RFValue(14),
        color: 'black',
    },
    calculateButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: '3%',
        marginTop: '8%',
        backgroundColor: '#E38B29',
        width: '40%',
        alignSelf: 'center',
        marginBottom: '3%',
        borderRadius: 20,
        marginLeft: '3%',
    },
    displayBMI: {
        borderBottomWidth: 1,
        color: '#2c6975',
        height: 'auto',
        marginTop: '4%',
        width: '25%',
        borderRadius: 10,
        color: 'black',
        padding: '3%',
        marginLeft: '8%',
    },
    subHeading1: {
        flex: 1,
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: "black",
        marginBottom: '3%',
        marginLeft: '5%',
        paddingTop: '5%',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        marginVertical: '3%',
        alignSelf: 'flex-start',
        marginLeft: '3%',
    },
    radioContainer: {
        flexDirection: 'row',
        marginRight: '20%',
        marginTop: '8%',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
    },
    radioLabel: {
        fontSize: RFValue(13),
        color: 'black',
        marginBottom: '8%',
        marginLeft: '3%',
        marginTop: '8%',
        marginRight: '15%'




    },
    select: {
        alignItems: 'center',
        padding: '5%',
        marginTop: '8%',
        backgroundColor: '#E38B29',
        width: '50%',
        marginBottom: '3%',
        borderRadius: 20,
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
    subHeading: {
        flex: 1,
        fontSize: RFValue(15),
        fontWeight: 'bold',
        color: "black",
    },


    input1: {
        borderBottomWidth: 1,
        height: 'auto',
        marginTop: '0%',
        width: '60%',
        borderRadius: 10,
        marginLeft: 'auto',
        color: 'black',
        padding: '1%'


    },
});


const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 8,
        color: 'black',
        paddingRight: 90,
        //marginBottom: 0,
        marginRight: 10,
        height: 69,
        width: 150,
    },
});




export default PhysicalExamination;



// import React, {useState, useEffect,useContext} from "react";
// import { View, Text, StyleSheet, ScrollView,TextInput, TouchableOpacity, Alert } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { RadioButton } from 'react-native-paper';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import config from "../config";
// import axios from 'axios';
// import { AuthContext } from '../AuthContext';

// const PhysicalExamination = ({ navigation }) => {


//     const route = useRoute();
//     const childFullName = route.params.childFullName;
//     const { userName } = useContext(AuthContext);
//     console.log("THis is the", userName)


//     const [vaccination, setVaccination] = useState('');
//     const [allergy, setAllergy] = useState('');
//     const [majorIllness, setMajorIllness] = useState('');
//     const [operativeIntervention, setOperativeIntervention] = useState('');
//     const [vaccineList, setVaccineList] = useState([]);
//     const [allergyList, setAllergyList] = useState([]);
//     const [hb, sethb] = useState('');
//     const [MCV, setMCV] = useState('');
//     const [upperCount, setUpperCount] = useState('');
//     const [lowerCount, setLowerCount] = useState('');
//     const [menstrualHistory, setMenstrualHistory] = useState('');
//     const [consciousness, setConsciousness] = useState('');
//     const [look, setLook] = useState('');
//     const [nourishment, setNourishment] = useState('');
//     const [breakfast, setBreakfast] = useState('');
//     const [lunch, setLunch] = useState('');
//     const [evening, setEvening] = useState('');
//     const [dinner, setDinner] = useState('');
//     const [health, setHealth] = useState('');
//     const [bodyBuilt, setBodyBuilt] = useState('');
//     const [skinColor, setSkinColor] = useState('');
//     const [skinTexture, setSkinTexture] = useState('');
//     const [weight, setWeight] = useState('');
//     const [respiratory, setRespiratory] = useState('');
//     const [height, setHeight] = useState('');
//     const [pulse, setPulse]= useState('');
//     const [bmi, setBmi] = useState("");
//     const [loading,setLoading] = useState("")
//     const [dietType, setDietType] = useState('');
//     const [heightError, setHeightError] = useState(false);
//     const [weightError, setWeightError] = useState(false);




//     const fetchStoredHeight = async () => {

//         console.log("BNameree: ", childFullName)
//         // Extract only the child name from the full name

     
//         try {
//             const response = await fetch(`http://103.175.171.149:8080/fetchHeight/${childFullName}`);
//             const data = await response.json();
//             console.log(data.storedHeight)
//             if (response.ok) {
//                 const storedHeight = data.storedHeight;
//                 return storedHeight;
//             } else {
//                 console.error('Error fetching stored height:', data.error);
//                 return null;
//             }
//         } catch (error) {
//             console.error('Error fetching stored height:', error.message);
//             return null;
//         }
//     };
   
//     useEffect(() => {
//         const fetchHeightData = async () => {
//             // Extract only the child name from the full name
       
//             const storedHeight = await fetchStoredHeight(childFullName);
//             if (storedHeight !== null) {
//                 // You can use the stored height as needed
//                 // For example, you might want to set it in the state or perform validations
//                 console.log('Stored Height:', storedHeight);
//             } else {
//                 // Handle the case where there's an error fetching stored height
//                 Alert.alert('Error', 'Failed to fetch stored height from the server.');
//             }
//         };
     
//         // Call fetchHeightData when the component mounts
//         fetchHeightData();
//     }, [childFullName]); // Add dependencies as needed
   




//     const onCalculateBMIPressed = async () => {
//         // Extract only the child name from the full name
       
     
//         if (!height || height <= 0) {
//             setHeightError(true);
//         } else if (height) {
//             setHeightError(false);
//         }
     
//         if (!weight || weight <= 0) {
//             setWeightError(true);
//         } else if (weight) {
//             setWeightError(false);
//         }
     
//         if (height && weight) {
//             // Fetch stored height for the child's name
//             const storedHeight = await fetchStoredHeight(childFullName);
     
//             if (storedHeight !== null) {
//             // Use the stored height for validation
//             console.log('User Inputted Height:', parseInt(height));
//             console.log('Stored Height:', parseInt(storedHeight));
//             console.log('User Height:', height, typeof height);
//             console.log('Stored Height:', storedHeight, typeof storedHeight);


//             if (parseInt(height) < parseInt(storedHeight)) {
//                 // Display an error message with the stored height
//                 console.log("in ifff")
//                 Alert.alert(
//                     'Validation Error',
//                     `Please enter a height greater than or equal to the stored height (${storedHeight} cm).`
//                 );
//                 return;
//             }


//             } else {
//                 // Handle the case where there's an error fetching stored height
//                 Alert.alert('Error', 'Failed to fetch stored height from the server.');
//                 return;
//             }


//             console.log('Validation Passed');
     
//             const bmiValue = weight / ((height / 100) * (height / 100));
//             setBmi(bmiValue.toFixed(1));
//         }
//     };




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


//         console.log('sign in')
//         setLoading(true);
       
//         try {
           
//             const response = await axios.post(`${config.API_BASE_URL}/childPhyExam`, {
//            childFullName: childFullName,
//             Vaccination: vaccineList.filter(item => item.checked).map(item => item.vaccineName),
//             Allergy: allergyList.filter(item => item.checked).map(item => item.allergyName),
//             MajorIllness: majorIllness,
//             OperativeIntervention: operativeIntervention,
//             hb: hb,
//             MCV: MCV,
//             upperCount: upperCount,
//             lowerCount: lowerCount,
//             menstrualHistory: menstrualHistory,
//             consciousness: consciousness,
//             look: look,
//             nourishment: nourishment,
//             dietType: dietType,
//             breakfast: breakfast,
//             lunch: lunch,
//             evening: evening,
//             dinner: dinner,
//             health: health,
//             bodyBuilt: bodyBuilt,
//             skinColor: skinColor,
//             skinTexture: skinTexture,
//             weight: weight,
//             respiratory: respiratory,
//             height: height,
//             pulse: pulse,
//             bmi: bmi,
// userName:userName





//             });


//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
           


//             Alert.alert(
//                 'Success',
//                 'Child data created successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('UpdateChildDetails', {childFullName:childFullName}) }
//                 ],
//                 { cancelable: false }
//               );


//         } catch (error) {
//             console.error('API request error:', error);
//             // Handle error, e.g., show an error message
//             Alert.alert(
//                 'Error',
//                 'Error filling child details. Please try again.',
//                 [
//                   { text: 'OK', onPress: () => console.log('OK Pressed') }
//                 ],
//                 { cancelable: false }
//               );
//         }
//         finally {
//             setLoading(false); // Set loading to false regardless of success or error
//           }
//     }




//     return (


//         <ScrollView showsVerticalScrollIndicator = {false}>

//             <View style={styles.container}>


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text>
//                 <TextInput
//                     style = {[styles.input, {marginLeft: '10%', color: 'gray'}]}
//                     value={childFullName}
//                     editable={false}>
//                 </TextInput>    
//             </View>
           


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Height(cm)/{"\n"}उंची(सेमी)</Text>
//                 <TextInput style = {[styles.input, {marginLeft: '10%'}]}
//                     keyboardType='numeric'
//                     placeholder="Height in cm"
//                     value={height.toString()}
//                     onChangeText={(text) => setHeight(text)}>
//                 </TextInput>
//             </View>


//             {heightError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid height *</Text>:null}




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Weight(Kg.)/{"\n"}वजन(किलो.)</Text>
//                 <TextInput
//                     style = {[styles.input, {marginLeft: '10%'}]}
//                     keyboardType='numeric'
//                     placeholder="Weight in kg"
//                     value={weight.toString()}
//                     onChangeText={(text) => setWeight (text)}>
//                 </TextInput>
//             </View>  


//             {weightError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter valid weight *</Text>:null}
           


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>BMI</Text>
//                 <TouchableOpacity style={styles.calculateButton} onPress={onCalculateBMIPressed}  >
//                     <Text style = {styles.btnnext}>Calculate</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                     style = {styles.displayBMI}  
//                     editable={false}>
//                     {bmi}
//                 </TextInput>
//             </View>




//             <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
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
           
           


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Respiratory{"\n"}Rate/{"\n"}श्वसन दर</Text>
//                 <TextInput
//                     style = {[styles.input, {marginLeft: '12%'}]}
//                     value={respiratory}
//                     onChangeText={(text) => setRespiratory (text)}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Pulse rate/{"\n"}नाडी दर</Text>
//                 <TextInput
//                     style = {[styles.input, {marginLeft: '12%'}]}
//                     value={pulse}
//                     onChangeText={(text) => setPulse (text)}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Hemoglobin{"\n"}(HB)</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '10%' }]}  
//                     placeholder="Hemoglobin"
//                     onChangeText={text => sethb(text)}  
//                     value={hb.toString()}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>MCV</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '23%' }]}  
//                     placeholder="MCV"
//                     onChangeText={text => setMCV(text)}  
//                     value={MCV.toString()}>
//                 </TextInput>
//             </View>      




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Menstrual History</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '1%' }]}  
//                     placeholder="Menstrual History"
//                     onChangeText={text => setMenstrualHistory(text)}  
//                     value={menstrualHistory}>
//                 </TextInput>
//             </View>


//             <View style={styles.root}>                  
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






//             <Text style = {styles.subHeading1}>Blood Pressure(BP)</Text>


//             <View style={styles.line}></View>  




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Upper Count</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '10%' }]}  
//                     placeholder="Upper Count"
//                     onChangeText={text => setUpperCount(text)}  
//                     value={upperCount}>
//                 </TextInput>
//             </View>  




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Lower Count</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '10%' }]}  
//                     placeholder="Lower Count"
//                     onChangeText={text => setLowerCount(text)}  
//                     value={lowerCount}>
//                 </TextInput>
//             </View>  




//             <Text style = {styles.subHeading1}>Mental Health</Text>


//             <View style={styles.line}></View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Consciousness</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '5%' }]}  
//                     placeholder="Consciousness"
//                     onChangeText={text => setConsciousness(text)}  
//                     value={consciousness}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Look</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '25%' }]}  
//                     placeholder="Look"
//                     onChangeText={text => setLook(text)}  
//                     value={look}>
//                 </TextInput>
//             </View>  




//             <Text style = {styles.subHeading1}>Skin Status</Text>


//             <View style={styles.line}></View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Skin Color</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '15%' }]}
//                     placeholder="Skin Color"
//                     onChangeText={text => setSkinColor(text)}
//                     value={skinColor}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Skin Texture</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '10%' }]}
//                     placeholder="Skin Texture"
//                     onChangeText={text => setSkinTexture(text)}
//                     value={skinTexture}>
//                 </TextInput>
//             </View>




//             <Text style = {styles.subHeading1}>General Appearance</Text>


//             <View style={styles.line}></View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Nourishment</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '10%' }]}
//                     placeholder="Nourishment"
//                     onChangeText={text => setNourishment(text)}
//                     value={nourishment}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Body Built</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '15%' }]}
//                     placeholder="Body Built"
//                     onChangeText={text => setBodyBuilt(text)}
//                     value={bodyBuilt}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Health</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '22%' }]}
//                     placeholder="Health"
//                     onChangeText={text => setHealth(text)}
//                     value={health}>
//                 </TextInput>
//             </View>




//             <Text style = {styles.subHeading1}>Nutritional History</Text>


//             <View style={styles.line}></View>




//             <View style={styles.radioContainer}>  
//                 <Text style={styles.radioLabel}>Diet Type/{"\n"}</Text>        
//                 <View style={styles.radioButton}>
//                     <Text style={{fontSize: RFValue(13), color: 'black', marginLeft: '30%'}}>Vegetarian</Text>
//                     <RadioButton
//                         value="Vegetarian"
//                         status={ dietType === 'Vegetarian' ? 'checked' : 'unchecked' }
//                         onPress={() => setDietType('Vegetarian')}
//                         color="#E38B29"
//                     />
//                 </View>
//                 </View>


//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Non-Vegetarian</Text>
//                     <RadioButton
//                         value="Non-Vegetarian"
//                         status={ dietType === 'Non-Veg' ? 'checked' : 'unchecked' }
//                         onPress={() => setDietType('Non-Vegetarian')}
//                         color="#E38B29"
//                     />
//                 </View>


//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '60%'}}>Both</Text>
//                     <RadioButton
//                         value="both"
//                         status={ dietType === 'both' ? 'checked' : 'unchecked' }
//                         onPress={() => setDietType('both')}
//                         color="#E38B29"
//                     />
//                 </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Breakfast</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '15%' }]}
//                     placeholder="Breakfast"
//                     onChangeText={text => setBreakfast(text)}
//                     value={breakfast}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Lunch</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '22%' }]}
//                     placeholder="Lunch"
//                     onChangeText={text => setLunch(text)}
//                     value={lunch}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Evening</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '18%' }]}
//                     placeholder="Evening"
//                     onChangeText={text => setEvening(text)}
//                     value={evening}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Dinner</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: '20%' }]}
//                     placeholder="Dinner"
//                     onChangeText={text => setDinner(text)}
//                     value={dinner}>
//                 </TextInput>
//             </View>




//             <TouchableOpacity style = {styles.button} onPress={onSubmitPressed}>
//                 <Text style = {styles.btnnext}>Submit</Text>
//             </TouchableOpacity>
//             </View>

//         </ScrollView>
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
//     input: {
//         borderBottomWidth:1,
//         height: 'auto',
//         marginTop: '4%',
//         width: '60%',
//         borderRadius:10,
//         marginLeft:'auto',
//         color:'black',
//         padding:'3%'
//     },
//     button: {
//         alignSelf: 'stretch',
//         alignItems: 'center',
//         padding:'5%',
//         marginTop:'10%',
//         backgroundColor: '#E38B29',
//         width: '50%',
//         alignSelf: 'center',
//         marginBottom:'5%',
//         borderRadius:20
//     },
//     btnnext: {
//         color: 'black',
//         fontWeight: 'bold',
//         fontSize: RFValue(13),
//     },
//     textf:{
//         marginTop:'10%',
//         marginRight:'3%',
//         fontSize: RFValue(14),
//         color: 'black',
//     },
//     calculateButton: {
//         alignSelf: 'stretch',
//         alignItems: 'center',
//         padding:'3%',
//         marginTop:'8%',
//         backgroundColor: '#E38B29',
//         width: '40%',
//         alignSelf: 'center',
//         marginBottom:'3%',
//         borderRadius:20,
//         marginLeft: '3%',
//     },
//     displayBMI: {
//         borderBottomWidth:1,
//         color: '#2c6975',
//         height: 'auto',
//         marginTop: '4%',
//         width: '25%',
//         borderRadius:10,
//         color:'black',
//         padding:'3%',
//         marginLeft:'8%',
//     },
//     subHeading1: {
//         flex: 1,
//         fontSize: RFValue(18),
//         fontWeight: 'bold',
//         color: "black",
//         marginBottom: '3%',
//         marginLeft: '5%',
//         paddingTop: '5%',
//     },
//     line: {
//         borderBottomColor: 'black',
//         borderBottomWidth: 1,
//         width: '90%',
//         marginVertical: '3%',
//         alignSelf: 'flex-start',
//         marginLeft: '3%',
//     },
//     radioContainer: {
//         flexDirection:'row',
//         marginRight:'20%',
//         marginTop: '8%',
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: '2%',
//     },
//     radioLabel: {
//         fontSize: RFValue(13),
//         color:'black',
//         marginBottom: '8%',
//         marginLeft: '3%',
//         marginTop: '8%',
//         marginRight: '15%'


//     },
//     select: {
//         alignItems: 'center',
//         padding:'5%',
//         marginTop:'8%',
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
//     subHeading: {
//         flex: 1,
//         fontSize: RFValue(15),
//         fontWeight: 'bold',
//         color: "black",
//     },
// });


// export default PhysicalExamination;





// // import React, { useState, useEffect } from "react";
// // import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
// // import { useRoute } from '@react-navigation/native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { RadioButton } from 'react-native-paper';
// // import { heightPercentageToDP } from 'react-native-responsive-screen';
// // import { RFValue } from 'react-native-responsive-fontsize';
// // //import config from "../config";
// // import axios from 'axios';
// // import RNPickerSelect from 'react-native-picker-select';




// // const PhysicalExamination = ({ navigation }) => {




// //     // const route = useRoute();
// //     // const name = route.params.name;




// //     const [vaccination, setVaccination] = useState('');
// //     const [allergy, setAllergy] = useState('');
// //     const [majorIllness, setMajorIllness] = useState('');
// //     const [operativeIntervention, setOperativeIntervention] = useState('');
// //     const [vaccineList, setVaccineList] = useState([]);
// //     const [allergyList, setAllergyList] = useState([]);
// //     const [hemoglobin, setHemoglobin] = useState('');
// //     const [MCV, setMCV] = useState('');
// //     const [upperCount, setUpperCount] = useState('');
// //     const [lowerCount, setLowerCount] = useState('');
// //     const [menstrualHistory, setMenstrualHistory] = useState('');
// //     const [consciousness, setConsciousness] = useState('');
// //     const [look, setLook] = useState('');
// //     const [nourishment, setNourishment] = useState('');
// //     const [breakfast, setBreakfast] = useState('');
// //     const [lunch, setLunch] = useState('');
// //     const [evening, setEvening] = useState('');
// //     const [dinner, setDinner] = useState('');
// //     const [health, setHealth] = useState('');
// //     const [bodyBuilt, setBodyBuilt] = useState('');
// //     const [skinColor, setSkinColor] = useState('');
// //     const [skinTexture, setSkinTexture] = useState('');
// //     const [weight, setWeight] = useState('');
// //     const [respiratory, setRespiratory] = useState('');
// //     const [height, setHeight] = useState('');
// //     const [pulse, setPulse] = useState('');
// //     const [bmi, setBmi] = useState("");
// //     const [dietType, setDietType] = useState('');
// //     const [heightError, setHeightError] = useState(false);
// //     const [weightError, setWeightError] = useState(false);
// //     const [selectedTimeBreak, setSelectedTimeBreak] = useState(null);
// //     const [selectedTimeLunch, setSelectedTimeLunch] = useState(null);
// //     const [selectedTimeEve, setSelectedTimeEve] = useState(null);
// //     const [selectedTimeDin, setSelectedTimeDin] = useState(null);










// //     const fetchStoredHeight = async () => {


// //         console.log("BNameree: ", name)
// //         // Extract only the child name from the full name




// //         try {
// //             const response = await fetch(`http://103.175.171.149:8080/fetchHeight/${name}`);
// //             const data = await response.json();
// //             console.log(data.storedHeight)
// //             if (response.ok) {
// //                 const storedHeight = data.storedHeight;
// //                 return storedHeight;
// //             } else {
// //                 console.error('Error fetching stored height:', data.error);
// //                 return null;
// //             }
// //         } catch (error) {
// //             console.error('Error fetching stored height:', error.message);
// //             return null;
// //         }
// //     };


// //     useEffect(() => {
// //         const fetchHeightData = async () => {
// //             // Extract only the child name from the full name


// //             const storedHeight = await fetchStoredHeight(name);
// //             if (storedHeight !== null) {
// //                 // You can use the stored height as needed
// //                 // For example, you might want to set it in the state or perform validations
// //                 console.log('Stored Height:', storedHeight);
// //             } else {
// //                 // Handle the case where there's an error fetching stored height
// //                 Alert.alert('Error', 'Failed to fetch stored height from the server.');
// //             }
// //         };


// //         // Call fetchHeightData when the component mounts
// //         fetchHeightData();
// //     }); // Add dependencies as needed  ,[name]










// //     const onCalculateBMIPressed = async () => {
// //         // Extract only the child name from the full name




// //         if (!height || height <= 0) {
// //             setHeightError(true);
// //         } else if (height) {
// //             setHeightError(false);
// //         }


// //         if (!weight || weight <= 0) {
// //             setWeightError(true);
// //         } else if (weight) {
// //             setWeightError(false);
// //         }


// //         if (height && weight) {
// //             // Fetch stored height for the child's name
// //             const storedHeight = await fetchStoredHeight(name);


// //             if (storedHeight !== null) {
// //                 // Use the stored height for validation
// //                 console.log('User Inputted Height:', parseInt(height));
// //                 console.log('Stored Height:', parseInt(storedHeight));
// //                 console.log('User Height:', height, typeof height);
// //                 console.log('Stored Height:', storedHeight, typeof storedHeight);




// //                 if (parseInt(height) < parseInt(storedHeight)) {
// //                     // Display an error message with the stored height
// //                     console.log("in ifff")
// //                     Alert.alert(
// //                         'Validation Error',
// //                         `Please enter a height greater than or equal to the stored height (${storedHeight} cm).`
// //                     );
// //                     return;
// //                 }




// //             } else {
// //                 // Handle the case where there's an error fetching stored height
// //                 Alert.alert('Error', 'Failed to fetch stored height from the server.');
// //                 return;
// //             }




// //             console.log('Validation Passed');


// //             const bmiValue = weight / ((height / 100) * (height / 100));
// //             setBmi(bmiValue.toFixed(1));
// //         }
// //     };








// //     const toggleVaccine = async () => {
// //         try {
// //             const response = await axios.get(`${config.API_BASE_URL}/getVaccineListNgo`);
// //             console.log('API Response:', response);




// //             // Check the structure of the response.data
// //             if (response.data && response.data.vaccineList) {
// //                 setVaccineList(response.data.vaccineList.map((vaccine) => ({ ...vaccine, checked: false })));
// //             } else {
// //                 console.error('Invalid response structure:', response.data);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching vaccine data:', error.message);
// //             // Handle the error, e.g., show a message to the user or retry the request
// //         }
// //     };




// //     const handleCheckboxChange = (vaccineID) => {
// //         setVaccineList((prevList) =>
// //             prevList.map((vaccine) =>
// //                 vaccine.vaccineID === vaccineID ? { ...vaccine, checked: !vaccine.checked } : vaccine
// //             )
// //         );
// //     };








// //     const toggleAllergy = async () => {
// //         try {
// //             const response = await axios.get(`${config.API_BASE_URL}/getAllergyListNgo`);
// //             console.log('API Response:', response);




// //             // Check the structure of the response.data
// //             if (response.data && response.data.allergyList) {
// //                 setAllergyList(response.data.allergyList.map((allergy) => ({ ...allergy, checked: false })));
// //             } else {
// //                 console.error('Invalid response structure:', response.data);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching allergy data:', error.message);
// //             // Handle the error, e.g., show a message to the user or retry the request
// //         }
// //     };




// //     const handleAllergyCheckboxChange = (allergyID) => {
// //         setAllergyList((prevList) =>
// //             prevList.map((allergy) =>
// //                 allergy.allergyID === allergyID ? { ...allergy, checked: !allergy.checked } : allergy
// //             )
// //         );
// //     };


// //     const handleTimeChange = (value) => {
// //         setSelectedTimeBreak(value);
// //     };
// //     const handleTimeChangeOne = (value) => {
// //         setSelectedTimeLunch(value);
// //     };
// //     const handleTimeChangeTwo = (value) => {
// //         setSelectedTimeEve(value);
// //     };
// //     const handleTimeChangeThree= (value) => {
// //         setSelectedTimeDin(value);
// //     };








// //     const onSubmitPressed = () => {
// //         navigation.navigate('First');
// //     };








// //     return (




// //         <ScrollView showsVerticalScrollIndicator={false}>


// //             <View style={styles.container}>




// //                 {/* <View style={styles.root}>                  
// //                 <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text>
// //                 <TextInput
// //                     style = {[styles.input, {marginLeft: '10%', color: 'gray'}]}
// //                     value={name}
// //                     editable={false}>
// //                 </TextInput>    
// //             </View> */}






// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Height(cm)/{"\n"}उंची(सेमी)</Text>
// //                     <TextInput style={[styles.input, { marginLeft: '10%' }]}
// //                         keyboardType='numeric'
// //                         placeholder="Height in cm"
// //                         value={height}
// //                         onChangeText={(text) => setHeight(text)}>
// //                     </TextInput>
// //                 </View>




// //                 {heightError ? <Text style={{ color: 'red', marginLeft: 10 }}>*Please enter valid height *</Text> : null}








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Weight(Kg.)/{"\n"}वजन(किलो.)</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '10%' }]}
// //                         keyboardType='numeric'
// //                         placeholder="Weight in kg"
// //                         value={weight}
// //                         onChangeText={(text) => setWeight(text)}>
// //                     </TextInput>
// //                 </View>




// //                 {weightError ? <Text style={{ color: 'red', marginLeft: 10 }}>*Please enter valid weight *</Text> : null}






// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>BMI</Text>
// //                     <TouchableOpacity style={styles.calculateButton} onPress={onCalculateBMIPressed}  >
// //                         <Text style={styles.btnnext}>Calculate</Text>
// //                     </TouchableOpacity>
// //                     <TextInput
// //                         style={styles.displayBMI}
// //                         editable={false}>
// //                         {bmi}
// //                     </TextInput>
// //                 </View>








// //                 <TouchableOpacity style={styles.select} onPress={toggleVaccine}>
// //                     <Text style={styles.subHeading}>Vaccine List</Text>
// //                 </TouchableOpacity>




// //                 {vaccineList.length > 0 && (
// //                     <View style={{ paddingLeft: '10%' }}>
// //                         {vaccineList.map((item) => (
// //                             <TouchableOpacity
// //                                 key={item.vaccineID}
// //                                 style={styles.checkboxContainer}
// //                                 onPress={() => handleCheckboxChange(item.vaccineID)}
// //                             >
// //                                 <Icon
// //                                     name={item.checked ? 'check-box' : 'check-box-outline-blank'}
// //                                     size={25}
// //                                     color={item.checked ? '#E38B29' : 'black'}
// //                                 />
// //                                 <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
// //                                     {item.vaccineName}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                         ))}
// //                     </View>
// //                 )}




// //                 <TouchableOpacity style={styles.select} onPress={toggleAllergy}>
// //                     <Text style={styles.subHeading}>Allergy List</Text>
// //                 </TouchableOpacity>




// //                 {allergyList.length > 0 && (
// //                     <View style={{ paddingLeft: '10%' }}>
// //                         {allergyList.map((item) => (
// //                             <TouchableOpacity
// //                                 key={item.allergyID}
// //                                 style={styles.checkboxContainer}
// //                                 onPress={() => handleAllergyCheckboxChange(item.allergyID)}
// //                             >
// //                                 <Icon
// //                                     name={item.checked ? 'check-box' : 'check-box-outline-blank'}
// //                                     size={25}
// //                                     color={item.checked ? '#E38B29' : 'black'}
// //                                 />
// //                                 <Text style={{ ...styles.checkboxLabel, color: item.checked ? '#E38B29' : 'black' }}>
// //                                     {item.allergyName}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                         ))}
// //                     </View>
// //                 )}








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Respiratory{"\n"}Rate/{"\n"}श्वसन दर</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '12%' }]}
// //                         value={respiratory}
// //                         onChangeText={(text) => setRespiratory(text)}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Pulse rate/{"\n"}नाडी दर</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '12%' }]}
// //                         value={pulse}
// //                         onChangeText={(text) => setPulse(text)}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Hemoglobin{"\n"}(HB)</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '10%' }]}
// //                         placeholder="Hemoglobin"
// //                         onChangeText={text => setHemoglobin(text)}
// //                         value={hemoglobin}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>MCV</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '23%' }]}
// //                         placeholder="MCV"
// //                         onChangeText={text => setMCV(text)}
// //                         value={MCV}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Menstrual History</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '1%' }]}
// //                         placeholder="Menstrual History"
// //                         onChangeText={text => setMenstrualHistory(text)}
// //                         value={menstrualHistory}>
// //                     </TextInput>
// //                 </View>




// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Major Illness/{"\n"}मुख्य आजार</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Enter Major Illness"
// //                         placeholderTextColor="gray"
// //                         onChangeText={text => setMajorIllness(text)}
// //                         value={majorIllness}>
// //                     </TextInput>
// //                 </View>






// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Operative{"\n"}Intervention/{"\n"}संचालनिक प्रवर्तन</Text>
// //                     <TextInput
// //                         style={styles.input}
// //                         placeholder="Enter Operative Intervention"
// //                         placeholderTextColor="gray"
// //                         onChangeText={text => setOperativeIntervention(text)}
// //                         value={operativeIntervention}>
// //                     </TextInput>
// //                 </View>












// //                 <Text style={styles.subHeading1}>Blood Pressure(BP)</Text>




// //                 <View style={styles.line}></View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Upper Count</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '10%' }]}
// //                         placeholder="Upper Count"
// //                         onChangeText={text => setUpperCount(text)}
// //                         value={upperCount}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Lower Count</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '10%' }]}
// //                         placeholder="Lower Count"
// //                         onChangeText={text => setLowerCount(text)}
// //                         value={lowerCount}>
// //                     </TextInput>
// //                 </View>








// //                 <Text style={styles.subHeading1}>Mental Health</Text>




// //                 <View style={styles.line}></View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Consciousness</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '5%' }]}
// //                         placeholder="Consciousness"
// //                         onChangeText={text => setConsciousness(text)}
// //                         value={consciousness}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Look</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '25%' }]}
// //                         placeholder="Look"
// //                         onChangeText={text => setLook(text)}
// //                         value={look}>
// //                     </TextInput>
// //                 </View>








// //                 <Text style={styles.subHeading1}>Skin Status</Text>




// //                 <View style={styles.line}></View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Skin Color</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '15%' }]}
// //                         placeholder="Skin Color"
// //                         onChangeText={text => setSkinColor(text)}
// //                         value={skinColor}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Skin Texture</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '10%' }]}
// //                         placeholder="Skin Texture"
// //                         onChangeText={text => setSkinTexture(text)}
// //                         value={skinTexture}>
// //                     </TextInput>
// //                 </View>








// //                 <Text style={styles.subHeading1}>General Appearance</Text>




// //                 <View style={styles.line}></View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Nourishment</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '10%' }]}
// //                         placeholder="Nourishment"
// //                         onChangeText={text => setNourishment(text)}
// //                         value={nourishment}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Body Built</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '15%' }]}
// //                         placeholder="Body Built"
// //                         onChangeText={text => setBodyBuilt(text)}
// //                         value={bodyBuilt}>
// //                     </TextInput>
// //                 </View>








// //                 <View style={styles.root}>
// //                     <Text style={styles.textf}>Health</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '22%' }]}
// //                         placeholder="Health"
// //                         onChangeText={text => setHealth(text)}
// //                         value={health}>
// //                     </TextInput>
// //                 </View>








// //                 <Text style={styles.subHeading1}>Nutritional History</Text>




// //                 <View style={styles.line}></View>








// //                 <View style={styles.radioContainer}>
// //                     <Text style={styles.radioLabel}>Diet Type/{"\n"}</Text>
// //                     <View style={styles.radioButton}>
// //                         <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '30%' }}>Vegetarian</Text>
// //                         <RadioButton
// //                             value="Vegetarian"
// //                             status={dietType === 'Vegetarian' ? 'checked' : 'unchecked'}
// //                             onPress={() => setDietType('Vegetarian')}
// //                             color="#E38B29"
// //                         />
// //                     </View>
// //                 </View>




// //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
// //                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%' }}>Non-Vegetarian</Text>
// //                     <RadioButton
// //                         value="Non-Vegetarian"
// //                         status={dietType === 'Non-Veg' ? 'checked' : 'unchecked'}
// //                         onPress={() => setDietType('Non-Vegetarian')}
// //                         color="#E38B29"
// //                     />
// //                 </View>




// //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
// //                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '60%' }}>Both</Text>
// //                     <RadioButton
// //                         value="both"
// //                         status={dietType === 'both' ? 'checked' : 'unchecked'}
// //                         onPress={() => setDietType('both')}
// //                         color="#E38B29"
// //                     />
// //                 </View>




// //                 {/* <View style={styles.root}>                  
// //                 <Text style={styles.textf}>Breakfast</Text>
// //                 <TextInput
// //                     style = {[styles.input, { marginLeft: '15%' }]}
// //                     placeholder="Breakfast"
// //                     onChangeText={text => setBreakfast(text)}
// //                     value={breakfast}>
// //                 </TextInput>
// //             </View> */}


// //                 <View style={{ flexDirection: 'row' }}>
// //                     <View style={styles.root}>
// //                         <Text style={styles.textf}>Breakfast</Text>
// //                         {/* Dropdown menu */}
// //                         <RNPickerSelect
// //                             style={pickerSelectStyles}
// //                             onValueChange={(value) => handleTimeChange(value)}
// //                             placeholder={{ label: 'Time', value: null }}
// //                             items={[
// //                                 { label: '7-8 AM', value: '7-8' },
// //                                 { label: '8-9 AM', value: '8-9' },
// //                                 { label: '9-10 AM', value: '9-10' },
// //                             ]}
// //                             value={selectedTimeBreak}
// //                         />
// //                     </View>
// //                 </View>


// //                 <TextInput
// //                     style={[styles.input1, { marginLeft: '30%' }]}
// //                     placeholder="breakfast"
// //                     onChangeText={(text) => setBreakfast(text)}
// //                     value={breakfast}
// //                 />




// //                 {/* <View style={styles.root}>
// //                     <Text style={styles.textf}>Lunch</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '22%' }]}
// //                         placeholder="Lunch"
// //                         onChangeText={text => setLunch(text)}
// //                         value={lunch}>
// //                     </TextInput>
// //                 </View> */}


// //                 <View style={{ flexDirection: 'row' }}>
// //                     <View style={styles.root}>
// //                         <Text style={styles.textf}>Lunch</Text>
// //                         {/* Dropdown menu */}
// //                         <RNPickerSelect
// //                             style={pickerSelectStyles}
// //                             onValueChange={(value) => handleTimeChangeOne(value)}
// //                             placeholder={{ label: 'Time', value: null }}
// //                             items={[
// //                                 { label: '11-12 AM', value: '11-12' },
// //                                 { label: '12-1 PM', value: '12-1' },
// //                                 { label: '1-2 PM', value: '1-2' },
// //                             ]}
// //                             value={selectedTimeLunch}
// //                         />
// //                     </View>
// //                 </View>


// //                 <TextInput
// //                     style={[styles.input1, { marginLeft: '30%' }]}
// //                     placeholder="Lunch"
// //                     onChangeText={(text) => setLunch(text)}
// //                     value={lunch}
// //                 />


// //                 {/* <View style={styles.root}>
// //                     <Text style={styles.textf}>Evening</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '18%' }]}
// //                         placeholder="Evening"
// //                         onChangeText={text => setEvening(text)}
// //                         value={evening}>
// //                     </TextInput>
// //                 </View> */}


// //                 <View style={{ flexDirection: 'row' }}>
// //                     <View style={styles.root}>
// //                         <Text style={styles.textf}>Evening</Text>
// //                         {/* Dropdown menu */}
// //                         <RNPickerSelect
// //                             style={pickerSelectStyles}
// //                             onValueChange={(value) => handleTimeChangeTwo(value)}
// //                             placeholder={{ label: 'Time', value: null }}
// //                             items={[
// //                                 { label: '4-5 PM', value: '4-5' },
// //                                 { label: '5-6 PM', value: '5-6' },
                               
// //                             ]}
// //                             value={selectedTimeEve}
// //                         />
// //                     </View>
// //                 </View>


// //                 <TextInput
// //                     style={[styles.input1, { marginLeft: '30%' }]}
// //                     placeholder="Evening"
// //                     onChangeText={(text) => setEvening(text)}
// //                     value={evening}
// //                 />


// //                 {/* <View style={styles.root}>
// //                     <Text style={styles.textf}>Dinner</Text>
// //                     <TextInput
// //                         style={[styles.input, { marginLeft: '20%' }]}
// //                         placeholder="Dinner"
// //                         onChangeText={text => setDinner(text)}
// //                         value={dinner}>
// //                     </TextInput>
// //                 </View> */}


// //                 <View style={{ flexDirection: 'row' }}>
// //                     <View style={styles.root}>
// //                         <Text style={styles.textf}>Dinner</Text>
// //                         {/* Dropdown menu */}
// //                         <RNPickerSelect
// //                             style={pickerSelectStyles}
// //                             onValueChange={(value) => handleTimeChangeThree(value)}
// //                             placeholder={{ label: 'Time', value: null }}
// //                             items={[
// //                                 { label: '7-8 PM', value: '7.5-8' },
// //                                 { label: '8-9 PM', value: '8.5-9' },
// //                                 { label: '9-10 PM', value: '9.5-10' },
// //                             ]}
// //                             value={selectedTimeDin}
// //                         />
// //                     </View>
// //                 </View>


// //                 <TextInput
// //                     style={[styles.input1, { marginLeft: '30%' }]}
// //                     placeholder="Dinner"
// //                     onChangeText={(text) => setDinner(text)}
// //                     value={dinner}
// //                 />












// //                 <TouchableOpacity style={styles.button} onPress={onSubmitPressed}>
// //                     <Text style={styles.btnnext}>Submit</Text>
// //                 </TouchableOpacity>
// //             </View>


// //         </ScrollView>
// //     );
// // };




// // const styles = StyleSheet.create({
// //     container: {
// //         elevation: 10,
// //         backgroundColor: 'white',
// //         borderRadius: 10,
// //         margin: heightPercentageToDP('1%'),
// //         paddingVertical: '3%',
// //         paddingHorizontal: '3%',
// //     },
// //     root: {
// //         padding: '3%',
// //         flexDirection: 'row',
// //         marginTop: '3%',
// //     },
// //     input: {
// //         borderBottomWidth: 1,
// //         height: 'auto',
// //         marginTop: '4%',
// //         width: '60%',
// //         borderRadius: 10,
// //         marginLeft: 'auto',
// //         color: 'black',
// //         padding: '3%'
// //     },
// //     button: {
// //         alignSelf: 'stretch',
// //         alignItems: 'center',
// //         padding: '5%',
// //         marginTop: '10%',
// //         backgroundColor: '#E38B29',
// //         width: '50%',
// //         alignSelf: 'center',
// //         marginBottom: '5%',
// //         borderRadius: 20
// //     },
// //     btnnext: {
// //         color: 'black',
// //         fontWeight: 'bold',
// //         fontSize: RFValue(13),
// //     },
// //     textf: {
// //         marginTop: '10%',
// //         marginRight: '3%',
// //         fontSize: RFValue(14),
// //         color: 'black',
// //     },
// //     calculateButton: {
// //         alignSelf: 'stretch',
// //         alignItems: 'center',
// //         padding: '3%',
// //         marginTop: '8%',
// //         backgroundColor: '#E38B29',
// //         width: '40%',
// //         alignSelf: 'center',
// //         marginBottom: '3%',
// //         borderRadius: 20,
// //         marginLeft: '3%',
// //     },
// //     displayBMI: {
// //         borderBottomWidth: 1,
// //         color: '#2c6975',
// //         height: 'auto',
// //         marginTop: '4%',
// //         width: '25%',
// //         borderRadius: 10,
// //         color: 'black',
// //         padding: '3%',
// //         marginLeft: '8%',
// //     },
// //     subHeading1: {
// //         flex: 1,
// //         fontSize: RFValue(18),
// //         fontWeight: 'bold',
// //         color: "black",
// //         marginBottom: '3%',
// //         marginLeft: '5%',
// //         paddingTop: '5%',
// //     },
// //     line: {
// //         borderBottomColor: 'black',
// //         borderBottomWidth: 1,
// //         width: '90%',
// //         marginVertical: '3%',
// //         alignSelf: 'flex-start',
// //         marginLeft: '3%',
// //     },
// //     radioContainer: {
// //         flexDirection: 'row',
// //         marginRight: '20%',
// //         marginTop: '8%',
// //     },
// //     radioButton: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         marginTop: '2%',
// //     },
// //     radioLabel: {
// //         fontSize: RFValue(13),
// //         color: 'black',
// //         marginBottom: '8%',
// //         marginLeft: '3%',
// //         marginTop: '8%',
// //         marginRight: '15%'




// //     },
// //     select: {
// //         alignItems: 'center',
// //         padding: '5%',
// //         marginTop: '8%',
// //         backgroundColor: '#E38B29',
// //         width: '50%',
// //         marginBottom: '3%',
// //         borderRadius: 20,
// //         alignSelf: 'flex-start',
// //         marginLeft: '5%',
// //     },
// //     checkboxContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         marginBottom: '5%',
// //         paddingTop: '2%',
// //     },
// //     checkboxLabel: {
// //         marginLeft: '5%',
// //         fontSize: RFValue(13),
// //         color: 'black',
// //     },
// //     subHeading: {
// //         flex: 1,
// //         fontSize: RFValue(15),
// //         fontWeight: 'bold',
// //         color: "black",
// //     },


// //     input1: {
// //         borderBottomWidth: 1,
// //         height: 'auto',
// //         marginTop: '0%',
// //         width: '60%',
// //         borderRadius: 10,
// //         marginLeft: 'auto',
// //         color: 'black',
// //         padding: '1%'


// //     },
// // });


// // const pickerSelectStyles = StyleSheet.create({
// //     inputAndroid: {
// //         fontSize: 12,
// //         paddingHorizontal: 10,
// //         paddingVertical: 8,
// //         borderWidth: 0.5,
// //         borderColor: 'black',
// //         borderRadius: 8,
// //         color: 'black',
// //         paddingRight: 90,
// //         //marginBottom: 0,
// //         marginRight: 10,
// //         height: 69,
// //         width: 150,
// //     },
// // });




// // export default PhysicalExamination;