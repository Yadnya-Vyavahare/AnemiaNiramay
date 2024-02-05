// import { View, Text, StyleSheet, Image } from 'react-native'
// import React, { useState } from 'react'
// import * as Images from '../ImagePaths';
// import BMICalculator from './BMICalculator';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

// const Doctor = ({ route }) => {

//     const navigation = useNavigation();

//     const [showCalculator, setShowCalculator] = useState(false);

//     const { ID, Name } = route.params || {};

//     console.log('ID:', ID);
//     console.log('Name:', Name);

//     const toggleCalculator = () => {
//         setShowCalculator(!showCalculator);
//     };

//     const onUpdateChildPressed = () => {
//         navigation.navigate('DisplayList');
//     }
//     const onGetChildPressed = () => {
//         navigation.navigate('ViewChildDetails');
//     }
    
//     const onViewReportPressed = () => {
//         navigation.navigate('BarGraphs');
//     }

//     const onUpdateVaccinePressed = () => {
//         navigation.navigate('UpdateVaccineList');
//     }

//     const onUpdateAllergyPressed = () => {
//         navigation.navigate('UpdateAllergyList');
//     }
//     const onViewReport1Pressed = () => {
//         navigation.navigate('HeightDifferenceGraph');
//     }


//     return (

//         <ScrollView>

//             <View>

//                 <Text style = {[styles.subHeading, {paddingTop: 30,}]}>Child</Text>


//                 <View style = {styles.container}>

//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onUpdateChildPressed}>
//                             <Image source={Images.Girl} style={styles.image} />
//                             <Text style = {styles.caption}>Update child information/{"\n"}अद्ययावत करा</Text>
//                         </TouchableOpacity>
//                     </View>


//                     <View style = {styles.cards}>
//                     <TouchableOpacity onPress={onGetChildPressed}>
//                         <Image source={Images.Girl} style={styles.image} />
                        
//                         <Text style = {styles.caption}>View child history/{"\n"}माहिती पहा</Text>
//                         </TouchableOpacity>
//                     </View>


//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onViewReportPressed}>
//                             <Image source={Images.report} style={styles.image} />   
//                             <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>


//                 <View style={styles.line}></View>

//                 <Text style = {[styles.subHeading, {paddingTop: 30,}]}>List update</Text>


//                 <View style = {styles.container}>
//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onUpdateVaccinePressed}>
//                             <Image source={Images.list} style={styles.image} />   
//                             <Text style = {styles.caption}>Update vaccine list/{"\n"}अद्ययावत करा</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onUpdateAllergyPressed}>
//                             <Image source={Images.list} style={styles.image} />   
//                             <Text style = {styles.caption}>Update allergy list/{"\n"}माहिती पहा</Text>
//                         </TouchableOpacity>
//                     </View>


//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onViewReport1Pressed}>
//                             <Image source={Images.report} style={styles.image} /> 
//                             <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>


//                 <View style={styles.line}></View>


//                 <TouchableOpacity style={styles.Button} onPress={toggleCalculator}>
//                     <Text style = {styles.subHeading}>BMI Calculator</Text>
//                 </TouchableOpacity>


//                 {showCalculator && <BMICalculator/>}


//             </View>

//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignContent: 'center',
//         marginBottom: 10,
//     },
//     cards: {
//         width: '30%',
//         height: 200,
//         backgroundColor: '#FFD8A9',
//         marginLeft: 10,
//         borderRadius: 20,
//         overflow: 'hidden',
//     }, 
//     image: {
//         width: '90%',
//         height: 120,
//         margin: 5,
//         alignSelf: 'center',
//         borderRadius: 20,
//     },
//     caption: {
//         alignSelf: 'center',
//         fontSize: 15,
//         margin: 5,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     subHeading: {
//         flex: 1,
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: "black",
//         marginBottom: 10,
//         marginLeft: 10,
//     },
//     line: {
//         borderBottomColor: 'black',
//         borderBottomWidth: 1,
//         width: '90%',
//         marginVertical: 20,
//         alignSelf: 'center'
//     },
//     Button: {
//         width: '50%',
//         height: 40,
//         backgroundColor: '#E38B29',
//         marginLeft: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//     ButtonText: {
//         fontSize: 16,
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default Doctor;



// import { View, Text, StyleSheet, Image } from 'react-native'
// import React, { useState } from 'react'
// import * as Images from '../ImagePaths';
// import BMICalculator from './BMICalculator';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { RFValue } from 'react-native-responsive-fontsize';


