import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { resetOrientation } from "../hooks/resetOrientation";
import Screen from "../constants/Layout";
import { useFocusEffect } from "@react-navigation/native";
import CompTelScreen from "./CompTel_Screen3";
import ExpTelScreen from "./ExpandedTel_Screen4";
import { getTelemetryDBDoc, getTelDBDoc } from "../util/query-DB";

// const currTelemetry = getTelemetryDBDoc();

export default function ExpandedTelScreen({ navigation, route }) {
  const [path, setPath] = React.useState("ExpandedTelPage");
  const [dataPoints, setDataPoints] = React.useState([]); //{key: "Test", vals: [1,2,3,4,5,6,7,8,9,10], dates: [1,2,3,4,5,6,7,8,9,10]}

  const [render, setRender] = React.useState(0); // Not entirely sure if this is necessary at this point, but I'm too scared to remove
  const [current, setCurrent] = React.useState("data1"); // Stores what graph to display on the top of screen

  //const currTelemetry = getTelemetryDBDoc();

  // Hook that functions like componentDidMount. Ever screen will need this to ensure correct rotation
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
      AsyncStorage.getItem("@Telemetry").then((ret: any) => {
        setPath(ret);
      });
      

      if (dataPoints.length == 0) {
        getTelDBDoc.then((ret) => {
          const data = ret.data();
          data.names.forEach((item: { item: string }) => {
            dataPoints.push({
              key: item,
              vals: data[item + "_Vals"],
              dates: data[item + "_Times"],
            });
          });
          setDataPoints(dataPoints);
          setCurrent(dataPoints[dataPoints.length - 1].key);
        });
      }
    }, [])
  );

  return (
    dataPoints.length != 0 && (
      <View style={{ flex: 1 }}>
        {path === '"CompTelPage"' ? (
          <CompTelScreen dataSet={dataPoints} />
        ) : (
          <ExpTelScreen
            dataSet={dataPoints}
            selected={current}
            setCurrent={(newData: string) => {
              setCurrent(newData);
            }}
          />
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101010",
  },
  Group: {
    // height: 40,
    width: Screen.window.width / 1.1,
    borderColor: "#808080",
    backgroundColor: "#bebec2",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  GraphArea: {
    position: "absolute",
    top: 2,
    height: Screen.window.height / 3,
    width: Screen.window.width - 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 10,
    borderColor: "#bebec2",
    borderWidth: 1,
  },
  groupTitle: {
    fontSize: 25,
  },
  dataText: {
    marginLeft: 4,
    marginVertical: 4,
    color: "#4976a6",
    fontSize: 20,
  },
});
