import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import Graph from '../components/AdvancedGraph'; // Sadly do not make this tsx unless you want a ton of work
import Screen from '../constants/Layout'

export default function ExpandedTelScreen({ dataSet }: { dataSet: any }) {

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                {dataSet.map((e: any) => {
                    return(
                        <Graph 
                            data={e}
                        />
                    )
                })}
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