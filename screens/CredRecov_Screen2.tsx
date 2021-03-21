import * as React from "react";
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Animated,
} from "react-native";
import { useFocusEffect, useLinkProps } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from "../components/Themed";

import AppButton from "../components/Button";
import FloatingLabelInput from "../components/floatingLabelInput";
import OverlayPrompt from "../components/Prompt";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.newColors.background,
    },
    inputSafeArea: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.newColors.background,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    input: {
        backgroundColor: Colors.newColors.background2,
        fontSize: 20,
        padding: 10,
        margin: 5,
        width: Screen.window.width - 30,
        borderRadius: 10,
        color: Colors.newColors.grayText,
    },
    reportButton: {
        backgroundColor: Colors.newColors.primary,
        width: Screen.window.width - 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 25,

        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 5, width: 5 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1.5, //IOS
        elevation: 2, // Android
    },
    text: {
        color: Colors.newColors.text,
        fontSize: 20,
        textAlign: "center",
    },
    text2: {
        color: Colors.newColors.grayText,
        fontSize: 15,
        textAlign: "center",
        marginLeft: 15,
        marginTop: 10,
        fontStyle: "italic",
    },
});

export default function CredRecoveryScreen() {
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
        }, [])
    );

    const [email, setEmail] = React.useState("");
    const [entered, setEntered] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0)); // Initial value for opacity: 0
    const [prompt, setPrompt] = React.useState("");
    const [overlay, setOverlay] = React.useState(false);

    /////////////////////////////////////////////////////////////////////
    // TODO: Check different cases like if email exists in data base
    /////////////////////////////////////////////////////////////////////

    function checkEmail(email: any) {
        if (email != "") {
            setMessage(
                "An email will be sent to your inbox shortly with instructions."
            );
            setEntered(true);
        } else {
            setMessage("Please fill in the field above with your email.");
            setEntered(true);
        } /** 
    else if (email does not exist)
    */
    }

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <View style={styles.inputSafeArea}>
                    {/* <TextInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor={Colors.c.gray2}
                    /> */}
                    <FloatingLabelInput
                        label="Email Address"
                        value={email}
                        onChange={checkEmail}
                        customStyle={false}
                    ></FloatingLabelInput>
                    <AppButton
                        label="Reset password"
                        onPressAction={() => { checkEmail(email) }}
                    ></AppButton>

                    {/* <TouchableOpacity
                        style={styles.reportButton}
                        onPress={() => { checkEmail(email) }}

                    >
                        <Text style={styles.text}>Reset password</Text>
                    </TouchableOpacity> */}

                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text style={styles.text2}>{message}</Text>
                    </Animated.View>


                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
