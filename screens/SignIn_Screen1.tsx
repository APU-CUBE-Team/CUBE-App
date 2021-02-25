import { transform } from "@babel/core";
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

import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
//import Icon from '../assets/images/cubeTEMP.png';

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  iconSafeArea: {
    top: 10,
    flex: 2,
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
    paddingTop: 20,
    fontSize: 70,
    textAlign: "center",
  },
  input: {
    backgroundColor: Colors.newColors.background2,
    fontSize: 20,
    padding: 10,
    margin: 5,
    width: screen.width - 30,
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
    width: screen.width - 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5, //IOS
    elevation: 2, // Android
  },
});

export default function SignInScreen({ route, navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(route.params.props);

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

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
            style={styles.icon}
            source={require("../assets/images/trans-icon.png")}
          />
        </View>

        <View style={styles.inputSafeArea}>
          <TextInput
            placeholder="Email"
            value={username}
            onChangeText={(username) => setUsername(username)}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor={Colors.c.white}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor={Colors.c.white}
          />

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => signInAuth(username, password)}
          >
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>

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
