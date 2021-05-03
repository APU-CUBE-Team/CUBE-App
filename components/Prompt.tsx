import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

type btns = {
  key: string;
  action: Function;
};

type PromptProps = {
  closeOverlay: Function;
  promptText: string;
  btns: btns[];
  disableTap?: boolean;
  yAxis?: boolean; // true for Y axis
  longContent?: boolean;
};

export const OverlayPrompt: React.FunctionComponent<PromptProps> = (props) => {
  let short = Screen.window.width - 40;
  let long = Screen.window.height / 4;
  const [childHeight, setHeight] = React.useState(-1);
  const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    trans: {
      backgroundColor: Colors.newColors.background,
      opacity: 0.5,
    },
    overlayPrompt: {
      width: props.yAxis ? long * 3 : short,
      height: long,
      backgroundColor: Colors.newColors.background2,
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: Colors.newColors.secondary,
      shadowColor: "rgba(0,0,0, .4)", // IOS
      shadowOffset: { height: 2, width: 0 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1.5, //IOS
      elevation: 10, // Android
    },
    promptText: {
      fontSize: 20,
      color: "#fff",
      textShadowOffset: { width: 0, height: 0 },
      textShadowColor: Colors.newColors.background2,
      textShadowRadius: 1,
      margin: 15,
      fontFamily: "GillSans-Reg",
    },
    promptBtn: {
      // width: Screen.window.width / 3.5,
      height: Screen.window.height / 12,
      backgroundColor: Colors.newColors.primary,
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
      marginHorizontal: 15,
      borderRadius: 25,
      borderWidth: 1,
      shadowColor: "rgba(0,0,0, .4)", // IOS
      shadowOffset: { height: 2, width: 0 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1.5, //IOS
      elevation: 10, // Android
      flex: 1,
    },
  });

  function measureView(event: any) {
    if (childHeight === -1) {
      console.log(`*** event: ${JSON.stringify(event.nativeEvent)}`);
      console.log(`Height  ${event.nativeEvent.layout.height}`)
      setHeight(event.nativeEvent.layout.height)
    }
  }


  return (
    <View style={[styles.overlay, { flex: 1 }]}>
      <View style={[styles.overlay, styles.trans]}>
        <TouchableOpacity
          style={[styles.overlay, { opacity: 1 }]}
          onPress={() => {
            if (!props.disableTap) props.closeOverlay();
          }}
        />
      </View>
      <View style={[styles.overlayPrompt, { height: props.longContent ? childHeight + long : long }]} onLayout={(event) => { measureView(event) }}>
        <Text style={styles.promptText}>{props.promptText}</Text>
        {props.children}
        <View style={{ flexDirection: "row" }}>
          {props.btns.map((e) => {
            return (
              <TouchableOpacity
                style={[styles.promptBtn, { marginHorizontal: 30 / props.btns.length }]}
                onPress={() => {
                  e.action();
                }}
              >
                <Text style={styles.promptText}>{e.key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
