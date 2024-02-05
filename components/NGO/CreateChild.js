// import React, { useState, useContext } from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { RadioButton } from 'react-native-paper';
// import DatePicker from '../DatePicker';
// import AgeCalculator from '../AgeCalculator';
// import { AuthContext } from '../AuthContext';
// import axios from 'axios';
// import config from '../config';


// const CreateChild = ({navigation}) => {


//     const { userName } = useContext(AuthContext);
//     console.log("THis is the", userName)
//     const [childFirstName, setChildFirstName] = useState('');
//     const [childMiddleName, setChildMiddleName] = useState('');
//     const [childLastName, setChildLastName] = useState('');
//     const [kishoriVarg, setKishoriVarg] = useState('');  
//     const [selectedDate, setSelectedDate] = useState('');
//     const [originalSelectedDate, setOriginalSelectedDate] = useState('');
//     const [enteredAge, setEnteredAge] = useState('');
//     const [aadharNumber, setAadharNumber] = useState('');
//     const [schoolOrCollege, setSchoolOrCollege] = useState('');
//     const [standard, setStandard] = useState('');
//     const [religion, setReligion] = useState('');
//     const [caste, setCaste] = useState('');
//     const [maritalStatus, setMaritalStatus] = useState('');
//     const [flatNumber, setFlatNumber] = useState('');
//     const [area, setArea] = useState('');
//     const [landmark, setLandmark] = useState('');
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [state, setState] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [firstError, setFirstError] = useState(false);
//     const [MError, setMError] = useState(false);
//     const [fLError, setLError] = useState(false);
//     const [AError, setAError] = useState(false);
   
//     const handleDateSelect = (date) => {
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
        
//         setSelectedDate(''); // Reset selected date when age is entered directly
//       };


//       const onNextPressed = async() => {
//         let errorCount = 0;
//         const passwordRegex = /^\d{12,}$/;
//         const nameRegex = /^[A-Za-z\s]+$/;

//         if (!passwordRegex.test(aadharNumber)) {
//             setAError('aadhar 12 integers only 0-9 should be ');
//           errorCount++;
//         }
//         if (!nameRegex.test(childFirstName)) {
//             setFirstError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!nameRegex.test(childMiddleName) ) {
//             setMError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!nameRegex.test(childLastName)) {
//             setLError('name should be only A-za-z');
//           errorCount++;
//         }


//         else if (errorCount > 0) {
//             // Handle the case where there are missing inputs
//             console.log('Please fill in all the required fields.');
//             return;
//         }
//         else



//         console.log("Original Selected Date:", originalSelectedDate);


//         try {

            

//             console.log("THis is ", userName)


//             const childFullName = `${childFirstName} ${childMiddleName} ${childLastName}`;


//             const response = await axios.post(`${config.API_BASE_URL}/saveChildData`, {
//                 childFullName: childFullName,
//                 kishoriVarg: kishoriVarg,
//                 selectedDate: originalSelectedDate,
//                 enteredAge: enteredAge,
//                 aadharNumber: aadharNumber,
//                 schoolOrCollege: schoolOrCollege,
//                 standard: standard,
//                 religion: religion,
//                 caste: caste,
//                 maritalStatus: maritalStatus,
//                 flatNumber: flatNumber,
//                 area: area,
//                 landmark: landmark,
//                 city: city,
//                 district: district,
//                 state: state,
//                 pincode: pincode,
//                 userName: userName,
//             });


//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             Alert.alert(
//                 'Success',
//                 'Child created successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('ChildFamilyDetails',{childFullName:childFullName}) }
//                 ],
//                 { cancelable: false }
//               );


//         } catch (error) {
//           //console.error('API request error:', error);

//           if (error.response && error.response.status === 500) {
//             Alert.alert(
//                 'Failed to create child details',
//                 'Check Filled data, child details already exists',
//                 [
//                   { text: 'OK', onPress: () => console.log('OK') }
//                 ],
//                 { cancelable: false }
//             );
//         } else {
//             // Show error message
//             Alert.alert(
//                 'Error',
//                 'Error creating child. Please try again.',
//                 [
//                     { text: 'OK', onPress: () => console.log('OK Pressed') }
//                 ],
//                 { cancelable: false }
//             );
//         }
          
     
//         }
   
