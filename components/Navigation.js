import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstPage from './FirstPage';
import SignInPage from './SignIn/SignInPage';
import Register from './SignIn/Register';
import Settings from './Drawer/Settings';
import ConfirmEmail from './SignIn/ConfirmEmail';
import SetNewPassword from './SignIn/SetNewPassword';
import ForgotPassword from './SignIn/ForgotPassword';
import NGO from './NGO/NGO';
import CreateDoctor from './NGO/CreateDoctor';
import SystemicExamination from './Doctor/SystemicExamination';
import Logo from '../assests/images/logo1.jpg';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateChild from './NGO/CreateChild';
import ChildFamilyDetails from './NGO/ChildFamilyDetails';
import Doctor from './Doctor/Doctor';
import UpdateChildDetails from './Doctor/UpdateChildDetails';
import DetailPhysicalExamimation from './Doctor/DetailPhysicalExamination';
import ChildMedicalDetails from './NGO/ChildMedicalDetails';
import PhysicalExamination from './Doctor/PhysicalExamination';
import BarGraphs from './Reports/BarGraphs';
import PieCharts from './Reports/PieCharts';
import DisplayList from './DisplayList';
import CreateKVS from './NGO/CreateKVS';
import UpdateVaccineList from './Doctor/UpdateVaccineList';
import UpdateAllergyList from './Doctor/UpdateAllergyList';
import UpdateChild from './NGO/UpdateChild';
import DisplayListChildUpdate from './NGO/DisplayListChildUpdate';
import Remarks from './Doctor/Remarks';
import WeightPersonal from './Reports/WeightPersonal';
import HeightPersonalGraph from './Reports/HeightPersonalGraph';
import ViewChildDetails from './Doctor/ViewChildDetails'
import UpdateDoctor from './NGO/UpdateDoctor';
import UpdateKVS from './NGO/UpdateKVS';
import DisplayListDoctorUpdate from './NGO/DisplayListDoctorUpdate';
import DisplayListKVSUpdate from './NGO/DisplayListKVSUpdate';
import DeleteDoctor from './NGO/DeleteDoctor';
import DeleteKVS from './NGO/DeleteKVS';
import ForgotPasswordNew from './SignIn/ForgotPasswordNew';
import SetNnewPassword from './SignIn/SetNnewPassword';
import UpdateChildFamilyDetails from './NGO/UpdateChildFamilyDetails';
import CreatePDF from './CreatePDF';
import CreateChildDetailPhysicalExamimation from './Doctor/CreateChildDetailPhysicalExamination';
import CreateChildPhysicalExamination from './Doctor/CreateChildPhysicalExamination';
import CreateChildSystemicExamination from './Doctor/CreateChildSystemicExamination';
import CreateRemarks from './Doctor/CreateRemarks';
import CreateChildDetails from './Doctor/CreateChildDetails';
import DisplayListChildCreate from './Doctor/DisplayListChildCreate';
import UpdateChildMedicalDetails from './NGO/UpdateChildMedicalDetails';
import PersonalGraph from './Reports/PersonalGraph';
import PersonalHeightGraph from './Reports/PersonalHeightGraph';
import BMIReport from './Reports/BMIReport'
import PersonalNavigation from './Reports/PersonalNavigation';
import HBReport from './Reports/HBReport';
import visit from './visit';
import DevelopedBy from './DevelopedBy';
import ChildPersonalList from './Reports/ChildPersonalList';
import OverallReportNavigation from './Reports/OverallReportNavigation';
import DisplayChildList from './Reports/DisplayChildList';
import AgeAnalysis from './Reports/AgeAnalysis';
import Recovery from './Reports/Recovery';
import Anemic from './Reports/AnemicReport';
import NutritionReport from './Reports/NutritionReport';
import MarritalStatusReport from './Reports/MarritalStatusReport';
import MCVReport from './Reports/MCVReport';

const Stack = createNativeStackNavigator();

const SplashScreenStack = () => {
  return (
    
    <Stack.Navigator initialRouteName="FirstPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstPage" component={FirstPage} />
      <Stack.Screen name="DevelopedBy" component={DevelopedBy} />
    </Stack.Navigator>
    
  );
};

