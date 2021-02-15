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
    Alert,
} from "react-native";

import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
import { SignUp } from "../util/create-user/createUser";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.c.black
    },
    inputSafeArea: {
        flex: 1,
        marginTop: 30
    },
    buttonSafeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    text: {
        color: Colors.c.white,
        fontSize: 20,
        textAlign: "center"
    },
    text2: {
        color: Colors.c.white,
        fontSize: 15,
        textAlign: "left",
        marginLeft: 15,
        marginTop: 7,
    },
    input: {
        backgroundColor: Colors.c.darkGray,
        fontSize: 20,
        padding: 10,
        margin: 5,
        width: screen.width - 30,
        borderRadius: 10,
        color: Colors.c.white

    },
    signInButton: {
        backgroundColor: Colors.c.blue,
        width: screen.width - 30,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        margin: 5,
    },
    picker: {
        width: screen.width - 30,
        backgroundColor: Colors.c.darkGray,
        borderBottomColor: 'transparent',
        borderRadius: 10,
        margin: 5,
        marginBottom: 10,
        // ...Platform.select({
        //     android: {
        //         color: '#fff',
        //         backgroundColor: Colors.c.darkGray,
        //         marginLeft: 10,
        //     },
        // }),
    },
    pickerItem: {
        color: Colors.c.white,
        fontSize: 20,
        height: 150,

    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});


export default function CreateUserScreen() {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [role, setRole] = React.useState("1");


    // TODO
    // taking in parameters password and confirm password
    function checkPW(pw: string, cpw: string) {
        {
            pw == cpw ? (
                //PUT ACTUAL FRONT END FUNCTIONALITY HERE
                alert("GREAT SUCCESS GO KAZAKHSTAN")
                //RETURNS TRUE FOR MATCH -> SEND TO GOOGLE FIRECLOUD
            ) : (
                    alert("Please double check that your passwrd")
                )
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                <View style={styles.iconSafeArea}>
                    <Text style={styles.text3}>Add a new member to your team</Text>
                </View>

                <View style={styles.inputSafeArea}>
                    <TextInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#fff"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#fff"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(confirmPassword) =>
                            setConfirmPassword(confirmPassword)
                        }
                        secureTextEntry={true}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#fff"
                    />
                </View>

                <View style={styles.buttonSafeArea}>
                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => checkPW(password, confirmPassword)}
                    >
                        <Text style={styles.text}>Add User</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
