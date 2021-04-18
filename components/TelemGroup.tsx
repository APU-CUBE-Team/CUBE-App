import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    TextInput
} from "react-native";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

const styles = StyleSheet.create({
    text: {
        color: Colors.newColors.text,
        fontSize: 15,
        textAlign: "center",
        fontFamily: "GillSans-Reg",
        margin: 10

    },
    titleText: {
        color: Colors.newColors.text,
        fontSize: 20,
        textAlign: "center",
        fontFamily: "GillSans-Reg",
        marginLeft: 10,
        marginTop: 10
    },
    container: {
        width: Screen.window.width / 1.2,
        backgroundColor: Colors.newColors.primary,
        borderRadius: 15,
        marginVertical: 10,
        alignItems: "flex-start",
        justifyContent: "center",

        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 5, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1.5, //IOS
        elevation: 2, // Android
    }
})

export type Group = {
    groupTitle: string;
    telems: string[];
};

type GroupProps = {
    group: Group;
    setVal: Function;
    telem: any[];
}

export const TelemGroup: React.FunctionComponent<GroupProps> = (props) => {
// export class TelemGroup extends React.Component { 
    const [editing, changeMode] = React.useState(false);
    const [thisTel, setTel] = React.useState<any>([]);
    const [title, setTitle] = React.useState(props.group.groupTitle);
    const [fields, setFields] = React.useState({});
    const [filter, setFilter] = React.useState("");
    const [filteredList, setFilteredList] = React.useState<any>([]);
    
    // state = {
    //     test: false
    // }
    function updateFilter({value}: {value: string}) {
        setFilter(value)
        if (value === '' || !value) {
        setFilteredList(props.telem);
        } else {
        setFilteredList(props.telem.filter(
            existingItem => (
                existingItem.title.toUpperCase().includes(value.toUpperCase()) ||
                existingItem.message.toUpperCase().includes(value.toUpperCase())
            )
        ))
        }
    }

    if (thisTel.length === 0) {
        let t: any[] = []
        let f = {}
        let i = 0
        props.group.telems.forEach(e => {
            let p = props.telem.filter(
                existingItem => (
                    existingItem.key.toUpperCase().includes(e.toUpperCase()) 
                )
            )
            t.splice(0,0, ...p)
            f["field"+i] = p[0].key
        })
        setFields(f)
        console.log(f)
        setTel(t)
    }

    // render() {
    return (
        <View>
            {!editing ? 
            <View  style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            {thisTel.map((e: any) => {
                return (
                    <TouchableOpacity>
                        <Text style={styles.text}>{`${e.key} (RT): ${Math.round(e.vals[e.vals.length - 1] * 100) / 100}`}</Text>
                    </TouchableOpacity>
                )
            })}
            <TouchableOpacity 
                style={{position: 'absolute', bottom: 5, right: 5}}
                onPress={() => changeMode(true)}
            >
                <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="pencil-sharp" />
            </TouchableOpacity>
            </View>
            :
            <View  style={styles.container}>
                <TextInput style={styles.titleText} 
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                {Object.keys(fields).map(key => {
                    let temp = fields[key]
                    return (
                        <TextInput style={styles.text}
                            value={temp}
                            onChangeText={text => {temp = text; setFields(fields) }}
                        />
                    )
                })}
                <TouchableOpacity 
                    style={{position: 'absolute', bottom: 5, right: 45}}
                    onPress={() => changeMode(false)}
                >
                    <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="checkmark" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{position: 'absolute', bottom: 5, right: 5}}
                    onPress={() => changeMode(true)}
                >
                    <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="trash-bin-outline" />
                </TouchableOpacity>
            </View>
            }
        </View>
    );
//}
}
