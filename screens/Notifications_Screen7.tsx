import * as React from "react";

import {
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect, NavigationAction } from '@react-navigation/native';
import { resetOrientation } from "../hooks/resetOrientation";

import Colors from "../constants/Colors";
import OverlayPrompt from "../components/Prompt";


import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import NotificationRow from "../components/NotificationRow";
import Screen from "../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.newColors.background,
  },
  view: {
    flex: 1,
    backgroundColor: Colors.newColors.background,
    width: Screen.window.width - 20,

  },
  overlay: {
    marginTop: Screen.window.width / 2,
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

export default function NotificationScreen({ navigation }) {
  const [notificationList, setNotificationList] = React.useState([]);
  const [render, rerender] = React.useState(0);
  const [overlay, setOverlay] = React.useState(false);


  // useFocusEffect(
  //   React.useCallback(() => {
  //     resetOrientation();
  //     getAdminsOfTeam().then((response) => {
  //       setAdmins(response);
  //       rerender(render + 1);
  //     });
  //     getUsersOfTeam().then((response) => {
  //       setUsers(response);
  //       rerender(render + 1);
  //     });
  //   }, [])
  // );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView>
        <SafeAreaView style={styles.container}>


          <StatusBar barStyle="light-content" />

          <Text style={styles.text}>NOTIFICATIONS</Text>


          <View style={styles.view}>
            <NotificationRow
              onPressAction={() => {
                setOverlay(true)
              }
              }
              title={"Temperature Warning!"}
              timeStamp={"03/01/21 - 3:05 PM"}
              bodyMessage={"Temperature exceeded 1000°. Please Review"}
            />
            <View style={styles.overlay}>
              {overlay ?
                <OverlayPrompt
                  promptText={"Would you like to view this CUBE's Telemetry or Controls"}
                  closeOverlay={() => setOverlay(false)}
                  //disableTap
                  btns={[
                    {
                      key: "  Telemetry  ", action: () => {
                        setOverlay(false);
                        navigation.navigate("Telemetry")
                      }
                    },
                    { key: "  Cancel  ", action: () => { setOverlay(false) } },
                  ]}
                />
                :
                null
              }
            </View>

            {/* {notificationList.map((e) => {
            return (
              USE THIS ONCE CONNECTED TO BACKEND
              
              <NotificationRow
                onPressAction={() => {
                  navigation.navigate("ExpandedNotification", { e })
                }
                }
                title={e.title}
                timeStamp={e.timeStamp}
                bodyMessage={e.bodyMessage}
              />
             
            );
          })} */}

          </View>

        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
