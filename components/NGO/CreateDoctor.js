// import React, { useState,useContext} from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import DatePicker from '../DatePicker';
// import AgeCalculator from '../AgeCalculator';
// import { AuthContext } from '../AuthContext';
// import config from '../config';
// import axios from 'axios';


// const CreateDoctor = ({navigation}) => {

//     const { userName } = useContext(AuthContext);
//     console.log("THis is the", userName)
//     const [doctorFirstName, setDoctorFirstName] = useState('');
//     const [doctorMiddleName, setDoctorMiddleName] = useState('');
//     const [doctorLastName, setDoctorLastName] = useState('');
//     const [kishoriVarg, setKishoriVarg] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [selectedDate, setSelectedDate] = useState('');
//     const [originalSelectedDate, setOriginalSelectedDate] = useState('');
//     const [enteredAge, setEnteredAge] = useState('');
//     const [aadharNumber, setAadharNumber] = useState('');
//     const [registrationNumber, setRegistrationNumber] = useState('');
//     const [gender, setGender] = useState('');
//     const [maritalStatus, setMaritalStatus] = useState('');
//     const [religion, setReligion] = useState('');
//     const [caste, setCaste] = useState('');
//     const [flatNumber, setFlatNumber] = useState('');
//     const [area, setArea] = useState('');
//     const [landmark, setLandmark] = useState('');
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [state, setState] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [anameError, setANameError] = useState(false);
//     const [fnameError, setFNameError] = useState(false);
//     const [mnameError, setMNameError] = useState(false);
//     const [lnameError, setLNameError] = useState(false);
//     const [inputError, setInputError] = useState(false);




//     const handleDateSelect = (date) => {
//         console.log("Selected Date (from DatePicker):", date);
//         setSelectedDate(date);
//         setEnteredAge('');
//     };




//     const handleAgeEntered = (isAgeEntered) => {
//         if (isAgeEntered) {
//           setSelectedDate(''); // Reset selected date when age is entered directly
//         }
//     };




//     const handleAgeChange = (age) => {
//         setOriginalSelectedDate(selectedDate);
//         setEnteredAge(age);
        
//         setSelectedDate(''); // Reset selected date when age is calculated
//       };
 
 
//     const saveData = async() => {
       


//         console.log("Original Selected Date:", originalSelectedDate);

//         let errorCount = 0;
//         const passwordRegex = /^\d{12,}$/;
//         const nameRegex = /^[A-Za-z\s]+$/;

//         if (!passwordRegex.test(aadharNumber)) {
//             setANameError('aadhar 12 integers only 0-9 should be ');
//           errorCount++;
//         }
//         if (!nameRegex.test(doctorFirstName)) {
//             setFNameError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!nameRegex.test(doctorMiddleName) ) {
//             setMNameError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!nameRegex.test(doctorLastName)) {
//             setLNameError('name should be only A-za-z');
//           errorCount++;
//         }


//         else if (errorCount > 0) {
//             // Handle the case where there are missing inputs
//             console.log('Please fill in all the required fields.');
//             return;
//         }
//         else


//         console.log('sign in')




//         try {

//                 console.log("Data", aadharNumber, registrationNumber );
//             const doctorFullName = `${doctorFirstName} ${doctorMiddleName} ${doctorLastName}`;


//             const response = await axios.post(`${config.API_BASE_URL}/saveDoctorData`, {
//                 doctorFullName: doctorFullName,
//                 kishoriVarg: kishoriVarg,
//                 phoneNumber: phoneNumber,
//                 selectedDate: originalSelectedDate,
//                 enteredAge: enteredAge,
//                 aadharNumber: aadharNumber,
//                 registrationNumber: registrationNumber,
//                 gender: gender,
//                 maritalStatus: maritalStatus,
//                 religion: religion,
//                 caste: caste,
//                 flatNumber: flatNumber,
//                 area: area,
//                 landmark: landmark,
//                 city: city,
//                 district: district,
//                 state: state,
//                 pincode: pincode,
//                 userName:userName,





