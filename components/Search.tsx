import React from 'react';
import { SearchBar } from 'react-native-elements';
import {
    StyleSheet,
} from 'react-native';

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: Colors.newColors.background,
        borderTopColor: Colors.newColors.background,
        borderBottomColor: Colors.newColors.background,
        borderWidth: 0,
    }
});

export default function Search({
    onChangeText,
    value,
}: {
    onChangeText: any,
    value: any
},) {
    return (
        <SearchBar
            placeholder="Search"
            onChangeText={onChangeText}
            value={value}
            containerStyle={styles.searchBar}
            showCancel={true}
            round={true}
            inputContainerStyle={{ backgroundColor: Colors.newColors.background2 }}
        />
    )

}