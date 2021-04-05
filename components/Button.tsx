import React from 'react';

import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

const styles = StyleSheet.create({
    text: {
        color: Colors.newColors.text,
        fontSize: 20,
        textAlign: "center",
    },
    signInButton: {
        backgroundColor: Colors.newColors.primary,
        width: Screen.window.width - 30,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 25,

        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1.5, //IOS
        elevation: 2, // Android
    },
})
export default function AppButton({ label, onPressAction }: { label: string, onPressAction: Function },) {

    return (
        <TouchableOpacity
            style={styles.signInButton}
            onPress={
                onPressAction
            }
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity >
    );
}
