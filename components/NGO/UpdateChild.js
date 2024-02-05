// import React, { useState, useEffect, useContext } from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import DatePicker from '../DatePicker';
// import AgeCalculator from '../AgeCalculator';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import axios from 'axios';
// import config from '../config';
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../AuthContext';


// const UpdateChild = ({ navigation }) => {


//     const route = useRoute();
//     const name = route.params.name;

//     const { userName } = useContext(AuthContext);
//     console.log("THis is the", userName);

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
//     console.log('Initial Marital Status:', maritalStatus);
//     const [flatNumber, setFlatNumber] = useState('');
//     const [area, setArea] = useState('');
//     const [landmark, setLandmark] = useState('');
//     const [city, setCity] = useState('');
//     const [district, setDistrict] = useState('');
//     const [state, setState] = useState('');
//     const [pincode, setPincode] = useState('');


//     useEffect(() => {
//         const fetchChildPersonalData = async () => {
//           try {
//             const response = await axios.get(`${config.API_BASE_URL}/displayChildInformation/${name}`);
//             console.log('Full URL:', `${config.API_BASE_URL}/displayChildInformation/${name}`);
//             const data = response.data.data;


//             console.log('Response:', response);
//             console.log('Fetched Data:', data);
//             console.log('Fetched Marital Status:', data.maritalStatus);
//             console.log('Fetched Birthdate:', data.selectedDate);

//             const dt = new Date(data.selectedDate);
//             const x = dt.toISOString().split('T');
//             const x1 = x[0].split('-');
//             const formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];



//             // Split the full name into three parts
//             const [firstName, middleName, lastName] = data.childFullName.split(' ');


//             console.log('Fetched Marital Status:', data.maritalStatus);
   
//             // Set individual state for each field
//             setChildFirstName(firstName);
//             setChildMiddleName(middleName);
//             setChildLastName(lastName);
//             setKishoriVarg(data.kishoriVarg);
//             setSelectedDate(formattedDate)
//             setEnteredAge(data.enteredAge);
//             setAadharNumber(data.aadharNumber);
//             setSchoolOrCollege(data.schoolOrCollege);
//             setStandard(data.standard);
//             setReligion(data.religion);
//             setCaste(data.caste);
//             setMaritalStatus(data.maritalStatus || '');
//             setFlatNumber(data.flatNumber);
//             setArea(data.area);
//             setLandmark(data.landmark);
//             setCity(data.city);
//             setDistrict(data.district);
//             setState(data.state);
//             setPincode(data.pincode);
//           } catch (error) {
//             console.error('Error fetching systemic data:', error);
//           }
//         };
   
//         fetchChildPersonalData();
//     }, [name]);
   
//     const handleDateSelect = (originalSelectedDate) => {
//         setSelectedDate(originalSelectedDate);
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
//         console.log("updatedddddd........" , originalSelectedDate)
//         setSelectedDate(''); // Reset selected date when age is entered directly
//       };
     
//     const oldChildFullName = name;
 
//     const onNextPressed = async () => {


//         console.log('Selected Date to be sent to the backend:', selectedDate);
       
//             try {


//                 // Concatenate the full name
//                 const updatedChildFullName = `${childFirstName} ${childMiddleName} ${childLastName}`.trim();


//                 const response = await axios.post(`${config.API_BASE_URL}/updateChildPersonal/update`, {
//                     updatedChildFullName,
//                     kishoriVarg,
//                     selectedDate: originalSelectedDate,
//                     enteredAge,
//                     aadharNumber,
//                     schoolOrCollege,
//                     standard,
//                     religion,
//                     caste,
//                     maritalStatus,
//                     flatNumber,
//                     area,
//                     landmark,
//                     city,
//                     district,
//                     state,
//                     pincode,
//                     oldChildFullName,
//                     userName,
//                 });
//                 console.log(response.data.message);
//               // Handle success, e.g., show a success message or navigate to another screen
//               // Show success message
//             Alert.alert(
//                 'Success',
//                 'Data updated successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('UpdateChildFamilyDetails',{childFullName:oldChildFullName}) }
//                 ],
//                 { cancelable: false }
//               );
         
//               // Handle success, e.g., show a success message or navigate to another screen
//             } catch (error) {
//               console.error('API request error:', error);
         