// const Doctor = ({ route }) => {


//     const navigation = useNavigation();


//     const [showCalculator, setShowCalculator] = useState(false);


//     const { ID, Name } = route.params || {};


//     console.log('ID:', ID);
//     console.log('Name:', Name);


//     const toggleCalculator = () => {
//         setShowCalculator(!showCalculator);
//     };


//     const onUpdateChildPressed = () => {
//         navigation.navigate('DisplayList');
//     }
   
//     const onViewReportPressed = () => {
//         navigation.navigate('BarGraphs');
//     }


//     const onUpdateVaccinePressed = () => {
//         navigation.navigate('UpdateVaccineList');
//     }


//     const onUpdateAllergyPressed = () => {
//         navigation.navigate('UpdateAllergyList');
//     }


//     return (


//         <ScrollView>


//             <View>


//                 <Text style = {[styles.subHeading, {paddingTop: 30,}]}>Child</Text>




//                 <View style = {styles.container}>


//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onUpdateChildPressed}>
//                             <Image source={Images.Girl} style={styles.image} />
//                             <Text style = {styles.caption}>Update child information/{"\n"}अद्ययावत करा</Text>
//                         </TouchableOpacity>
//                     </View>




//                     <View style = {styles.cards}>
//                         <Image source={Images.Girl} style={styles.image} />
//                         <Text style = {styles.caption}>View child history/{"\n"}माहिती पहा</Text>
//                     </View>




//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onViewReportPressed}>
//                             <Image source={Images.report} style={styles.image} />  
//                             <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>




//                 <View style={styles.line}></View>


//                 <Text style = {[styles.subHeading, {paddingTop: 30,}]}>List update</Text>




//                 <View style = {styles.container}>
//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onUpdateVaccinePressed}>
//                             <Image source={Images.list} style={styles.image} />  
//                             <Text style = {styles.caption}>Update vaccine list/{"\n"}अद्ययावत करा</Text>
//                         </TouchableOpacity>
//                     </View>


//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onUpdateAllergyPressed}>
//                             <Image source={Images.list} style={styles.image} />  
//                             <Text style = {styles.caption}>Update allergy list/{"\n"}माहिती पहा</Text>
//                         </TouchableOpacity>
//                     </View>




//                     <View style = {styles.cards}>
//                         <TouchableOpacity onPress={onViewReportPressed}>
//                             <Image source={Images.report} style={styles.image} />
//                             <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>




//                 <View style={styles.line}></View>




//                 <TouchableOpacity style={styles.Button} onPress={toggleCalculator}>
//                     <Text style = {styles.subHeading}>BMI Calculator</Text>
//                 </TouchableOpacity>




//                 {showCalculator && <BMICalculator/>}




//             </View>


//         </ScrollView>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignContent: 'center',
//         marginBottom: 10,
//     },
//     cards: {
//         flex: 1,
//         width: '30%',
//         height: 'auto',
//         backgroundColor: '#FFD8A9',
//         marginLeft: '2%',
//         borderRadius: 20,
//         overflow: 'hidden',
//     },
//     image: {
//         width: '90%',
//         height: 120,
//         margin: 5,
//         alignSelf: 'center',
//         borderRadius: 20,
//     },
//     caption: {
//         alignSelf: 'center',
//         fontSize: 15,
//         margin: 5,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     subHeading: {
//         flex: 1,
//         //fontSize: 24,
//         fontSize: RFValue(24),
//         fontWeight: 'bold',
//         color: "black",
//         marginBottom: 10,
//         marginLeft: 10,
//     },
//     line: {
//         borderBottomColor: 'black',
//         borderBottomWidth: 1,
//         width: '90%',
//         marginVertical: 20,
//         alignSelf: 'center'
//     },
//     Button: {
//         width: '80%',
//         height: 'auto',
//         backgroundColor: '#E38B29',
//         marginLeft: 10,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: '10%',
//         marginLeft: '10%'
//       },
//     ButtonText: {
//         //fontSize: 16,
//         fontSize: RFValue(24),
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });


// export default Doctor;



