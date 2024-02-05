import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';


const PersonalNavigation = ({ navigation }) => {




    const route = useRoute();
    const childFullName = route.params.childFullName;

    console.log("PErsonal naviahgatiapjhfdilk")




    const onSystemicExaminationPressed = () => {
        navigation.navigate('HeightPersonalGraph',{childFullName : childFullName});
    }








    const onPhysicalExaminationPressed = () => {
        navigation.navigate('WeightPersonal',{childFullName : childFullName});
    }








    const onDetailPhysicalExaminationPressed = () => {
        navigation.navigate('HBReport',{childFullName : childFullName});
    }



    const onMCVPressed = () => {
        navigation.navigate('MCVReport',{childFullName : childFullName});
    }





    const onRemarksPressed = () => {
        navigation.navigate('BMIReport',{childFullName : childFullName});
    }








    return (




        <ScrollView showsVerticalScrollIndicator={false}>




        <View >




            <TouchableOpacity onPress = {onSystemicExaminationPressed} >  
                <View style={[styles.slot, {marginTop: '15%'}]}>
                   
                    <Text style = {styles.label}>Height analysis</Text>
                </View>
            </TouchableOpacity>








            <TouchableOpacity onPress = {onPhysicalExaminationPressed} >
                <View style={[styles.slot]}>
                   
                    <Text style = {styles.label}>Weight analysis</Text>
                </View>
            </TouchableOpacity>








           








            <TouchableOpacity onPress = {onDetailPhysicalExaminationPressed} >
                <View style={styles.slot}>
                   
                    <Text style = {styles.label}>Hemoglobin analysis</Text>
                </View>
            </TouchableOpacity>



            <TouchableOpacity onPress = {onMCVPressed} >
                <View style={styles.slot}>
                   
                    <Text style = {styles.label}>MCV analysis</Text>
                </View>
            </TouchableOpacity>




            <TouchableOpacity onPress = {onRemarksPressed} >
                <View style={styles.slot}>    
                   
                    <Text style = {styles.label}>BMI analysis</Text>
                </View>  
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
        paddingVertical: '10%',
        flexDirection : 'row',
    },
    input: {
        borderBottomWidth:1,
        borderColor: 'gray',
        width: '60%',
        height: 'auto',
        marginTop: '10%',
        padding: '3%',
        borderRadius: 10,
        fontSize: RFValue(13),
        marginTop: '4%',
        marginLeft: 'auto',
        color: 'gray',
        paddingLeft: '3%',
    },
    slot: {
        width: '75%',
        height: 'auto',
        
        flex: 1,
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: '#E38B29', // Add a background color
        borderRadius: 10, // Adjust border radius for a rounded look
        padding: '5%', // Adjust padding for spacing inside the button
        shadowColor: '#000',
        marginVertical: '1%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignSelf: 'center',
    },
    label: {
        marginLeft: '10%',
        color: 'black',
        fontSize: RFValue(15),
        fontWeight: 'bold',
    },
    image: {
        height: 100,
        width: 100,
        margin: 5,
    },
    id: {
        marginTop:'10%',
        fontSize: RFValue(15),
        flexDirection: 'row',
        color:'black',
    },
});




export default PersonalNavigation;