//     };


//     return (
//         <ScrollView >


//         <View style={styles.container}>
//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="First Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildFirstName(text)}
//                     value={childFirstName}>
//                 </TextInput>
//             </View>  




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Middle Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildMiddleName(text)}
//                     value={childMiddleName}>
//                 </TextInput>
//             </View>


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Last Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildLastName(text)}
//                     value={childLastName}>
//                 </TextInput>
//             </View>


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Kishori Varg"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setKishoriVarg(text)}                        
//                     value={kishoriVarg}>
//                 </TextInput>
//             </View>


           
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
//                 {/* <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/> */}
//                 <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />




//             </View>




//             {/* <View style={styles.root}>                  
//                 <Text style={styles.textf}>Age/{"\n"}वय</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 90 }]}  
//                     placeholder="Age"
//                     onChangeText={text => setAge(text)}                        
//                     value={age}>                      
//                 </TextInput>
//             </View> */}




//             <View style={styles.root}>
//             <Text style={[styles.textf, {}]}>Age/वय</Text><Text style={{ color: 'red',marginTop:'5%', marginRight: '25%' }}>*</Text>
//                 <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Religion/धर्म</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Religion"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setReligion(text)}                        
//                     value={religion}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Caste/जात</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Caste"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setCaste(text)}                        
//                     value={caste}>                      
//                 </TextInput>
//             </View>


     
//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Aadhar Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setAadharNumber(text)}                        
//                     value={aadharNumber}>
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
//                 <Text style={styles.textf}>Pincode/पिनकोड</Text>
//                 <TextInput
//                     style={styles.input}  
//                     placeholder="Pincode"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setPincode(text)}
//                     value={pincode}>
//                 </TextInput>
//             </View>




//             <View style={[styles.root, ]}>                  
//                 <Text style={[styles.textf, { marginRight: '10%'}]}>School/{"\t\t"}<Text style={{ color: 'red',marginTop:'5%', }}>*</Text>{"\n"}College{"\n"}Name{"\n"}शाळा/कॉलेजचे नाव</Text>
//                 <TextInput
//                     style = {[styles.input, { marginBottom: 'auto',  }]}  
//                     placeholder="School/College Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setSchoolOrCollege(text)}                        
//                     value={schoolOrCollege}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Standard/{"\n"}वर्ग</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Standard"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setStandard(text)}                        
//                     value={standard}>                      
//                 </TextInput>
//             </View>




           
//             <View style={styles.radioContainer}>  
//                 <Text style={styles.radioLabel}>Marital Status/{"\t\t"}<Text style={{ color: 'red',marginTop:'5%',marginLeft:'10%', marginRight: '15%' }}>*</Text>{"\n"}वैवाहिक स्थिती</Text>        
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
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Unmarried</Text>
//                     <RadioButton
//                         value="Unmarried"
//                         status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Unmarried')}
//                         color="#E38B29"
//                     />
//                 </View>
               




//             <TouchableOpacity style = {styles.button} onPress={onNextPressed}>
//                 <Text style = {styles.btnnext}>Next</Text>
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
//         alignSelf: 'flex-end',
//         marginBottom:'10%',
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


// export default CreateChild;


// import React, { useState } from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import DatePicker from '../DatePicker';
// import AgeCalculator from '../AgeCalculator';
// import axios from 'axios';
// import config from '../config';


// const CreateChild = ({navigation}) => {


