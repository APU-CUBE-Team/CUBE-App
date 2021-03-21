import * as React from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";

import FloatingLabelInput from "../components/floatingLabelInput";

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from "../components/Themed";

import { TextField } from "../components/Form";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

//const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  inputSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background2,
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
  text: {
    color: Colors.newColors.text,
    fontSize: 20,
    textAlign: "center",
  },
  text2: {
    color: Colors.newColors.text,
    fontSize: 12,
    textAlign: "center",
    padding: 5,
  },
  input: {
    backgroundColor: Colors.newColors.background2,
    fontSize: 20,
    padding: 10,
    margin: 5,
    width: Screen.window.width - 30,
    borderRadius: 10,
    color: Colors.newColors.grayText,
  },
  reportButton: {
    backgroundColor: Colors.newColors.primary,
    width: Screen.window.width - 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 25,
  },
});

export default function BugReportScreen() {
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  const [report, setReport] = React.useState("");
  const [test, setTest] = React.useState("");


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <FloatingLabelInput
          label="Tell us what happened..."
          value={report}
        ></FloatingLabelInput>
        {/* <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor={Colors.c.lightGray}
          label="Description"
          placeholder="Tell us what happened..."
          value={report}
          onChangeText={(report) => setReport(report)}
          multiline={true}
        /> */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => console.log({})}
        >
          <Text style={styles.text}>Submit report</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </KeyboardAvoidingView>
  );
}