import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import * as Images from '../ImagePaths';
import BMICalculator from './BMICalculator';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const Doctor = ({ route }) => {


    const navigation = useNavigation();


    const [showCalculator, setShowCalculator] = useState(false);


    const { ID, Name } = route.params || {};


    console.log('ID:', ID);
    console.log('Name:', Name);


    const toggleCalculator = () => {
        setShowCalculator(!showCalculator);
    };

    const onViewChildPressed = () => {
        navigation.navigate('ViewChildDetails');
    };

    const onCreateChildPressed = () => {
        navigation.navigate('DisplayListChildCreate');
    };

    // const onCreateChildPressed = () => {
    //     navigation.navigate('CreateChildDetails');
    // }


    const onUpdateChildPressed = () => {
        navigation.navigate('DisplayList');
    }
   
    const onViewReportPressed = () => {
        navigation.navigate('DisplayChildList');
    }


    const onUpdateVaccinePressed = () => {
        navigation.navigate('UpdateVaccineList');
    }


    const onUpdateAllergyPressed = () => {
        navigation.navigate('UpdateAllergyList');
    }


    return (


        <ScrollView>


            <View>


                <Text style = {[styles.subHeading, {paddingTop: 30,}]}>Child</Text>




                <View style = {styles.container}>


                    <View style = {styles.cards}>
                        <TouchableOpacity onPress={onCreateChildPressed}>
                            <Image source={Images.Girl} style={styles.image} />
                            <Text style = {styles.caption}>Add child information/{"\n"}नवीन नोंदणी</Text>
                        </TouchableOpacity>
                    </View>


                    <View style = {styles.cards}>
                        <TouchableOpacity onPress={onUpdateChildPressed}>
                            <Image source={Images.Girl} style={styles.image} />  
                            <Text style = {styles.caption}>Update child information/{"\n"}अद्ययावत करा</Text>
                        </TouchableOpacity>
                    </View>


                   
                </View>




                <View style={styles.line}></View>


                <Text style = {styles.subHeading}>View Child Data</Text>


                <View style = {styles.container}>
                <View style = {styles.cards}>
                <TouchableOpacity onPress={onViewChildPressed}>
                        <Image source={Images.Girl} style={styles.image} />
                        <Text style = {styles.caption}>View child history/{"\n"}माहिती पहा</Text>

                </TouchableOpacity>
                    </View>




                    <View style = {styles.cards}>
                        <TouchableOpacity onPress={onViewReportPressed}>
                            <Image source={Images.report} style={styles.image} />  
                            <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.line}></View>


                <Text style = {styles.subHeading}>List update</Text>




                <View style = {styles.container}>
                    <View style = {styles.cards}>
                        <TouchableOpacity onPress={onUpdateVaccinePressed}>
                            <Image source={Images.list} style={styles.image} />  
                            <Text style = {styles.caption}>Update vaccine list/{"\n"}अद्ययावत करा</Text>
                        </TouchableOpacity>
                    </View>


                    <View style = {styles.cards}>
                        <TouchableOpacity onPress={onUpdateAllergyPressed}>
                            <Image source={Images.list} style={styles.image} />  
                            <Text style = {styles.caption}>Update allergy list/{"\n"}माहिती पहा</Text>
                        </TouchableOpacity>
                    </View>


                </View>




                <View style={styles.line}></View>




                <TouchableOpacity style={styles.Button} onPress={toggleCalculator}>
                    <Text style = {styles.subHeading}>BMI Calculator</Text>
                </TouchableOpacity>




                {showCalculator && <BMICalculator/>}




            </View>


        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 10,
    },
    cards: {
        flex: 1,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#FFD8A9',
        marginLeft: '8%',
        marginRight: '8%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    cards1:{
        flex: 1,
        width: '30%',
        height: 'auto',
        backgroundColor: '#FFD8A9',
        marginLeft: '5%',
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: '60%',
    },
    image: {
        width: '90%',
        height: 120,
        margin: '5%',
        alignSelf: 'center',
        borderRadius: 20,
    },
    caption: {
        alignSelf: 'center',
        fontSize: RFValue(15),
        margin: '5%',
        fontWeight: 'bold',
        color: 'black',
    },
    subHeading: {
        flex: 1,
        //fontSize: 24,
        fontSize: RFValue(24),
        fontWeight: 'bold',
        color: "black",
        marginBottom: '3%',
        marginLeft: '3%',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        marginVertical: 20,
        alignSelf: 'center'
    },
    Button: {
        width: '70%',
        height: 'auto',
        backgroundColor: '#E38B29',
        marginLeft: '3%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
      },
    ButtonText: {
        fontSize: RFValue(16),
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default Doctor;