//     const [childFirstName, setChildFirstName] = useState('');
//     const [childMiddleName, setChildMiddleName] = useState('');
//     const [childLastName, setChildLastName] = useState('');
//     const [kishoriVarg, setKishoriVarg] = useState('');  
//     const [selectedDate, setSelectedDate] = useState('');
//     const [originalSelectedDate, setOriginalSelectedDate] = useState('');
//     const [enteredAge, setEnteredAge] = useState('');
//     const [aadharNumber, setAadharNumber] = useState('');
//     const [schoolOrCollege, setSchoolOrCollege] = useState('');
//     const [standard, setStandard] = useState('');
//     const [religion, setReligion] = useState('');
//     const [caste, setCaste] = useState('');
//     const [maritalStatus, setMaritalStatus] = useState('');
//     const [flatNumber, setFlatNumber] = useState('');
//     const [area, setArea] = useState('');
//     const [landmark, setLandmark] = useState('');
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [state, setState] = useState('');
//     const [pincode, setPincode] = useState('');
   
//     const handleDateSelect = (date) => {
//         setSelectedDate(date);
//         setEnteredAge('');
//     };




//     const handleAgeEntered = (isAgeEntered) => {
//         if (isAgeEntered) {
//           setSelectedDate(''); // Reset selected date when age is entered directly
//         }
//     };




//     const handleAgeChange = (age) => {
//         setEnteredAge(age);
//         setOriginalSelectedDate(selectedDate);
//         setSelectedDate(''); // Reset selected date when age is entered directly
//       };


//       const onNextPressed = async() => {


//         console.log("Original Selected Date:", originalSelectedDate);
      
//             // let errorCount = 0;
//             // const passwordRegex = /^\d{12,}$/;
//             // const nameRegex = /^[A-Za-z\s]+$/;
               
//             //         if (!passwordRegex.test(aadharNumber)) {
//             //             setAadharNumber('aadhar 12 integers only 0-9 should be ');
//             //           errorCount++;
//             //         }
//             //         if (!nameRegex.test(childFirstName)) {
//             //             setChildFirstName('name should be only A-za-z');
//             //           errorCount++;
//             //         }
//             //         if (!nameRegex.test(childMiddleName)) {
//             //             setChildMiddleName('name should be only A-za-z');
//             //           errorCount++;
//             //         }
//             //         if (!nameRegex.test(childLastName)) {
//             //             setChildLastName('name should be only A-za-z');
//             //           errorCount++;
//             //         }
    
    
//             //         else if (errorCount > 0) {
//             //             // Handle the case where there are missing inputs
//             //             console.log('Please fill in all the required fields.');
//             //             return;
//             //         }
//             //         else
              
    
    
    
    
//         try {


//             const childFullName = `${childFirstName} ${childMiddleName} ${childLastName}`;


//             const response = await axios.post(`${config.API_BASE_URL}/saveChildData`, {
//                 childFullName: childFullName,
//                 kishoriVarg: kishoriVarg,
//                 selectedDate: originalSelectedDate,
//                 enteredAge: enteredAge,
//                 aadharNumber: aadharNumber,
//                 schoolOrCollege: schoolOrCollege,
//                 standard: standard,
//                 religion: religion,
//                 caste: caste,
//                 maritalStatus: maritalStatus,
//                 flatNumber: flatNumber,
//                 area: area,
//                 landmark: landmark,
//                 city: city,
//                 district: district,
//                 state: state,
//                 pincode: pincode,
//             });


//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             Alert.alert(
//                 'Success',
//                 'Child created successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('ChildFamilyDetails') }
//                 ],
//                 { cancelable: false }
//               );


//         } catch (error) {
//           console.error('API request error:', error);
//           Alert.alert(
//             'Error',
//             'Error creating child. Please try again.',
//             [
//               { text: 'OK', onPress: () => console.log('OK Pressed') }
//             ],
//             { cancelable: false }
//           );
     
//         }
   
//     };


//     return (
//         <ScrollView >


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 42 }]}
//                     placeholder="First Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildFirstName(text)}
//                     value={childFirstName}>
//                 </TextInput>
//             </View>  




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 25 }]}
//                     placeholder="Middle Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildMiddleName(text)}
//                     value={childMiddleName}>
//                 </TextInput>
//             </View>


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 42 }]}  
//                     placeholder="Last Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildLastName(text)}
//                     value={childLastName}>
//                 </TextInput>
//             </View>


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 62 }]}  
//                     placeholder="Kishori Varg"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setKishoriVarg(text)}                        
//                     value={kishoriVarg}>
//                 </TextInput>
//             </View>


           
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
//                 {/* <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/> */}
//                 <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />




