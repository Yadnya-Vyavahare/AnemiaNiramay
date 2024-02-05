import React from "react";
import { View, Text, Image, StyleSheet,Dimensions,Button,ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';




const OverallReportNavigation = ({ navigation }) => {




    const onSystemicExaminationPressed = () => {
        navigation.navigate('NutritionReport');
    }



 

    const onRecoveryPressed = () => {
        navigation.navigate('Recovery');
    }



    const onPhysicalExaminationPressed = () => {
        navigation.navigate('AgeAnalysis');
    }








    const onDetailPhysicalExaminationPressed = () => {
        navigation.navigate('MarritalStatusReport');
    }








    const onRemarksPressed = () => {
        navigation.navigate('Anemic');
    }








    return (




        <ScrollView showsVerticalScrollIndicator={false}>




        <View >




            <TouchableOpacity onPress = {onPhysicalExaminationPressed} >  
                <View style={[styles.slot, {marginTop: '15%'}]}>
                   
                    <Text style = {styles.label}>Age analysis</Text>
                </View>
            </TouchableOpacity>

           


            <TouchableOpacity onPress = {onSystemicExaminationPressed} >
                <View style={styles.slot}>
                   
                    <Text style = {styles.label}>Nutrition Status</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress = {onRecoveryPressed} >
                <View style={styles.slot}>
                   
                    <Text style = {styles.label}>Recovery Report</Text>
                </View>
            </TouchableOpacity>






            <TouchableOpacity onPress = {onDetailPhysicalExaminationPressed} >
                <View style={styles.slot}>
                   
                    <Text style = {styles.label}>Marital Status</Text>
                </View>
            </TouchableOpacity>








            <TouchableOpacity onPress = {onRemarksPressed} >
                <View style={styles.slot}>    
                   
                    <Text style = {styles.label}>Anemic status</Text>
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




export default OverallReportNavigation;