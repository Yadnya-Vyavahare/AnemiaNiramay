import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useEffect} from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import logo from '../assests/images/Cummins.png';
import logo1 from '../assests/images/MKSSS.png';

const DevelopedBy = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignInPage');
    },2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    console.log("FirstPage rendered");
  }, []);

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row',alignSelf:'center' ,marginBottom:60,marginTop:56}}>
        <Image source={logo1} style={styles.logo1} ></Image>
        <Image source={logo} style={styles.logo} ></Image>
     
        
      </View>
      <View style={{width:'400%',alignItems:'left',marginBottom:20}}><Text style={{fontSize:RFValue(15),color:'black',fontWeight:'bold',fontStyle:'italic'}}>"An app built for a social cause - Adolescent Anemic Girls, a project undertaken by Niramay NGO and developed in collaboration with CCOEW, Pune I.T. Department students "</Text></View>
      
     
      <View style={{backgroundColor:'#F79327',height:heightPercentageToDP('38%'),width:'400%',marginBottom:30,elevation:10,borderRadius:20,padding:10}}>
        <Text style={styles.text}>Developed By :</Text>
        <Text style={styles.textf}>Ms. Yadnya Abhay Vyavahare</Text>
        <Text style={styles.textf}>Ms. Sakshi Sunil Bharambe</Text>
        <Text style={styles.textf}>Ms. Shruti Sanjay Gugale</Text>
        <Text style={styles.textf}>Ms. Shrutika Kaperavenollu</Text>
        <Text style={styles.text}>Under the guidance of :</Text>
        <Text style={styles.textf}>Prof. Harsha Sonune</Text>
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
      width: 180,
      height: 100,
     
    },
    logo1: {
        width: 120,
        height: 120,
        marginRight:40 
      },
    footer: {
      position: 'absolute',
      bottom: 100,
      left: 50,
      right: 0,
      alignItems: 'flex-start',
      
    },
    text: {
      fontSize: RFValue(18),
      textAlign: 'left', 
      color: 'black', 
      marginBottom: 18,
      marginTop:10,
      marginLeft:5,fontWeight:'bold'

    },textf: {
        fontSize: RFValue(15),
        textAlign: 'left', 
        color: 'black',
        marginBottom:6 ,
        marginLeft:10,
        fontWeight:'bold'
        
      },
      containerf: {
       
    },
  });
  


export default DevelopedBy;