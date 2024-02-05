/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import DrawerNavigation from './components/Drawer/DrawerNavigation';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <DrawerNavigation/>
    </AuthProvider>
  );
}

export default App;