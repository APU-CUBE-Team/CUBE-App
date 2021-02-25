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
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";

import Colors from "../constants/Colors";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  inputSafeArea: {
    flex: 1,
    marginTop: 30,
    backgroundColor: Colors.newColors.background,
  },
  buttonSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
  },
  text2: {
    color: Colors.newColors.text,
    fontSize: 20,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 10,
  },
  text3: {
    color: Colors.newColors.text,
    fontSize: 20,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: Colors.newColors.primary,
    width: screen.width - 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    margin: 5,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5, //IOS
    elevation: 2, // Android
  },
});

export default function TeamRolesScreen() {
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.inputSafeArea}>
          <Text style={styles.text}>Admin</Text>
          <Text style={styles.text2}>Justin Watson</Text>

          <Text style={styles.text2}>Josh Roland</Text>

          <Text style={styles.text}>Assistant Leads</Text>

          <Text style={styles.text2}>Cole Gunter</Text>

          <Text style={styles.text2}>Mark Magnuson</Text>
          <Text style={styles.text}>Guest</Text>

          <Text style={styles.text2}>Nate Bowman</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => alert("Changes Saved")}
          >
            <Text style={styles.text3}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
