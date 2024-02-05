import React, {useState, useEffect,useContext} from "react";
import { View, Text, StyleSheet, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import config from "../config";
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthContext } from '../AuthContext';


const SystemicExamination = ({ navigation }) => {


    const route = useRoute();
    const childFullName = route.params.childFullName;
    const { userName } = useContext(AuthContext);
    console.log("THis is the", userName)




    const [gastrointestinal, setGastrointestinal] = useState('');
    const [liver, setLiver] = useState('');
    const [spleen, setSpleen] = useState('');
    const [urinogenital, setUrinogenital] = useState('');
    const [centralNervous, setCentralNervous] = useState('');
    const [musculoskeletal, setMusculoskeletal] = useState('');
    const [respiratory, setRespiratory] = useState('');



    // useEffect(() => {
    //     const fetchSystemicExam = async () => {
    //       try {
    //         const response = await axios.get(`${config.API_BASE_URL}/displayDoctorInformation/${childFullName}`);
    //         console.log('Full URL:', `${config.API_BASE_URL}/displayDoctorInformation/${childFullName}`);
    //         const data = response.data.data;
   
    //         // Set individual state for each field
    //         setGastrointestinal(data.gastrointestinal);
    //         setLiver(data.liver);
    //         setSpleen(data.spleen);
    //         setUrinogenital(data.urinogenital);
    //         setCentralNervous(data.centralNervous);
    //         setCentralNervous(data.centralNervous);
    //         setMusculoskeletal(data.musculoskeletal);
    //         setRespiratory(data.respiratory);
   
    //       } catch (error) {
    //         console.error('Error fetching systemic data:', error);
    //       }
    //     };
   
    //     fetchSystemicExam();
    // }, [childFullName]);




    const onSubmitPressed = async() => {


        console.log('Data to be sent:', { childFullName, gastrointestinal, liver, spleen, respiratory, centralNervous, urinogenital, musculoskeletal });
        console.log('sign in')
       
        try {
            const response = await axios.post(`${config.API_BASE_URL}/systemicexamination`, {
                childFullName: childFullName,
                gastrointestinal: gastrointestinal,
                liver: liver,
                spleen: spleen,
                respiratory: respiratory,
                centralNervous: centralNervous,
                urinogenital: urinogenital,
                musculoskeletal: musculoskeletal,
                userName:userName
            });
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            navigation.navigate('UpdateChildDetails',{childFullName:childFullName});
        }
        catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
        }
    };




    return (


        <ScrollView showsVerticalScrollIndicator = {false}>

            <View style={styles.container}>


            <View style={styles.root}>
                <Text style={styles.textf}>Child Name/{"\n"}मुलाचे नाव</Text>
                <TextInput style = {[styles.input, {color: 'gray'}]}
                    value={childFullName}
                    editable={false}>
                </TextInput>
            </View>


           
            <View style={styles.root}>    
                <Text style={styles.textf}>Gastrointestinal{"\n"}Track/{"\n"}गॅस्ट्रोइंटेस्टाइनल ट्रॅक</Text>
                <TextInput
                    style = {styles.input}
                    value={gastrointestinal}
                    onChangeText={(text) => setGastrointestinal (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Liver Condition/{"\n"}यकृत स्थिती</Text>
                <TextInput
                    style = {styles.input}
                    value={liver}
                    onChangeText={(text) => setLiver (text)}>
                </TextInput>
            </View>  




            <View style={styles.root}>                  
                <Text style={styles.textf}>Spleen Condition/{"\n"}प्लीहाची स्थिती</Text>
                <TextInput
                    style = {styles.input}
                    value={spleen}
                    onChangeText={(text) => setSpleen (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Respiratory{"\n"}Condition/{"\n"}श्वसनासंबंधी स्थिती</Text>
                <TextInput
                    style = {styles.input}
                    value={respiratory}
                    onChangeText={(text) => setRespiratory (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Central Nervous{"\n"}System/केंद्रीय_नर्वस{"\n"}सिस्टम</Text>
                <TextInput
                    style = {styles.input}
                    value={centralNervous}
                    onChangeText={(text) => setCentralNervous (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Urinogenital{"\n"}System/{"\n"}युरीनोजेनिटल सिस्टम</Text>
                <TextInput
                    style = {styles.input}
                    value={urinogenital}
                    onChangeText={(text) => setUrinogenital (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Musculoskeletal{"\n"}System/{"\n"}मस्कुलोस्केलेटल सिस्टम</Text>
                <TextInput
                    style = {styles.input}
                    value={musculoskeletal}
                    onChangeText={(text) => setMusculoskeletal (text)}>
                </TextInput>
            </View>


            <TouchableOpacity style = {styles.button}  onPress = {onSubmitPressed} >
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
});



export default SystemicExamination;
