import * as React from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,

  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';



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
    backgroundColor: "#fff",
  },
  icon: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  icon2: {
    width: 150,
    height: 150,
    position: "absolute",
  },
});

export default function BugReportScreen() {
  useFocusEffect(
    React.useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    }, [])
  );



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={styles.container}>

        <TouchableOpacity
          onPress={() => console.log("UP")}
        >
          <Image
            style={[styles.icon, {
              top: -150,
              left: -300,
            }]}
            source={require("../assets/images/controlButton/Up.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("LEFT")}
        >
          <Image
            style={[styles.icon, {
              top: -50,
              left: -400,
            }]}
            source={require("../assets/images/controlButton/Left.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("RIGHT")}
        >
          <Image
            style={[styles.icon, {
              top: -50,
              left: -200,
            }]}
            source={require("../assets/images/controlButton/Right.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("DOWN")}
        >
          <Image
            style={[styles.icon, {
              top: 50,
              left: -300,
            }]}
            source={require("../assets/images/controlButton/Down.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("A")}
        >
          <Image
            style={[styles.icon2, {
              top: -150,
              left: 50,
            }]}
            source={require("../assets/images/controlButton/A.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("B")}
        >
          <Image
            style={[styles.icon2, {
              top: 0,
              left: 200,
            }]}
            source={require("../assets/images/controlButton/B.png")}
          />
        </TouchableOpacity>
      </SafeAreaView>

    </KeyboardAvoidingView >
  );
}
