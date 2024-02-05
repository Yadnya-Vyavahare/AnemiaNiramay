import { View, Text, Dimensions, Image, StyleSheet, ScrollView,SafeAreaView,
   
    
    TouchableOpacity,
    TextInput,Linking  } from 'react-native';
import React, { useState, useContext } from 'react';
import Logo from '../assests/images/logo1.jpg';
import axios from 'axios';
import Input from './Input';
import call from 'react-native-phone-call';
import email from 'react-native-email'
export default function Sign() {
    const [inputValue, setInputValue] = useState('7249887861');
    //setInputValue='2024321154'
    // const triggerCall = () => {
        
    //   // Check for perfect 10 digit length
    //   if (inputValue.length != 10) {
    //     alert('Please insert correct contact number');
    //     return;
    //   }
  
    //   const args = {
    //     number: inputValue,
    //     prompt: true,
    //   };
    //   // Make a call
    //   call(args).catch(console.error);
    //};

    const phoneNumber = '7249887861'; // Replace this with the actual phone number

    const makeCall = () => {
      const phoneNumberWithPrefix = `tel:${phoneNumber}`;
      Linking.openURL(phoneNumberWithPrefix)
        .then((supported) => {
          if (!supported) {
            console.error('Phone number is not supported');
          }
        })
        .catch((error) => console.error('An error occurred while making the call', error));
    };
   const handleEmail = () => {
        const to = ['niramay.pune@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
           
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
    }
    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <View >
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
                <Text style={{textAlign:'center',marginTop:2,fontWeight:'bold',textDecorationLine: 'underline', fontSize:20, color: 'black'}}>About Us</Text>
                <View style={{margin:10}}>
                    
        
                            <Text  style ={{color: 'black'}} onPress={makeCall}><Text style ={{fontWeight:'bold', color: 'black'}} >Phone    :</Text>  7249887861{'\n'}
                            </Text> 
                            <View style={{flexDirection:'row'}}>
                            <Text style ={{fontWeight:'bold',marginRight:2, color: 'black'}}>Address :</Text><Text style ={{marginRight:10, color: 'black'}}> C/123, Chandraneel Housing society,{'\n'} 
                                                         Near Ramkrishna Math, Sinhagad Road,{'\n'}
                                                         opp. Cosmos Bank, 
                                                          Pune,{'\n'}Maharashtra 411030{'\n'}
                                                        </Text>
                        </View>

                            <Text style ={{color: 'black'}}  onPress={handleEmail}><Text style ={{fontWeight:'bold', color: 'black'}}  >Email    : </Text> niramay.pune@gmail.com{'\n'}
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
    }, buttonStyle: {
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#8ad24e',
      },
      buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
      },
});