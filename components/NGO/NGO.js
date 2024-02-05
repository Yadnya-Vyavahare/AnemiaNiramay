// import { View, Text, StyleSheet, Image } from 'react-native'
// import React from 'react'
// import * as Images from '../ImagePaths';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { RFValue } from 'react-native-responsive-fontsize';


// const NGO = () => {

//     const navigation = useNavigation();


//     const onViewPressed = () => {
//         navigation.navigate('ChildPersonalList');
//     }
//     const onUpdateChildPressed = () => {
//         navigation.navigate('DisplayListChildUpdate');
//     }

//     const onCreateChildPressed = () => {
//         navigation.navigate('ChildFamilyDetails', {childFullName: "Tarini Shashank Singh"});
//     }

//     const onCreateDoctorPressed = () => {
//         navigation.navigate('CreateDoctor');
//     }

//     const onUpdateDoctorPressed = () => {
//         navigation.navigate('DisplayListDoctorUpdate');
//     }

//     const onDeleteDoctorPressed = () => {
//         navigation.navigate('DeleteDoctor');
//     }

//     const onCreateKVSPressed = () => {
//         navigation.navigate('CreateKVS');
//     }

//     const onDeleteKVSPressed = () => {
//         navigation.navigate('DeleteKVS');
//     }

//     const onUpdateKVSPressed = () => {
//         navigation.navigate('DisplayListKVSUpdate');
//     }

//     const onOverallReportPressed = () => {
//         navigation.navigate('PersonalGraph');
//     }

//     const onSpecificReportPressed = () => {
//         navigation.navigate('BarGraphs');
//     }

//     const onReportPressed = () => {
//         navigation.navigate('WeightDifferenceGraph');
//     }
//   return (
//     <ScrollView>
//     <View>
//         <Text style = {styles.subHeading1}>Child</Text>
        
//         <View style = {styles.container}>

//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onCreateChildPressed}>
//                 <Image source={Images.Girl} style={styles.image} />
//                 <Text style = {styles.caption}>Create new child entry/{"\n"}नवीन नोंदणी</Text>
//             </TouchableOpacity>
//         </View>
        
          
//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onUpdateChildPressed}>
//                 <Image source={Images.Girl} style={styles.image} />
//                 <Text style = {styles.caption}>Update child information/{"\n"}अद्ययावत करा</Text>
//             </TouchableOpacity>
            
//         </View>
            
//         <View style = {styles.cards}>
//         <TouchableOpacity onPress={onViewPressed}>
//             <Image source={Images.report} style={styles.image} />
//             <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
//             </TouchableOpacity>
//         </View>
//     </View>

//     <View style={styles.line}></View>

//     <Text style = {styles.subHeading}>Doctor</Text>
//     <View style = {styles.container}>
//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onCreateDoctorPressed}>
//                 <Image source={Images.doctor} style={styles.image} />
//                 <Text style = {styles.caption}>Create new doctor entry/{"\n"}नवीन नोंदणी</Text>
//             </TouchableOpacity>
//         </View>

//         <View style = {styles.cards}>
//         <TouchableOpacity onPress={onUpdateDoctorPressed}>
//             <Image source={Images.doctor} style={styles.image} />
//             <Text style = {styles.caption}>Update doctor information/{"\n"}अद्ययावत करा</Text>
//             </TouchableOpacity>
//         </View>

//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onDeleteDoctorPressed}>
//             <Image source={Images.dDoctor} style={styles.image} />
//             <Text style = {styles.caption}>Delete doctor/{"\n\t"}डॉक्टरांचे नाव{"\n"}हटवा</Text>
//             </TouchableOpacity>
//         </View>
//     </View>

//     <View style={styles.line}></View>

//     <Text style = {styles.subHeading}>Kishori Varg Sevika</Text>
//     <View style = {styles.container}>
//     <View style = {styles.cards}>
//          <TouchableOpacity onPress={onCreateKVSPressed}>
            
//                 <Image source={Images.kvs} style={styles.image} />
//                 <Text style = {styles.caption}>Create new KVS entry/{"\n"}नवीन नोंदणी</Text>
            