const MenuButton = () => {
  const navigation = useNavigation();

  const onMenuPressed = () => {
    navigation.openDrawer();
  };

  return (
    <View>
      <TouchableOpacity style={{ marginLeft: 15, marginRight: 10 }} onPress={onMenuPressed}>
        <Icon name="bars" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const LogoHeader = () => {
  return (
    <View>
      
        <Image
          source={Logo}
          style={[styles.logo]}
          resizeMode="contain"
        />
     
    </View>
  );
};


    const Navigation = () => {

      const { userName } = useContext(AuthContext);

      return (

        <Stack.Navigator initialRouteName="SplashScreenStack" screenOptions = {() => ({ 
          
          
          headerStyle: {
            backgroundColor: '#E38B29',
            height:200,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            shadowColor: '#000',
            elevation:25,
          } ,
          headerTintColor: 'black',
          headerBackVisible:false,
          headerRight: () =>           
             <MenuButton />,
         
          headerLeft:()=>               
             <LogoHeader/>,
          
          headerLargeTitle: ()=>
            false,
          
          title: `Namaskar ${userName}`,
      })}

      >
            <Stack.Screen name="SplashScreenStack" component={SplashScreenStack} options={{ headerShown: false }}/>
            <Stack.Screen name="SignInPage" component={SignInPage} options={{ headerShown: false, drawerLockMode: 'locked-closed', gestureEnabled: 'false' }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{ headerShown: false }}/>
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} options={{ headerShown: false }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
            <Stack.Screen name="NGO" component={NGO} />
            <Stack.Screen name="CreateDoctor" component={CreateDoctor} />
            <Stack.Screen name="CreateChild" component={CreateChild} />
            <Stack.Screen name="ChildFamilyDetails" component={ChildFamilyDetails} />
            <Stack.Screen name="Doctor" component={Doctor} />
            <Stack.Screen name="UpdateChildDetails" component={UpdateChildDetails} />
            <Stack.Screen name="DetailPhysicalExamination" component={DetailPhysicalExamimation} />
            <Stack.Screen name="ChildMedicalDetails" component={ChildMedicalDetails} />
            <Stack.Screen name="SystemicExamination" component={SystemicExamination} />
            <Stack.Screen name="PhysicalExamination" component={PhysicalExamination} />
            <Stack.Screen name="BarGraphs" component={BarGraphs} />
            <Stack.Screen name="PieCharts" component={PieCharts} />
            <Stack.Screen name="DisplayList" component={DisplayList} />
            <Stack.Screen name="CreateKVS" component={CreateKVS} />
            <Stack.Screen name="UpdateVaccineList" component={UpdateVaccineList} />
            <Stack.Screen name="UpdateAllergyList" component={UpdateAllergyList} />
            <Stack.Screen name="UpdateChild" component={UpdateChild} />
            <Stack.Screen name="DisplayListChildUpdate" component={DisplayListChildUpdate} />
            <Stack.Screen name="Remarks" component={Remarks} />
            <Stack.Screen name="WeightPersonal" component={WeightPersonal} />
            <Stack.Screen name="HeightPersonalGraph" component={HeightPersonalGraph} />
            <Stack.Screen name="ViewChildDetails" component={ViewChildDetails} />
            <Stack.Screen name="UpdateDoctor" component={UpdateDoctor}/>
            <Stack.Screen name="UpdateKVS" component={UpdateKVS}/>
            <Stack.Screen name="DisplayListDoctorUpdate" component={DisplayListDoctorUpdate} />
            <Stack.Screen name="DisplayListKVSUpdate" component={DisplayListKVSUpdate} />
            <Stack.Screen name="DeleteDoctor" component={DeleteDoctor}/>
            <Stack.Screen name="DeleteKVS" component={DeleteKVS}/>
            <Stack.Screen name="ForgotPasswordNew" component={ForgotPasswordNew} options={{ headerShown: false }}/>
            <Stack.Screen name="SetNnewPassword" component={SetNnewPassword} options={{ headerShown: false }}/>
            <Stack.Screen name="UpdateChildFamilyDetails" component={UpdateChildFamilyDetails} />
            <Stack.Screen name="CreatePDF" component={CreatePDF} />
            <Stack.Screen name="CreateChildDetailPhysicalExamimation" component={CreateChildDetailPhysicalExamimation} />
            <Stack.Screen name="CreateChildPhysicalExamination" component={CreateChildPhysicalExamination}/>
            <Stack.Screen name="CreateChildSystemicExamination" component={CreateChildSystemicExamination} />
            <Stack.Screen name="CreateRemarks" component={CreateRemarks} />
            <Stack.Screen name="CreateChildDetails" component={CreateChildDetails} />
            <Stack.Screen name="DisplayListChildCreate" component={DisplayListChildCreate} />
            <Stack.Screen name="UpdateChildMedicalDetails" component={UpdateChildMedicalDetails} />
            <Stack.Screen name="PersonalGraph" component={PersonalGraph} />
            <Stack.Screen name="PersonalHeightGraph" component={PersonalHeightGraph} />
            <Stack.Screen name="BMIReport" component={BMIReport} />
            <Stack.Screen name="PersonalNavigation" component={PersonalNavigation} />
            <Stack.Screen name="HBReport" component={HBReport} />
            <Stack.Screen name="visit" component={visit} />
            <Stack.Screen name="ChildPersonalList" component={ChildPersonalList}/>
            <Stack.Screen name="OverallReportNavigation" component={OverallReportNavigation}/>
            <Stack.Screen name="DisplayChildList" component={DisplayChildList}/>
            <Stack.Screen name="AgeAnalysis" component={AgeAnalysis}/>
           <Stack.Screen name="Recovery" component={Recovery}/>
           <Stack.Screen name="Anemic" component={Anemic}/>
           <Stack.Screen name="NutritionReport" component={NutritionReport}/>
           <Stack.Screen name="MarritalStatusReport" component={MarritalStatusReport}/>
           <Stack.Screen name="MCVReport" component={MCVReport}/>

          </Stack.Navigator> 
          
      ); 
    }
      

    const styles = StyleSheet.create({
     
      logo: {
            width:50,
            height: 70,
            borderRadius: 10,
            marginRight: 20,
            marginTop:'8%',
            marginBottom: '13%',
        },
        input: {
  
          borderWidth:1,
          color: 'white',
          
          height: 40,
          marginTop: 10,
  
  
      },
      button: {
          alignSelf: 'stretch',
          alignItems: 'center',
          padding:20,
          marginTop:50,
          backgroundColor: 'green',
          width: 200,
          alignSelf: 'center',
          marginBottom:10,
          borderRadius:20
      },
      btnnext: {
          color: 'white',
          fontWeight: 'bold',
  
  
      },
      textf:{
          marginTop:15,
          marginRight:10,
          fontSize:15
      }
  });

export default Navigation;  