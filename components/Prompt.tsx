import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Screen from '../constants/Layout';

type btns = {
    key: string,
    action: Function
}

type PromptProps = {
    closeOverlay: Function,
    promptText: string,
    btns: btns[],
    disableTap?: boolean
}

export default function Prompt({ closeOverlay, promptText, btns, disableTap }: PromptProps) {
    const styles = StyleSheet.create({
        overlay: {
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            justifyContent: 'center', 
            alignItems: 'center',
        },
        trans: {
            backgroundColor: Colors.c.darkGray,
            opacity: .5
        },
        overlayPrompt: {
            width: Screen.window.width - 40,
            height: Screen.window.height / 4,
            backgroundColor: Colors.c.darkGray,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: Colors.c.lightGray,
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 2, width: 0 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1.5, //IOS
            elevation: 10, // Android
        },
        promptText: {
            fontSize: 20,
            color: '#fff',
            textShadowOffset:{width: 0, height: 0}, 
            textShadowColor:'#000', 
            textShadowRadius:10,
            margin: 15
        },
        promptBtn: {
            // width: Screen.window.width / 3.5,
            height: Screen.window.height / 12,
            backgroundColor: Colors.c.lightGray,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            marginHorizontal: 15,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: Colors.c.lightGray,
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 2, width: 0 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1.5, //IOS
            elevation: 10, // Android
            flex: 1
        }
    })

    return (
        <View style={[styles.overlay,{flex: 1}]}>
            <View style = {[styles.overlay, styles.trans]}>
                <TouchableOpacity
                    style = {[styles.overlay, {opacity: 1}]}
                        onPress = {() => {
                            if (!disableTap)
                                closeOverlay();
                        }
                    }
                />
            </View>
            <View style={styles.overlayPrompt}>
                <Text style={styles.promptText}>
                    {promptText}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {btns.map(e => {
                        return(
                            <TouchableOpacity 
                                style={styles.promptBtn}
                                onPress={() => {e.action()}}
                            >
                                <Text style={styles.promptText}>
                                    {e.key}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}