//         </TouchableOpacity>
//         </View>
//         <View style = {styles.cards}>
//         <TouchableOpacity onPress={onUpdateKVSPressed}>
//             <Image source={Images.kvs} style={styles.image} />
//             <Text style = {styles.caption}>Update KVS information/{"\n"}अद्ययावत करा</Text>
//             </TouchableOpacity>
//         </View>

//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onDeleteKVSPressed}>
//             <Image source={Images.kvs} style={styles.image} />
//             <Text style = {styles.caption}>Delete KVS/{"\n"}सेवीकेचे नाव हटवा</Text>
//             </TouchableOpacity>
//         </View>
//     </View>

//     <View style={styles.line}></View>

//     <Text style = {styles.subHeading}>Reports</Text>
//     <View style = {styles.containerLast}>
//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onOverallReportPressed}>
//                 <Image source={Images.oReport} style={styles.image} />
//                 <Text style = {styles.caption}>Overall reports/{"\n"}रिपोर्ट</Text>
//             </TouchableOpacity>
//         </View>

//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onSpecificReportPressed}>
//                 <Image source={Images.aReport} style={styles.image} />
//                 <Text style = {styles.caption}>Specific Area report/{"\n"}क्षेत्र रिपोर्ट</Text>
//             </TouchableOpacity>
//         </View>

//         <View style = {styles.cards}>
//             <TouchableOpacity onPress={onReportPressed}>
//                 <Image source={Images.sReport} style={styles.image} />
//                 <Text style = {styles.caption}>Specific AW report/{"\n"}अंगणवाडी रिपोर्ट</Text>
//             </TouchableOpacity>
//         </View>
//     </View>

//     </View>

