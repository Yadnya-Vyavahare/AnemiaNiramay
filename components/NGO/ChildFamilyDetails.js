
import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet,Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import config from '../config';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
//for dropdown
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../AuthContext';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const ChildFamilyDetails = ({navigation}) => {  
    const { userName } = useContext(AuthContext);
    console.log("THis is the", userName)
    const route = useRoute();
    const childFullName = route.params.childFullName;
    
    const [fatherFirstName, setFatherFirstName] = useState('');
    const [fatherMiddleName, setFatherMiddleName] = useState('');
    const [fatherLastName, setFatherLastName] = useState('');
    const [fatherPhoneNumber, setFatherPhoneNumber] = useState('');
    const [fatherAadharNumber, setFatherAadharNumber] = useState('');
    const [fatherAge, setFatherAge] = useState('');
    const [fatherEducation, setFatherEducation] = useState('');
    const [fatherIllness, setFatherIllness] = useState('');
    const [fatherAddiction, setFatherAddiction] = useState('');
    const [motherFirstName, setMotherFirstName] = useState('');
    const [motherMiddleName, setMotherMiddleName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [motherPhoneNumber, setMotherPhoneNumber] = useState('');
    const [motherAadharNumber, setMotherAadharNumber] = useState('');
    const [motherAge, setMotherAge] = useState('');
    const [motherEducation, setMotherEducation] = useState('');
    const [motherIllness, setMotherIllness] = useState('');
    const [motherAddiction, setMotherAddiction] = useState('');
    const [familyType, setFamilyType] = useState('');
    const [familyIncome, setFamilyIncome] = useState('');
    const [fFNError, setFFNError] = useState(false);
    const [fLNError, setFLNError] = useState(false);
    const [mFNError, setMFNError] = useState(false);
    const [mMNError, setMMNError] = useState(false);
    const [mLNError, setMLNError] = useState(false);
    const[fENError, setFENError] = useState(false);
    const [fONError, setFONError] = useState(false);
    const[mENError, setMENError] = useState(false);
    const [mONError, setMONError] = useState(false);
    


//for custom dropdown.
const [fatherOccupation, setFatherOccupation] = useState('');
const [motherOccupation, setMotherOccupation] = useState('');
const [customFatherOccupation, setCustomFatherOccupation] = useState('');
const [customMotherOccupation, setCustomMotherOccupation] = useState('');

    const [hasSiblings, setHasSiblings] = useState(undefined);
    const [numberOfSiblings, setNumberOfSiblings] = useState('');
    const [childDetails, setChildDetails] = useState([]);

    // const [familyIllness, setFamilyIllness] = useState('');
    // const [customFamilyIllness, setCustomFamilyIllness] = useState('');
    
    const [hasFamilyIllness, setHasFamilyIllness] = useState(undefined);
    const [familyIllness, setFamilyIllness] = useState('');
    const [customFamilyIllness, setCustomFamilyIllness] = useState('');


const fatherOccupationOptions = [
    'DAILY WAGE WORKER',
    'RAGPICKER',
    'SECURITY',
    'PAINTER',
    'DRIVER MAMA',
    'ENGINEER',
    'OTHER',
];


const motherOccupationOptions = [
    'HOUSEWIFE',
    'DAILY WAGE WORKER',
    'DOMESTIC HELP',
    'NURSE',
    'RAGPICKER',
    'OTHER',
];

const familyIllnessOptions = [
    'DIABETES',
    'TB',
    'PANDUROG',
    'ASTHMA',
    'HYPERTENSION',
    'EPILEPSY',
    'BLEEDING_DISORDERS',
    'OTHER',
];


const addChild = () => {
    if (childDetails.length < parseInt(numberOfSiblings)) {
        const newChild = { name: '', age: '', isAnemic: false };
        setChildDetails([...childDetails, newChild]);
    }
};



const onNextPressed = async () => {

    let errorCount = 0;
    const passwordRegex = /^\d{12,}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    if(!fatherOccupation){
        setFONError('Enter Fathers Occupation!');
            errorCount++;
    }
    if(!fatherEducation){
        setFENError('Enter Fathers Education!');
            errorCount++;
    }
    if(!motherEducation){
        setMENError('Enter mothers Education!');
            errorCount++;
    }
    if(!motherOccupation){
        setMONError('Enter mothers Occupation!');
            errorCount++;
    }    
    // }if(!numberOfSiblings){
    //     setNSError('Enter no. of Sibling!');
    //         errorCount++;
    // }
    if (!nameRegex.test(fatherFirstName)) {
        setFFNError('name should be only A-za-z');
      errorCount++;
    }
    if (!nameRegex.test(fatherLastName) ) {
        setFLNError('name should be only A-za-z');
      errorCount++;
    }
  
    if (!nameRegex.test(motherFirstName)) {
        setMFNError('name should be only A-za-z');
      errorCount++;
    }
    if (!nameRegex.test(motherMiddleName)) {
        setMMNError('name should be only A-za-z');
      errorCount++;
    }
    if (!nameRegex.test(motherLastName)) {
        setMLNError('name should be only A-za-z');
      errorCount++;
    }


    else if (errorCount > 0) {
        // Handle the case where there are missing inputs
        console.log('Please fill in all the required fields.');
        return;
    }
    else


       
    try {
        const fatherFullName = `${fatherFirstName} ${fatherMiddleName} ${fatherLastName}`
        const motherFullName = `${motherFirstName} ${motherMiddleName} ${motherLastName}`
        const response = await axios.post(`${config.API_BASE_URL}/createChildPersonalFamily`, {
            childFullName,
            fatherFullName,
    fatherPhoneNumber,
    fatherAadharNumber,
    fatherAge,
    fatherEducation,
    fatherOccupation,
    fatherIllness,
    fatherAddiction,
    motherFullName,
    motherPhoneNumber,
    motherAadharNumber,
    motherAge,
    motherEducation,
    motherOccupation,
    motherIllness,
    motherAddiction,
    familyType,
    numberOfSiblings: numberOfSiblings || null,
    familyIllness,
    familyIncome,userName,
        });
        console.log(response.data.message);
      // Handle success, e.g., show a success message or navigate to another screen
      // Show success message
    Alert.alert(
        'Success',
        'Data updated successfully',
        [
          { text: 'OK', onPress: () => navigation.navigate('ChildMedicalDetails',{childFullName:childFullName}) }
        ],
        { cancelable: false }
      );
 
      // Handle success, e.g., show a success message or navigate to another screen
    } catch (error) {
      //console.error('API request error:', error);

      if (error.response && error.response.status === 500) {
        Alert.alert(
            'Failed to create family details',
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
      // Handle error, e.g., show an error message
    }
  };


    return (

        <ScrollView >

            <View style={styles.container}>

            <View style={styles.root}>                  
                    <Text style={styles.textf}>Child Name/{"\n"}पूर्ण नाव</Text>
                    <TextInput
                        style = {[styles.input, {color: 'gray', marginRight: '5%', width: '65%'}]}  
                        placeholder="Child Name"
                        editable={false}
                        value={childFullName}>
                    </TextInput>
                </View>  

                <View style={styles.line}></View>

            <Text style = {styles.subHeading1}>Father's Information/वडीलांची माहिती</Text>

            <View style={styles.line}></View>

            <View style={styles.root}>                  
                <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: '10%' }]} 
                    placeholder="Father's First Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherFirstName(text)} 
                    value={fatherFirstName}>
                </TextInput>
            </View>  
            {fFNError ? <Text style ={{color:'red',marginLeft :10}}>{fFNError}</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 25 }]} 
                    placeholder="Father's Middle Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherMiddleName(text)} 
                    value={fatherMiddleName}>
                </TextInput>
            </View> 


            <View style={styles.root}>                  
                <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 42 }]}  
                    placeholder="Father's Last Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherLastName(text)} 
                    value={fatherLastName}>
                </TextInput>
            </View>
             {fLNError ? <Text style ={{color:'red',marginLeft :10}}>{fLNError}</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 62 }]}   
                    placeholder="Father's Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherPhoneNumber(text)} 
                    value={fatherPhoneNumber}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 47 }]}   
                    placeholder="Father's Aadhar Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherAadharNumber(text)}                         
                    value={fatherAadharNumber}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Age/{"\n"}वय</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 90 }]}   
                    placeholder="Father's Age"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherAge(text)}                         
                    value={fatherAge}>                       
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Education/{"\n"}शिक्षण</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 50 }]} 
                    placeholder="Father's Education"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherEducation(text)}
                    value={fatherEducation}>
                </TextInput>
            </View> 
            {fENError ? <Text style ={{color:'red',marginLeft :10}}>{fENError}</Text>:null}





            <View style={styles.root}>                  
                <Text style={styles.textf}>Illness/{"\n"}आजार</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 75 }]}   
                    placeholder="Father's Illness"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherIllness(text)}
                    value={fatherIllness}>
                </TextInput>
            </View> 
   

            <View style={styles.root}>                  
                <Text style={styles.textf}>Addiction/{"\n"}व्यसन</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 55 }]}  
                    placeholder="Father's Addiction"
                    placeholderTextColor="gray"
                    onChangeText={text => setFatherAddiction(text)}
                    value={fatherAddiction}>
                </TextInput>
            </View>



