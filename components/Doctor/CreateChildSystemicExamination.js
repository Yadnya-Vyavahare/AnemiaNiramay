import React, {useState,} from "react";
import { View, Text, StyleSheet, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import config from "../config";


const CreateChildSystemicExamination = ({ navigation }) => {


    const route = useRoute();
    const childFullName = route.params.childFullName;




    const [gastrointestinal, setGastrointestinal] = useState('');
    const [liver, setLiver] = useState('');
    const [spleen, setSpleen] = useState('');
    const [urinogenital, setUrinogenital] = useState('');
    const [centralNervous, setCentralNervous] = useState('');
    const [musculoskeletal, setMusculoskeletal] = useState('');
    const [respiratory, setRespiratory] = useState('');




    const onSubmitPressed = async() => {


        console.log('Data to be sent:', { name, gastrointestinal, liver, spleen, respiratory, centralNervous, urinogenital, musculoskeletal });
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
            });
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            navigation.navigate('SignInPage');
        }
        catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
        }
    };




    return (


        <ScrollView showsVerticalScrollIndicator = {false}>
        <View style = {styles.container}>


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
                    placeholder="Gastrointestinal Track"
                    placeholderTextColor="gray"
                    value={gastrointestinal}
                    onChangeText={(text) => setGastrointestinal (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Liver Condition/{"\n"}यकृत स्थिती</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Liver Condition"
                    placeholderTextColor="gray"
                    value={liver}
                    onChangeText={(text) => setLiver (text)}>
                </TextInput>
            </View>  




            <View style={styles.root}>                  
                <Text style={styles.textf}>Spleen Condition/{"\n"}प्लीहाची स्थिती</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Spleen Condition"
                    placeholderTextColor="gray"
                    value={spleen}
                    onChangeText={(text) => setSpleen (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Respiratory{"\n"}Condition/{"\n"}श्वसनासंबंधी स्थिती</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Respiratory Condition"
                    placeholderTextColor="gray"
                    value={respiratory}
                    onChangeText={(text) => setRespiratory (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Central Nervous{"\n"}System/केंद्रीय_नर्वस{"\n"}सिस्टम</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Central Nervous System"
                    placeholderTextColor="gray"
                    value={centralNervous}
                    onChangeText={(text) => setCentralNervous (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Urinogenital{"\n"}System/{"\n"}युरीनोजेनिटल सिस्टम</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Urinogenital System"
                    placeholderTextColor="gray"
                    value={urinogenital}
                    onChangeText={(text) => setUrinogenital (text)}>
                </TextInput>
            </View>




            <View style={styles.root}>                  
                <Text style={styles.textf}>Musculoskeletal{"\n"}System/{"\n"}मस्कुलोस्केलेटल सिस्टम</Text>
                <TextInput
                    style = {styles.input}
                    placeholder="Musculoskeletal System"
                    placeholderTextColor="gray"
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
    input: {
        color: 'black',
        height: 'auto',
        marginTop: '4%',
        width: '60%',
        borderRadius:0,
        marginLeft:'auto',
        padding:'3%',
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:'5%',
        marginTop:'10%',
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
    textf:{
        marginTop:15,
        marginRight:10,
        fontSize: RFValue(13),
        color:'black',
    }
});


export default CreateChildSystemicExamination;