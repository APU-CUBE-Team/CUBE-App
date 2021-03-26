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
  ScrollView,
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
  const [admins, setAdmins] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [render, rerender] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
      getAdminsOfTeam().then((response) => {
        setAdmins(response);
        rerender(render + 1);
      });
      getUsersOfTeam().then((response) => {
        setUsers(response);
        rerender(render + 1);
      });
    }, [])
  );

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

            {admins.map((e) => {
              return (
                <RowItem
                  first={e.firstName}
                  last={e.lastName}
                  email={e.email}
                  editValue={1}
                  onPress={() => {
                    navigation.navigate("EditUserPage", { e });
                    // add boolean here to send to floatingInputLabel
                  }}
                />
              );
            })}

            <Text style={styles.text}>USERS</Text>

            {users.map((e) => {
              return (
                <RowItem
                  first={e.firstName}
                  last={e.lastName}
                  email={e.email}
                  editValue={1}
                  onPress={() => {
                    navigation.navigate("EditUserPage", { e });
                    // add boolean here to send to floatingInputLabel
                  }}
                />
              );
            })}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