<View style={styles.root}>
    <Text style={styles.textf}>Fathers Occupation/{"\n"}व्यवसाय</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
 
    <Picker
        style={styles.input}
        selectedValue={fatherOccupation}
        onValueChange={(itemValue) => {
            setFatherOccupation(itemValue);
            if (itemValue === 'OTHER') {
                setCustomFatherOccupation('');
            }
        }}
    >
        <Picker.Item label="Select Occupation" value="" />
        {fatherOccupationOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
        ))}
    </Picker>
    </View>
    <View style={[styles.root,{marginLeft:'3%'}]}>
    {fatherOccupation === 'OTHER' && (
        <TextInput
           // style={styles.input}
            style={[styles.input, { marginLeft: '40%'}]}
            placeholder="Enter Other Occupation"
            onChangeText={(text) => setCustomFatherOccupation(text)}
            value={customFatherOccupation}
        />
    )}
</View>
{fONError ? <Text style ={{color:'red',marginLeft :10}}>{fONError}</Text>:null}


             <Text style = {styles.subHeading1}>Mother's Information/आईची माहिती</Text>

             <View style={styles.line}></View>


             <View style={styles.root}>                  
                 <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                 <TextInput 
                    style = {[styles.input, { marginLeft: 42 }]} 
                    placeholder="Mother's First Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherFirstName(text)} 
                    value={motherFirstName}>
                </TextInput>
            </View>  
            {mFNError ? <Text style ={{color:'red',marginLeft :10}}>{mFNError}</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 25 }]} 
                    placeholder="Mother's Middle Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherMiddleName(text)} 
                    value={motherMiddleName}>
                </TextInput>
            </View> 
            {mMNError ? <Text style ={{color:'red',marginLeft :10}}>{mMNError}</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 42 }]}  
                    placeholder="Mother's Last Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherLastName(text)} 
                    value={motherLastName}>
                </TextInput>
            </View> 
            {mLNError ? <Text style ={{color:'red',marginLeft :10}}>{mLNError}</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 62 }]}   
                    placeholder="Mother's Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherPhoneNumber(text)} 
                    value={motherPhoneNumber}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 47 }]}   
                    placeholder="Mother's Aadhar Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherAadharNumber(text)}                         
                    value={motherAadharNumber}>
                </TextInput>
            </View>

            <View style={styles.root}>                  
                <Text style={styles.textf}>Age/{"\n"}वय</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 90 }]}   
                    placeholder="Mother's Age"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherAge(text)}                         
                    value={motherAge}>                       
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Education/{"\n"}शिक्षण</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 50 }]}
                    placeholder="Mother's Education"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherEducation(text)}
                    value={motherEducation}>
                </TextInput>
            </View> 
            {mENError ? <Text style ={{color:'red',marginLeft :10}}>{mENError}</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Illness/{"\n"}आजार</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 75 }]}  
                    placeholder="Mother's Illness"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherIllness(text)}
                    value={motherIllness}>
                </TextInput>
            </View> 

            <View style={styles.root}>                  
                <Text style={styles.textf}>Addiction/{"\n"}व्यसन</Text>
                <TextInput 
                    style = {[styles.input, { marginLeft: 55 }]}
                    placeholder="Mother's Addiction"
                    placeholderTextColor="gray"
                    onChangeText={text => setMotherAddiction(text)}
                    value={motherAddiction}>
                </TextInput>
            </View> 


