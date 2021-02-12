import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import Graph from '../components/dataGraph'; // Sadly do not make this tsx unless you want a ton of work
import { resetOrientation } from '../hooks/resetOrientation';
import Screen from '../constants/Layout'

export default function ExpandedTelScreen() {
    resetOrientation();
    const [render, setRender] = React.useState(0);
    let timeBase = 1613001378
    let previous = "data1"
    let time1 = 1613001378
    let time2 = 1613001378
    let time3 = 1613001378
    let min = 1
    let max = 2
    // let storage: any = {
    const [storage, setStorage] = React.useState({
        data: {
            key: "Test Telemetry 1",
            vals: [1.4, 1.8, 1.7, 1.4, 1.5, 1.5, 1.4, 1.3],
            dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
        },
        data2: {
            key: "Test Telemetry 2",
            vals: [23, 12, 12.3, 12.5, 14, 16, 14, 20],
            dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
        },
        data3: {
            key: "Test Telemetry 3",
            vals: [.2, .11, .3, .4, .3, -.1, -.4, -.8],
            dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
        },
        data1: {
            key: "Test Telemetry 1",
            vals: [1.4, 1.8, 1.7, 1.4, 1.5, 1.5, 1.4, 1.3],
            dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
        },
    })

    React.useEffect(() => {
        const interval = setInterval(() => {
            let tempStore = genEntry(min, max)
            setStorage(tempStore)
            // console.log('Correct', render)
            // console.log(storage.data)
        }, 15000);
        return () => {clearInterval(interval)};
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setRender(render+1)
        }, 15000);
        return () => {clearInterval(interval)};
    }, [render]);
    
    return (
        <View style={styles.container}>
            <View style={{ 
                position: 'absolute',
                top: 0,
                height: Screen.window.height / 3, 
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
                />
            </View>
            <View style={{height: Screen.window.height / 3}}/>
            <ScrollView style={{flex:1}}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    min = 1; max = 2; timeBase = time1;
                    let temp = storage.data;
                    storage.data = storage.data1;
                    storage[previous] = temp;
                    previous = "data1"
                }}>
                    <Text>Test Data 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    min = 10; max = 25; timeBase = time1;
                    let temp = storage.data;
                    storage.data = storage.data1;
                    storage[previous] = temp;
                    previous = "data2"
                }}>
                    <Text>Test Data 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    min = -1; max = 1; timeBase = time1;
                    let temp = storage.data;
                    storage.data = storage.data1;
                    storage[previous] = temp;
                    previous = "data3"
                }}>
                    <Text>Test Data 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {console.log(storage)}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

    function genEntry( min: number, max: number) {
        storage.data.vals.push(Math.random() * (max - min) + min)
        timeBase += 300
        storage.data.dates.push(timeBase)
        return storage
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 40,
        width: Screen.window.width / 1.2,
        backgroundColor: '#808080',
        borderRadius: 15,
        marginVertical: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});