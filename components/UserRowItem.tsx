import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.newColors.text,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: "row",
  },
  icon: {
    color: Colors.newColors.text,
    textAlign: "center",
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: Colors.newColors.text,
    fontWeight: "600",
    textAlign: "left",
    flex: 10,
  },
});
export const RowItem = ({ onPress = () => {}, first, last, email }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.08}>
    <View
      style={[styles.row, { backgroundColor: Colors.newColors.background2 }]}
    >
      <Text style={styles.text}>
        {first} {last} - {email}
      </Text>
      <Ionicons name="pencil-sharp" style={styles.icon} size={18}></Ionicons>
    </View>
  </TouchableOpacity>
);
