import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet,  TouchableOpacity , TextInput, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from "axios";
import config from "../config";


const CreateChildDetailPhysicalExamimation = () => {


    const navigation = useNavigation();
    const route = useRoute();
    const childFullName = route.params.childFullName;




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

    const [loading, setLoading] = useState('');
    const [NameError, setNameError] = useState(false);
    const [InputError, setInputError] = useState(false);
 


    const onSubmitPressed = async() => {


        console.log('Data to be sent:', { pallor, heartCondition, eyeAcuity, colorBlindness, nailCondition, conjunctiveCondition, scalpCondition, lymphadenopathy,hernialSites, headNeckSpine,earsHearing,earsDischarge,noseCondition,throatCondition,speech,mouthCondition, gumsCondition,teethCondition});
        console.log('sign in')
        setLoading(true);
       
        try {
            const response = await axios.post(`${config.API_BASE_URL}/detailPhyExamination`, {
                childFullName: childFullName,
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


            });
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
           
            Alert.alert(
                'Success',
                'Child data created successfully',
                [
                  { text: 'OK', onPress: () => navigation.navigate('CreateChildDetails') }
                ],
                { cancelable: false }
              );
        }
        catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
            Alert.alert(
                'Error',
                'Error filling child details. Please try again.',
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




    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="orange" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        );
      }





    return (
       
        <ScrollView >


        <View style={styles.container}>


            <View style={styles.root}>                  
                <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text>
                <TextInput
                    style = {[styles.input, {color: 'gray'}]}
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
                    placeholderTextColor="gray"
                    placeholder="Lymphadenopathy"
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
    textf:{
        marginTop:'10%',
        marginRight:'3%',
        fontSize: RFValue(14),
        color: 'black',
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:'5%',
        marginTop:'10%',
        backgroundColor: '#E38B29',
        width: '50%',
        alignSelf: 'center',
        marginBottom:'5%',
        borderRadius:20
    },
    btnnext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: RFValue(13),
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
   
export default CreateChildDetailPhysicalExamimation;