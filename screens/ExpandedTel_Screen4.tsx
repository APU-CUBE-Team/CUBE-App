import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';

import Graph from '../components/dataGraph';
import { resetOrientation } from '../hooks/resetOrientation';
import Rerender from '../hooks/rerender';
import Screen from '../constants/Layout'

export default function ExpandedTelScreen() {
    resetOrientation();
    const [render, setRender] = React.useState(0);
    let timeBase = 1613001378

    let storage = {
        data: {
            vals: [1.4, 1.8, 1.7, 1.4, 1.5, 1.5, 1.4, 1.3],
            dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
        }
    }
    setInterval(() => genEntry(1, 2), 15000)
    setInterval(() => setRender(render+1), 15000)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expanded Telemetry</Text>
                <View style={{
                    flex: 1, 
                    height: Screen.window.height / 2, 
                    width: Screen.window.width - 40,
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#fff'
                }}>
            <Graph 
                data={storage.data}
                width={Screen.window.width - 40}
                height={250}
                yName="Test Data"
                xName="Date"
            ></Graph>
            </View>
        </View>
    );

    function genEntry( min: number, max: number) {
        storage.data.vals.push(Math.random() * (max - min) + min)
        timeBase += 300
        storage.data.dates.push(timeBase)
        let size = storage.data.vals.length
        // if (size > 10) {
        //     console.log(storage.data.vals)
        //     storage.data.vals = storage.data.vals.slice(size-10, size)
        //     storage.data.dates = storage.data.dates.slice(size-10, size)
        //     console.log(storage.data.vals)
        // }        
    }

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