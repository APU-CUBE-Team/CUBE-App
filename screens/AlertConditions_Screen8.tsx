import * as React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { AlertPrompt } from '../components/AlertPrompt';
import { getAlertsCollection } from '../util/alert-conditions';
import Button from '../components/Button';
import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

import { db } from '../util/firebase-util';

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
  parameter: {
     backgroundColor: Colors.c.gray,
     margin: 10,
     borderRadius: 25,
     width: Screen.window.width - 50,
     height: 50,
     alignItems: "center",
     justifyContent: "center",
  },
  parameterText: {
    color: Colors.newColors.text,
    fontSize: 20,
    textAlign: "center"
  },
  parameterSubText: {
    color: Colors.newColors.text,
    fontSize: 12,
    textAlign: "center",
  }
});

export default function AlertConditionsScreen() {
  const [overlay, setOverlay] = React.useState(false);
  const [alerts, setAlerts] = React.useState<any[]>([]);
  const [prompt, setPrompt] = React.useState("New Parameter");
  const [message, setMessage] = React.useState("");
  const [op, setOp] = React.useState("");
  const [telem, setTelem] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
      getAlertsCollection().then(ret => {
        setAlerts(ret)
      })
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {alerts.map(e => {
          return (
          <TouchableOpacity
            style={styles.parameter}
            onPress={() => {
              setPrompt("Edit Parameter")
              setMessage(e.msg)
              setOp(e.op)
              setTelem(e.telem)
              setOverlay(true)
            }}
          >
            <Text style={styles.parameterText}>{`${e.telem} Parameter`}</Text>
            <Text style={styles.parameterSubText}>{e.msg}</Text>
          </TouchableOpacity>
        )})}
        
        <TouchableOpacity
        style={styles.parameter}
        >
          <Text style={styles.parameterText}>Parameter 2</Text>
          <Text style={styles.parameterSubText}> propulsion conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.parameter}
        >
          <Text style={styles.parameterText}>Parameter 3</Text>
          <Text style={styles.parameterSubText}> another thing</Text>
        </TouchableOpacity>      
      </ScrollView>     
      <Button
        label={"New Parameter"}
        onPressAction={() => setOverlay(true)}
      />
      {overlay &&
        <AlertPrompt 
          closeOverlay={() => setOverlay(false)}
          promptText={prompt}
          telem={telem}
          op={op}
          message={message}
        />
      }
    </SafeAreaView>
  );
}

