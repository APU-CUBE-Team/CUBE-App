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
    KeyboardAvoidingView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { resetOrientation } from '../hooks/resetOrientation';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { TextField } from '../components/Form';


import Colors from '../constants/Colors';
import Screen from '../constants/Layout';

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
        color: Colors.c.blue,
        fontSize: 12,
        textAlign: "center",
        padding: 5
    },
    input: {
        backgroundColor: Colors.c.darkGray,
        fontSize: 20,
        padding: 10,
        margin: 5,
        width: screen.width - 30,
        borderRadius: 10,
        color: Colors.c.lightGray

    },
    reportButton: {
        backgroundColor: Colors.c.blue,
        width: screen.width - 30,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 10
    }

});

export default function BugReportScreen(props) {
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
        }, [])
      )

    const [report, setReport] = React.useState('');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
            <SafeAreaView style={styles.container}>

                <StatusBar barStyle="light-content" />


                {/* <TextField>
                    label="Description"
                    placeholder="Tell us what happened..."
                    value={report}
                    onChangeText={report => setReport(report)}
                    multiline="true"
                </TextField> */}

                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholderTextColor={Colors.c.lightGray}
                    label="Description"
                    placeholder="Tell us what happened..."
                    value={report}
                    onChangeText={report => setReport(report)}
                    multiline={true}
                />
                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => alert("TODO")}>

                    <Text style={styles.text}>Submit report</Text>
                </TouchableOpacity>

            </SafeAreaView >
        </KeyboardAvoidingView>


    );
}

