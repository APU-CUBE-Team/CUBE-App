import * as React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { AlertPrompt } from '../components/AlertPrompt';
import Colors from "../constants/Colors";

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

export default function AlertConditionsScreen() {
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AlertConditions</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <AppButton
      label="Parameter 1" // replace with data from db
      onPressAction={() => alert("navigate to a pop-up")}
      ></AppButton>
      <AppButton
      label="Parameter 2"
      onPressAction={() => alert("navigate to a pop-up")}
      ></AppButton>
      <AppButton
      label="Parameter 3"
      onPressAction={() => alert("navigate to a pop-up")}
      ></AppButton>
      
      <AppButton
      label="New Parameter"
      onPressAction={()=> alert("navigate to a new sub")}
      ></AppButton>
    </SafeAreaView>
  );
}

