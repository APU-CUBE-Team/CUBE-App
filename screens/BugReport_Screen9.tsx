import * as React from 'react';
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Image
} from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import Screen from '../constants/Layout';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.c.black
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
    text3: {
        color: Colors.c.white,
        paddingTop: 20,
        fontSize: 70,
        textAlign: "center",
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

export default function BugReportScreen() {

    const [report, setReport] = React.useState('');

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" />

            {/* <SafeAreaView style={styles.iconSafeArea}>
                <Text style={styles.text3}>
                    CUBE
              </Text>
                <Image
                    style={styles.icon}
                    source={require('../assets/images/cubeTEMP.png')}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.inputSafeArea}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholderTextColor="#fff"
                />
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => signIn({ username, password })}>
                    <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity>

            </SafeAreaView> */}
        </View>
    );
}

