import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Input from "../Input";
import SignInButton from "./SignInButton";

const ConfirmEmail = ({ navigation }) => {
    const [code, setCode] = useState('');


    const onConfirmPressed = () => {
        navigation.navigate('SignInPage');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignInPage');
    }

    const onResendPressed = () => {
        console.warn("Another code sent to email");
    }


    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <View style = { styles.root }>
                <Text 
                    style = { styles.title }>
                    Confirm Email
                </Text>

                <Input
                    placeholder = "Enter the confirmation code" 
                    value = { code } 
                    setValue = { setCode }
                />

                <SignInButton 
                    text = "Confirm"
                    onPress = {onConfirmPressed}
                />

                <SignInButton 
                    text = "Resend code"
                    onPress = {onResendPressed}
                    type = "SECONDARY"
                />

                <SignInButton 
                    text = "Back to Sign In"
                    onPress = {onSignInPressed}
                    type = "TERTIARY"
                />
                
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#051C60",
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
});

export default ConfirmEmail;