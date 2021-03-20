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
    fontSize: 15,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 7,
  },
  input: {
    backgroundColor: Colors.newColors.background2,
    fontSize: 20,
    padding: 10,
    margin: 5,
    width: screen.width - 30,
    borderRadius: 10,
    color: Colors.c.white,
  },
  signInButton: {
    backgroundColor: Colors.newColors.primary,
    width: screen.width - 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
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
}: {
  create: boolean;
  user: object;
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
    console.log("Passed");
    console.log(password === confirmPassword);
    if (password.length < 6) {
      alert("password must be more than 6 chars");
    }

    if (password === confirmPassword) {
      console.log("Success");
      SignUp(firstName, lastName, email, password, role);
      alert("New User Created");
    } else {
      alert("Please double check that your passwords match");
    }
  }

  function checkVersion() {
    // is this create user or edit user screen?
    if (create) {
      checkPW(); // check pw and create user
    } else {
      // navigate to edit user page and update user stuff
      updateUser();
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
            <Text style={styles.text2}>First Name</Text>
            <TextInput
              placeholder="John"
              placeholderTextColor={Colors.c.gray2}
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              style={styles.input}
              autoCapitalize="none"
            />

            <Text style={styles.text2}>Last Name</Text>
            <TextInput
              placeholder="Doe"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={Colors.c.gray2}
            />

            <Text style={styles.text2}>Email Address</Text>
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={Colors.c.gray2}
            />
            {create && (
              <View style={styles.inputSafeArea2}>
                <Text style={styles.text2}>Password</Text>
                <TextInput
                  placeholder="******"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor={Colors.c.gray2}
                />

                <Text style={styles.text2}>Confirm Password</Text>
                <TextInput
                  placeholder="******"
                  value={confirmPassword}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                  secureTextEntry={true}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor={Colors.c.gray2}
                />
              </View>
            )}
            <Text style={styles.text2}>Permissions</Text>

            {/* TODO: WE'RE GONNA NEED TO CONNECT THIS TO BACK END */}
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

            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => checkVersion()}
            >
              {create ? (
                <Text style={styles.text}>Add User</Text>
              ) : (
                <Text style={styles.text}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
