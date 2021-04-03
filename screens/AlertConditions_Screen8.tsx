import * as React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { AlertPrompt } from '../components/AlertPrompt';
import Button from '../components/Button';
import Colors from "../constants/Colors";

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

