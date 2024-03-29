import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Graph from '../components/AdvancedGraph'; // Sadly do not make this tsx unless you want a ton of work
import Screen from '../constants/Layout';
import Colors from '../constants/Colors';
import { telemetryList } from '../constants/FullTelemetrySet';
import { getSettings } from '../hooks/Storage';
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";

type compTelProps = {
    dataSet: any;
    setData: Function;
    updateOrder: Function;
    updateTelem: Function;
}

export default function CompTelScreen({ dataSet, setData, updateOrder, updateTelem }: compTelProps) {
    const [refreshing, setRefresh] = React.useState(false)

    type Item = {
        key: string;
        vals: any[];
        dates: any[];
    };

    const renderItem = React.useCallback(
        ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
          return (
            <Graph 
                data={item}
                longPress={drag}
            />
          );
        },
        []
    );

    return (
        <View style={styles.container}>
            <DraggableFlatList
                onRefresh={() => {
                    setRefresh(true);
                    updateTelem()
                    setTimeout(() => {
                        setRefresh(false)
                    }, 800);
                }}
                refreshing={refreshing}
                data={dataSet}
                renderItem={renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({ data, from, to }) => {
                    setData(data)
                    // console.log(`From: ${from}\nTo: ${to}`)
                    updateOrder(from, to)
                }}
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
        borderRadius: 25,
        elevation: 10,
        borderColor: "#bebec2",
        borderWidth: 1,
        backgroundColor: Colors.newColors.background2,
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 2, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1.5, //IOS
        // elevation: 2, // Android
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