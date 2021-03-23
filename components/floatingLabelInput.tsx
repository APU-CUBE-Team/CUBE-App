import { useFocusEffect } from "@react-navigation/core";
import React, { Component } from "react";
import { View, StatusBar, TextInput, Animated } from "react-native";
import { timing } from "react-native-reanimated";

import Colors from "../constants/Colors";
import Screen from "../constants/Layout";

const defaultStyles = {
  labelStyle: {
    position: "absolute",
    left: 15,
  },
  textInput: {
    height: 40,
    fontSize: 20,
    color: Colors.newColors.grayText,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    width: Screen.window.width - 30,
    // backgroundColor: Colors.newColors.background2,
    padding: 10,
    margin: 5,
  },
  inputView: {
    height: 40,
    backgroundColor: Colors.newColors.primary,
  },
  focusedTextInput: {
    borderBottomWidth: 2,
    borderBottomColor: "",
  },
  selectionColor: "#fff",
};

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//  FLOATING LABEL INPUT
//     Takes in a value, a label (the text that animates), a function passed to set the text
//      from the input, & a boolean to see if it's a sensative secureText type
//
//  State variables
//      isFocused: determines if the text input box is active or not
//      _animatedIsFocused: tracks the state of the animation interpolations
//          - 0 if label text is lowered (initial state)
//          - 1 if isFocused is true or value != ''
//      tempVal: set to passed in value and should return after being updated
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
export default function FloatingLabelInput({
  value,
  label,
  onChange,
  customStyle,
  editVal,
}: {
  value: any;
  label: any;
  onChange: any;
  customStyle: any;
  editVal?: boolean;
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [_animatedIsFocused, setAnimatedIsFocused] = React.useState(
    new Animated.Value(0)
  );
  const [tempVal, setTempVal] = React.useState(value);

  useFocusEffect(
    React.useCallback(() => {
      if (!editVal) {
        setAnimatedIsFocused(new Animated.Value(value === "" ? 0 : 1)); // SETS ACTIVE
        setTempVal(value);
      } else {
        setAnimatedIsFocused(new Animated.Value(1)); // SETS ACTIVE
        setTempVal(value);
      }
    }, [])
  );

  const handleFocus = () => {
    setIsFocused(true);
    // console.log("HANDLE FOCUS")
    // console.log({ isFocused, tempVal })
  };
  const handleBlur = () => {
    setIsFocused(false);
    // console.log("HANDLE BLUR")
    // console.log({ isFocused, tempVal })
  };

  //ISFOCUSSED SHOULD BE TRUE WHEN CLICKED
  React.useEffect(() => {
    // console.log("REACT.USEEFFECT")
    Animated.timing(_animatedIsFocused, {
      toValue: isFocused || tempVal !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const style = defaultStyles;
  const animatedLabelStyle = {
    top: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 0],
    }),
    fontSize: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 17],
    }),
    color: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#888", "#888"],
    }),
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={[style.labelStyle, animatedLabelStyle]}>
        {label}
      </Animated.Text>
      {customStyle ? (
        <TextInput
          style={[style.textInput, isFocused && style.focusedTextInput]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          selectionColor={style.selectionColor}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(tempVal) => {
            onChange(tempVal);
            setTempVal(tempVal);
          }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          style={[style.textInput, isFocused && style.focusedTextInput]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          selectionColor={style.selectionColor}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(tempVal) => {
            onChange(tempVal);
            setTempVal(tempVal);
          }}
        />
      )}
    </View>
  );
}