//             });


//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen


//             Alert.alert(
//                 'Success',
//                 'Doctor created successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('NGO') }
//                 ],
//                 { cancelable: false }
//               );
             


//         } catch (error) {
//           console.log(error)
//           // Handle error, e.g., show an error message
//           if (error.response && error.response.status === 500) {
//             Alert.alert(
//                 'Failed to create doctor details',
//                 'doctor details already exists','Check Filled details'
//                 [
//                   { text: 'OK', onPress: () => console.log('OK') }
//                 ],
//                 { cancelable: false }
//               );
    
//         }
     
//          else{
//           // Show error message
//           Alert.alert(
//             'Error',
//             'Error creating doctor. Please try again.',
//             [
//               { text: 'OK', onPress: () => console.log('OK Pressed') }
//             ],
//             { cancelable: false }
//           );
//         }
//         }
   
//     };


//     return (


//         <ScrollView >

//             <View style={styles.container}> 


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="First Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setDoctorFirstName(text)}
//                     value={doctorFirstName}>
//                 </TextInput>
                
//             </View>  


//             {fnameError ? <Text style ={{color:'red',marginLeft :10}}>{fnameError}</Text>:null}




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Middle Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setDoctorMiddleName(text)}
//                     value={doctorMiddleName}>
//                 </TextInput>
//             </View>  

//             {mnameError ? <Text style ={{color:'red',marginLeft :10}}>{mnameError}</Text> : null}



//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Last Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setDoctorLastName(text)}
//                     value={doctorLastName}>
//                 </TextInput>
//             </View>
               
//             {lnameError ? <Text style ={{color:'red',marginLeft :10}}>{lnameError}</Text>:null}




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Kishori Varg"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setKishoriVarg(text)}                        
//                     value={kishoriVarg}>
//                 </TextInput>
//             </View>
       
            



//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Phone Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setPhoneNumber(text)}
//                     value={phoneNumber}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>
//                 <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
//                 <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
//             </View>




//             <View style={styles.root}>
//             <Text style={[styles.textf, {marginRight: '25%'}]}>Age/{"\n"}वय</Text>
//                 <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Aadhar Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setAadharNumber(text)}                        
//                     value={aadharNumber}>
//                 </TextInput>
//             </View>


//             {anameError ? <Text style ={{color:'red',marginLeft :10}}>{anameError}</Text> : null}


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Registration{"\n"}Number/{"\n"}रजिस्ट्रेशन नंबर</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Registration Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setRegistrationNumber(text)}                        
//                     value={registrationNumber}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.radioContainer}>
//                 <Text style={styles.radioLabel}>Gender/लिंग</Text>            
//                 <View style={styles.radioButton}>
//                     <Text style={{fontSize: RFValue(13), color: 'black', marginLeft: 'auto'}}>Female</Text>
//                     <RadioButton
//                         value="Female"
//                         status={ gender === 'Female' ? 'checked' : 'unchecked' }
//                         onPress={() => setGender('Female')}
//                         color="#E38B29"
//                     />
//                 </View>
//                 </View>


//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Male</Text>
//                     <RadioButton
//                         value="Male"
//                         status={ gender === 'Male' ? 'checked' : 'unchecked' }
//                         onPress={() => setGender('Male')}
//                         color="#E38B29"
//                     />
//                 </View>
            




//             <View style={styles.radioContainer}>  
//                 <Text style={styles.radioLabel}>Marital Status/{"\n"}वैवाहिक स्थिती</Text>        
//                 <View style={styles.radioButton}>
//                     <Text style={{fontSize: RFValue(13), color: 'black', marginLeft: 'auto'}}>Married</Text>
//                     <RadioButton
//                         value="Married"
//                         status={ maritalStatus === 'Married' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Married')}
//                         color="#E38B29"
//                     />
//                 </View>
//                 </View>


