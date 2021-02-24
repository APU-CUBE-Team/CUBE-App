import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { resetOrientation } from '../hooks/resetOrientation';

import { storeTelemetryPreference } from '../hooks/Storage';

export default function WorkspaceScreen() {
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
        }, [])
      )
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workspace</Text>
            <View style={styles.separator} />
            <TouchableOpacity style={{backgroundColor: '#0f0', height: 50, width: 50}} onPress={() => {
                storeTelemetryPreference('ExpTelPage')
            }}/>
            <TouchableOpacity style={{backgroundColor: '#0f0', height: 50, width: 50}} onPress={() => {
                storeTelemetryPreference('CompTelPage')
            }}/>
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