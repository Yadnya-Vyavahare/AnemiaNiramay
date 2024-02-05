import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome';
import image from '../../assests/images/back2.png';
import profile from '../../assests/images/profile.png';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props) => {

    const navigation =useNavigation();
    const { userName, signOut } = useContext(AuthContext);

    const onSignOut = () => {
        // Clear user authentication state
        signOut();
        // Navigate to SignInPage
        console.log('Navigating to SignInPage');
        navigation.navigate('SignInPage');
    };
    

  return (
    <View style = {{flex: 1}}>
        
        
    
        <DrawerContentScrollView 
            {...props} 
            >
            <ImageBackground 
            source={image} 
            style={styles.image}>
            <Image 
                source={profile} 
                style={styles.profile}
            />
            <Text style={styles.name}>Namaskar{'\n'}{userName}</Text>
        </ImageBackground>
            <View style = {styles.list}>
                <DrawerItemList {...props}/>
            </View>
            
        </DrawerContentScrollView>

        <View style={styles.bottom}>
            <TouchableOpacity onPress={onSignOut} style = {{paddingVertical: 15}}>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name = "sign-out" size={22} color="black"/>
                    <Text style={{fontSize: 15, marginLeft: 8, color: "black", fontWeight: "bold"}}>
                    Sign Out
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        
        
    </View>
    
  )
}

const styles = StyleSheet.create(
    {
    image: {
        height: 300,
        margin: -35,
    },
    profile: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop: 70,
        marginHorizontal: 50,
    },
    name: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 50,
        marginTop: 20,
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 5,
    },
    bottom: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    }
})

export default CustomDrawer;