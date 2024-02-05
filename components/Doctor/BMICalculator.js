import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

const BMICalculator = () => {

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState(''); 
    const [bmi, setBmi] = useState('');
    const [description, setDescription] = useState(''); 
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');

    const validateInput = (inputValue, setError) => {
        const valueNumber = parseFloat(inputValue);
        if (isNaN(valueNumber) || valueNumber <= 0) {
            setError(`Please enter a valid number greater than 0 for ${inputValue === weight ? 'weight' : 'height'}`);
            return false;
        }
        setError('');
        return true;
    };

    const calculateBmi = () => {
        const isWeightValid = validateInput(weight, setWeightError);
        const isHeightValid = validateInput(height, setHeightError);
    
        if (isWeightValid && isHeightValid) {
            const bmiValue = weight / ((height / 100) * (height / 100));
            setBmi(bmiValue.toFixed(1));
    
            if (bmiValue < 18.5) {
                setDescription('Underweight!');
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                setDescription('Normal!');
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                setDescription('Overweight!');
            } else if (bmiValue >= 30) {
                setDescription('Obese, Hit the gym');
            }

            console.log(bmiValue);
        }
    };
    
    
    return (

        <View style={styles.container}>
        
            <Text style={styles.subTitle}>Weight in kg</Text>


            <TextInput
                placeholder={`Weight in kg *`}
                placeholderTextColor="gray"
                value = { weight } 
                setValue = { setWeight }
                errorMessage={weightError}
                onChangeText={(text) => setWeight(text)}                    
                keyboardType='numeric'
                style = {styles.input}>
            </TextInput>

            {weightError ? <Text style={styles.errorMessage}>{weightError}</Text> : null}

                
            <Text style={styles.subTitle}>Height in cm</Text>


            <TextInput
                placeholder = {`Height in cm *`} 
                placeholderTextColor="gray"
                value = { height } 
                setValue = { setHeight }
                errorMessage={heightError}
                onChangeText={(text) => setHeight(text)} 
                keyboardType='numeric'
                style = {styles.input}>
            </TextInput>

            {heightError ? <Text style={styles.errorMessage}>{heightError}</Text> : null}

                
            <TouchableOpacity style={styles.button} onPress={calculateBmi}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>


            <View style={styles.resultView}>
                <Text style={styles.result}>BMI: {'\t\t\t\t\t\t\t\t\t\t\t'}{bmi}</Text>
                <Text style={styles.result}>Description: {'\t'} {description}</Text>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        paddingTop: 20,
        marginBottom: -100,
    },
    title: {
        height:80, 
        alignItems: 'center', 
        marginBottom:10,
        backgroundColor: '#2c6975',
        justifyContent: 'center', 
    },
    titleText:{
        fontSize:30,
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        height:55, 
        margin:15,
        borderWidth:1/2,
        padding:10,
        borderRadius:5,
        backgroundColor: '#FFD8A9', 
        fontSize:18,
        color: 'black',
    },  
    button: {
        width: '50%',
        height:55,
        margin:15,
        borderRadius:5,
        backgroundColor: '#E38B29',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize:20,
        color: 'black',
        fontWeight: 'bold',
    },  
    resultView:{      
        margin:15, 
        marginBottom: 150,
    },   
    result:{
        fontSize:RFValue(20),
        color: 'black',
        fontWeight: 'bold'
    },
    errorMessage: {
        color: 'red',
        marginTop: 3,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    asterisk: {
        color: 'red', 
        marginLeft: 5, 
    },
    subTitle: {
        paddingLeft: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default BMICalculator;