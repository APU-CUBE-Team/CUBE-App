import * as React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { AlertPrompt } from '../components/AlertPrompt';
import Button from '../components/Button';
import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

import { db } from '../util/firebase-util';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

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

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  let alerts: any[] = []
  db.collection("Organizations")
    .doc("AdminOrganization")
    .collection("alerts")
    .get()
    .then(querySnapshot => {
      
      querySnapshot.forEach(doc => {
        alerts.push(doc.data())
      })
      console.log(`Alerts found: `, alerts)
      db.collection("Organizations")
        .doc("UserOrganization")
        .collection("cubesats")
        .doc("Fox1_Cliff")
        .get()
        .then(ret => {
          let data = ret.data()
          for (let i = 0; alerts.length; i++) {
            console.log(alerts[i].telem + "_Vals")
            let k = data[alerts[i].telem + "_Vals"]
            console.log("K ", k)
            let warnLevel = alerts[i].val
            console.log("warning level ", warnLevel)
            let warn = false
            switch (alerts[i].op) {
              case "=":
                if (k[k.length - 1] === warnLevel)
                  warn = true
                break;
              case "!=":
                if (k[k.length - 1] !== warnLevel)
                  warn = true
                break;
              case ">":
                if (k[k.length - 1] > warnLevel)
                  warn = true
                break;
              case ">=":
                if (k[k.length - 1] >= warnLevel)
                  warn = true
                break;
              case "<":
                if (k[k.length - 1] < warnLevel)
                  warn = true
                break;
              case "<=":
                if (k[k.length - 1] <= warnLevel)
                  warn = true
                break;
            }
            if (warn) {
              // TODO 
              //pushNotification("ExponentPushToken[Ye21XeFmpryWWKEu23OqSP]", alerts[i].msg)
              console.log(`Successfully triggered on ${alerts[i].telem}`)
            }
          }
        })
        
      })

      const Parameter = () => {
        for(let i = 0; i <= alerts.length; i++) {
          return (
          <TouchableOpacity 
            style={styles.parameter}
            onPress={alert("todo")}
          >
            <Text style={styles.parameterText}>Parameter {alerts[i]}</Text>
            <Text style={styles.parameterSubText}>{alerts[i].telem}</Text>
          </TouchableOpacity>
          )
        }
      }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TouchableOpacity
        style={styles.parameter}
        >
          <Text style={styles.parameterText}>Parameter 1</Text>
          <Text style={styles.parameterSubText}> thermal conditions</Text>
        </TouchableOpacity>
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
          promptText={"New Parameter"}
        />
      }
    </SafeAreaView>
  );
}

