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


// const UpdateKVS = ({ navigation }) => {


//     const route = useRoute();
//     const name = route.params.name;
//     const { userName } = useContext(AuthContext);
//     console.log("THis is the", userName)

//     const [kvsFirstName, setKVSFirstName] = useState('');
//     const [kvsMiddleName, setKVSMiddleName] = useState('');
//     const [kvsLastName, setKVSLastName] = useState('');
//     const [kishoriVarg, setKishoriVarg] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [selectedDate, setSelectedDate] = useState('');
//     const [originalSelectedDate, setOriginalSelectedDate] = useState('');
//     const [enteredAge, setEnteredAge] = useState('');
//     const [aadharNumber, setAadharNumber] = useState('');
//     //const [gender, setGender] = useState('');
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
//     const [nameError, setNameError] = useState(false);
//     const [inputError, setInputError] = useState(false);


//     useEffect(() => {
//         const fetchKVSData = async () => {
//           try {
//             const response = await axios.get(`${config.API_BASE_URL}/displayKVSInformation/${name}`);
//             console.log('Full URL:', `${config.API_BASE_URL}/displayKVSInformation/${name}`);
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
//             const [firstName, middleName, lastName] = data.kvsFullName.split(' ');


//             console.log('Fetched Marital Status:', data.maritalStatus);
   
//             // Set individual state for each field
//             setKVSFirstName(firstName);
//             setKVSMiddleName(middleName);
//             setKVSLastName(lastName);
//             setKishoriVarg(data.kishoriVarg);
//             setPhoneNumber(data.phoneNumber);
//             setSelectedDate(formattedDate || '');
//             setEnteredAge(data.enteredAge);
//             setAadharNumber(data.aadharNumber);
//             setMaritalStatus(data.maritalStatus || '');
//             setReligion(data.religion);
//             setCaste(data.caste);
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
   
//         fetchKVSData();
//     }, [name]);
   
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
     
//     const oldKVSFullName = name;
 
//     const saveData = async () => {


//         console.log('Marital Status before API request:', maritalStatus);
       
//             try {


//                 // Concatenate the full name
//                 const updatedKVSFullName = `${kvsFirstName} ${kvsMiddleName} ${kvsLastName}`.trim();


//                 const response = await axios.post(`${config.API_BASE_URL}/updateKVSPersonal/update`, {
//                     updatedKVSFullName,
//                     kishoriVarg,
//                     phoneNumber,
//                     selectedDate: originalSelectedDate,
//                     enteredAge,
//                     aadharNumber,
//                     maritalStatus,
//                     religion,
//                     caste,
//                     flatNumber,
//                     area,
//                     landmark,
//                     city,
//                     district,
//                     state,
//                     pincode,userName,
//                     oldKVSFullName,
//                 });
//                 console.log(response.data.message);
//               // Handle success, e.g., show a success message or navigate to another screen
//               // Show success message
//             Alert.alert(
//                 'Success',
//                 'Data updated successfully',
//                 [
//                   { text: 'OK', onPress: () => navigation.navigate('NGO') }
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


//           return (


//             <ScrollView >

//                 <View style={styles.container}>
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>First Name/{"\n"}प्रथम नाव</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="First Name"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setKVSFirstName(text)}
//                         value={kvsFirstName}>
//                     </TextInput>
//                 </View>  
   
//                 {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter first name *</Text>:null}
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Middle Name"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setKVSMiddleName(text)}
//                         value={kvsMiddleName}>
//                     </TextInput>
//                 </View>  
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text>
//                     <TextInput
//                         style = {styles.input} 
//                         placeholder="Last Name"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setKVSLastName(text)}
//                         value={kvsLastName}>
//                     </TextInput>
//                 </View>
                   
//                 {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter last name *</Text>:null}
   
   
//                 {/* <View style={styles.root}>                  
//                     <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text>
//                     <TextInput
//                         style = {[styles.input, { marginLeft: 62 }]}  
//                         placeholder="Kishori Varg"
//                         onChangeText={text => setKishoriVarg(text)}                        
//                         value={kishoriVarg}>
//                     </TextInput>
//                 </View>
           
//                 {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter Kishori Varg *</Text>:null} */}
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Phone Number"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setPhoneNumber(text)}
//                         value={phoneNumber}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>
//                     <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
//                     <DatePicker initialDate={selectedDate} onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
//                 </View>
   
   
//                 <View style={styles.root}>
//             <Text style={[styles.textf, {marginRight: '25%'}]}>Age/{"\n"}वय</Text>
//                 <AgeCalculator selectedDate={selectedDate} enteredAge={enteredAge} onAgeChange={handleAgeChange}/>
//             </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Aadhar{"\n"}Number/{"\n"}आधार क्रमांक</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Aadhar Number"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setAadharNumber(text)}                        
//                         value={aadharNumber}>
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
//                     <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '37%'}}>Unmarried</Text>
//                     <RadioButton
//                         value="Unmarried"
//                         status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
//                         onPress={() => setMaritalStatus('Unmarried')}
//                         color="#E38B29"
//                     />
//                 </View>

   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Religion/{"\n"}धर्म</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Religion"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setReligion(text)}                        
