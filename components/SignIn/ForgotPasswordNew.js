import React, { useState } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Logo from '../../assests/images/logo1.jpg';
import Input from '../Input';
import axios from 'axios';
import config from '../config';

const ForgotPassword = ({ navigation }) => {
  const [phone, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
 

  const onSendPressed = async () => {
    let errorCount = 0;

    setPhoneError('');

    if (!phone) {
      setPhoneError('Enter a phone number!');
      errorCount++;
    } 

    if (errorCount > 0) {
      console.log('Please fill in all the required fields.');
      return;
    } 

    try {
        const response = await axios.post(`${config.API_BASE_URL}/Setphone`, {
           phone : phone
        });
  
        console.log(response.data.message);
        
       
       
        navigation.navigate('SetNnewPassword',{phone:phone});
       
    } catch (error) {
  
        if (error.response && error.response.status === 401) {
  
            console.log('Invalid Phone number. Please try again.');
            setPhoneError('Invalid Phone Number ');
           
        } else {
           
            console.error('Unexpected error:', error);
            
        }
    }


}

    

  const onLoginPressed = () => {
    navigation.navigate('SignInPage');
  };

  const onPressEmail = () =>{
    navigation.navigate('ForgotPassword')
  }
  
  const onPressValidate =()=>{
    navigation.navigate('SetNewPassword');
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View backgroundColor='#E38B29' style={styles.container}>
          <View style={{ marginTop: -8 }}>
            <Image source={Logo} style={styles.logo} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.login}>Reset Password</Text>

          <Input
            title="Phone Number/फ़ोन नंबर"
            placeholder="123-456-7890"
            value={phone}
            setValue={setPhoneNumber}
            
            keyboard="phone-pad"
          />
          {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}


           <TouchableOpacity onPress={onPressEmail} style={[styles.button, { alignSelf: 'flex-end' }]}>
          <Text style={{ color: 'black', fontSize: 16 }}>Using Email ?</Text>
          </TouchableOpacity>


           <TouchableOpacity onPress={onSendPressed} style={[styles.button, { backgroundColor: 'darkorange' }]}>
            <Text style={{ color: 'black', fontSize: 20 }}>Validate</Text>
            </TouchableOpacity>
        
            

          <Text onPress={onLoginPressed} style={styles.last}>
            Back to Login/अर्जदार लॉगिन
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.2,
        width: '100%',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 50,
    },
    logo:{ 
        width: 70, 
        height: 100, 
        borderRadius: 10 
    },
    inputContainer: {
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        marginTop: 100,
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    login: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        borderRadius: 100,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        marginTop: 3,
        alignSelf: 'flex-start',
    },
    asterisk: {
        color: 'red', 
        marginLeft: 5, 
    },
    last: {
        color: 'black', 
        fontSize: 16, 
        textAlign: 'center',
        marginTop: 10,
    }
});


export default ForgotPassword;