//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '37%'}}>Unmarried</Text>
//                     <RadioButton
//                         value="Unmarried"
//                         status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Unmarried')}
//                         color="#E38B29"
//                     />
//                 </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Religion/{"\n"}धर्म</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Religion"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setReligion(text)}                        
//                     value={religion}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Caste/{"\n"}जात</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Caste"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setCaste(text)}                        
//                     value={caste}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Flat Number/{"\n"}फ्लॅट क्रमांक</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Flat Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setFlatNumber(text)}
//                     value={flatNumber}>
//                 </TextInput>
//             </View>
           


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Area/प्रदेश</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Area"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setArea(text)}
//                     value={area}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Landmark/{"\n"}लॅंडमार्क</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Landmark"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setLandmark(text)}
//                     value={landmark}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>City/शहर</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="City"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setCity(text)}
//                     value={city}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>District/जिल्हा</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="District"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setDistrict(text)}
//                     value={district}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>State/राज्य</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="State"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setState(text)}
//                     value={state}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Pincode/{"\n"}पिनकोड</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Pincode"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setPincode(text)}
//                     value={pincode}>
//                 </TextInput>
//             </View>




//             <TouchableOpacity style = {styles.button} onPress={saveData}>
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
//     },errorText: {
//         color: 'red', // Set the color to red or any other color you prefer
//         fontSize: 14,  // Set the font size as needed
//         marginTop: 5,  // Adjust the margin as needed
//       },
//     root: {
//         padding: '3%',
//         flexDirection:'row',
//         marginTop: '3%',
//     },
//     textf:{
//         marginTop:'5%',
//         marginRight:'4%',
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
// });

   
// export default CreateDoctor;



import React, { useState,useContext} from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from '../DatePicker';
import AgeCalculator from '../AgeCalculator';
import { AuthContext } from '../AuthContext';
import config from '../config';
import axios from 'axios';
import { transformNumber } from '../Transformation';