//             </View>




//             {/* <View style={styles.root}>                  
//                 <Text style={styles.textf}>Age/{"\n"}वय</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 90 }]}  
//                     placeholder="Age"
//                     onChangeText={text => setAge(text)}                        
//                     value={age}>                      
//                 </TextInput>
//             </View> */}




//             <View style={styles.root}>
//             <Text style={styles.textf}>Age/{"\n"}वय</Text>
//                 <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Religion/{"\n"}धर्म</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 63 }]}  
//                     placeholder="Religion"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setReligion(text)}                        
//                     value={religion}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Caste/{"\n"}जात</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 78 }]}  
//                     placeholder="Caste"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setCaste(text)}                        
//                     value={caste}>                      
//                 </TextInput>
//             </View>


     
//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 47 }]}  
//                     placeholder="Aadhar Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setAadharNumber(text)}                        
//                     value={aadharNumber}>
//                 </TextInput>
//             </View>


           
//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Flat Number/{"\n"}फ्लॅट क्रमांक</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 34 }]}  
//                     placeholder="Flat Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setFlatNumber(text)}
//                     value={flatNumber}>
//                 </TextInput>
//             </View>
           


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Area/प्रदेश</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 60 }]}
//                     placeholder="Area"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setArea(text)}
//                     value={area}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Landmark/{"\n"}लॅंडमार्क</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 50 }]}
//                     placeholder="Landmark"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setLandmark(text)}
//                     value={landmark}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>City/शहर</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 68 }]}  
//                     placeholder="City"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setCity(text)}
//                     value={city}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>District/जिल्हा</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 35 }]}
//                     placeholder="District"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setDistrict(text)}
//                     value={district}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>State/राज्य</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 55 }]}  
//                     placeholder="State"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setState(text)}
//                     value={state}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Pincode/{"\n"}पिनकोड</Text>
//                 <TextInput
//                     style={[styles.input, { marginLeft: 63 }]}  
//                     placeholder="Pincode"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setPincode(text)}
//                     value={pincode}>
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>School/College{"\n"}Name{"\n"}शाळा/कॉलेजचे नाव</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 17 }]}  
//                     placeholder="School/College Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setSchoolOrCollege(text)}                        
//                     value={schoolOrCollege}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Standard/{"\n"}वर्ग</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 56 }]}  
//                     placeholder="Standard"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setStandard(text)}                        
//                     value={standard}>                      
//                 </TextInput>
//             </View>




//             <View style={styles.radioContainer}>
//                 <Text style={styles.radioLabel}>Marital Status/{"\n"}वैवाहिक स्थिती</Text>            
//                 <View style={styles.radioButton}>
//                     <Text style={{fontSize:16, color: 'black', marginLeft: 27}}>Married</Text>
//                     <RadioButton
//                         value="Married"
//                         status={ maritalStatus === 'Married' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Married')}
//                         color="#E38B29"
//                         style={{ marginTop: 12 }}
//                     />
//                 </View>


//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//                     <Text style={{ fontSize:16, color: 'black', marginLeft: 27}}>Unmarried</Text>
//                     <RadioButton
//                         value="Unmarried"
//                         status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Unmarried')}
//                         color="#E38B29"
//                         style={{ marginTop: 12 }}
//                     />
//                 </View>
//             </View>




//             <TouchableOpacity style = {styles.button} onPress={onNextPressed}>
//                 <Text style = {styles.btnnext}>Next</Text>
//             </TouchableOpacity>


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
//         alignSelf: 'flex-end',
//         marginBottom:10,
//         borderRadius:20,
//         marginRight: 10,
//     },
//     btnnext: {
//         color: 'black',
//         fontWeight: 'bold',
//         fontSize: 15,
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
//     radioContainer: {
//         flexDirection:'row',
//         marginRight:10,
//         marginTop: 12,
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 5
//     },
//     radioLabel: {
//         fontSize: 16,
//         color:'black',
//         marginBottom: 8,
//         marginLeft: 10,
//         marginTop: 12
//     },
// });


