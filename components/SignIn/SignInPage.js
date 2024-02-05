import { View, Text, Dimensions, Image, StyleSheet, ScrollView, ActivityIndicator  } from 'react-native';
import React, { useState, useContext } from 'react';
import Logo from '../../assests/images/logo1.jpg';
import axios from 'axios';
import Input from '../Input';
import { AuthContext } from '../AuthContext';
import config from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import NGODoctorOptions from '../dropDownCheck';
  
  const SignInPage = ({navigation}) => {

    const { setAuthData } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
      };
      

    const onLoginPressed = async () => {

        let errorCount = 0;

        setUserNameError('');
        setPasswordError('');

        if (!userName) {
            setUserNameError('Enter a username!');
            errorCount++;
        }

        if (!password) {
            setPasswordError('Enter a password!');
            errorCount++;
        }

        if (errorCount > 0) {
            
            console.log('Please fill in all the required fields.');
            return;
        }

        setIsLoading(true); 


        console.log('sign in')
        try {

            const response = await axios.post(`${config.API_BASE_URL}/loginuser`, {
                userName: userName.trim(),
                password: password.trim(),
            });

            console.log(response.data.message);
            
            const userRole = response.data.user;
           

            setAuthData(userName);

            if (userRole === 'Doctor') {
                
            navigation.navigate('Doctor');
           
            } else if (userRole === 'NGO') {
                
            navigation.navigate('NGO');
            } else {
            console.error('Invalid user role:', userRole);
            }

            setUserName('');
        setPassword('');

        } catch (error) {
      
            if (error.response && error.response.status === 401) {
    
                console.log('Invalid username or password. Please try again.');
                setPasswordError('Invalid username or password');
            } else {
               
                console.error('Unexpected error:', error);
                
            }
        }
        finally {
            setIsLoading(false); // Set loading state to false when the login process finishes
          }
    }


    // const onForgotPasswordPressed = () => {
    //     console.log('Navigating with params:', 'Rekha Ramesh Sawant');
    //     navigation.navigate('UpdateChild', { params: 'Rekha Ramesh Sawant' });
    // };

    // const onForgotPasswordPressed = () => {
    //     console.log('Navigating with params:', 'Meena Ashok Thakur');
    //     navigation.navigate('UpdateChild', { params: 'Meena Ashok Thakur' });
    // };
    
    // const onForgotPasswordPressed = () => {
    //     navigation.dispatch(CommonActions.navigate('Navigation', { screen: 'PhysicalExamination', params: ' Suman Nitin Dighe'}));
    //     //navigation.dispatch(CommonActions.navigate('Navigation', { screen: 'DisplayList'}));
    // };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
        //navigation.navigate('CreatePDF');
      };
      
    
    
    

    const onRegisterPressed = () => {
        navigation.navigate('Register');
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
                    <Text style={styles.login}>LOGIN/लॉग इन करा</Text>

                    <Input
                        title="Username/युजर नेम *"
                        placeholder="Niramay"
                        value = { userName } 
                        setValue = { setUserName }
                        errorMessage={ userNameError }
                        keyboard="default"
                    />
                    {userNameError ? <Text style={styles.errorMessage}>{userNameError}</Text> : null}

                    
                    <Input
          title="Password/पासवर्ड *"
          placeholder="********"
          value={password}
          setValue={setPassword}
          errorMessage={passwordError}
          keyboard="default"
          is_password={true}
          togglePasswordVisibility={togglePasswordVisibility} 
            isPasswordVisible={isPasswordVisible} 
        />
                    {passwordError? <Text style={styles.errorMessage}>{passwordError}</Text> : null}

                    <Text style={{color: 'black', fontSize: RFValue(16), textAlign: 'center', marginTop: '5%'}} onPress={onForgotPasswordPressed}>
                        Forgot Password?/पासवर्ड विसरला?
                    </Text>


                     {/* Loading indicator */}
      {isLoading && <ActivityIndicator size="large" color="#E38B29" />}

                    <View
                        backgroundColor='#E38B29'
                        style={styles.button}>
                        <Text 
                            onPress={onLoginPressed} 
                            style={{color: 'black', fontSize: 19}}
                            >LOGIN</Text>
                    </View>
                    

                    <Text style={styles.last} onPress={onRegisterPressed}>
                        Create new account{' '}/नवीन अर्जदार नोंदणी
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
        paddingTop: 50,
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
        margin: '3%',
        marginTop: '18%',
        paddingVertical: '12%',
        paddingHorizontal: '5%',
    },
    login: {
        //fontSize: 19,
        fontSize: RFValue(19),
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: '10%',
    },
    button: {
        borderRadius: 100,
        //width: 150,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: '2%',
        marginTop: '12%',
        marginBottom: '5%',
    },
    errorMessage: {
        color: 'red',
        marginTop: '0.50%',
        alignSelf: 'flex-start',
    },
    asterisk: {
        color: 'red',
        marginLeft: 5,
    },
    last: {
        color: 'black', 
        //fontSize: 16, 
        fontSize: RFValue(16),
        textAlign: 'center',
        marginTop: '8%',
    }
});

export default SignInPage;