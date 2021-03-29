import React from "react";
import { View, StyleSheet, Text, } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
import { telemetryDBDoc } from '../util/firebase-util';
import { OverlayPrompt } from './Prompt';
import LabelInput from '../components/floatingLabelInput';

type btns = {
    key: string;
    action: Function;
};

type PromptProps = {
    closeOverlay: Function;
    promptText: string;
};

export const AlertPrompt: React.FunctionComponent<PromptProps> = (props) => {
    const [telemNames, setNames] = React.useState<string[]>([]);
    const [selected, setTel] = React.useState<any>("0");
    let count = 0;
    
    useFocusEffect(
        React.useCallback(() => {
            if (telemNames.length == 0) {
                telemetryDBDoc.then(ret => {
                    const names = ret.data().names;
                    setNames(names);
                    console.log("Names:",names)
                })
                .catch(e => {
                    console.log("Error Occured:", e)
                })
            }
        }, [])
    )
    const styles = StyleSheet.create({
        promptText: {
            fontSize: 20,
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
            fontSize: 20,
            height: 150,
        },
    })

    return (
        <OverlayPrompt
            closeOverlay = {props.closeOverlay}
            promptText = {props.promptText}
            btns = {[{key: "Save", action: () => {alert("TODO")}}, {key: "cancel", action: props.closeOverlay}]}
            disableTap = {true}
        >
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.promptText}>Notify me when: </Text>
                    {telemNames.length !== 0 &&
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
            </View>
        </OverlayPrompt>
    )
}
