import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInPage from "../SignIn/SignInPage";
import Register from "../SignIn/Register";
import Settings from './Settings';
import CustomDrawer from './CustomDrawer';
import Navigation from '../Navigation';
import About from '../About'

const Drawer = createDrawerNavigator();
    
    const DrawerNavigation = () => {
      return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} 
                screenOptions=
                {
                    {headerShown: false,
                    drawerActiveBackgroundColor: '#E38B29',
                    drawerActiveTintColor: 'black',
                    drawerInactiveTintColor: '#333', 
                    drawerLabelStyle: {marginLeft: -20, fontSize: 15}}
                    
                }>

                <Drawer.Screen
                  name="Navigation"
                  component={Navigation}
                  options={{ drawerLabel: () => null, drawerActiveBackgroundColor: 'transparent' }} // Hide label in Drawer
                />

                {/* <Drawer.Screen name='SignInPage' component={SignInPage} options={{
                    drawerIcon: ({color}) => (
                        <Icon name="home" size={20} color={color} />
                    )
                }}/> */}

                <Drawer.Screen
                name='Sign In'
                component={SignInPage}
                options={{
                    drawerIcon: ({color}) => (
                    <Icon name="home" size={20} color={color} />
                    ),
                    drawerLockMode: 'locked-closed',  gestureEnabled: 'false' // Disable the drawer for this screen
                }}
                />


                <Drawer.Screen name='Register' component={Register} options={{
                    drawerIcon: ({color}) => (
                        <Icon name="comments" size={22} color={color}/>
                    )
                }}/>


                <Drawer.Screen name='Contact Us' component={About} options={{
                    drawerIcon: ({color}) => (
                        <Icon name="user" size={22} color={color}/>
                    )
                }}/>

                
                {/* <Drawer.Screen name='Settings' component={Settings} options={{
                    drawerIcon: ({color}) => (
                        <Icon name="cog" size={22} color={color}/>
                    )
                }}/> */}

                
            </Drawer.Navigator>
        </NavigationContainer>
      )
    }
    
export default DrawerNavigation;