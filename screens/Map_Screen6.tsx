import * as React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

import { Text, View } from '../components/Themed';

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
        flex: 1,
        
    },
    sine: {
    }
});

export default function MapScreen() {
    const navigation = useNavigation();
    
    // thinking about grabbing the window dimensions as a way of generating the graph instead of wasting time 
    // trying to eyeball it
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)

    return (
        <View style={styles.container}>
            <Svg height="inherit" width="inherit">
                <Path>
                    <Image 
                        source={require('../assets/images/globe.png')} style={styles.map}
                        resizeMode="contain"
                    />
                </Path>
            </Svg>
        </View>
    );
    
}

