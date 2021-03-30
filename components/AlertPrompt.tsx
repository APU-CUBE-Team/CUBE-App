import React from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity, TextInput } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
import { telemetryDBDoc } from '../util/firebase-util';
import { OverlayPrompt } from './Prompt';
import LabelInput from './floatingLabelInput';
import { Carousel } from './Carousel'
import FloatingLabelInput from "./floatingLabelInput";

type btns = {
    key: string;
    action: Function;
};

type PromptProps = {
    closeOverlay: Function;
    promptText: string;
};

enum OPs {
    ">",
    ">=",
    "<",
    "<=",
    "=",
    "!="
}

namespace OPs {
    export function toString(dir: OPs): string {
        return OPs[dir];
    }

    export function fromString(dir: string): OPs {
        return (OPs as any)[dir];
    }
}


export const AlertPrompt: React.FunctionComponent<PromptProps> = (props) => {
    const [telemNames, setNames] = React.useState<any[]>([]);
    const [selected, setTel] = React.useState<any>("0");
    const [operation, setOp] = React.useState<OPs>(OPs["="]);
    const [value, setVal] = React.useState(0);
    
    let count = 0;
    
    useFocusEffect(
        React.useCallback(() => {
            if (telemNames.length == 0) {
                telemetryDBDoc.then(ret => {
                    const names = ret.data().names;
                    let d: any[] = []
                    names.forEach(e => {
                        d.push({key: e})
                    });
                    setNames(d);
                    console.log("Names:",d)
                })
                .catch(e => {
                    console.log("Error Occured:", e)
                })
            }
        }, [])
    )
    const styles = StyleSheet.create({
        promptText: {
            fontSize: 15,
            color: "#fff",
            textShadowOffset: { width: 0, height: 0 },
            textShadowColor: Colors.newColors.background2,
            textShadowRadius: 1,
            margin: 15,
        },
        picker: {
            width: 150,
            backgroundColor: Colors.newColors.background2,
            borderBottomColor: "transparent",
            borderRadius: 10,
            margin: 5,
            marginLeft: -10,
        },
        pickerItem: {
            color: Colors.c.darkGray,
            fontSize: 15,
            height: 150,
        },

    })

    const cycleOp = () => {
        switch (operation) {
            case OPs["="]:
                setOp(OPs["!="]);
                break;
            case OPs["!="]:
                setOp(OPs["<"]);
                break;
            case OPs["<"]:
                setOp(OPs["<="]);
                break;
            case OPs["<="]:
                setOp(OPs[">"]);
                break;
            case OPs[">"]:
                setOp(OPs[">="]);
                break;
            case OPs[">="]:
                setOp(OPs["="]);
                break;
        }
    }

    return (
        <OverlayPrompt
            closeOverlay = {props.closeOverlay}
            promptText = {props.promptText}
            btns = {[{key: "Save", action: () => {alert("TODO")}}, {key: "cancel", action: props.closeOverlay}]}
            disableTap = {true}
        >
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.promptText, {marginLeft: Platform.OS === "android" ? 10: 0}]}>Notify me when: </Text>
                    {telemNames.length !== 0 && 
                    Platform.OS === "android" ? 
                    <View style={{flex:1}}>
                    <Carousel
                        data={telemNames}
                        onChange={i => setTel(i)}
                    />
                    </View>
                    :
                    <Picker
                        selectedValue={selected}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        onValueChange={(itemValue, itemIndex) => setTel(itemValue)}
                    >
                        {telemNames.map(e => {
                            return (
                                <Picker.Item label={e} value={`${count++}`} color={Colors.c.purple}/>
                            )
                        })}
                    </Picker>}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.promptText]}>is: </Text>
                    <TouchableOpacity 
                        onPress={() => cycleOp()} 
                        style={{borderColor: Colors.newColors.bluegreen, borderWidth: 1, borderRadius: 25}}
                    >
                        <Text style={[styles.promptText]}>{`${OPs.toString(operation)}`}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.promptText]}>Than the Value:</Text>
                    <View style={{borderRadius: 25, borderColor: Colors.newColors.bluegreen, borderWidth: 1, marginLeft: -10}}>
                    <TextInput 
                        keyboardType="numeric"
                        style={[styles.promptText]}
                        value={value}
                        onChange={(val) => {setVal(parseInt(val))}}
                    />
                    </View>
                </View>
                <View>
                    <Text style={[styles.promptText, {alignSelf: 'center'}]}>Alert Message:</Text>
                    <View style={{backgroundColor: Colors.newColors.background, width: Screen.window.width - 60, height: 75}}>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={{margin: 2, color: '#fff'}}
                        />
                    </View>
                </View>
            </View>
        </OverlayPrompt>
    )
}
