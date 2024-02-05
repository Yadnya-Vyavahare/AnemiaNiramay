// import React, { useState} from 'react';
// import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import DatePicker from '../DatePicker';
// import config from '../config';


// const DeleteKVS = ({navigation}) => {

//     const [kvsFirstName, setKVSFirstName] = useState('');
//     const [kvsMiddleName, setKVSMiddleName] = useState('');
//     const [kvsLastName, setKVSLastName] = useState('');
//     const [kishoriVarg, setKishoriVarg] = useState(''); 
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [leavingDate, setSelectedDate] = useState('');
//     const [nameError, setNameError] = useState(false);
//     const [inputError, setInputError] = useState(false);


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
//         setSelectedDate(''); // Reset selected date when age is entered directly
//       };
  

//       const deleteData = () => {
//         Alert.alert(
//             'Success',
//             'Kishor Varga Sevika deleted successfully',
//             [
//                 { text: 'OK', onPress: () => navigation.navigate('NGO') }
//             ],
//             { cancelable: false }
//         );
//       }

  
//     const saveData = async() => {
//         if(!doctorFirstName || doctorLastName || kishoriVarg){
//             setNameError(true)
//         }
//         else if(doctorFirstName || doctorLastName || kishoriVarg){
//             setNameError(false)
//         }
//         if(typeof doctorFirstName || doctorLastName || kishoriVarg =='string'){
//             setInputError(true);
//         }
//         else if(typeof doctorFirstName || doctorLastName || kishoriVarg !='string' ){
//             setInputError(false);
//         }

//         console.log('sign in')

//         try {
//             const kvsFullName = `${kvsFirstName} ${kvsMiddleName} ${kvsLastName}`.trim();
//             const response = await axios.post(`${config.API_BASE_URL}/deleteKVSData`, {
//                 kvsFullName: kvsFullName,
//                 kishoriVarg: kishoriVarg,
//                 phoneNumber: phoneNumber,
//                 leavingDate: leavingDate,
//             });

//             console.log(response.data.message);
//             // Handle success, e.g., show a success message or navigate to another screen
//             navigation.navigate('Home'); 

//         } catch (error) {
//           console.error('API request error:', error);
//           // Handle error, e.g., show an error message
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
//                     onChangeText={text => setKVSFirstName(text)} 
//                     value={kvsFirstName}>
//                 </TextInput>
//             </View>  

//             {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter first name *</Text>:null}


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text>
//                 <TextInput 
//                     style = {[styles.input, { marginLeft: 25 }]} 
//                     placeholder="Middle Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setKVSMiddleName(text)} 
//                     value={kvsMiddleName}>
//                 </TextInput>
//             </View>  


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text>
//                 <TextInput 
//                     style = {[styles.input, { marginLeft: 42 }]}  
//                     placeholder="Last Name"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setKVSLastName(text)} 
//                     value={kvsLastName}>
//                 </TextInput>
//             </View>
                
//             {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter last name *</Text>:null}


//             <View style={styles.root}>                  
//                 <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text>
//                 <TextInput 
//                     style = {[styles.input, { marginLeft: 62 }]}   
//                     placeholder="Phone Number"
//                     placeholderTextColor="gray"
//                     onChangeText={text => setPhoneNumber(text)} 
//                     value={phoneNumber}>
//                 </TextInput>
//             </View>


//             <View style={styles.root}>
//                 <Text style={styles.textf}>Leaving Date/{"\n"}सोडण्याची तारीख</Text>
//                 <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/>
//             </View>

           
//             <TouchableOpacity style = {styles.button} onPress={deleteData}>
//                 <Text style = {styles.btnnext}>Delete</Text>
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
    
// export default DeleteKVS;



import React, { useState,useContext} from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from '../DatePicker';
import axios from 'axios';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import config from '../config';
import { AuthContext } from '../AuthContext';



const DeleteKVS = ({navigation}) => {

    const { userName } = useContext(AuthContext);
    console.log("THis is the", userName)
    const [kvsFirstName, setKVSFirstName] = useState('');
    const [kvsMiddleName, setKVSMiddleName] = useState('');
    const [kvsLastName, setKVSLastName] = useState('');
    const [kishoriVarg, setKishoriVarg] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [leavingDate, setSelectedDate] = useState('');
    const [nameError, setNameError] = useState(false);
    const [inputError, setInputError] = useState(false);


   
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setEnteredAge('');
    };




    const handleAgeEntered = (isAgeEntered) => {
        if (isAgeEntered) {
          setSelectedDate('');
        }
    };


      const saveData = async() => {
        if(!kvsFirstName || kvsLastName || kishoriVarg){
            setNameError(true)
        }
        else if(kvsFirstName || kvsLastName || kishoriVarg){
            setNameError(false)
        }
        if(typeof kvsFirstName || kvsLastName || kishoriVarg =='string'){
            setInputError(true);
        }
        else if(typeof kvsFirstName || kvsLastName || kishoriVarg !='string' ){
            setInputError(false);
        }


        console.log('sign in')


        try {
            
            const kvsFullName = `${kvsFirstName} ${kvsMiddleName} ${kvsLastName}`;

            const response = await axios.post(`${config.API_BASE_URL}/deleteKVS`, {
                kvsFullName: kvsFullName,
                kishoriVarg: kishoriVarg,
                phoneNumber: phoneNumber,
                
                userName:userName
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
                    onChangeText={text => setKVSFirstName(text)}
                    value={kvsFirstName.trim()}>
                </TextInput>
            </View>  


            {/* {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter first name *</Text>:null} */}




            <View style={styles.root}>                  
                <Text style={styles.textf}>Middle Name/{"\n"}मध्य नाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Middle Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setKVSMiddleName(text)}
                    value={kvsMiddleName.trim()}>
                </TextInput>
            </View>  




            <View style={styles.root}>                  
                <Text style={styles.textf}>Last Name/{"\n"}आडनाव</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setKVSLastName(text)}
                    value={kvsLastName.trim()}>
                </TextInput>
            </View>
               
            {/* {nameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter last name *</Text>:null} */}






            <View style={styles.root}>                  
                <Text style={styles.textf}>Phone{"\n"}Number/{"\n"}फोन नंबर</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={text => setPhoneNumber(text)}
                    value={phoneNumber.trim()}>
                </TextInput>
            </View>



{/* 
            <View style={styles.root}>
                <Text style={styles.textf}>Leaving Date/{"\n"}सोडण्याची तारीख</Text>
                <DatePicker onSelect={handleDateSelect} onAgeEntered={handleAgeEntered}/>
            </View> */}




       


            <View style={styles.root}>                  
                <Text style={styles.textf}>Kishori Varg{"\n"}किशोरी वर्ग</Text><Text style={{ color: 'red',marginTop:'5%' }}>*</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Kishori Varg"
                    placeholderTextColor="gray"
                    onChangeText={text => setKishoriVarg(text)}                        
                    value={kishoriVarg.trim()}>                      
                </TextInput>
            </View>




           


           
            <TouchableOpacity style = {styles.button} onPress={saveData}>
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
   
export default DeleteKVS;