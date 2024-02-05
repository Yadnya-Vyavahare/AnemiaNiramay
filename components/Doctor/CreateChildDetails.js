import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as Images from '../ImagePaths';
import { useRoute } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


const CreateChildDetails = ({ navigation }) => {


    const route = useRoute();
    const childFullName = route.params.childFullName;
    const kishoriVarg = route.params.kishoriVarg;


    const onSystemicExaminationPressed = () => {
        navigation.navigate('CreateChildSystemicExamination', { childFullName: childFullName ,kishoriVarg:kishoriVarg});
    }




    const onPhysicalExaminationPressed = () => {
        navigation.navigate('CreateChildPhysicalExamination', { childFullName: childFullName });
    }




    const onDetailPhysicalExaminationPressed = () => {
        navigation.navigate('CreateChildDetailPhysicalExamimation', { childFullName: childFullName });
    }




    const onRemarksPressed = () => {
        navigation.navigate('CreateRemarks', { childFullName: childFullName });
    }




    return (


        <ScrollView showsVerticalScrollIndicator={false}>


        <View style={styles.container}>
           
            <View style={styles.root}>
                <Text style={styles.id}>Child Name</Text>
                <TextInput style = {styles.input} value={childFullName} editable={false}></TextInput>
            </View>




            <TouchableOpacity onPress = {onPhysicalExaminationPressed} >  
                <View style={[styles.slot , {borderTopWidth:1,}]}>
                    <Image source={Images.physical} style={styles.image} />
                    <Text style = {styles.label}>Physical{'\n'}Examination</Text>
                </View>
            </TouchableOpacity>




            <TouchableOpacity onPress = {onSystemicExaminationPressed} >
                <View style={[styles.slot, {borderTopWidth:1,} ]}>
                    <Image source={Images.systemic} style={styles.image} />
                    <Text style = {styles.label}>Systemic{'\n'}Examination</Text>
                </View>
            </TouchableOpacity>




           




            <TouchableOpacity onPress = {onDetailPhysicalExaminationPressed} >
                <View style={styles.slot}>
                    <Image source={Images.detailPhysical} style={styles.image} />
                    <Text style = {styles.label}>Detail Physical{'\n'}Examination</Text>
                </View>
            </TouchableOpacity>




            <TouchableOpacity onPress = {onRemarksPressed} >
                <View style={styles.slot}>    
                    <Image source={Images.remark} style={styles.image} />
                    <Text style = {styles.label}>Remarks</Text>
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
    slot : {
        width:'100%',
        height:'auto',
        flex:1,
        flexDirection:'row',
        borderBottomWidth: 1,
        //marginLeft:'5%',
        //marginRight:'5%' ,
    },
    label: {
        marginTop:'10%',
        marginLeft: '10%',
        color:'black',
        fontSize: RFValue(15),
        fontWeight:'bold',
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


export default CreateChildDetails;