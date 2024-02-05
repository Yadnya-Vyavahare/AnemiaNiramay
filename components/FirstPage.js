import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect} from 'react'
import logo from '../assests/images/logo1.jpg';

const FirstPage = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
        navigation.navigate('DevelopedBy');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    console.log("FirstPage rendered");
  }, []);

  return (
    <View style={styles.container}>
      <View >
        <Image source={logo} style={styles.logo} ></Image>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>सर्वेsपि सुखिनः सन्तु | {'\n'}सर्वे सन्तु निरामया: ||</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 150,
    },
    logo: {
      width: 150,
      height: 200,
      marginBottom: 20, 
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    text: {
      fontSize: 30,
      textAlign: 'center', 
      color: '#E38B29', 
      marginBottom: 30,
    },
  });
  


export default FirstPage;