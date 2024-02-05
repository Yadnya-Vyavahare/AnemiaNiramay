import { Text, StyleSheet, Pressable, Platform } from 'react-native'
import React from 'react'

const SignInButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
  return (
    <Pressable 
        style = { 
            [ styles.container, 
              styles[`container_${type}`],
              bgColor ? {backgroundColor: bgColor} : {},
              Platform.OS === 'web' ? styles.webContainer : {},
            ] }
        onPress={onPress}>
        <Text 
            style = { 
                [ styles.text, 
                  styles[`text_${type}`],
                  fgColor ? {color: fgColor} : {},
                  Platform.OS === 'web' ? styles.webText : {},
                ] }>
            {text}
        </Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 30,
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    container_TERTIARY: {

    },
    webContainer: {
        width: '20%',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
      },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_SECONDARY: {
        color: '#3B71F3',
    },
    text_TERTIARY: {
        color: 'gray',
    },
    webText: {
        fontWeight: 'bold',
        color: 'black',
      },
});

export default SignInButton;