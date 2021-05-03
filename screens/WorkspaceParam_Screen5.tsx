import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import Screen from "../constants/Layout";
import Colors from "../constants/Colors";
import { sendEmail } from "../util/email-user"
import { storeTelemetryPreference } from "../hooks/Storage";
import {OverlayPrompt} from "../components/Prompt";
import * as firebase from "firebase";


export default function WorkspaceScreen({ route }) {
  const [isEnabled, switchSelected] = React.useState(false);
  const [preference, setPreference] = React.useState(Telemetry.Expanded);
  const [overlay, setOverlay] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [action, setAction] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("@Telemetry").then((ret: any) => {
        let pref = Telemetry.Expanded;
        if (ret === '"CompTelPage"') {
          pref = Telemetry.Compact;
          switchSelected(true);
        } else {
          pref = Telemetry.Expanded;
        }
        setPreference(pref);
      });
      
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.area, styles.exportBtn]}
        onPress={() => {
          setAction(0);
          setPrompt("Are you sure you want to export to the email attached to this account?")
          setOverlay(true)
        }}
      >
        <Text style={styles.title}>Export Data to CSV</Text>
      </TouchableOpacity>
      <View style={styles.area}>
        <Text style={[styles.title]}>Workspace Layout</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.title]}>
            {preference == Telemetry.Expanded ? "Expanded" : "Compact"} View
          </Text>
          <Switch
            trackColor={{
              false: Colors.newColors.secondary,
              true: Colors.newColors.secondary,
            }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor={Colors.newColors.card}
            onValueChange={toggleLayout}
            value={isEnabled}
            style={styles.workspaceSwitch}
          />
        </View>
        <TouchableOpacity
          style={[styles.area, styles.exportBtn, { backgroundColor: Colors.newColors.notification }]}
          onPress={() => {
            setAction(1)
            setPrompt("Are you sure you want to reset settings to default?")
            setOverlay(true)
          }}
        >
          <Text style={styles.title}>Reset Settings</Text>
        </TouchableOpacity>

      </View>
      {overlay ? (
        <OverlayPrompt
          promptText={prompt}
          closeOverlay={() => setOverlay(false)}
          btns={[
            {
              key: "Yes",
              action: () => {
                switch(action) {
                  case 0:
                    exportTelemetry();
                    break;
                  case 1:
                    resetSettings();
                    break;
                  default:
                    break;
                }
              },
            },
            {
              key: "No",
              action: () => {
                setOverlay(false);
              },
            },
          ]}
        />
      ) : null}
    </View>
  );

  function exportTelemetry() {
    sendEmail();
    //TODO: I guess this is where we call the cloud function and then inform the user when it is complete.
  }

  function resetSettings() {
    AsyncStorage.removeItem("@Order")
    AsyncStorage.removeItem("@Groups")
  }

  function toggleLayout() {
    let temp;
    if (preference == Telemetry.Expanded) {
      temp = Telemetry.Compact;
      storeTelemetryPreference("CompTelPage");
    } else {
      temp = Telemetry.Expanded;
      storeTelemetryPreference("ExpTelPage");
    }
    setPreference(temp);
    switchSelected(!isEnabled);
  }
}

enum Telemetry {
  Expanded,
  Compact,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: "#000",
    textShadowRadius: 2,
  },
  area: {
    backgroundColor: Colors.newColors.background2,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.newColors.background2,
    width: Screen.window.width - 40,
  },
  exportBtn: {
    width: Screen.window.width / 2,
    height: Screen.window.height / 10,
    borderWidth: 1,
    borderColor: Colors.newColors.border,
  },
  workspaceSwitch: {
    width: 50,
    height: 30,
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
