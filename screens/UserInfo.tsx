/////////////////////////////////////////////////////////////////////////////////////////
//
//  THIS FILE ACTS AS A TEMPLATE FOR TEAMROLES_SCREEN10 and EDITUSER_SCREEN
//
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import { Picker } from "@react-native-picker/picker";

import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
import { MyTheme } from "../navigation/index";

import { SignUp } from "../util/create-user/index";
import { updateUser } from "../util/edit-roles";

import { OverlayPrompt } from "../components/Prompt";

import FloatingLabelInput from "../components/floatingLabelInput";
import AppButton from "../components/Button";

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
    alignItems: "center",
  },
  inputSafeArea2: {
    flex: 1,
    backgroundColor: Colors.newColors.background,
  },
  buttonSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "GillSans-Reg",

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
    fontFamily: "GillSans-Reg",

  },
  text2: {
    color: Colors.newColors.text,
    fontSize: 18,
    fontStyle: "italic",
    justifyContent: "center",
    marginTop: 20,
    fontFamily: "GillSans-Reg",

  },
  input: {
    backgroundColor: Colors.newColors.background2,
    fontSize: 20,
    padding: 10,
    margin: 5,
    width: screen.width - 30,
    borderRadius: 10,
    color: Colors.c.white,
    fontFamily: "GillSans-Reg",

  },
  signInButton: {
    backgroundColor: Colors.newColors.primary,
    width: screen.width - 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 25,
    margin: 5,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5, //IOS
    elevation: 2, // Android
  },
  picker: {
    width: screen.width - 30,
    backgroundColor: Colors.newColors.background2,
    borderBottomColor: "transparent",
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
  },
  pickerItem: {
    color: Colors.c.white,
    fontSize: 20,
    height: 150,

  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.newColors.background,
  },
});

export default function UserScreen({
  create,
  user,
  goBack,
}: {
  create: boolean;
  user: object;
  goBack?: Function;
}) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState("1");
  const [prompt, setPrompt] = React.useState(""); // for prompt component
  const [overlay, setOverlay] = React.useState(false); // for prompt component

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setRole(user.role);
      }
    }, [])
  );

  function checkPW() {
    if (password.length < 6) {
      setPrompt("Password must be more than 6 chars.");
      setOverlay(true);
    } else if (password === confirmPassword) {
      SignUp(firstName, lastName, email, password, role);
      setPrompt("New User Created");
      setOverlay(true);
    } else {
      setPrompt("Please double check that your passwords match");
      setOverlay(true);
    }
  }

  function checkVersion() {
    // is this create user or edit user screen?
    if (create) {
      checkPW(); // check pw and create user
    } else {
      // navigate to edit user page and update user stuff
      updateUser(email, role, lastName, firstName);
      goBack(); // don't mind this error if linter picks it up
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView>
          <View style={styles.inputSafeArea}>
            <FloatingLabelInput
              label="First Name"
              value={firstName}
              onChange={setFirstName}
              customStyle={false}
              editVal={!create}
            ></FloatingLabelInput>

            <FloatingLabelInput
              label="Last Name"
              value={lastName}
              onChange={setLastName}
              customStyle={false}
              editVal={!create}
            ></FloatingLabelInput>

            <FloatingLabelInput
              label="Email Address"
              value={email}
              onChange={setEmail}
              customStyle={false}
              editVal={!create}
            ></FloatingLabelInput>
            {create && (
              <View style={styles.inputSafeArea2}>
                <FloatingLabelInput
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  customStyle={true}
                ></FloatingLabelInput>
                <FloatingLabelInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  customStyle={true}
                ></FloatingLabelInput>
              </View>
            )}
            <Text style={styles.text2}>Permissions</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
              >
                <Picker.Item label="Admin" value="1" />
                <Picker.Item label="User" value="2" />
              </Picker>
            </View>
            {create ? (
              <AppButton
                label="Add User"
                onPressAction={() => {
                  checkVersion();
                }}
              ></AppButton>
            ) : (
              <AppButton
                label="Save Changes"
                onPressAction={() => {
                  checkVersion();
                }}
              ></AppButton>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {overlay ? (
        <OverlayPrompt
          promptText={prompt}
          closeOverlay={() => setOverlay(false)}
          btns={[
            {
              key: "Okay",
              action: () => {
                setOverlay(false);
              },
            },
          ]}
        />
      ) : null}
    </SafeAreaView>
  );
}
