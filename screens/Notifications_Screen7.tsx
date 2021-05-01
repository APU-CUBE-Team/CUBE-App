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
  Animated,
} from "react-native";
import { useNavigation, useFocusEffect, NavigationAction } from '@react-navigation/native';
import { resetOrientation } from "../hooks/resetOrientation";

import Colors from "../constants/Colors";
import { OverlayPrompt } from "../components/Prompt";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import NotificationRow from "../components/NotificationRow";
import Search from "../components/Search";
import Screen from "../constants/Layout";

import { getPushNotifications } from "../util/push-notifications";
import { Extrapolate } from "react-native-reanimated";

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const HEIGHT = 44;

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
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    width: "80%",
    backgroundColor: "white"
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
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "left",
    justifyContent: "flex-end",
    margin: 20,
    marginTop: 1,
    fontFamily: "GillSans-Reg",

  },
  date: {
    fontSize: 14,
    color: Colors.newColors.text,
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
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
  },
});

export default function NotificationScreen({ navigation }) {
  const [notificationList, setNotificationList] = React.useState([]);
  const [render, rerender] = React.useState(0);
  const [overlay, setOverlay] = React.useState(false);

  // component property variables
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [date, setDate] = React.useState("");

  // filter state variables
  const [filter, setFilter] = React.useState("");
  const [filteredList, setFilteredList] = React.useState([]);

  // animation state variables
  const [scrollAnim, setScrollAnim] = React.useState(new Animated.Value(0));
  const [offsetAnim, setOffsetAnim] = React.useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = React.useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }), offsetAnim),
      0,
      HEIGHT
    )
  );



  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
      getPushNotifications().then((response) => {
        setNotificationList(response);

        setFilteredList(response)
        // console.log("Loaded")
        rerender(render + 1);
      });
    }, [])
  );


  function updateFilter(value) {
    setFilter(value)
    if (value === '' || !value) {
      setFilteredList(notificationList);
    } else {
      setFilteredList(notificationList.filter(
        existingItem => (
          existingItem.title.toUpperCase().includes(value.toUpperCase()) ||
          existingItem.message.toUpperCase().includes(value.toUpperCase())
        )
      ))
    }
  }



  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <SafeAreaView style={styles.container}>

        <ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
            { useNativeDriver: false },
          )
          }
        >


          <StatusBar barStyle="light-content" />

          <View style={styles.view}>

            <Search
              onChangeText={(value) => updateFilter(value)}
              value={filter}
            />
            {filteredList.map((e) => {
              return (

                <NotificationRow
                  onPressAction={() => {
                    setOverlay(true)
                    setDate(
                      new Date(e.timeOfNotification.seconds * 1000).toLocaleDateString("en-US") +
                      "\n" +
                      new Date(e.timeOfNotification.seconds * 1000).toLocaleTimeString("en-US")
                    )
                    setMessage(e.message)
                    setTitle(e.title)
                  }}
                  title={e.title}
                  timeStamp={e.timeOfNotification.seconds}
                  bodyMessage={e.message}
                />

              );
            })}



          </View>


        </ScrollView>
      </SafeAreaView>

      {
        overlay ?
          <OverlayPrompt
            promptText={title}
            closeOverlay={() => setOverlay(false)}
            btns={[
              {
                key: "  Telemetry  ", action: () => {
                  setOverlay(false);
                  navigation.navigate("Telemetry")
                }
              },
              { key: "  Cancel  ", action: () => { setOverlay(false) } },
            ]}
          >
            <Text style={styles.date}>{date}</Text>
            <View style={styles.separator} />
            <Text style={styles.text3}>{message}</Text>
          </OverlayPrompt>
          :
          null
      }
    </KeyboardAvoidingView >
  );
}
