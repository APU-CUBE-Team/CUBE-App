import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { resetOrientation } from "../hooks/resetOrientation";
import Screen from "../constants/Layout";
import { useFocusEffect } from "@react-navigation/native";
import CompTelScreen from "./CompTel_Screen3";
import ExpTelScreen from "./ExpandedTel_Screen4";
import { getTelemetryDBDoc, getTelDBDoc } from "../util/query-DB";
import { storeTelOrder } from '../hooks/Storage';


// const currTelemetry = getTelemetryDBDoc();
type telemetry = {
  key: string;
  vals: number[];
  dates: number[]
}

export default function ExpandedTelScreen({ navigation, route }) {
  const [path, setPath] = React.useState("ExpandedTelPage");
  const [dataPoints, setDataPoints] = React.useState<telemetry[]>([]); //{key: "Test", vals: [1,2,3,4,5,6,7,8,9,10], dates: [1,2,3,4,5,6,7,8,9,10]}

  const [render, setRender] = React.useState(0); // Not entirely sure if this is necessary at this point, but I'm too scared to remove
  const [current, setCurrent] = React.useState("data1"); // Stores what graph to display on the top of screen
  const [order, setOrder] = React.useState<string[]>([]); // Stores what graph to display on the top of screen

  const currTelemetry = getTelemetryDBDoc();

  // Hook that functions like componentDidMount. Every screen will need this to ensure correct rotation
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
      AsyncStorage.getItem("@Telemetry").then((ret: any) => {
        setPath(ret);
      });

      if (dataPoints.length == 0) {
        getTelemetryDBDoc().then((ret) => {
          const data = ret.data();
          let d: any[] = []
          AsyncStorage.getItem("@Order").then((ret: any) => {
            let temp = JSON.parse(ret)
            
            // console.log(temp)
            if (temp === null || temp.length === 0) {
              data.names.forEach((item: { item: string }) => {
                d.push({
                  key: item,
                  vals: data[item + "_Vals"],
                  dates: data[item + "_Times"],
                });
              });
              setOrder(data.names)
            }
            else {
              temp.forEach(element => {
                d.push({
                  key: element,
                  vals: data[element + "_Vals"],
                  dates: data[element + "_Times"],
                })
              });
              setOrder(temp);
            }
          });
          setDataPoints(d);
          setCurrent(d[d.length - 1].key);
        });
      }
    }, [])
  );

  const updateTelem = () => {
    getTelemetryDBDoc().then((ret) => {
      const data = ret.data();
      let curr = dataPoints
      for (let i = 0; i < curr.length; i++) {
        //console.log(curr[i]);

        let key = curr[i].key;
        if (key === "AutoSafeModeAllowed")
          console.log(data[key + "_Vals"])
        console.log(key)
        curr[i].vals = data[key + "_Vals"];
        curr[i].dates = data[key + "_Times"];
      }
      //console.log(curr[14])
      setDataPoints(curr);
    });
  }

  return (
    dataPoints.length != 0 && (
      <View style={{ flex: 1 }}>
        {path === '"CompTelPage"' ? (
          <CompTelScreen 
            dataSet={dataPoints} 
            setData={setDataPoints}
            updateTelem={updateTelem}
            updateOrder={(from: number, to: number) => {
              let t = order.splice(from, 1)
              order.splice(to, 0, ...t)
              // console.log(order)
              setOrder(order)
              // console.log(order.length)

              storeTelOrder(order)
            }}
          />
        ) : (
          <ExpTelScreen
            dataSet={dataPoints}
            selected={current}
            updateTelem={updateTelem}
            setCurrent={(newData: string) => {
              console.log(dataPoints[14])
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