//               // Show error message
//               Alert.alert(
//                 'Error',
//                 'Error updating data. Please try again.',
//                 [
//                   { text: 'OK', onPress: () => console.log('OK Pressed') }
//                 ],
//                 { cancelable: false }
//               );
         
//               // Handle error, e.g., show an error message
//             }
//           };


//           console.log('Marital Status:', maritalStatus);


//         return (
           
//             <ScrollView >

//                 <View style={styles.container}>
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text>
//                     <TextInput
//                         style ={styles.input}
//                         value={childFirstName}
//                         onChangeText={text => setChildFirstName(text)}>
//                     </TextInput>
//                 </View>  
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={childMiddleName}
//                         onChangeText={text => setChildMiddleName(text)}>
//                     </TextInput>
//                 </View>
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={childLastName}
//                         onChangeText={text => setChildLastName(text)} >
//                     </TextInput>
//                 </View>
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text>
//                     <TextInput
//                         style = {styles.input}                       
//                         value={kishoriVarg}
//                         onChangeText={text => setKishoriVarg(text)}>
//                     </TextInput>
//                 </View>
   
               
               
//                 <View style={styles.root}>
               
//                     <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
//                     {console.log('Selected Date before rendering DatePicker:', selectedDate)}
//                     <DatePicker initialDate={selectedDate} onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
//                 </View>
   
//                 {/* <View style={styles.root}>                  
//                     <Text style={styles.textf}>Age/{"\n"}वय</Text>
//                     <TextInput
//                         style = {[styles.input, { marginLeft: 90 }]}  
//                         placeholder="Age"
//                         onChangeText={text => setEnteredAge(text)}                        
//                         value={enteredAge}>                      
//                     </TextInput>
//                 </View> */}
   
   
//    <View style={styles.root}>
//             <Text style={[styles.textf, {marginRight: '25%'}]}>Age/वय</Text>
//                 <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
//             </View>
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Religion/{"\n"}धर्म</Text>
//                     <TextInput
//                         style = {styles.input}                
//                         value={religion}
//                         onChangeText={text => setReligion(text)}>                      
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Caste/{"\n"}जात</Text>
//                     <TextInput
//                         style = {styles.input}                
//                         value={caste}
//                         onChangeText={text => setCaste(text)}       >                      
//                     </TextInput>
//                 </View>
   
         
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
//                     <TextInput
//                         style = {styles.input}                   
//                         value={aadharNumber}
//                         onChangeText={text => setAadharNumber(text)}>
//                     </TextInput>
//                 </View>
   
               
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Flat Number/{"\n"}फ्लॅट क्रमांक</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={flatNumber}
//                         onChangeText={text => setFlatNumber(text)}>
//                     </TextInput>
//                 </View>
               
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Area/प्रदेश</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={area}
//                         onChangeText={text => setArea(text)} >
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Landmark/{"\n"}लॅंडमार्क</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={landmark}
//                         onChangeText={text => setLandmark(text)} >
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>City/शहर</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={city}
//                         onChangeText={text => setCity(text)} >
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>District/जिल्हा</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={district}
//                         onChangeText={text => setDistrict(text)}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>State/राज्य</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={state}
//                         onChangeText={text => setState(text)} >
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Pincode/{"\n"}पिनकोड</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={pincode.toString()}
//                         onChangeText={text => setPincode(text)} >
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>School/College{"\n"}Name{"\n"}शाळा/कॉलेजचे नाव</Text>
//                     <TextInput
//                         style = {styles.input}                    
//                         value={schoolOrCollege}
//                         onChangeText={text => setSchoolOrCollege(text)}>                      
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Standard/{"\n"}वर्ग</Text>
//                     <TextInput
//                         style = {styles.input}
//                         value={standard}
//                         onChangeText={text => setStandard(text)}       >                      
//                     </TextInput>
//                 </View>
   
//                 <View style={styles.radioContainer}>  
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
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '40%'}}>Unmarried</Text>
//                     <RadioButton
//                         value="Unmarried"
//                         status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Unmarried')}
//                         color="#E38B29"
//                     />
//                 </View>
               


               




   
//                 <TouchableOpacity style = {styles.button} onPress={onNextPressed}>
//                     <Text style = {styles.btnnext}>Next</Text>
//                 </TouchableOpacity>

