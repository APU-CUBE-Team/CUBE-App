import * as React from 'react';
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
    Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { resetOrientation } from '../hooks/resetOrientation';

import Colors from '../constants/Colors';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const screen = Dimensions.get('window');
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
    saveButton: {
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
});

export default function TeamRolesScreen() {
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
        }, [])
      )

    return (
        <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
            <SafeAreaView style={styles.container}>

                <StatusBar barStyle="light-content" />


                <View style={styles.inputSafeArea}>

                    <Text style={styles.text2}>Justin Watson (Replace)</Text>


                    <Text style={styles.text2}>Josh Roland (Replace)</Text>


                    <Text style={styles.text2}>Cole Gunter (Replace)</Text>


                    <Text style={styles.text2}>Mark Magnuson (Replace)</Text>


                    <Text style={styles.text2}>Nate Bowman (Replace)</Text>




                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => alert("Great success")}>
                        <Text style={styles.text}>Save Changes</Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView >
        </KeyboardAvoidingView >
    );
}

