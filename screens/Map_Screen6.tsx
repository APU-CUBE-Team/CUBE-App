import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import { Text, View } from '../components/Themed';


export default function MapScreen() {
    const navigation = useNavigation();
    
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/globe.png')} style={styles.map}
                resizeMode="contain"
            />
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
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
    map: {
        flex: 1
    }
});