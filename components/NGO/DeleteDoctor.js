import React, { useState} from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DatePicker from '../DatePicker';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import config from '../config';
import axios from 'axios';


const DeleteDoctor = ({navigation}) => {

    const [doctorFirstName, setDoctorFirstName] = useState('');
    const [doctorMiddleName, setDoctorMiddleName] = useState('');
    const [doctorLastName, setDoctorLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [leavingDate, setSelectedDate] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [nameError, setNameError] = useState(false);
    const [inputError, setInputError] = useState(false);


    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setEnteredAge('');
    };


    const handleAgeEntered = (isAgeEntered) => {
        if (isAgeEntered) {
          setSelectedDate(''); // Reset selected date when age is entered directly
        }
    };

    const deleteData = () => {
        Alert.alert(
            'Success',
            'Doctor deleted successfully',
            [
                { text: 'OK', onPress: () => navigation.navigate('NGO') }
            ],
            { cancelable: false }
        );
      }


    const handleAgeChange = (age) => {
        setEnteredAge(age);
        setSelectedDate(''); // Reset selected date when age is entered directly
      };
  
  
    const deleteData1 = async() => {
        // if(!doctorFirstName || doctorLastName || kishoriVarg){
        //     setNameError(true)
        // }
        // else if(doctorFirstName || doctorLastName || kishoriVarg){
        //     setNameError(false)
        // }
        // if(typeof doctorFirstName || doctorLastName || kishoriVarg =='string'){
        //     setInputError(true);
        // }
        // else if(typeof doctorFirstName || doctorLastName || kishoriVarg !='string' ){
        //     setInputError(false);
        // }

        // console.log('sign in')

        try {
            const doctorFullName = `${doctorFirstName} ${doctorMiddleName} ${doctorLastName}`.trim();
            const response = await axios.post(`${config.API_BASE_URL}/deleteDoctor`, {
                registrationNumber: registrationNumber,
            });

            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            navigation.navigate('NGO'); 

        } catch (error) {
          console.error('API request error:', error);
          // Handle error, e.g., show an error message
        }
    
    };

    return (

        <ScrollView >

            <View style={styles.container}>

            <View style={styles.root}>                  
                <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {styles.input} 
                    placeholder="First Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setDoctorFirstName(text)} 
                    value={doctorFirstName}>
                </TextInput>
            </View>  

            {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter first name *</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {styles.input} 
                    placeholder="Middle Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setDoctorMiddleName(text)} 
                    value={doctorMiddleName}>
                </TextInput>
            </View>  


            <View style={styles.root}>                  
                <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {styles.input} 
                    placeholder="Last Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setDoctorLastName(text)} 
                    value={doctorLastName}>
                </TextInput>
            </View>
                
            {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter last name *</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text>
                <TextInput 
                    style = {styles.input} 
                    placeholder="Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setPhoneNumber(text)} 
                    value={phoneNumber}>
                </TextInput>
            </View>


            {/* <View style={styles.root}>
                <Text style={styles.textf}>Leaving Date/{"\n"}सोडण्याची तारीख</Text>
                <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/>
            </View> */}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Registration{"\n"}Number/{"\n"}रजिस्ट्रेशन नंबर</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput 
                    style = {styles.input} 
                    placeholder="Registration Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setRegistrationNumber(text)}                         
                    value={registrationNumber}>                       
                </TextInput>
            </View>

           
            <TouchableOpacity style = {styles.button} onPress={deleteData1}>
                <Text style = {styles.btnnext}>Delete</Text>
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
        alignSelf: 'center',
        marginBottom:'10%',
        borderRadius:20,
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
});
    
export default DeleteDoctor;