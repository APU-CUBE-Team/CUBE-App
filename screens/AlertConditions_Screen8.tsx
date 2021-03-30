import * as React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { AlertPrompt } from '../components/AlertPrompt';
import Button from '../components/Button';
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
  morshu: {
    position: "absolute",
    bottom: 0
  },
  promptText: {
    fontSize: 20,
    color: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: Colors.newColors.background2,
    textShadowRadius: 1,
    margin: 15,
  },
});

export default function AlertConditionsScreen() {
  const [overlay, setOverlay] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      
      </ScrollView>      
      <Button
        label={"New Parameter"}
        onPressAction={() => setOverlay(true)}
      />
      {overlay &&
        <AlertPrompt 
          closeOverlay={() => setOverlay(false)}
          promptText={"New Parameter"}
        />
      }
    </SafeAreaView>
  );
}