// export default CreateChild;


//WORKING CODE BELOW


// import React, { useState, useContext } from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { RadioButton } from 'react-native-paper';
// import DatePicker from '../DatePicker';
// import AgeCalculator from '../AgeCalculator';
// import { AuthContext } from '../AuthContext';
// import axios from 'axios';
// import config from '../config';


// const CreateChild = ({navigation}) => {


//     const { userName } = useContext(AuthContext);
//     console.log("THis is the", userName)
//     const [childFirstName, setChildFirstName] = useState('');
//     const [childMiddleName, setChildMiddleName] = useState('');
//     const [childLastName, setChildLastName] = useState('');
//     const [kishoriVarg, setKishoriVarg] = useState('');  
//     const [selectedDate, setSelectedDate] = useState('');
//     const [originalSelectedDate, setOriginalSelectedDate] = useState('');
//     const [enteredAge, setEnteredAge] = useState('');
//     const [aadharNumber, setAadharNumber] = useState('');
//     const [schoolOrCollege, setSchoolOrCollege] = useState('');
//     const [standard, setStandard] = useState('');
//     const [religion, setReligion] = useState('');
//     const [caste, setCaste] = useState('');
//     const [maritalStatus, setMaritalStatus] = useState('');
//     const [flatNumber, setFlatNumber] = useState('');
//     const [area, setArea] = useState('');
//     const [landmark, setLandmark] = useState('');
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [state, setState] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [firstError, setFirstError] = useState(false);
//     const [MError, setMError] = useState(false);
//     const [fLError, setLError] = useState(false);
//     const [AError, setAError] = useState(false);
//     const [rError, setRError] = useState(false);
//     const [cError, setCError] = useState(false);
//     const [kVError, setKVError] = useState(false);
//     const [SError, setSError] = useState(false);
//     const handleDateSelect = (date) => {
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
        
//         setSelectedDate(''); // Reset selected date when age is entered directly
//       };


//       const onNextPressed = async() => {
//         let errorCount = 0;
//         const passwordRegex = /^\d{12,}$/;
//         const nameRegex = /^[A-Za-z\s]+$/;

//         if (!passwordRegex.test(aadharNumber)) {
//             setAError('aadhar 12 integers only 0-9 should be ');
//           errorCount++;
//         }
//         if (!nameRegex.test(childFirstName)) {
//             setFirstError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!nameRegex.test(childMiddleName) ) {
//             setMError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!nameRegex.test(childLastName)) {
//             setLError('name should be only A-za-z');
//           errorCount++;
//         }
//         if (!religion) {
//             setRError('Enter Religion');
//           errorCount++;
//         }
//         if (!caste) {
//             setCError('Enter caste');
//           errorCount++;
//         }
//         if (!kishoriVarg) {
//             setKVError('Enter Kishori Varga');
//           errorCount++;
//         }
//         if (!schoolOrCollege) {
//             setSError('Enter School');
//           errorCount++;
//         }


//         else if (errorCount > 0) {
//             // Handle the case where there are missing inputs
//             console.log('Please fill in all the required fields.');
//             return;
//         }
//         else



//         console.log("Original Selected Date:", originalSelectedDate);


//         try {

            

//             console.log("THis is ", userName)


//             const childFullName = `${childFirstName} ${childMiddleName} ${childLastName}`;


//             const response = await axios.post(`${config.API_BASE_URL}/saveChildData`, {
//                 childFullName: childFullName,
//                 kishoriVarg: kishoriVarg,
//                 selectedDate: originalSelectedDate,
//                 enteredAge: enteredAge,
//                 aadharNumber: aadharNumber,
//                 schoolOrCollege: schoolOrCollege,
//                 standard: standard,
//                 religion: religion,
//                 caste: caste,
//                 maritalStatus: maritalStatus,
//                 flatNumber: flatNumber,
//                 area: area,
//                 landmark: landmark,
//                 city: city,
//                 district: district,
//                 state: state,
//                 pincode: pincode,
//                 userName: userName,
//             });


