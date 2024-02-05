import { View, Text, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Logo from '../../assests/images/logo1.jpg';
import Input from '../Input';
import {useRoute} from '@react-navigation/native'
import axios from 'axios';
import config from '../config';

  const SetNewPassword = ({navigation}) => {
    
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [checkPassword, setCheckPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [checkPasswordError, setCheckPasswordError] = useState('');
    const route = useRoute();
    //console.log(route.params.email,route.params.phone)


    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
      };

    const onSubmitPressed = async () => {
        console.log(route.params.phone)
        let errorCount = 0;

            setPasswordError('');
            setCheckPasswordError('');

            if (password.length < 8) {
                setPasswordError('Password should be 8 characters long and must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character');
                errorCount++;
              } else {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
                if (!passwordRegex.test(password)) {
                  setPasswordError('Password should be 8 characters long and must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character');
                  errorCount++;
                }
              }
    
        if (!checkPassword) {
            setCheckPasswordError('Confirm your password!');
            errorCount++;
        }
    
        if (password !== checkPassword) {
            setPasswordError('Passwords do not match');
            setCheckPasswordError('Passwords do not match');
            errorCount++;
        }

        if (errorCount > 0) {
            console.log('Please fill in all the required fields.');
            return;
        }

       const phone =route.params.phone
        try {
            const response = await axios.post(`${config.API_BASE_URL}/Setpassp`, {
                password,
            
                phone,
                
            });
    
            console.log(response.data.message);
            // Handle success, e.g., show a success message or navigate to another screen
            navigation.navigate('SignInPage'); // Replace 'Home' with your destination
    
        } catch (error) {
            console.error('API request error:', error);
            // Handle error, e.g., show an error message
        }
    }
    


    const onLoginPressed = () => {
        navigation.navigate('SignInPage');
    };


    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <View>
                <View
                    backgroundColor='#E38B29'
                    style={styles.container}>
                    <View style={{ marginTop: -8 }}>
                    <Image
                        source={Logo}
                        style={styles.logo}
                    />
                    </View>
                </View>

                <View
                    style={styles.inputContainer}>
                    <Text style={styles.login}>Set New Password</Text>


                    <Input
          title="Password/पासवर्ड *"
          placeholder="********"
          value={password}
          setValue={setPassword}
          errorMessage={passwordError}
          keyboard="default"
          is_password={true}
          togglePasswordVisibility={togglePasswordVisibility} // Pass togglePasswordVisibility
            isPasswordVisible={isPasswordVisible} // Pass isPasswordVisible
        />

                    {passwordError? <Text style={styles.errorMessage}>{passwordError}</Text> : null}

                    <Input
                        title="Confirm Password/पुष्टी करा पासवर्ड *"
                        placeholder="********"
                        value = { checkPassword } 
                        setValue = { setCheckPassword }
                        errorMessage={ checkPasswordError }
                        keyboard="default"
                        is_password={true}
                        togglePasswordVisibility={togglePasswordVisibility} // Pass togglePasswordVisibility
            isPasswordVisible={isPasswordVisible} // Pass isPasswordVisible
                    />
                    {checkPasswordError ? <Text style={styles.errorMessage}>{checkPasswordError}</Text> : null}
        

                    <View
                        backgroundColor='#E38B29'
                        style={styles.button}>
                        <Text onPress={onSubmitPressed} style={{color: 'black', fontSize: 19}}>Submit</Text>
                    </View>

                   

                    <Text onPress={onLoginPressed} style={styles.last}>Back to Login/अर्जदार लॉगिन</Text>

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
        marginBottom: 20,
    },
    button: {
        borderRadius: 100,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 30,
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
 
export default SetNewPassword; 
