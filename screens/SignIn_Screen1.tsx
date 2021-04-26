import { transform } from "@babel/core";
import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";

import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
//import Icon from '../assets/images/cubeTEMP.png';

import FloatingLabelInput from "../components/floatingLabelInput";
import AppButton from "../components/Button";
import iconSet from "@expo/vector-icons/build/Fontisto";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  iconSafeArea: {
    flex: 1.5,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  inputSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  title: {
    width: 1008 / 4,
    height: 314 / 4,
    tintColor: "#fff",
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
    color: Colors.newColors.notification,
    fontSize: 12,
    textAlign: "center",
    padding: 5,
  },
  text3: {
    color: Colors.newColors.text,
    paddingTop: 10,
    fontSize: 70,
    textAlign: "center",
  },
  input: {
    backgroundColor: Colors.newColors.background2,
    fontSize: 20,
    padding: 10,
    margin: 5,
    width: Screen.window.width - 30,
    borderRadius: 10,
    color: Colors.newColors.text,
  },
  icon: {
    width: 300,
    height: 300,
    marginLeft: 20,
    marginTop: 10,
    tintColor: "#fff",
  },
  signInButton: {
    backgroundColor: Colors.newColors.primary,
    width: Screen.window.width - 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 10,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5, //IOS
    elevation: 2, // Android
  },
});

export default function SignInScreen({ route, navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [iconWidth, setIconWidth] = React.useState(300);
  const [iconHeight, setIconHeight] = React.useState(300);

  const { signIn } = React.useContext(route.params.props);

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  const keyboardDidShow = () => {
    setIconWidth(200), setIconHeight(200);
  };
  const keyboardDidHide = () => {
    setIconHeight(300), setIconWidth(300);
  };

  Keyboard.addListener("keyboardDidShow", keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", keyboardDidHide);

  // checks for empty string, or if there is nothing in general. either signs in,
  // or you get bonked.
  // Justin (2/6): defined variable types for username and password for good housekeeping

  function signInAuth(username: any, password: any) {
    if (username != "" && password != "" && username && password) {
      signIn({ username, password });
    } else {
      alert("what are you doing.");
    }
  }

  function icon() {
    return {
      width: iconWidth,
      height: iconHeight,
      marginLeft: 15,
      tintColor: "#fff",
    };
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.iconSafeArea}>
          <Image
            style={styles.title}
            source={require("../assets/images/trans-title.png")}
          />
          <Image
            style={icon()}
            source={require("../assets/images/trans-icon.png")}
          />
        </View>

        <View style={styles.inputSafeArea}>
          {/* <TextInput
            placeholder="Email"
            value={username}
            onChangeText={(username) => setUsername(username)}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor={Colors.newColors.grayText}
          /> */}
          <FloatingLabelInput
            label="Email"
            value={username}
            onChange={setUsername}
            customStyle={false}
          ></FloatingLabelInput>
          {/* <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor={Colors.newColors.grayText}
          /> */}
          <FloatingLabelInput
            label="Password"
            value={password}
            onChange={setPassword}
            customStyle={true}
          ></FloatingLabelInput>
          {/* <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              signInAuth(username, password);
            }}
          >
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity> */}
          <AppButton
            label="Sign In"
            onPressAction={() => {
              signInAuth(username, password);
            }}
          ></AppButton>
          <TouchableOpacity
            onPress={() => navigation.navigate("CredRecovPage")}
          >
            <Text style={styles.text2}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