//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             Alert.alert(
//                 'Success',
//                 'Child created successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('ChildFamilyDetails',{childFullName:childFullName}) }
//                 ],
//                 { cancelable: false }
//               );


//         } catch (error) {
//           console.error('API request error:', error);

//           if (error.response && error.response.status === 500) {
//             Alert.alert(
//                 'Failed to create child details',
//                 'Check Filled data\nchild details already exists',
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
//             'Error creating child. Please try again.',
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


//         <View style={styles.container}>
//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="First Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildFirstName(text)}
//                     value={childFirstName}>
//                 </TextInput>
//             </View>  
//             {firstError ? <Text style ={{color:'red',marginLeft :10}}>{firstError}</Text>:null}




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Middle Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildMiddleName(text)}
//                     value={childMiddleName}>
//                 </TextInput>
//             </View>
//             {MError ? <Text style ={{color:'red',marginLeft :10}}>{MError}</Text>:null}


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}
//                     placeholder="Last Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setChildLastName(text)}
//                     value={childLastName}>
//                 </TextInput>
//             </View>
//             {fLError ? <Text style ={{color:'red',marginLeft :10}}>{fLError}</Text>:null}


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Kishori Varg"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setKishoriVarg(text)}                        
//                     value={kishoriVarg}>
//                 </TextInput>
//             </View>
//             {kVError ? <Text style ={{color:'red',marginLeft :10}}>{kVError}</Text>:null}


           
//             <View style={styles.root}>
//                 <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
//                 {/* <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/> */}
//                 <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />




//             </View>




//             {/* <View style={styles.root}>                  
//                 <Text style={styles.textf}>Age/{"\n"}वय</Text>
//                 <TextInput
//                     style = {[styles.input, { marginLeft: 90 }]}  
//                     placeholder="Age"
//                     onChangeText={text => setAge(text)}                        
//                     value={age}>                      
//                 </TextInput>
//             </View> */}




//             <View style={styles.root}>
//             <Text style={[styles.textf, {marginRight: '25%'}]}>Age/वय</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
//             </View>




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Religion/धर्म</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Religion"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setReligion(text)}                        
//                     value={religion}>                      
//                 </TextInput>
//             </View>
//             {rError ? <Text style ={{color:'red',marginLeft :10}}>{rError}</Text>:null}




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Caste/जात</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Caste"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setCaste(text)}                        
//                     value={caste}>                      
//                 </TextInput>
//             </View>
//             {cError ? <Text style ={{color:'red',marginLeft :10}}>{cError}</Text>:null}


     
//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Aadhar Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setAadharNumber(text)}                        
//                     value={aadharNumber}>
//                 </TextInput>
//             </View>
//             {AError ? <Text style ={{color:'red',marginLeft :10}}>{AError}</Text>:null}


           
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
//                 <Text style={styles.textf}>Pincode/पिनकोड</Text>
//                 <TextInput
//                     style={styles.input}  
//                     placeholder="Pincode"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setPincode(text)}
//                     value={pincode}>
//                 </TextInput>
//             </View>




//             <View style={[styles.root, ]}>                  
//                 <Text style={styles.textf}>School/{"\n"}College{"\n"}Name{"\n"}शाळा/कॉलेजचे नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
//                 <TextInput
//                     style = {[styles.input, { marginBottom: 'auto',  }]}  
//                     placeholder="School/College Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setSchoolOrCollege(text)}                        
//                     value={schoolOrCollege}>                      
//                 </TextInput>
//             </View>
//             {SError ? <Text style ={{color:'red',marginLeft :10}}>{SError}</Text>:null}




//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Standard/{"\n"}वर्ग</Text>
//                 <TextInput
//                     style = {styles.input}  
//                     placeholder="Standard"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setStandard(text)}                        
//                     value={standard}>                      
//                 </TextInput>
//             </View>




           
//             <View style={styles.radioContainer}>  
//                 <Text style={styles.radioLabel}>Marital Status/{"\n"}वैवाहिक स्थिती</Text><Text style={{ color: 'red',marginTop:'5%',marginLeft:0 }}>*</Text>        
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
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Unmarried</Text>
//                     <RadioButton
//                         value="Unmarried"
//                         status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Unmarried')}
//                         color="#E38B29"
//                     />
//                 </View>
               




