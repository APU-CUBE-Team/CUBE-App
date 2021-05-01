import * as React from "react";

import {
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
import Search from "../components/Search";

import {
  listAllTeamMembers,
  getAdminsOfTeam,
  getUsersOfTeam,
} from "../util/edit-roles";
import { Value } from "react-native-reanimated";

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
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center"
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
    fontFamily: "GillSans-Reg",

  },
  text2: {
    color: Colors.newColors.text,
    fontSize: 20,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 10,
    fontFamily: "GillSans-Reg",

  },
  text3: {
    color: Colors.newColors.text,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "GillSans-Reg",

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
  const [isUpdating, setPause] = React.useState(false);
  const [animating, setAnimation] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [filteredAdmins, setFilteredAdmins] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
      getUsers();

      console.log("RAN")
    }, [])
  );

  function getUsers() {
    getAdminsOfTeam().then((response) => {

      setAdmins(response);
      rerender(render + 1);

      setFilteredAdmins(response)
    });
    getUsersOfTeam().then((response) => {
      setUsers(response);
      rerender(render + 1);

      setFilteredUsers(response)
    });

    updateFilter(filter);
    setPause(false);
  }

  function updateFilter(value) {
    setFilter(value)
    if (value === '' || !value) {
      setFilteredAdmins(admins);
      setFilteredUsers(users)
    } else {
      setFilteredAdmins(admins.filter(
        existingItem => (
          existingItem.firstName.toUpperCase().includes(value.toUpperCase()) ||
          existingItem.lastName.toUpperCase().includes(value.toUpperCase()) ||
          existingItem.email.toUpperCase().includes(value.toUpperCase())
        )
      ))
      setFilteredUsers(users.filter(
        existingItem => (
          existingItem.firstName.toUpperCase().includes(value.toUpperCase()) ||
          existingItem.lastName.toUpperCase().includes(value.toUpperCase()) ||
          existingItem.email.toUpperCase().includes(value.toUpperCase())
        )
      ))
    }
  }

  const onScroll = (event: any) => {
    console.log(event.nativeEvent.contentOffset.y);
    let offset = event.nativeEvent.contentOffset.y
    if (offset <= 0) {
      setPause(true);
      getUsers();
      scrollToTop()
    }
      
  }

  const scrollToTop = () => {
    this.scroller.scrollTo({x: 0, y: 50});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView
        onScroll={onScroll}
        ref={(scroller) => {this.scroller = scroller}}
      >
        <ActivityIndicator size="large" color={Colors.newColors.primary} animating={animating}/>
        <Search
          onChangeText={(value) => updateFilter(value)}
          value={filter}
        />
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />

          <View style={styles.inputSafeArea}>

            <Text style={styles.text}>ADMIN</Text>

            {filteredAdmins.map((e) => {

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
            <View style={styles.separator}></View>
            <Text style={styles.text}>USERS</Text>

            {filteredUsers.map((e) => {
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
