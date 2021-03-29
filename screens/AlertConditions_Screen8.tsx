import * as React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { AlertPrompt } from '../components/AlertPrompt';
import Colors from "../constants/Colors";

export default function AlertConditionsScreen() {
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AlertConditions</Text>
      <View
        style={styles.separator}
      />
      <AlertPrompt
        closeOverlay = {() => {}}
        promptText = {"Test Case"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
