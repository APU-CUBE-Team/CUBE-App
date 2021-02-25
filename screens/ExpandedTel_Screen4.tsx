import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Graph from "../components/dataGraph"; // Sadly do not make this tsx unless you want a ton of work
import { resetOrientation } from "../hooks/resetOrientation";
import { useFocusEffect } from "@react-navigation/native";

import Screen from "../constants/Layout";
import Colors from "../constants/Colors";

export default function ExpandedTelScreen() {
  // Hook that functions like componentDidMount. Ever screen will need this to ensure correct rotation
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  const [render, setRender] = React.useState(0); // Not entirely sure if this is necessary at this point, but I'm too scared to remove
  const [current, setCurrent] = React.useState("data1"); // Stores what graph to display on the top of screen
  // These are our datasets. Wish this was a react component but our package-lock prevents this
  const [data1, setData1] = React.useState({
    key: "Test Telemetry 1",
    vals: [1.4, 1.8, 1.7, 1.4, 1.5, 1.5, 1.4, 1.3],
    dates: [
      1613001378 - 2100,
      1613001378 - 1800,
      1613001378 - 1500,
      1613001378 - 1200,
      1613001378 - 900,
      1613001378 - 600,
      1613001378 - 300,
      1613001378,
    ],
  });
  const [data2, setData2] = React.useState({
    key: "Test Telemetry 2",
    vals: [23, 12, 12.3, 12.5, 14, 16, 14, 20],
    dates: [
      1613001378 - 2100,
      1613001378 - 1800,
      1613001378 - 1500,
      1613001378 - 1200,
      1613001378 - 900,
      1613001378 - 600,
      1613001378 - 300,
      1613001378,
    ],
  });
  const [data3, setData3] = React.useState({
    key: "Test Telemetry 3",
    vals: [0.2, 0.11, 0.3, 0.4, 0.3, -0.1, -0.4, -0.8],
    dates: [
      1613001378 - 2100,
      1613001378 - 1800,
      1613001378 - 1500,
      1613001378 - 1200,
      1613001378 - 900,
      1613001378 - 600,
      1613001378 - 300,
      1613001378,
    ],
  });
  let timeBase = 1613001378; // Starting time interval for our dummy data generation

  // Use effect hook to set an interval for generating dummy data. Might be useful for checking for real data in the future?
  React.useEffect(() => {
    const interval = setInterval(() => {
      genEntry();
    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, [current, render]);
  // This was necessary at one point to force a rerender. Again, scared to remove it
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRender(render + 1);
    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, [render]);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 10,
          bottom: 10,
          height: Screen.window.height / 3,
          width: Screen.window.width - 10,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.newColors.background2,
          borderRadius: 10,
        }}
      >
        {current === "data1" && (
          <Graph data={data1} width={Screen.window.width - 40} height={250} />
        )}
        {current === "data2" && (
          <Graph data={data2} width={Screen.window.width - 40} height={250} />
        )}
        {current === "data3" && (
          <Graph data={data3} width={Screen.window.width - 40} height={250} />
        )}
      </View>
      <View style={{ height: Screen.window.height / 3 }} />
      <ScrollView style={{ flex: 1, top: 15 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrent("data1");
          }}
        >
          <Text style={styles.text}>Test Data 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrent("data2");
          }}
        >
          <Text style={styles.text}>Test Data 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrent("data3");
          }}
        >
          <Text style={styles.text}>Test Data 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Ugly function but hopefully this will just be the case for dummy data and our real grab will look cleaner
  function genEntry() {
    timeBase += 300;
    let tempVal1 = data1.vals;
    tempVal1.push(Math.random() * (2 - 1) + 1);
    let tempDate1 = data1.dates;
    tempDate1.push(timeBase);
    setData1({ ...data1, vals: tempVal1, dates: tempDate1 });
    let tempVal2 = data2.vals;
    tempVal2.push(Math.random() * (30 - 10) + 10);
    let tempDate2 = data2.dates;
    tempDate2.push(timeBase);
    setData2({ ...data2, vals: tempVal2, dates: tempDate2 });
    let tempVal3 = data3.vals;
    tempVal3.push(Math.random() * (1 - -1) + -1);
    let tempDate3 = data3.dates;
    tempDate3.push(timeBase);
    setData3({ ...data3, vals: tempVal3, dates: tempDate3 });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
    width: Screen.window.width / 1.2,
    backgroundColor: "#808080",
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    color: Colors.newColors.text,
  },
});
