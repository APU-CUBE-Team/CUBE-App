import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Graph from '../components/dataGraph'; // Sadly do not make this tsx unless you want a ton of work
import { resetOrientation } from '../hooks/resetOrientation';
import Screen from '../constants/Layout'
import { useFocusEffect } from '@react-navigation/native';
import CompTelScreen from './CompTel_Screen3';
import ExpTelScreen from './ExpandedTel_Screen4';


export default function ExpandedTelScreen({ route }) {
    const [path, setPath] = React.useState("ExpandedTelPage");
    // Hook that functions like componentDidMount. Ever screen will need this to ensure correct rotation
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
            AsyncStorage.getItem('@Telemetry').then((ret: any) => {
                setPath(ret)
            })

        }, [])
    )

    const [render, setRender] = React.useState(0);  // Not entirely sure if this is necessary at this point, but I'm too scared to remove
    const [current, setCurrent] = React.useState("data1");  // Stores what graph to display on the top of screen
    // These are our datasets. Wish this was a react component but our package-lock prevents this
    const [data1, setData1] = React.useState({
        key: "Test Telemetry 1",
        vals: [1.4, 1.8, 1.7, 1.4, 1.5, 1.5, 1.4, 1.3],
        dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
    })
    const [data2, setData2] = React.useState({
        key: "Test Telemetry 2",
        vals: [23, 12, 12.3, 12.5, 14, 16, 14, 20],
        dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
    })
    const [data3, setData3] = React.useState({
        key: "Test Telemetry 3",
        vals: [.2, .11, .3, .4, .3, -.1, -.4, -.8],
        dates: [1613001378-2100, 1613001378-1800, 1613001378-1500, 1613001378-1200, 1613001378-900, 1613001378-600, 1613001378-300, 1613001378]
    })
    let timeBase = 1613001378   // Starting time interval for our dummy data generation

    // Use effect hook to set an interval for generating dummy data. Might be useful for checking for real data in the future?
    React.useEffect(() => {
        const interval = setInterval(() => {
            genEntry()
            console.log(path)
        }, 15000);
        return () => {clearInterval(interval)};
    }, [current, render]);
    // This was necessary at one point to force a rerender. Again, scared to remove it
    React.useEffect(() => {
        const interval = setInterval(() => {
            setRender(render+1)
        }, 15000);
        return () => {clearInterval(interval)};
    }, [render]);


    return (
        <View style={{flex: 1}}>
            {path === "\"CompTelPage\"" ? (
                <CompTelScreen/> 
            ) : (
                <ExpTelScreen dataSet={[data1, data2, data3]}/>
            )}
        </View>
    );

    // Ugly function but hopefully this will just be the case for dummy data and our real grab will look cleaner
    function genEntry() {
        timeBase += 300
        let tempVal1 = data1.vals
        tempVal1.push(Math.random() * (2 - 1) + 1)
        let tempDate1 = data1.dates
        tempDate1.push(timeBase)
        setData1({...data1, vals: tempVal1, dates: tempDate1})
        let tempVal2 = data2.vals
        tempVal2.push(Math.random() * (30 - 10) + 10)
        let tempDate2 = data2.dates
        tempDate2.push(timeBase)
        setData2({...data2, vals: tempVal2, dates: tempDate2})
        let tempVal3 = data3.vals
        tempVal3.push(Math.random() * (1 - -1) + -1)
        let tempDate3 = data3.dates
        tempDate3.push(timeBase)
        setData3({...data3, vals: tempVal3, dates: tempDate3})
    }
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