const CreateDoctor = ({navigation}) => {


    const { userName } = useContext(AuthContext);
    const [doctorFirstName, setDoctorFirstName] = useState('');
    const [doctorMiddleName, setDoctorMiddleName] = useState('');
    const [doctorLastName, setDoctorLastName] = useState('');
    const [kishoriVarg, setKishoriVarg] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [originalSelectedDate, setOriginalSelectedDate] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [caste, setCaste] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [anameError, setANameError] = useState(false);
    const [fnameError, setFNameError] = useState(false);
    const [mnameError, setMNameError] = useState(false);
    const [lnameError, setLNameError] = useState(false);
    const [kvError, setKVError] = useState(false);
    const [RGError, setRGError] = useState(false);
    const [rError, setRError] = useState(false);
    const [cError, setCError] = useState(false);
    const [pError, setPError] = useState(false);
    const [mError, setmError] = useState(false);
    const [gError, setgError] = useState(false);






    const handleDateSelect = (date) => {
        console.log("Selected Date (from DatePicker):", date);
        setSelectedDate(date);
        setEnteredAge('');
    };








    const handleAgeEntered = (isAgeEntered) => {
        if (isAgeEntered) {
          setSelectedDate(''); // Reset selected date when age is entered directly
        }
    };








    const handleAgeChange = (age) => {
        setOriginalSelectedDate(selectedDate);
        setEnteredAge(age);
       
        setSelectedDate(''); // Reset selected date when age is calculated
      };
 
 
    const saveData = async() => {
       




        let errorCount = 0;
        const passwordRegex = /^\d{12,}$/;
        const nameRegex = /^[A-Za-z\s]+$/;


        if (!passwordRegex.test(aadharNumber)) {
            setANameError('Aadhar number should be of 12 integers,\ncontainig any numbers between 0-9');
          errorCount++;
        }
        if (!nameRegex.test(doctorFirstName)) {
            setFNameError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!nameRegex.test(doctorMiddleName) ) {
            setMNameError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!nameRegex.test(doctorLastName)) {
            setLNameError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!kishoriVarg) {
            setKVError('Enter Kishori Varga!');
          errorCount++;
        }if (!registrationNumber) {
            setRGError('Enter registration number!');
          errorCount++;
        }
        if (!phoneNumber) {
            setPError('Enter phone number!');
          errorCount++;
        }
        if (!maritalStatus) {
            setmError('Select Marital Status!');
          errorCount++;
        }
        if (!gender) {
            setgError('Select Marital Status!');
          errorCount++;
        }




        else if (errorCount > 0) {
            // Handle the case where there are missing inputs
            console.log('Please fill in all the required fields.');
            return;
        }
        else




        try {


         
            const doctorFullName = `${doctorFirstName.trim()} ${doctorMiddleName.trim()} ${doctorLastName.trim()}`;
            const maskedAadhar = transformNumber(aadharNumber);




            const response = await axios.post(`${config.API_BASE_URL}/saveDoctorData`, {
                doctorFullName: doctorFullName,
                kishoriVarg: kishoriVarg,
                phoneNumber: phoneNumber,
                selectedDate: originalSelectedDate,
                enteredAge: enteredAge,
                aadharNumber: maskedAadhar,
                registrationNumber: registrationNumber,
                gender: gender,
                maritalStatus: maritalStatus,
                religion: religion,
                caste: caste,
                flatNumber: flatNumber,
                area: area,
                landmark: landmark,
                city: city,
                district: district,
                state: state,
                pincode: pincode,
                userName:userName,










            });




            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen




            Alert.alert(
                'Success',
                'Doctor created successfully',
                [
                  { text: 'OK', onPress: () => navigation.navigate('NGO') }
                ],
                { cancelable: false }
              );
             




        } catch (error) {
         // console.log(error)
          // Handle error, e.g., show an error message
          if (error.response && error.response.status === 500) {
            if (error.response.data.error === 'Error saving doctor data') {
                // Duplicate entry error
                Alert.alert(
                    'Failed to create doctor details',
                    'Doctor details already exist or there is an issue with the data. Please check and try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK') }
                    ],
                    { cancelable: false }
                );
            }
        } else {
            // Handle other types of errors if needed
            Alert.alert(
                'Error',
                'Error creating doctor. Please fill all the required details.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }
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




            {fnameError ? <Text style ={{color:'red',marginLeft :10}}>{fnameError}</Text>:null}










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


            {mnameError ? <Text style ={{color:'red',marginLeft :10}}>{mnameError}</Text> : null}










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
               
            {lnameError ? <Text style ={{color:'red',marginLeft :10}}>{lnameError}</Text>:null}








            <View style={styles.root}>                  
                <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Kishori Varg"
                    placeholderTextColor="gray"
                    onChangeText={text => setKishoriVarg(text)}                        
                    value={kishoriVarg}>
                </TextInput>
            </View>
            {kvError ? <Text style ={{color:'red',marginLeft :10}}>{kvError}</Text>:null}
           






            <View style={styles.root}>                  
                <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setPhoneNumber(text)}
                    value={phoneNumber}>
                </TextInput>
            </View>
            {pError ? <Text style ={{color:'red',marginLeft :10}}>{pError}</Text>:null}








            <View style={styles.root}>
                <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
            </View>








            <View style={styles.root}>
            <Text style={[styles.textf, {}]}>Age/वय</Text><Text style={{ color: 'red',marginTop:'5%', marginRight: '25%' }}>*</Text>
                <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Aadhar Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setAadharNumber(text)}                        
                    value={aadharNumber}>
                </TextInput>
            </View>




            {anameError ? <Text style ={{color:'red',marginLeft :10}}>{anameError}</Text> : null}




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
            {RGError ? <Text style ={{color:'red',marginLeft :10}}>{RGError}</Text>:null}








            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Gender/लिंग</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>          
                <View style={styles.radioButton}>
                    <Text style={{fontSize: RFValue(13), color: 'black', marginLeft: 'auto'}}>Female</Text>
                    <RadioButton
                        value="Female"
                        status={ gender === 'Female' ? 'checked' : 'unchecked' }
                        onPress={() => setGender('Female')}
                        color="#E38B29"
                    />
                </View>
                </View>




                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Male</Text>
                    <RadioButton
                        value="Male"
                        status={ gender === 'Male' ? 'checked' : 'unchecked' }
                        onPress={() => setGender('Male')}
                        color="#E38B29"
                    />
                </View>
                {gError ? <Text style ={{color:'red',marginLeft :10}}>{gError}</Text>:null}


           








            <View style={styles.radioContainer}>  
            <Text style={styles.radioLabel}>Marital Status/{"\t\t"}<Text style={{ color: 'red',marginTop:'5%',marginLeft:'10%', marginRight: '15%' }}>*</Text>{"\n"}वैवाहिक स्थिती</Text>            
                <View style={styles.radioButton}>
                    <Text style={{fontSize: RFValue(13), color: 'black', marginLeft: 'auto'}}>Married</Text>
                    <RadioButton
                        value="Married"
                        status={ maritalStatus === 'Married' ? 'checked' : 'unchecked' }
                        onPress={() => setMaritalStatus('Married')}
                        color="#E38B29"
                    />
                </View>
                </View>




                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '37%'}}>Unmarried</Text>
                    <RadioButton
                        value="Unmarried"
                        status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
                        onPress={() => setMaritalStatus('Unmarried')}
                        color="#E38B29"
                    />
                </View>
                {mError ? <Text style ={{color:'red',marginLeft :10}}>{mError}</Text>:null}






            <View style={styles.root}>                  
                <Text style={styles.textf}>Religion/{"\n"}धर्म</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Religion"
                    placeholderTextColor="gray"
                    onChangeText={text => setReligion(text)}                        
                    value={religion}>                      
                </TextInput>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>Caste/{"\n"}जात</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Caste"
                    placeholderTextColor="gray"
                    onChangeText={text => setCaste(text)}                        
                    value={caste}>                      
                </TextInput>
            </View>






            <View style={styles.root}>                  
                <Text style={styles.textf}>Flat Number/{"\n"}फ्लॅट क्रमांक</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Flat Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setFlatNumber(text)}
                    value={flatNumber}>
                </TextInput>
            </View>
           




            <View style={styles.root}>                  
                <Text style={styles.textf}>Area/प्रदेश</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Area"
                    placeholderTextColor="gray"
                    onChangeText={text => setArea(text)}
                    value={area}>
                </TextInput>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>Landmark/{"\n"}लॅंडमार्क</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Landmark"
                    placeholderTextColor="gray"
                    onChangeText={text => setLandmark(text)}
                    value={landmark}>
                </TextInput>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>City/शहर</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="City"
                    placeholderTextColor="gray"
                    onChangeText={text => setCity(text)}
                    value={city}>
                </TextInput>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>District/जिल्हा</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="District"
                    placeholderTextColor="gray"
                    onChangeText={text => setDistrict(text)}
                    value={district}>
                </TextInput>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>State/राज्य</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="State"
                    placeholderTextColor="gray"
                    onChangeText={text => setState(text)}
                    value={state}>
                </TextInput>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>Pincode/{"\n"}पिनकोड</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pincode"
                    placeholderTextColor="gray"
                    onChangeText={text => setPincode(text)}
                    value={pincode}>
                </TextInput>
            </View>








            <TouchableOpacity style = {styles.button} onPress={saveData}>
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
    },errorText: {
        color: 'red', // Set the color to red or any other color you prefer
        fontSize: 14,  // Set the font size as needed
        marginTop: 5,  // Adjust the margin as needed
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


   
export default CreateDoctor;
