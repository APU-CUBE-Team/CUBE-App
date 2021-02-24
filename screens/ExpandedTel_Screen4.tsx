import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import Graph from '../components/dataGraph'; // Sadly do not make this tsx unless you want a ton of work
import Screen from '../constants/Layout'

export default function ExpandedTelScreen({ dataSet, selected, setCurrent }: { dataSet: any, selected: string, setCurrent: Function }) {

    return (
        <View style={styles.container}>
            <View style={styles.GraphArea}>
                {dataSet.map((e: any) => {
                    return(
                        <View style={selected === e.key ? {flex: 1, width: Screen.window.width - 40, height: 250} : {backgroundColor: "#00000000", height: 0, width: 0, position: 'absolute', top: -250}}>
                            <Graph 
                                data={e.data}
                                width={Screen.window.width - 40}
                                height={250}
                            />
                        </View>
                    )
                })}
            </View>
            <View style={{height: Screen.window.height / 3}}/>
            <ScrollView style={{flex:1}}>
                <View style={styles.Group} >
                    <Text style={styles.groupTitle}>Computer Telemetry</Text>
                    <TouchableOpacity>
                        <Text style={styles.dataText} onPress={() => { setCurrent("data1") }}>
                            Test Data 1 (RT): {`${Math.round(dataSet[0].data.vals[dataSet[0].data.vals.length -1] * 100) / 100}`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.dataText} onPress={() => { setCurrent("data2") }}>
                            Test Data 2 (RT): {`${Math.round(dataSet[1].data.vals[dataSet[1].data.vals.length -1] * 100) / 100}`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.dataText} onPress={() => { setCurrent("data3") }}>
                            Test Data 3 (RT): {`${Math.round(dataSet[2].data.vals[dataSet[2].data.vals.length -1] * 100) / 100}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Group} onPress={() => {}}>
                    <Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#101010'
    },
    Group: {
        // height: 40,
        width: Screen.window.width / 1.1,
        borderColor: '#808080',
        backgroundColor: '#bebec2',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    GraphArea: { 
        position: 'absolute',
        top: 2,
        height: Screen.window.height / 3, 
        width: Screen.window.width - 40,
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 10,
        borderColor: "#bebec2",
        borderWidth: 1
    },
    groupTitle: {
        fontSize: 25
    },
    dataText: {
        marginLeft: 4,
        marginVertical: 4,
        color: '#4976a6',
        fontSize: 20
    }
});