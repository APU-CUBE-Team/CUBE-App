import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: Colors.newColors.background2,
        marginBottom: 10,
        borderRadius: 12,
    },
    row: {
        marginBottom: 10,
        flexDirection: "row",
    },
    text: {
        fontSize: 16,
        color: Colors.newColors.text,
        fontFamily: "GillSans-Light",
        textAlign: "left",
        fontStyle: "italic",

    },
    title: {
        fontSize: 20,
        color: Colors.newColors.text,
        fontWeight: "500",
        textAlign: "left",
        flex: 4,
        fontFamily: "GillSans-Light",

    },
    date: {
        fontSize: 14,
        color: Colors.newColors.text,
        textAlign: "right",
        flex: 1
    },
});

export default function NotificationRow({
    onPressAction,
    title,
    timeStamp,
    bodyMessage,
    navigation
}: {
    onPressAction: any,
    title: any
    timeStamp: any,
    bodyMessage: any,
    navigation: any
},) {

    //const [overlay, setOverlay] = React.useState(false);
    let day = new Date(timeStamp * 1000).toLocaleDateString("en-US");
    let time = new Date(timeStamp).toLocaleTimeString("en-US");
    let formattedDate = day + "\n" + time
    let shortMessage = ""
    if (bodyMessage.length > 95) {
        shortMessage = (bodyMessage).substring(0, 95) + "..."
    } else { shortMessage = bodyMessage }


    return (

        <TouchableOpacity onPress={onPressAction} activeOpacity={0.08}>
            <View style={styles.box} >
                <View style={styles.row}>
                    <Text style={styles.title}>{title} </Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <Text style={styles.text}>{shortMessage}</Text>
            </View>
        </TouchableOpacity>



    );
}
