import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity ,Alert} from 'react-native';
import axios from 'axios';
import config from '../config';
import { RFValue } from 'react-native-responsive-fontsize';

const ProfileView = ({ navigation }) => {
    const [ID, setID] = useState('');
    const [fetchedData, setFetchedData] = useState({});
    const [showCalculator, setShowCalculator] = useState(false);
    const currentDate = new Date();
    
    const toggleCalculator = () => {
        if (!ID) {
            // Display an alert if ID is not entered
            Alert.alert('Error', 'Please enter a Child Full Name');
            return;
        }
        setShowCalculator(!showCalculator);
        handleGetData();
    };

    const fetchData = async () => {
        try {
            if (!ID) {
                throw new Error('ID is required');
            }

            const response = await axios.get(`${config.API_BASE_URL}/getMedicalChildData?ID=${ID}`);

            if (!response || !response.data || !response.data.data) {
                throw new Error('No data received');
            }

            

            //const dt = new Date(fetchData.date_of_birth);
            const fetchedData = response.data.data[0];
            const dt = new Date(fetchedData.selectedDate);
            const x = dt.toISOString().split('T');
            const x1 = x[0].split('-');
            const formattedDate = x1[0] + '-' + x1[1] + '-' + x1[2];
            console.log("DARTRR", formattedDate)
             // const dob= dt.toISOString().split('T');
            if (fetchedData) {
                setFetchedData({
                   
                    childFullName: fetchedData.childFullName || '',
                    // childMiddleName: fetchedData.child_middle_name || '',
                    // childLastName: fetchedData.child_last_name || '',
                    age: fetchedData.enteredAge || '',
                    dateOfBirth : formattedDate || '',
                    
                    childReligion : fetchedData.religion || '',
                    childCaste : fetchedData.caste || '',
                    childAddress : fetchedData.flatNumber || '',
                    childBlockNo : fetchedData.area || '',
                  //  childFamilyType : fetchedData.family_type || '',
                    motherFirstName : fetchedData.motherFullName || '',
                 //   motherLastName : fetchedData.mother_last_name || '',
                    motherEducation : fetchedData.motherEducation || '',
                    motherOccupation : fetchedData.motherOccupation || '',
                    motherIllness : fetchedData.motherIllness || '',
                    fatherFirstName : fetchedData.fatherFullName || '',
                    //fatherLastName : fetchedData.father_last_name || '',
                    fatherEducation : fetchedData.fatherEducation || '',
                    fatherOccupation : fetchedData.fatherOccupation || '',
                    fatherIllness : fetchedData.fatherIllness || '',
                    height : fetchedData.height.toString() || '',
                    weight : fetchedData.weight.toString() || '',
                    bmi : fetchedData.bmi.toString() || '',
                    hb : fetchedData.hb.toString() || '',
                    mcv : fetchedData.mcv.toString() || '',
                    vaccination : fetchedData.vaccination || '',
                    allergy : fetchedData.allergy || '',
                    majorIllness : fetchedData.majorIllness || '',
                    operativeIntervention : fetchedData.operativeIntervention || '',
                    mensturalHistory : fetchedData.mensturalHistory || '',
                    


                });
                console.log(fetchedData.selectedDate)
            } else {
                console.log('No data found in response');
            }
        } catch (error) {
            Alert.alert('Error', `Error fetching data: ${error.message}`);
            console.error('Error fetching data:', error.message);
        }
    };

    const handleGetData = () => {
        fetchData();
    };

    // useEffect(() => {
    //     // Fetch initial data when the component mounts
    //     fetchData();
    // }, []);

    return (
        <ScrollView >
            <View style={styles.root}>
                <Text style={[styles.textf, {marginTop:50,marginLeft : 20,fontSize:16,marginRight:5}]}>Child Name</Text>
                <TextInput
                    style={[styles.input, { marginLeft :20,marginTop:43,fontSize:16, width: '60%'}] }
                    placeholder="Enter Child Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setID(text)} 
                    value={fetchedData.childFullName}
                />
            </View>
                       
<TouchableOpacity style = {styles.button} onPress={toggleCalculator}>
                <Text style = {styles.btnnext}>Get Data</Text>
            </TouchableOpacity>


            {showCalculator && 
            <View style={styles.profileBox}>

           
  <View>
    <Text style={styles.header}>Profile of {ID}</Text>
  </View>

            {/* <View style={styles.root}>
                <Text style={styles.textf}>Child ID</Text>
                <TextInput
                    style={[styles.input, { marginLeft : 42}] }
                    placeholder="Enter ID"
                    onChangeText={text => setID(text)} 
                    value={ID}
                />
            </View> */}
             
            
            {/* Display fetched data */}
            <View style={styles.root}>
                <Text style={styles.textf}>Full Name</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '7%',width:'75%'}] }
                    //placeholder={`Name`}
                    editable={false} // Disable editing
                    value={fetchedData.childFullName}
                />
            </View>


             <View style={styles.root}>
                <Text style={styles.textf}>Age</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '25%',width:'70%'}] }
                    placeholder={` ${fetchedData.age}`}
                    editable={false} // Disable editing
                    value={` ${fetchedData.age}`}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Date Of Birth</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '7%',width:'70%'}] }
                    //placeholder={` ${fetchedData.dateOfBirth}`}
                    editable={false} // Disable editing
                    value={fetchedData.dateOfBirth}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Religion</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '17%',width:'70%'}] }
                    //placeholder={` ${fetchedData.childReligion}`}
                    editable={false} // Disable editing
                    value={fetchedData.childReligion}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Caste</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '21%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childCaste}`}
                    editable={false} // Disable editing
                    value={fetchedData.childCaste}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Address</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'17%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childAddress}`}
                    editable={false} // Disable editing
                    value={fetchedData.childAddress}
                />
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Block No</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'15%',width:'70%'}] }
                    //placeholder={` ${fetchedData.childBlockNo}`}
                    editable={false} // Disable editing
                    value={fetchedData.childBlockNo}
                />
            </View>

            {/* <View style={styles.root}>
                <Text style={styles.textf}>Family Type</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '9%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={String(fetchedData.childFamilyType)}
                />
            </View> */}

            <View style={styles.line} /> 
            <View>
                <Text style={styles.subheader}>Family Details</Text>
            </View>


            <View style={styles.root}>
                <Text style={styles.textf}>Mother Name</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'5%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.motherFirstName}
                />
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Mother{"\n"}Education</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '13%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.motherEducation}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Mother{"\n"}Occupation</Text>
                <TextInput
                    style={[styles.input, { marginLeft :  '10%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.motherOccupation}
                />
            </View>
            
            <View style={styles.root}>
                <Text style={styles.textf}>Mother Illness</Text>
                <TextInput
                    style={[styles.input, { marginLeft :  '5%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.motherIllness}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Father Name</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '7%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.fatherFirstName}
                />
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Father{"\n"}Education</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '12%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.fatherEducation}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Father{"\n"}Occupation</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '10%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.fatherOccupation}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Father Illness</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '6%',width:'70%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.fatherIllness}
                />
            </View>

          
            <View style={styles.line} /> 
            <View>
                <Text style={styles.subheader}>Medical History</Text>
            </View>


            <View style={styles.root}>
                <Text style={styles.textf}>Height</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '7%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.height}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Weight</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '10%',width:'63%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.weight}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>BMI</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '5%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.bmi}
                />
            </View>
            
            <View style={styles.root}>
                <Text style={styles.textf}>HB </Text>
                <TextInput
                    style={[styles.input, { marginLeft : '17%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.hb}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>MCV</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '7%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.mcv}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Vaccination</Text>
                <TextInput
                    style={[styles.input, { marginLeft : '15%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.vaccination}
                />
            </View>


            <View style={styles.root}>
                <Text style={styles.textf}>Allergy</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'6%',width:'64%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.allergy}
                />
            </View>
            <View style={styles.root}>
                <Text style={styles.textf}>Major Illness</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'6%',width:'64%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.majorIllness}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Operative Intervention</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'6%',width:'64%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.operativeIntervention}
                />
            </View>

            <View style={styles.root}>
                <Text style={styles.textf}>Menstral History</Text>
                <TextInput
                    style={[styles.input, { marginLeft :'6%',width:'64%'}] }
                   // placeholder={` ${fetchedData.childFamilyType}`}
                    editable={false} // Disable editing
                    value={fetchedData.mensturalHistory}
                />
            </View>


    

            </View>
}
            

            
            {/* Add other fetched fields similarly */}

            {/* Other UI components */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    
    root: {
        padding: 10, 
        flexDirection:'row',
        marginTop: -10,
        alignItems:'right',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
      },
      subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf:'center',
        color: 'black',
      },
    profileBox: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 20,
        borderRadius: 10,
        width: '96%',
        marginBottom: 20,
        alignSelf:'center'
    },
    header: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        marginBottom: 20,
        color:'black',
        alignSelf:'center',
    },
    textf:{
        marginTop:15,
        marginRight:10,
        fontSize:15,
        color:'black'
    }, 
    button: {
       
        alignItems: 'center',
        padding:20,
        marginTop:50,
        backgroundColor: '#E38B29',
        width: 200,
        alignSelf: 'center',
        marginBottom:10,
        borderRadius:20,
        marginRight: 10,
    },
    btnnext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    input: {
        borderBottomWidth:0, 
        height: 40,
        marginTop: 12, 
        width: 200,
        marginRight:10,
        //borderRadius:0,
        color:'black',
        padding:10,
    },
    radioContainer: {
        flexDirection:'row', 
        marginRight:10, 
        marginTop: 12,
    },
    radioButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5
    },
    radioLabel: {
        fontSize: 16, 
        color:'black', 
        marginBottom:8, 
        marginLeft: 10, 
        marginTop: 12
    },
});

export default ProfileView;
