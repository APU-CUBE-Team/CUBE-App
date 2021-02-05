import React from "react";
import { Text, View, TextInput, StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout"; // this isn't used?

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  row: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 11,
  },
  label: {
    color: "#4A4A4A",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 7,
  },
  textfield: {
    backgroundColor: Colors.c.darkGray,
    fontSize: 20,
    padding: 10,
    margin: 5,
    width: screen.width - 30,
    borderRadius: 10,
    color: Colors.c.lightGray,
  },
});

export const TextField = ({ ...props }) => (
  <View style={styles.row}>
    <TextInput
      style={styles.textfield}
      placeholderTextColor={Colors.c.lightGray}
      {...props}
    />
  </View>
);