//                         value={religion}>                      
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Caste/{"\n"}जात</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Caste"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setCaste(text)}                        
//                         value={caste}>                      
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Flat Number/{"\n"}फ्लॅट क्रमांक</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Flat Number"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setFlatNumber(text)}
//                         value={flatNumber}>
//                     </TextInput>
//                 </View>
               
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Area/प्रदेश</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Area"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setArea(text)}
//                         value={area}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Landmark/{"\n"}लॅंडमार्क</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="Landmark"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setLandmark(text)}
//                         value={landmark}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>City/शहर</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="City"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setCity(text)}
//                         value={city}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>District/जिल्हा</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="District"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setDistrict(text)}
//                         value={district}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>State/राज्य</Text>
//                     <TextInput
//                         style = {styles.input}
//                         placeholder="State"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setState(text)}
//                         value={state}>
//                     </TextInput>
//                 </View>
   
   
//                 <View style={styles.root}>                  
//                     <Text style={styles.textf}>Pincode/{"\n"}पिनकोड</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Pincode"
//                         placeholderTextColor="gray"
//                         onChangeText={text => setPincode(text)}
//                         value={pincode.toString()}>
//                     </TextInput>
//                 </View>
   
   
//                 <TouchableOpacity style = {styles.button} onPress={saveData}>
//                     <Text style = {styles.btnnext}>Submit</Text>
//                 </TouchableOpacity>

//                 </View>
   
//             </ScrollView>
//         );


//             };


//             const styles = StyleSheet.create({
//                 container: {
//                     elevation: 10,
//                     backgroundColor: 'white',
//                     borderRadius: 10,
//                     margin: heightPercentageToDP('1%'),
//                     paddingVertical: '3%',
//                     paddingHorizontal: '3%',
//                 },
//                 root: {
//                     padding: '3%',
//                     flexDirection:'row',
//                     marginTop: '3%',
//                 },
//                 textf:{
//                     marginTop:'5%',
//                     marginRight:'4%',
//                     fontSize: RFValue(13),
//                     color:'black'
//                 },
//                 button: {
//                     alignSelf: 'stretch',
//                     alignItems: 'center',
//                     padding:'5%',
//                     marginTop:'20%',
//                     backgroundColor: '#E38B29',
//                     width: '50%',
//                     alignSelf: 'center',
//                     marginBottom:'10%',
//                     borderRadius:20,
//                 },
//                 btnnext: {
//                     color: 'black',
//                     fontWeight: 'bold',
//                     fontSize: RFValue(13),
//                 },
//                 input: {
//                     borderBottomWidth:1,
//                     height: 'auto',
//                     marginTop: 'auto',
//                     width: '50%',
//                     borderRadius:0,
//                     color:'black',
//                     padding:'3%',
//                     marginLeft: 'auto',
//                 },
//                 radioContainer: {
//                     flexDirection:'row',
//                     marginRight:'20%',
//                     marginTop: '8%',
//                 },
//                 radioButton: {
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginTop: '2%',
//                 },
//                 radioLabel: {
//                     fontSize: RFValue(13),
//                     color:'black',
//                     marginBottom: '8%',
//                     marginLeft: '3%',
//                     marginTop: '8%',
//                     marginRight: '15%'
            
            
//                 },
//             });



//           export default UpdateKVS;



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
import { transformNumber, reverseTransform } from '../Transformation';