//             <TouchableOpacity style = {styles.button} onPress={onNextPressed}>
//                 <Text style = {styles.btnnext}>Next</Text>
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
//         alignSelf: 'flex-end',
//         marginBottom:'10%',
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


// export default CreateChild;



import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { RadioButton } from 'react-native-paper';
import DatePicker from '../DatePicker';
import AgeCalculator from '../AgeCalculator';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import config from '../config';
import { transformNumber } from '../Transformation';




const CreateChild = ({navigation}) => {




    const { userName } = useContext(AuthContext);
    const [childFirstName, setChildFirstName] = useState('');
    const [childMiddleName, setChildMiddleName] = useState('');
    const [childLastName, setChildLastName] = useState('');
    const [kishoriVarg, setKishoriVarg] = useState('');  
    const [selectedDate, setSelectedDate] = useState('');
    const [originalSelectedDate, setOriginalSelectedDate] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [schoolOrCollege, setSchoolOrCollege] = useState('');
    const [standard, setStandard] = useState('');
    const [religion, setReligion] = useState('');
    const [caste, setCaste] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [firstError, setFirstError] = useState(false);
    const [MError, setMError] = useState(false);
    const [fLError, setLError] = useState(false);
    const [AError, setAError] = useState(false);
    const [rError, setRError] = useState(false);
    const [cError, setCError] = useState(false);
    const [kVError, setKVError] = useState(false);
    const [SError, setSError] = useState(false);
   
    const handleDateSelect = (date) => {
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
       
        setSelectedDate(''); // Reset selected date when age is entered directly
      };




      const onNextPressed = async() => {
        let errorCount = 0;
        const passwordRegex = /^\d{12,}$/;
        const nameRegex = /^[A-Za-z\s]+$/;


        // if (!passwordRegex.test(aadharNumber)) {
        //     setAError('Aadhar number should be of 12 integers,\ncontainig any numbers between 0-9 ');
        //   errorCount++;
        // }
        if (!nameRegex.test(childFirstName)) {
            setFirstError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!nameRegex.test(childMiddleName) ) {
            setMError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!nameRegex.test(childLastName)) {
            setLError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!kishoriVarg) {
            setKVError('Enter Kishori Varga!');
          errorCount++;
        }
        if (!schoolOrCollege) {
            setSError('Enter School!');
          errorCount++;
        }




        else if (errorCount > 0) {
            // Handle the case where there are missing inputs
            console.log('Please fill in all the required fields.');
            return;
        }
        else






        try {


            const childFullName = `${childFirstName.trim()} ${childMiddleName.trim()} ${childLastName.trim()}`;


            maskedAadhar = transformNumber(aadharNumber);




            const response = await axios.post(`${config.API_BASE_URL}/saveChildData`, {
                childFullName: childFullName,
                kishoriVarg: kishoriVarg,
                selectedDate: originalSelectedDate || null,
                enteredAge: enteredAge,
                aadharNumber: maskedAadhar,
                schoolOrCollege: schoolOrCollege,
                standard: standard,
                religion: religion,
                caste: caste,
                maritalStatus: maritalStatus,
                flatNumber: flatNumber,
                area: area,
                landmark: landmark,
                city: city,
                district: district,
                state: state,
                pincode: pincode || null,
                userName: userName,

                
            });




            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            Alert.alert(
                'Success',
                'Child created successfully',
                [
                  { text: 'OK', onPress: () => navigation.navigate('ChildFamilyDetails',{childFullName:childFullName},{enteredAge:enteredAge}) }
                ],
                { cancelable: false }
              );




        } catch (error) {
          //console.error('API request error:', error);


          if (error.response && error.response.status === 500) {
            if (error.response.data.error === 'Error saving child data') {
                // Duplicate entry error
                Alert.alert(
                    'Failed to create child details',
                    'Child details already exist or there is an issue with the data. Please check and try again.',
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
                'Error creating child. Please fill all the required details.',
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
                    onChangeText={text => setChildFirstName(text)}
                    value={childFirstName}>
                </TextInput>
            </View>
            {firstError ? <Text style ={{color:'red',marginLeft :10}}>{firstError}</Text>:null}








            <View style={styles.root}>                  
                <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Middle Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setChildMiddleName(text)}
                    value={childMiddleName}>
                </TextInput>
            </View>
            {MError ? <Text style ={{color:'red',marginLeft :10}}>{MError}</Text>:null}






            <View style={styles.root}>                  
                <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setChildLastName(text)}
                    value={childLastName}>
                </TextInput>
            </View>
            {fLError ? <Text style ={{color:'red',marginLeft :10}}>{fLError}</Text>:null}






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
            {kVError ? <Text style ={{color:'red',marginLeft :10}}>{kVError}</Text>:null}






           
            <View style={styles.root}>
                <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
                {/* <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/> */}
                <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
            </View>








            {/* <View style={styles.root}>                  
                <Text style={styles.textf}>Age/{"\n"}वय</Text>
                <TextInput
                    style = {[styles.input, { marginLeft: 90 }]}  
                    placeholder="Age"
                    onChangeText={text => setAge(text)}                        
                    value={age}>                      
                </TextInput>
            </View> */}








            <View style={styles.root}>
            <Text style={[styles.textf, {}]}>Age/वय</Text><Text style={{ color: 'red',marginTop:'5%', marginRight: '25%' }}>*</Text>
                <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
            </View>








            <View style={styles.root}>                  
                <Text style={styles.textf}>Religion/धर्म</Text>
                <TextInput
                    style = {styles.input}  
                    placeholder="Religion"
                    placeholderTextColor="gray"
                    onChangeText={text => setReligion(text)}                        
                    value={religion}>                      
                </TextInput>
            </View>










            <View style={styles.root}>                  
                <Text style={styles.textf}>Caste/जात</Text>
                <TextInput
                    style = {styles.input}  
                    placeholder="Caste"
                    placeholderTextColor="gray"
                    onChangeText={text => setCaste(text)}                        
                    value={caste}>                      
                </TextInput>
            </View>




     
            <View style={styles.root}>                  
                <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
                <TextInput
                    style = {styles.input}  
                    placeholder="Aadhar Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setAadharNumber(text)}                        
                    value={aadharNumber}>
                </TextInput>
            </View>
            {/* {AError ? <Text style ={{color:'red',marginLeft :10}}>{AError}</Text>:null} */}




           
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
                <Text style={styles.textf}>Pincode/पिनकोड</Text>
                <TextInput
                    style={styles.input}  
                    placeholder="Pincode"
                    placeholderTextColor="gray"
                    onChangeText={text => setPincode(text)}
                    value={pincode}>
                </TextInput>
            </View>








            <View style={[styles.root, ]}>                  
                <Text style={[styles.textf, { marginRight: '10%'}]}>School/{"\t\t"}<Text style={{ color: 'red',marginTop:'5%', }}>*</Text>{"\n"}College{"\n"}Name{"\n"}शाळा/कॉलेजचे नाव</Text>
                <TextInput
                    style = {[styles.input, { marginBottom: 'auto',  }]}  
                    placeholder="School/College Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setSchoolOrCollege(text)}                        
                    value={schoolOrCollege}>                      
                </TextInput>
            </View>
            {SError ? <Text style ={{color:'red',marginLeft :10}}>{SError}</Text>:null}








            <View style={styles.root}>                  
                <Text style={styles.textf}>Standard/{"\n"}वर्ग</Text>
                <TextInput
                    style = {styles.input}  
                    placeholder="Standard"
                    placeholderTextColor="gray"
                    onChangeText={text => setStandard(text)}                        
                    value={standard}>                      
                </TextInput>
            </View>








           
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
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Unmarried</Text>
                    <RadioButton
                        value="Unmarried"
                        status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
                        onPress={() => setMaritalStatus('Unmarried')}
                        color="#E38B29"
                    />
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




export default CreateChild;