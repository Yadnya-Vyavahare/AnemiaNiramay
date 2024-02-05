import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({ title, placeholder, value, setValue, keyboard, is_password, togglePasswordVisibility, isPasswordVisible }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="grey"
        value={value}
        onChangeText={setValue}
        keyboardType={keyboard}
        secureTextEntry={is_password && !isPasswordVisible}
      />
      {is_password && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
          <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.inputLine} />
    </View>
  );
  
}

const styles = StyleSheet.create({
    container: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingVertical: 0,
      marginTop: 5,
    },
    title: {
      fontSize: 16, 
      color: 'black',
    },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 5,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: 'black'
  },
  eyeIcon: {
    marginLeft: 10,
  },
  visibilityToggle: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    top: 10,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default Input;