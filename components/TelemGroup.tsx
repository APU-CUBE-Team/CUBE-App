import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import AsyncStorage from "@react-native-community/async-storage";
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

// export const TelemGroup: React.FunctionComponent<GroupProps> = (props) => {
export class TelemGroup extends React.Component { 
    // const [editing, changeMode] = React.useState(false);
    // const [thisTel, setTel] = React.useState<any>([]);
    // const [title, setTitle] = React.useState(props.group.groupTitle);
    // const [fields, setFields] = React.useState({});
    // const [filter, setFilter] = React.useState("");
    // const [filteredList, setFilteredList] = React.useState<any>([]);
    i = 0
    
    state = {
        editing: false,
        thisTel: [],
        title: this.props.group.groupTitle,
        fields: {},
        updated: false
    }
    // function updateFilter({value}: {value: string}) {
    //     setFilter(value)
    //     if (value === '' || !value) {
    //     setFilteredList(props.telem);
    //     } else {
    //     setFilteredList(props.telem.filter(
    //         existingItem => (
    //             existingItem.title.toUpperCase().includes(value.toUpperCase()) ||
    //             existingItem.message.toUpperCase().includes(value.toUpperCase())
    //         )
    //     ))
    //     }
    // }

    updateVals = () => { 
        let t: any[] = []
        Object.keys(this.state.fields).forEach(e => {
           
            let p = this.props.telem.filter(
                existingItem => (
                    existingItem.key.toUpperCase().includes(this.state.fields[e].toUpperCase()) 
                )
            )
            t.splice(0,0, ...p)
        })
        this.setState({thisTel: t})
    }

    render() {
        if (this.state.thisTel.length === 0 && !this.state.updated) {
            let t: any[] = []
            let f = {}
            
            try{
                this.props.group.telems.forEach(e => {
                    let p = this.props.telem.filter(
                        existingItem => (
                            existingItem.key.toUpperCase().includes(e.toUpperCase()) 
                        )
                    )
                    t.splice(0,0, ...p)
                    f["field"+this.i] = p[0].key
                    this.i++
                })

                this.setState({thisTel: t, fields: f})
            } catch (e) {
                console.log(e)
            }
            // setFields(f)
            // console.log(f)
            // setTel(t)
           
        }

    return (
        <View>
            {!this.state.editing ? 
            <View  style={styles.container}>
            <Text style={styles.titleText}>{this.state.title}</Text>
            {this.state.thisTel.map((e: any) => {
                return (
                    <TouchableOpacity onPress={() => this.props.setVal(e.key)}>
                        <Text style={styles.text}>{`${e.key} (RT): ${Math.round(e.vals[e.vals.length - 1] * 100) / 100}`}</Text>
                    </TouchableOpacity>
                )
            })}
            <TouchableOpacity 
                style={{position: 'absolute', bottom: 5, right: 5}}
                onPress={() => this.setState({editing: true})}
            >
                <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="pencil-sharp" />
            </TouchableOpacity>
            </View>
            :
            <View  style={styles.container}>
                <TextInput style={styles.titleText} 
                    value={this.state.title}
                    onChangeText={(text) => this.setState({title: text})}
                />
                {Object.keys(this.state.fields).map(key => {
                    let temp = this.state.fields
                    return (
                        <TextInput style={[styles.text, {borderBottomColor: Colors.newColors.border, borderBottomWidth: 1}]}
                            value={temp[key]}
                            onChangeText={text => {temp[key] = text; this.setState({fields: temp}) }}
                        />
                    )
                })}
                <TouchableOpacity 
                    onPress={() => {
                        let temp = this.state.fields;
                        temp["field"+this.i] = "";
                        this.i++
                        this.setState({fields: temp})
                    }}
                >
                    <Ionicons size={25} style={{ marginLeft: 10, color: '#fff' }} name="add" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{position: 'absolute', bottom: 5, right: 45}}
                    onPress={() => {
                        this.setState({editing: false, updated: true}); 
                        this.updateVals()
                        for (let j = 0; j < this.props.groups.length; j++) {
                            if (this.props.groups[j].groupTitle === this.props.group.groupTitle) {
                                this.props.groups[j].groupTitle = this.state.title
                                this.props.groups[j].telems = Object.values(this.state.fields)
                                AsyncStorage.setItem("@Groups", JSON.stringify(this.props.groups))
                                    .then(ret => this.props.updateGroups())
                            }
                        }
                        
                    }}
                >
                    <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="checkmark" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{position: 'absolute', bottom: 5, right: 5}}
                    onPress={() => {
                        for (let j = 0; j < this.props.groups.length; j++) {
                            if (this.props.groups[j].groupTitle === this.props.group.groupTitle) {
                                this.props.groups.splice(j, 1)                                
                                AsyncStorage.setItem("@Groups", JSON.stringify(this.props.groups))
                                    .then(ret => this.props.updateGroups())
                            }
                        }
                    }}
                >
                    <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="trash-bin-outline" />
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}
}