<View style={styles.root}>
    <Text style={styles.textf}>Mothers Occupation/{"\n"}व्यवसाय</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
 
    <Picker
        style={styles.input}
        selectedValue={motherOccupation}
        onValueChange={(itemValue) => {
            setMotherOccupation(itemValue);
            if (itemValue === 'OTHER') {
                setCustomMotherOccupation('');
            }
        }}
    >
        <Picker.Item label="Select Occupation" value="" />
        {motherOccupationOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
        ))}
    </Picker>
    </View>
    <View style={[styles.root,{marginLeft:'3%'}]}>
    {motherOccupation === 'OTHER' && (
        <TextInput
           // style={styles.input}
            style={[styles.input, { marginLeft: '40%'}]}
            placeholder="Enter Other Occupation"
            onChangeText={(text) => setCustomMotherOccupation(text)}
            value={customMotherOccupation}
        />
    )}
</View>
{mONError ? <Text style ={{color:'red',marginLeft :10}}>{mONError}</Text>:null}


             
            <Text style={styles.subHeading1}>Siblings Information/बहिण-भावांची माहिती</Text>
            <View style={styles.line}></View>


            <View style={styles.root}>
                <Text style={styles.textf}>Do you have siblings?{"\n"}बहिण-भाऊ आहेत का?</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, color: 'black', marginLeft: 10 }}>Yes</Text>
                    <RadioButton
                        value={true}
                        status={hasSiblings === true ? 'checked' : 'unchecked'}  // Only check if hasSiblings is explicitly set to true
                        onPress={() => setHasSiblings(true)}
                        color="#E38B29"
                        style={{ marginTop: 12 }}
                    />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, color: 'black', marginLeft: 10 }}>No</Text>
                    <RadioButton
                        value={false}
                        status={hasSiblings === false ? 'checked' : 'unchecked'}  // Only check if hasSiblings is explicitly set to false
                        onPress={() => setHasSiblings(false)}
                        color="#E38B29"
                        style={{ marginTop: 12 }}
                    />
                </View>
            </View>




            {hasSiblings && (
                <View style={styles.root}>
                    <Text style={styles.textf}>
                        Number of Siblings/{"\n"}बहिण-भावांची संख्या
                    </Text>
                    <TextInput
                        style={[styles.input, { marginLeft: 15 }]}
                        placeholder="Number of Siblings"
                        onChangeText={(text) => setNumberOfSiblings(text)}
                        value={numberOfSiblings}
                    />
                </View>
            )}



  

  {childDetails.map((child, index) => (
  <View key={index} style={styles.root1}>
    <Text style={[styles.textf, {flexDirection: 'row'}]}>Child {index + 1} Information</Text>

    {/* Child's Name */}
    <View style={styles.childInfoContainer}>
      <Text style={styles.childInfoLabel}>Child's Name:</Text>
      <TextInput
        style={styles.input1}
        placeholder="Enter Child's Name"
        onChangeText={(text) => {
          const updatedChildDetails = [...childDetails];
          updatedChildDetails[index].name = text;
          setChildDetails(updatedChildDetails);
        }}
        value={child.name}
      />
    </View>

    {/* Age */}
    <View style={styles.childInfoContainer}>
      <Text style={styles.childInfoLabel}>Age:</Text>
      <TextInput
        style={[styles.input1, {marginLeft:'25%'}]}
        placeholder="Enter Age"
        onChangeText={(text) => {
          const updatedChildDetails = [...childDetails];
          updatedChildDetails[index].age = text;
          setChildDetails(updatedChildDetails);
        }}
        value={child.age}
      />
    </View>

    {/* Is Anemic */}
    <View >
      <Text style={styles.childInfoLabel}>Is Anemic:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: 'black', marginRight: 10}}>Yes</Text>
        <RadioButton
          value={true}
          status={child.isAnemic === true ? 'checked' : 'unchecked'}
          onPress={() => {
            const updatedChildDetails = [...childDetails];
            updatedChildDetails[index].isAnemic = true;
            setChildDetails(updatedChildDetails);
          }}
          color="#E38B29"
          style={{ marginTop: 12 }}
        />
        <Text style={{ fontSize: 16, color: 'black', marginLeft: 10 }}>No</Text>
        <RadioButton
          value={false}
          status={child.isAnemic === false ? 'checked' : 'unchecked'}
          onPress={() => {
            const updatedChildDetails = [...childDetails];
            updatedChildDetails[index].isAnemic = false;
            setChildDetails(updatedChildDetails);
          }}
          color="#E38B29"
          style={{ marginTop: 12 }}
        />
      </View>
    </View>
  </View>
))}



            {hasSiblings && childDetails.length < parseInt(numberOfSiblings) && (
                <TouchableOpacity style={styles.button} onPress={addChild}>
                    <Text style={styles.btnnext}>Add Child</Text>
                </TouchableOpacity>
            )}



            <Text style = {styles.subHeading1}>Family Information/कुटुंबाची माहिती</Text>

            <View style={styles.line}></View>

            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Family Type/{"\n"}कुटुंबाचे स्वरुप</Text>            
                <View style={styles.radioButton}>
                    <Text style={{fontSize: RFValue(13), color: 'black', marginLeft: 'auto'}}>Nuclear</Text>
                    <RadioButton
                        value="Nuclear"
                        status={ familyType === 'Nuclear' ? 'checked' : 'unchecked' }
                        onPress={() => setFamilyType('Nuclear')}
                        color="#E38B29"
                    />
                </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '42%'}}>Joint</Text>
                    <RadioButton
                        value="Joint"
                        status={ familyType === 'Joint' ? 'checked' : 'unchecked' }
                        onPress={() => setFamilyType('Joint')}
                        color="#E38B29"
                    />
                </View>
            


                <Text style={styles.textf}>Do you have any family illness?{"\n"}तुम्हाला कौटुंबिक आजार आहे का?</Text>

                <View style={styles.root}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <RadioButton
                        value={true}
                        status={hasFamilyIllness === true ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setHasFamilyIllness(true);
                            setFamilyIllness('');
                            setCustomFamilyIllness('');
                        }}
                        color="#E38B29"
                        style={{ marginTop: 12 }}
                    />
                    <Text style={{ fontSize: 16, color: 'black', marginLeft: 10 }}>Yes</Text>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <RadioButton
                        value={false}
                        status={hasFamilyIllness === false ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setHasFamilyIllness(false);
                            setFamilyIllness('');
                            setCustomFamilyIllness('');
                        }}
                        color="#E38B29"
                        style={{ marginTop: 12 }}
                    />
                    <Text style={{ fontSize: 16, color: 'black', marginLeft: 10 }}>No</Text>
                </View>


            </View>
            {hasFamilyIllness && (
                <View style={styles.root1}>
                    <Text style={styles.textf}> Family Illness/{"\n"}कुटुंबातील आजार</Text>
                    <Picker
                        style={[styles.input, { marginLeft: 41 }]}
                        selectedValue={familyIllness}
                        onValueChange={(itemValue) => {
                            setFamilyIllness(itemValue);
                            if (itemValue === 'OTHER') {
                                setCustomFamilyIllness('');
                            }
                        }}
                    >
                        <Picker.Item label="Select Illness" value="" />
                        {familyIllnessOptions.map((option, index) => (
                            <Picker.Item key={index} label={option} value={option} />
                        ))}
                    </Picker>
                </View>
            )}


            {hasFamilyIllness && familyIllness === 'OTHER' && (
                <View style={styles.root2}>
                    <TextInput
                       // style={[styles.input, { marginLeft: 142}]}
                        style={[styles.input, { marginLeft: '41%'}]}
                        placeholder="Enter Other Illness"
                        onChangeText={(text) => setCustomFamilyIllness(text)}
                        value={customFamilyIllness}
                    />
                </View>
            )}





            <View style={styles.root}>                  
                <Text style={styles.textf}>Annual Family{"\n"}Income/{"\n"}वार्षिक उत्पन्न</Text>
                <TextInput 
                    style = {[styles.input, {marginLeft: 30}]}
                    placeholder="Annual Family Income"
                    placeholderTextColor="gray"
                    onChangeText={text => setFamilyIncome(text)}
                    value={familyIncome}>
                </TextInput>
            </View> 

     
            <TouchableOpacity style = {styles.button} onPress={onNextPressed}>
                <Text style = {styles.btnnext}>Next</Text>
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
    root1: {
        padding: 10,
        flexDirection: 'column',
        marginTop: 10,
        

    },

    root2: {
        padding: 10,
        flexDirection: 'row',
        marginTop: 5,
    

    },

    textf:{
        marginTop:'5%',
        marginRight:'4%',
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
        alignSelf: 'flex-end',
        marginBottom:'10%',
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
        color: 'white',
        height: 'auto',
        marginTop: 'auto',
        width: '50%',
        borderRadius:0,
        color:'black',
        padding:'3%',
        marginLeft: 'auto',
    },
    input1: {
        borderBottomWidth:1,
        height: 'auto',
        marginTop: 'auto',
        width: '50%',
        borderRadius:0,
        color:'black',
        padding:'3%',
        marginLeft: '5%',
    },
    radioContainer: {
        flexDirection:'row',
        marginRight:'20%',
        marginTop: '8%',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
    },
    radioLabel: {
        fontSize: RFValue(13),
        color:'black',
        marginBottom: '8%',
        marginLeft: '3%',
        marginTop: '8%',
        marginRight: '15%'
    },
    subHeading1: {
        flex: 1,
        fontSize: RFValue(13),
        fontWeight: 'bold',
        color: "black",
        marginBottom: '3%',
        marginLeft: '3%',
        paddingTop: '10%',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        marginVertical: '3%', 
        alignSelf: 'flex-start',
        marginLeft: '3%',
    },
    pickerLabel: {
        fontSize: 12,
        color: 'black',
    },

    childInfoLabel: {
        fontSize: 16,
        color: 'black',
        marginBottom: '5%',
        
        marginTop: '10%',
    },
    childInfoContainer: {
        flexDirection: 'row',
    },

});

      
export default ChildFamilyDetails;