//     </ScrollView>
//   )
// }

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
//         marginRight: '2%',
//     },
//     image: {
//         width: '90%',
//         height: 120,
//         margin: '5%',
//         alignSelf: 'center',
//         borderRadius: 20,
//     },
//     caption: {
//         alignSelf: 'center',
//         fontSize: RFValue(15),
//         margin: '5%',
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     subHeading: {
//         flex: 1,
//         //fontSize: 24,
//         fontSize: RFValue(24),
//         fontWeight: 'bold',
//         color: "black",
//         marginBottom: '3%',
//         marginLeft: '3%',
//     },
//     subHeading1: {
//         flex: 1,
//         fontSize: RFValue(24),
//         fontWeight: 'bold',
//         color: "black",
//         marginBottom: '3%',
//         marginLeft: '3%',
//         paddingTop: '10%',
//     },
//     line: {
//         borderBottomColor: 'black',
//         borderBottomWidth: 1,
//         width: '90%',
//         marginVertical: 20,
//         alignSelf: 'center'
//     },
//     containerLast: {
//         flexDirection: 'row',
//         alignContent: 'center',
//         marginBottom: '10%',
//     },
// })

// export default NGO;



import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import * as Images from '../ImagePaths';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';




const NGO = () => {


    const navigation = useNavigation();




    const onUpdateChildPressed = () => {
        navigation.navigate('DisplayListChildUpdate');
    }


    const onCreateChildPressed = () => {
        navigation.navigate('CreateChild');
    }


    const onCreateDoctorPressed = () => {
        navigation.navigate('CreateDoctor');
    }


    const onUpdateDoctorPressed = () => {
        navigation.navigate('DisplayListDoctorUpdate');
    }


    const onDeleteDoctorPressed = () => {
        navigation.navigate('DeleteDoctor');
    }


    const onViewChildPressed = () => {
        navigation.navigate('DisplayChildList');
    }


    const onCreateKVSPressed = () => {
        navigation.navigate('CreateKVS');
    }


    const onDeleteKVSPressed = () => {
        navigation.navigate('DeleteKVS');
    }


    const onUpdateKVSPressed = () => {
        navigation.navigate('DisplayListKVSUpdate');
    }


    const onOverallReportPressed = () => {
        navigation.navigate('OverallReportNavigation');
    }


  return (
    <ScrollView>
    <View>
        <Text style = {styles.subHeading1}>Child</Text>
       
        <View style = {styles.container}>


        <View style = {styles.cards}>
            <TouchableOpacity onPress={onCreateChildPressed}>
                <Image source={Images.Girl} style={styles.image} />
                <Text style = {styles.caption}>Add new child entry/{"\n"}नवीन नोंदणी</Text>
            </TouchableOpacity>
        </View>
       
         
        <View style = {styles.cards}>
            <TouchableOpacity onPress={onUpdateChildPressed}>
                <Image source={Images.Girl} style={styles.image} />
                <Text style = {styles.caption}>Update child information/{"\n"}अद्ययावत करा</Text>
            </TouchableOpacity>
           
        </View>
           
        <View style = {styles.cards}>
        <TouchableOpacity onPress={onViewChildPressed}>
            <Image source={Images.report} style={styles.image} />
            <Text style = {styles.caption}>View child reports/{"\n"}रिपोर्ट पहा</Text>
            </TouchableOpacity>
        </View>
    </View>


    <View style={styles.line}></View>


    <Text style = {styles.subHeading}>Doctor</Text>
    <View style = {styles.container}>
        <View style = {styles.cards}>
            <TouchableOpacity onPress={onCreateDoctorPressed}>
                <Image source={Images.doctor} style={styles.image} />
                <Text style = {styles.caption}>Add new doctor entry/{"\n"}नवीन नोंदणी</Text>
            </TouchableOpacity>
        </View>


        <View style = {styles.cards}>
        <TouchableOpacity onPress={onUpdateDoctorPressed}>
            <Image source={Images.doctor} style={styles.image} />
            <Text style = {styles.caption}>Update doctor information/{"\n"}अद्ययावत करा</Text>
            </TouchableOpacity>
        </View>


        <View style = {styles.cards}>
            <TouchableOpacity onPress={onDeleteDoctorPressed}>
            <Image source={Images.dDoctor} style={styles.image} />
            <Text style = {styles.caption}>Delete doctor/{"\n\t"}डॉक्टरांचे नाव{"\n"}हटवा</Text>
            </TouchableOpacity>
        </View>
    </View>


    <View style={styles.line}></View>


    <Text style = {styles.subHeading}>Kishori Varg Sevika</Text>
    <View style = {styles.container}>
    <View style = {styles.cards}>
         <TouchableOpacity onPress={onCreateKVSPressed}>
           
                <Image source={Images.kvs} style={styles.image} />
                <Text style = {styles.caption}>Add new KVS entry/{"\n"}नवीन नोंदणी</Text>
           
        </TouchableOpacity>
        </View>
        <View style = {styles.cards}>
        <TouchableOpacity onPress={onUpdateKVSPressed}>
            <Image source={Images.kvs} style={styles.image} />
            <Text style = {styles.caption}>Update KVS information/{"\n"}अद्ययावत करा</Text>
            </TouchableOpacity>
        </View>


        <View style = {styles.cards}>
            <TouchableOpacity onPress={onDeleteKVSPressed}>
            <Image source={Images.kvs} style={styles.image} />
            <Text style = {styles.caption}>Delete KVS/{"\n"}सेवीकेचे नाव हटवा</Text>
            </TouchableOpacity>
        </View>
    </View>


    <View style={styles.line}></View>


    <Text style = {styles.subHeading}>Reports</Text>
    <View style = {styles.containerLast}>
        <View style = {styles.cardLast}>
            <TouchableOpacity onPress={onOverallReportPressed}>
                <Image source={Images.oReport} style={styles.image} />
                <Text style = {styles.caption}>Overall reports/{"\n"}रिपोर्ट</Text>
            </TouchableOpacity>
        </View>
    </View>


    </View>


    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 10,
    },
    cards: {
        flex: 1,
        width: '30%',
        height: 'auto',
        backgroundColor: '#FFD8A9',
        marginLeft: '2%',
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: '2%',
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
    subHeading1: {
        flex: 1,
        fontSize: RFValue(24),
        fontWeight: 'bold',
        color: "black",
        marginBottom: '3%',
        marginLeft: '3%',
        paddingTop: '10%',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        marginVertical: 20,
        alignSelf: 'center'
    },
    containerLast: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: '10%',
    },
    cardLast: {
        flex: 1,
        width: '30%',
        height: 'auto',
        backgroundColor: '#FFD8A9',
        marginLeft: '2%',
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: '60%',
    },
})


export default NGO;