import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { resetOrientation } from '../hooks/resetOrientation';

import { Text, View } from '../components/Themed';
import { resetOrientation } from '../hooks/resetOrientation';

export default function CompTelScreen() {
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
        }, [])
      )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compact Telemetry</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
});