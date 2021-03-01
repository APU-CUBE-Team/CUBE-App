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
  FlatList,
  ScrollView
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";

import Colors from "../constants/Colors";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import { RowItem } from "../components/UserRowItem";
import {
  listAllTeamMembers,
  getAdminsOfTeam,
  getUsersOfTeam,
  getAdmins
} from "../util/edit-roles";

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
    backgroundColor: Colors.newColors.background,
    width: screen.width - 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
  text: {
    color: Colors.newColors.text,
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
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

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//
//  TODO PSUEDO
//    Step one: access array of user info
//    Step two: function that separates into an Admin and User Array based on role number 1 or 2
//    Step three: render screen with loop that creates row components with respect to n items
//      ---- MAKE SCREEN SCROLLABLE ----
//    Step four: make on touch navigatability to EditUser_Screen
//    Step five: populate EditUser_Screen with passed in parameters of selected user
//    Step six: save changes and push back to DB
//
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// How to List things. I recommend, since we're splitting between users and admins, doing 2 FlatLists
// https://reactnative.dev/docs/using-a-listview

export default function TeamRolesScreen({ navigation }) {
  //same as set state
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );


  const testUser = {
    f: "justin",
    l: "watson",
    e: "jwatson17@apu.edu",
  };

  //let arr: any[] = getAdminsOfTeam();
  const admins = getAdminsOfTeam();
  // const users = getUsersOfTeam();
  // console.log('this is correct')
  console.log(admins);
  //console.log("ADMINS\n", admins);
  //console.log("USERS\n", { users })

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />

          <View style={styles.inputSafeArea}>
            <Text style={styles.text}>ADMIN</Text>

            <RowItem
              first="Admins"
              last="Button"
              email="returns all admins in log"
              onPress={() => {
                getAdminsOfTeam();
              }}
            />

            <Text style={styles.text}>USERS</Text>

            <RowItem
              first="Users"
              last="Button"
              email="returns all users in log"
              onPress={() => {
                getUsersOfTeam();
              }}
            />

            <RowItem
              first="Justin"
              last="Watson"
              email="jwatson17@apu.edu"
              onPress={() => navigation.navigate("EditUserPage", { testUser })}
            // onPress={() =>
            //   navigation.navigate('Quiz', {
            //     title: 'Computers',
            //     questions: computerQuestions,
            //     color: '#49475B',
            //   })
            //   alert("TODO")
            // }
            />

            <RowItem
              first="Josh"
              last="Roland"
              email="jroland16@apu.edu"
              onPress={() => alert("TODO")}
            />
          </View>
        </SafeAreaView>
      </ScrollView>

    </KeyboardAvoidingView>
  );
}