//                 </View>
   
//             </ScrollView>
//         );


//             };


            
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
//         marginRight: '20%'


//     },
// });





//           export default UpdateChild;


import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DatePicker from '../DatePicker';
import AgeCalculator from '../AgeCalculator';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import config from '../config';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { reverseTransform, transformNumber } from '../Transformation';




const UpdateChild = ({ navigation }) => {




    const route = useRoute();
    const childFullName = route.params.childFullName;


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
    const [pincode, setPincode] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [firstError, setFirstError] = useState(false);
    const [MError, setMError] = useState(false);
    const [fLError, setLError] = useState(false);
    const [rError, setRError] = useState(false);
    const [cError, setCError] = useState(false);
    const [kVError, setKVError] = useState(false);
    const [SError, setSError] = useState(false);




    useEffect(() => {
        const fetchChildPersonalData = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get(`${config.API_BASE_URL}/displayChildInformation/${childFullName}`);
            const data = response.data.data;


            let formattedDate = '';


            if(data.selectedDate !== null){
                const dt = new Date(data.selectedDate);
            const x = dt.toISOString().split('T');
            const x1 = x[0].split('-');
            formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
            }
           






            // Split the full name into three parts
            const [firstName, middleName, lastName] = data.childFullName.split(' ');


            const raadharNumber = reverseTransform(data.aadharNumber);
            console.log(raadharNumber);


   
            // Set individual state for each field
            setChildFirstName(firstName);
            setChildMiddleName(middleName);
            setChildLastName(lastName);
            setKishoriVarg(data.kishoriVarg);
            setSelectedDate(formattedDate)
            setEnteredAge(data.enteredAge);
            setAadharNumber(raadharNumber);
            setSchoolOrCollege(data.schoolOrCollege);
            setStandard(data.standard);
            setReligion(data.religion);
            setCaste(data.caste);
            setMaritalStatus(data.maritalStatus || '');
            setFlatNumber(data.flatNumber);
            setArea(data.area);
            setLandmark(data.landmark);
            setCity(data.city);
            setDistrict(data.district);
            setState(data.state);
            setPincode(data.pincode);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching child data:', error);
            setIsLoading(false);
          }
        };
   
        fetchChildPersonalData();
    }, [childFullName]);
   
    const handleDateSelect = (originalSelectedDate) => {
        setSelectedDate(originalSelectedDate);
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
     
    const oldChildFullName = childFullName;
 
    const onNextPressed = async () => {


        let errorCount = 0;
        const passwordRegex = /^\d{12,}$/;
        const nameRegex = /^[A-Za-z\s]+$/;


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






                // Concatenate the full name
                const updatedChildFullName = `${childFirstName} ${childMiddleName} ${childLastName}`.trim();
                const maskedAadhar = transformNumber(aadharNumber);




                const response = await axios.post(`${config.API_BASE_URL}/updateChildPersonal/update`, {
                    updatedChildFullName,
                    kishoriVarg,
                    selectedDate: originalSelectedDate || null,
                    enteredAge,
                    aadharNumber : maskedAadhar || null,
                    schoolOrCollege,
                    standard,
                    religion,
                    caste,
                    maritalStatus,
                    flatNumber,
                    area,
                    landmark,
                    city,
                    district,
                    state,
                    pincode,
                    oldChildFullName,
                    userName,
                });
                console.log(response.data.message);
              // Handle success, e.g., show a success message or navigate to another screen
              // Show success message
            Alert.alert(
                'Success',
                'Data updated successfully',
                [
                  { text: 'OK', onPress: () => navigation.navigate('UpdateChildFamilyDetails',{childFullName:oldChildFullName}) }
                ],
                { cancelable: false }
              );
         
              // Handle success, e.g., show a success message or navigate to another screen
            } catch (error) {
              console.error('API request error:', error);
         
              // Show error message
              Alert.alert(
                'Error',
                'Error updating data. Please try again.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
         
              // Handle error, e.g., show an error message
            }
          };


     
        return (
           
           
           
            <ScrollView >


            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#E38B29" />
                    <Text style={styles.loadingText}>Fetching data, please wait...</Text>
                </View>
                ) : (
                <View style={styles.container}>
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style ={styles.input}
                        value={childFirstName}
                        onChangeText={text => setChildFirstName(text)}>
                    </TextInput>
                </View>  
                {firstError ? <Text style ={{color:'red',marginLeft :10}}>{firstError}</Text>:null}
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        value={childMiddleName}
                        onChangeText={text => setChildMiddleName(text)}>
                    </TextInput>
                </View>
                {MError ? <Text style ={{color:'red',marginLeft :10}}>{MError}</Text>:null}
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        value={childLastName}
                        onChangeText={text => setChildLastName(text)} >
                    </TextInput>
                </View>
                {fLError ? <Text style ={{color:'red',marginLeft :10}}>{fLError}</Text>:null}
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}                      
                        value={kishoriVarg}
                        onChangeText={text => setKishoriVarg(text)}>
                    </TextInput>
                </View>
                {kVError ? <Text style ={{color:'red',marginLeft :10}}>{kVError}</Text>:null}
   
               
               
                {/* <View style={styles.root}>
               
                    <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
                    <DatePicker initialDate={selectedDate} onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
                </View> */}
   
                {/* <View style={styles.root}>                  
                    <Text style={styles.textf}>Age/{"\n"}वय</Text>
                    <TextInput
                        style = {[styles.input, { marginLeft: 90 }]}  
                        placeholder="Age"
                        onChangeText={text => setEnteredAge(text)}                        
                        value={enteredAge}>                      
                    </TextInput>
                </View> */}
   
   
   <View style={styles.root}>
   <Text style={[styles.textf, {}]}>Age/वय</Text><Text style={{ color: 'red',marginTop:'5%', marginRight: '25%' }}>*</Text>
                <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
            </View>
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Religion/{"\n"}धर्म</Text>
                    <TextInput
                        style = {styles.input}                
                        value={religion}
                        onChangeText={text => setReligion(text)}>                      
                    </TextInput>
                </View>
                {rError ? <Text style ={{color:'red',marginLeft :10}}>{rError}</Text>:null}
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Caste/{"\n"}जात</Text>
                    <TextInput
                        style = {styles.input}                
                        value={caste}
                        onChangeText={text => setCaste(text)}>                      
                    </TextInput>
                </View>
   
         
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
                    <TextInput
                        style = {styles.input}                  
                        value={aadharNumber.toString()}
                        onChangeText={text => setAadharNumber(text)}>
                    </TextInput>
                </View>
   
               
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Flat Number/{"\n"}फ्लॅट क्रमांक</Text>
                    <TextInput
                        style = {styles.input}
                        value={flatNumber}
                        onChangeText={text => setFlatNumber(text)}>
                    </TextInput>
                </View>
               
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Area/प्रदेश</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        value={area}
                        onChangeText={text => setArea(text)} >
                    </TextInput>
                </View>
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Landmark/{"\n"}लॅंडमार्क</Text>
                    <TextInput
                        style = {styles.input}
                        value={landmark}
                        onChangeText={text => setLandmark(text)} >
                    </TextInput>
                </View>
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>City/शहर</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        value={city}
                        onChangeText={text => setCity(text)} >
                    </TextInput>
                </View>
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>District/जिल्हा</Text>
                    <TextInput
                        style = {styles.input}
                        value={district}
                        onChangeText={text => setDistrict(text)}>
                    </TextInput>
                </View>
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>State/राज्य</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        value={state}
                        onChangeText={text => setState(text)} >
                    </TextInput>
                </View>
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Pincode/{"\n"}पिनकोड</Text>
                    <TextInput
                        style={styles.input}
                        value={pincode}
                        onChangeText={text => setPincode(text)} >
                    </TextInput>
                </View>
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>School/College{"\n"}Name{"\n"}शाळा/कॉलेजचे नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}                    
                        value={schoolOrCollege}
                        onChangeText={text => setSchoolOrCollege(text)}>                      
                    </TextInput>
                </View>
                {SError ? <Text style ={{color:'red',marginLeft :10}}>{SError}</Text>:null}
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Standard/{"\n"}वर्ग</Text>
                    <TextInput
                        style = {styles.input}
                        value={standard}
                        onChangeText={text => setStandard(text)}       >                      
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
   
            )}
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
        marginRight: '20%'




    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
    },
    loadingText: {
        fontSize: 20,
        marginTop: 10,
        color: 'black',
      },
     
});










          export default UpdateChild;