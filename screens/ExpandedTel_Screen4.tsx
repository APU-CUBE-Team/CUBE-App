import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Graph from '../components/dataGraph'; // Sadly do not make this tsx unless you want a ton of work
import Colors from '../constants/Colors'
import Screen from '../constants/Layout'

export default function ExpandedTelScreen({ dataSet, selected, setCurrent }: { dataSet: any, selected: string, setCurrent: Function }) {

    return (
        <View style={styles.container}>
            <View style={styles.GraphArea}>
                {dataSet.map((e: any) => {
                    return(
                        <View 
                            style={selected === e.key ? {
                                flex: 1, 
                                width: Screen.window.width - 40, 
                                height: 250
                            } : {
                                backgroundColor: "#00000000", 
                                height: 0, 
                                width: 0, 
                                position: 'absolute', 
                                top: -350
                        }}>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setCurrent("data1");
                    }}
                >
                    <Text style={styles.text}>
                        Test Data 1 (RT): {`${Math.round(dataSet[0].data.vals[dataSet[0].data.vals.length -1] * 100) / 100}`}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setCurrent("data2");
                    }}
                >
                    <Text style={styles.text}>
                        Test Data 2 (RT): {`${Math.round(dataSet[1].data.vals[dataSet[1].data.vals.length -1] * 100) / 100}`}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setCurrent("data3");
                    }}
                >
                    <Text style={styles.text}>
                        Test Data 3 (RT): {`${Math.round(dataSet[2].data.vals[dataSet[2].data.vals.length -1] * 100) / 100}`}
                    </Text>
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
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        height: 40,
        width: Screen.window.width / 1.2,
        backgroundColor: Colors.newColors.secondary,
        borderRadius: 15,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 5, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1.5, //IOS
        elevation: 2, // Android
    },
    text: {
        color: Colors.newColors.text,
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
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


    GraphArea: { 
        position: "absolute",
        top: 10,
        bottom: 10,
        height: Screen.window.height / 3,
        width: Screen.window.width - 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.newColors.background2,
        borderRadius: 10,
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 2, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1.5, //IOS
        elevation: 2, // Android
    },
    groupTitle: {
        fontSize: 25
    },
    dataText: {
        marginLeft: 4,
        marginVertical: 4,
        color: '#4976a6',
        fontSize: 20,
        textShadowOffset:{width: 0, height: 0}, 
        textShadowColor:'#fff', 
        textShadowRadius:10,
    }
});
