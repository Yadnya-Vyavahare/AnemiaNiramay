import { View, Text, Dimensions, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import React, {useState} from 'react';
import { RadioButton } from 'react-native-paper';
import { validateEmail } from "./ValidateEmail";
import Logo from '../../assests/images/logo1.jpg';
import Input from '../Input';
import axios from 'axios';
import config from '../config';

  const Register = ({ navigation }) => {

        const [user, setUser] = useState('');
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);
        const [userName, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [checkPassword, setCheckPassword] = useState('');
        const [phone, setPhone] = useState('');
        const [userNameError, setUserNameError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [checkPasswordError, setCheckPasswordError] = useState('');
        const [phoneError, setPhoneError] = useState('');
        const [userError, setUserError] = useState('');

        const togglePasswordVisibility = () => {
            setIsPasswordVisible((prev) => !prev);
          };
          

        const onRegisterPressed = async () => {


            // Clear previous error messages
        
            let errorCount = 0;
        
            setUserNameError('');
            setEmailError('');
            setPhoneError('');
            setUserError('');
            setPasswordError('');
            setCheckPasswordError('');
        
            if (!userName) {
                setUserNameError('Enter a username!');
                errorCount++;
            }
        
            if (!validateEmail(email)) {
                setEmailError('Enter a valid email!');
                errorCount++;
            }

            if (!phone) {
                setPhoneError('Enter a phone number!');
                errorCount++;
            } else if (phone.length !== 10) {
                setPhoneError('Phone number should be 10 digits long!');
                errorCount++;
            }            

            if (!user) {
                setUserError('Select a user');
                errorCount++;
            }
        
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
        
            // Password match validation
            if (password !== checkPassword) {
                setPasswordError('Passwords do not match');
                setCheckPasswordError('Passwords do not match');
                errorCount++;
            }
        
        
            if (errorCount > 0) {
                // Handle the case where there are missing inputs
                console.log('Please fill in all the required fields.');
                return;
            }
        
            console.log('Data to be sent:', { userName, email, phone, user, password });
            console.log('sign in')
            try {
                const response = await axios.post(`${config.API_BASE_URL}/createaccount`, {
                    userName: userName.trim(),
                    email: email,
                    phone: phone,
                    user: user,
                    password: password.trim()
                });
                console.log('sign in')
                console.log(response.data.message);
                // Handle success, e.g., show a success message or navigate to another screen
                Alert.alert(
                    'Registration successfully',
                    'Please login to continue',
                    [
                      { text: 'OK', onPress: () => navigation.navigate('SignInPage') }
                    ],
                    { cancelable: false }
                  );
    
                 // Replace 'Home' with your destination
        
            } catch (error) {
                //console.error('API request error:', error);
                // Handle error, e.g., show an error message

                if (error.response && error.response.status === 500) {
                    Alert.alert(
                        'Failed to create user',
                        'User name alerady exists',
                        [
                          { text: 'OK', onPress: () => console.log('OK') }
                        ],
                        { cancelable: false }
                      );
        
                }
            }
        }

        const onSignInPressed = () => {
            navigation.navigate('SignInPage');
        }


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
                    style={styles.loginContainer}>
                    <Text style={styles.register}>REGISTER/नोंदणी करा</Text>

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
                        title="Email/ईमेल आयडी *"
                        placeholder="niramay@gmail.com"
                        value = { email } 
                        setValue = { setEmail }
                        errorMessage={ emailError }
                        keyboard="email-address"
                    />
                    {emailError? <Text style={styles.errorMessage}>{emailError}</Text> : null}

      

            
                    <Input
                        title="Contact Number/फोन नंबर *"
                        placeholder="7809******"
                        value = { phone } 
                        setValue = { setPhone }
                        errorMessage={ phoneError }
                        keyboard="numeric"
                    />
                    {phoneError? <Text style={styles.errorMessage}>{phoneError}</Text> : null}




                    <Text style={{fontSize: 16, color:'black', marginBottom: 8 }}>User/युजर</Text>

                    <View style={{flexDirection:'row', marginRight:10}}>
                        
                        <Text style={{marginTop:5, fontSize:16, color: 'black'}}>Doctor</Text>
                            <RadioButton
                                value="Doctor"
                                status={ user === 'Doctor' ? 'checked' : 'unchecked' }
                                onPress={() => setUser('Doctor')}
                          
                                color="#E38B29"
                            />
                            <Text style={{marginTop:5, fontSize:16, color: 'black', marginLeft: 30}}>NGO</Text>
                                <RadioButton
                                    value="NGO"
                                    status={ user === 'NGO' ? 'checked' : 'unchecked' }
                                    onPress={() => setUser('NGO')}
                                    color="#E38B29"
                                />

                    </View>

                    <View style={{backgroundColor:'black', height:1, marginBottom: 20}}></View>

                    {userError? <Text style={styles.errorMessage}>{userError}</Text> : null}

                    
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
                        <Text onPress= {onRegisterPressed} style={{color: 'black', fontSize: 19} }>REGISTER</Text>
                    </View>
                    
                    <Text style={styles.last} onPress={onSignInPressed}>
                        Already have an account?{' '}Login/अर्जदार लॉगिन
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
        paddingTop: 30,
    }, 
    logo: {
        width: 70, 
        height: 100, 
        borderRadius: 10,
    },
    loginContainer: {
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        marginTop: -20,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    register: {
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
        marginTop: 40,
        marginBottom: 10,
    },
    last: {
        color: 'black', 
        fontSize: 16, 
        textAlign: 'center',
        marginTop: 5,
    },
    errorMessage: {
        color: 'red',
        marginTop: 3,
        alignSelf: 'flex-start',
    },
    asterisk: {
        color: 'red', // or any other color
        marginLeft: 5, // add some space between the text and asterisk
    },
  });
  
  export default Register;