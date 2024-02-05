import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect,useContext } from "react";
import { View, Text, StyleSheet,  TouchableOpacity , TextInput, ScrollView,Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import config from "../config";

const DetailPhysicalExamimation = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const childFullName = route.params.childFullName;
    const { userName } = useContext(AuthContext);
    console.log("THis is the", userName)


    const [pallor, setPallor] = useState('');
    const [heartCondition, setHeartCondition] = useState('');
    const [eyeAcuity, setEyeAcuity] = useState('');
    const [colorBlindness, setColorBlindness] = useState('');
    const [nailCondition, setNailCondition] = useState('');
    const [conjunctiveCondition, setConjunctiveCondition] = useState('');
    const [scalpCondition, setScalpCondition] = useState('');
    const [lymphadenopathy, setLymphadenopathy] = useState('');
    const [hernialSites, setHernialSites] = useState('');
    const [headNeckSpine, setHeadNeckSpine] = useState('');
    const [earsHearing, setEarsHearing] = useState('');
    const [earsDischarge, setEarsDischarge] = useState('');
    const [noseCondition, setNoseCondition] = useState('');
    const [throatCondition, setThroatCondition] = useState('');
    const [speech, setSpeech] = useState('');
    const [mouthCondition, setMouthCondition] = useState('');
    const [gumsCondition, setGumsCondition] = useState('');
    const [teethCondition, setTeethCondition] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [NameError, setNameError] = useState(false);
    const [InputError, setInputError] = useState(false);
  

//     useEffect(() => {
//         const fetchDetailPhyExam = async () => {
//           try {
//             const response = await axios.get(`${config.API_BASE_URL}/displayDetailPhyInformation/${name}`);
//             console.log('Full URL:', `${config.API_BASE_URL}/displayDetailPhyInformation/${name}`);
//             const data = response.data.data;


//             setPallor(data.pallor);
//             setHeartCondition(data.heartCondition);
//             setEyeAcuity(data.eyeAcuity);
//             setColorBlindness(data.colorBlindness);
//             setNailCondition(data.nailCondition);
//             setConjunctiveCondition(data.conjunctiveCondition);
//             setScalpCondition(data.scalpCondition);
//             setLymphadenopathy(data.lymphadenopathy);
//             setHernialSites(data.hernialSites);
//             setHeadNeckSpine(data.headNeckSpine);
//             setEarsHearing(data.earsHearing);
//             setEarsDischarge(data.earsDischarge);
//             setNoseCondition(data.noseCondition);
//             setThroatCondition(data.throatCondition);
//             setSpeech(data.speech);
//             setMouthCondition(data.mouthCondition);
//             setGumsCondition(data.gumsCondition);
//             setTeethCondition(data.teethCondition);
//             setLoading(false);
//           } catch (error) {
//             console.error('Error fetching detail physical data:', error);
//             setError('Error fetching details. Please try again.');
//             setLoading(false); // Set loading to false in case of an error
//           }
//         };
   
//         fetchDetailPhyExam();
//     }, [name]);




// if (loading) {
//         return (
//           <View style={styles.loadingContainer}>
//             <Text style={styles.loadingText}>Loading...</Text>
//           </View>
//         );
//       }


    //   if (error) {
    //     Alert.alert(
    //       'Error',
    //       error,
    //       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    //       { cancelable: false }
    //     );
    //     return null; // or render an error component
    //   }




const onSubmitPressed = async() => {


        console.log('Data to be sent:', { pallor, heartCondition, eyeAcuity, colorBlindness, nailCondition, conjunctiveCondition, scalpCondition, lymphadenopathy,hernialSites, headNeckSpine,earsHearing,earsDischarge,noseCondition,throatCondition,speech,mouthCondition, gumsCondition,teethCondition});
        console.log('sign in')
        setLoading(true);
       
        try {
            const response = await axios.post(`${config.API_BASE_URL}/detailPhyExamination`, {
                childFullName:childFullName,
                pallor: pallor,
                heartCondition: heartCondition,
                eyeAcuity: eyeAcuity,
                colorBlindness: colorBlindness,
                nailCondition: nailCondition,
                conjunctiveCondition: conjunctiveCondition,
                scalpCondition: scalpCondition,
                lymphadenopathy: lymphadenopathy,
                hernialSites: hernialSites,
                headNeckSpine: headNeckSpine,
                earsHearing: earsHearing,
                earsDischarge: earsDischarge,
                noseCondition: noseCondition,
                throatCondition: throatCondition,
                speech: speech,
                mouthCondition: mouthCondition,
                gumsCondition: gumsCondition,
                teethCondition: teethCondition,
               userName:userName

            });
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
           
            Alert.alert(
                'Success',
                'Data updated successfully',
                [
                  { text: 'OK', onPress: () => navigation.navigate('UpdateChildDetails',{childFullName:childFullName}) }
                ],
                { cancelable: false }
              );
        }
        catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
            Alert.alert(
                'Error',
                'Error updating data. Please try again.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
        }
        finally {
            setLoading(false); // Set loading to false regardless of success or error
          }
    };




    return (
        
        <ScrollView >

            <View style={styles.container}>

            <View style={styles.root}>                  
                <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text>
                <TextInput 
                    style = {[styles.input, { color: 'gray'}]} 
                    value={childFullName} 
                    editable={false}>
                </TextInput>    
            </View>

            {NameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter full name *</Text>:null}


            

            <View style={styles.root}>                  
                <Text style={styles.textf}>Pallor</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Pallor"
                    placeholderTextColor="gray"
                    onChangeText={text => setPallor(text)}
                    value={pallor}>
                </TextInput>
            </View>

            {NameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter last name *</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Heart Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Heart Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setHeartCondition(text)}
                    value={heartCondition}>
                </TextInput>
            </View>

            {NameError ? <Text style ={{color:'red',marginLeft :10}}>*Please enter BIT *</Text>:null}


            <View style={styles.root}>                  
                <Text style={styles.textf}>Eye Acuity</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Eye Acuity"
                    placeholderTextColor="gray"
                    onChangeText={text => setEyeAcuity(text)}
                    value={eyeAcuity}>
                </TextInput>
            </View>

            
            <View style={styles.root}>                  
                <Text style={styles.textf}>Color Blindness</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Color Blindness"
                    placeholderTextColor="gray"
                    onChangeText={text => setColorBlindness(text)}
                    value={colorBlindness}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Nail Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Nail Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setNailCondition(text)}
                    value={nailCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Conjuctive{"\n"}Condition</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Conjuctive Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setConjunctiveCondition(text)}
                    value={conjunctiveCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Scalp Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Scalp Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setScalpCondition(text)}
                    value={scalpCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Lymphadenopathy</Text>
                <TextInput 
                    style = {styles.input}    
                    placeholder="Lymphadenopathy"
                    placeholderTextColor="gray"
                    onChangeText={text => setLymphadenopathy(text)}
                    value={lymphadenopathy}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Hernial Sites</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Hernial Sites"
                    placeholderTextColor="gray"
                    onChangeText={text => setHernialSites(text)}
                    value={hernialSites}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Head Neck Spine</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Head Neck Spine"
                    placeholderTextColor="gray"
                    onChangeText={text => setHeadNeckSpine(text)}
                    value={headNeckSpine}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Ears hearing</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Ears Hearing"
                    placeholderTextColor="gray"
                    onChangeText={text => setEarsHearing(text)}
                    value={earsHearing}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Ears Discharge</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Ears discharge"
                    placeholderTextColor="gray"
                    onChangeText={text => setEarsDischarge(text)}
                    value={earsDischarge}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Nose Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Nose Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setNoseCondition(text)}
                    value={noseCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Throat Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Throat Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setThroatCondition(text)}
                    value={throatCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Speech</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Speech"
                    placeholderTextColor="gray"
                    onChangeText={text => setSpeech(text)}
                    value={speech}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Mouth Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Mouth Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setMouthCondition(text)}
                    value={mouthCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Gums Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Gums Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setGumsCondition(text)}
                    value={gumsCondition}>
                </TextInput>
            </View>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Teeth Condiion</Text>
                <TextInput 
                    style = {styles.input}   
                    placeholder="Teeth Condition"
                    placeholderTextColor="gray"
                    onChangeText={text => setTeethCondition(text)}
                    value={teethCondition}>
                </TextInput>
            </View>


            <TouchableOpacity style = {styles.button} onPress={onSubmitPressed}>
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
        color: 'white',
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
      },
      loadingText: {
        color: 'orange',
        marginTop: 10, // Optional: Adjust the margin to your preference
      },
});

    
export default DetailPhysicalExamimation;