const UpdateKVS = ({ navigation }) => {




    const route = useRoute();
    const kvsFullName = route.params.kvsFullName;
    const { userName } = useContext(AuthContext);
    console.log("...........      ",kvsFullName)


    const [kvsFirstName, setKVSFirstName] = useState('');
    const [kvsMiddleName, setKVSMiddleName] = useState('');
    const [kvsLastName, setKVSLastName] = useState('');
    const [kishoriVarg, setKishoriVarg] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [originalSelectedDate, setOriginalSelectedDate] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
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
    const [isLoading, setIsLoading] = useState(true);
    const [firstError, setFirstError] = useState(false);
    const [MError, setMError] = useState(false);
    const [fLError, setLError] = useState(false);
    const [AError, setAError] = useState(false);
    const [rError, setRError] = useState(false);
    const [cError, setCError] = useState(false);
    const [kvError, setKVError] = useState(false);




    useEffect(() => {
        const fetchKVSData = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get(`${config.API_BASE_URL}/displayKVSInformation/${kvsFullName}`);
            const data = response.data.data;




            let formattedDate = '';


            if(data.selectedDate !== null){
                const dt = new Date(data.selectedDate);
            const x = dt.toISOString().split('T');
            const x1 = x[0].split('-');
            formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
            }




            // Split the full name into three parts
            const [firstName, middleName, lastName] = data.kvsFullName.split(' ');
            const raadharNumber = reverseTransform(data.aadharNumber);


   
            // Set individual state for each field
            setKVSFirstName(firstName);
            setKVSMiddleName(middleName);
            setKVSLastName(lastName);
            setKishoriVarg(data.kishoriVarg);
            setPhoneNumber(data.phoneNumber);
            setSelectedDate(formattedDate || '');
            setEnteredAge(data.enteredAge);
            setAadharNumber(raadharNumber);
            setMaritalStatus(data.maritalStatus || '');
            setReligion(data.religion);
            setCaste(data.caste);
            setFlatNumber(data.flatNumber);
            setArea(data.area);
            setLandmark(data.landmark);
            setCity(data.city);
            setDistrict(data.district);
            setState(data.state);
            setPincode(data.pincode);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching kvs data:', error);
            setIsLoading(false);
          }
        };
   
        fetchKVSData();
    }, [kvsFullName]);
   
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
     
    const oldKVSFullName = kvsFullName;
 
    const saveData = async () => {


        let errorCount = 0;
        const passwordRegex = /^\d{12,}$/;
        const nameRegex = /^[A-Za-z\s]+$/;


        // if (!passwordRegex.test(aadharNumber)) {
        //     setAError('Aadhar number should be of 12 integers,\ncontainig any numbers between 0-9');
        //   errorCount++;
        // }
        if (!nameRegex.test(kvsFirstName)) {
            setFirstError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!nameRegex.test(kvsMiddleName) ) {
            setMError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!nameRegex.test(kvsLastName)) {
            setLError('Name should only contain A-za-z alphabets');
          errorCount++;
        }
        if (!kishoriVarg) {
            setKVError('Enter Kishori Varga!');
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
                const updatedKVSFullName = `${kvsFirstName} ${kvsMiddleName} ${kvsLastName}`.trim();
                const maskedAadhar = transformNumber(aadharNumber);


                const response = await axios.post(`${config.API_BASE_URL}/updateKVSPersonal/update`, {
                    updatedKVSFullName,
                    kishoriVarg,
                    phoneNumber,
                    selectedDate: originalSelectedDate || null,
                    enteredAge,
                    aadharNumber: maskedAadhar,
                    maritalStatus,
                    religion,
                    caste,
                    flatNumber,
                    area,
                    landmark,
                    city,
                    district,
                    state,
                    pincode:pincode || null,
                    userName,
                    oldKVSFullName,
                });
                console.log(response.data.message);
              // Handle success, e.g., show a success message or navigate to another screen
              // Show success message
            Alert.alert(
                'Success',
                'Data updated successfully',
                [
                  { text: 'OK', onPress: () => navigation.navigate('NGO') }
                ],
                { cancelable: false }
              );
         
              // Handle success, e.g., show a success message or navigate to another screen
            } catch (error) {
         
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
                        style = {styles.input}
                        placeholder="First Name"
                        placeholderTextColor="gray"
                        onChangeText={text => setKVSFirstName(text)}
                        value={kvsFirstName}>
                    </TextInput>
                </View>  
   
                {firstError ? <Text style ={{color:'red',marginLeft :10}}>{firstError}</Text>:null}
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        placeholder="Middle Name"
                        placeholderTextColor="gray"
                        onChangeText={text => setKVSMiddleName(text)}
                        value={kvsMiddleName}>
                    </TextInput>
                </View>  
                {MError ? <Text style ={{color:'red',marginLeft :10}}>{MError}</Text>:null}
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                    <TextInput
                        style = {styles.input}
                        placeholder="Last Name"
                        placeholderTextColor="gray"
                        onChangeText={text => setKVSLastName(text)}
                        value={kvsLastName}>
                    </TextInput>
                </View>
                   
                {fLError ? <Text style ={{color:'red',marginLeft :10}}>{fLError}</Text>:null}
   
   
                <View style={styles.root}>                  
                    <Text style={styles.textf}>Kishori{"\n"}Varg/{"\n"}किशोरी वर्ग</Text>
                    <TextInput
                        style = {[styles.input, { marginLeft: 62 }]}  
                        placeholder="Kishori Varg"
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


   
                {/* <View style={styles.root}>
                    <Text style={styles.textf}>Birth Date/{"\n"}जन्म तारीख</Text>
                    <DatePicker initialDate={selectedDate} onSelect={handleDateSelect} onAgeEntered={handleAgeEntered} />
                </View>
    */}
   
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
                        value={aadharNumber.toString()}>
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
                    <Text style={{ fontSize: RFValue(13), color: 'black', marginLeft: '37%'}}>Unmarried</Text>
                    <RadioButton
                        value="Unmarried"
                        status={ maritalStatus === 'Unmarried' ? 'checked' : 'unchecked' }
                        onPress={() => setMaritalStatus('Unmarried')}
                        color="#E38B29"
                    />
                </View>


   
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
                        value={pincode.toString()}>
                    </TextInput>
                </View>
   
   
                <TouchableOpacity style = {styles.button} onPress={saveData}>
                    <Text style = {styles.btnnext}>Submit</Text>
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






          export default UpdateKVS;