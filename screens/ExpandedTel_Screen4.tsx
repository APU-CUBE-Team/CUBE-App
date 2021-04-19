import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from '@expo/vector-icons';

import Graph from "../components/dataGraph"; // Sadly do not make this tsx unless you want a ton of work
import Colors from "../constants/Colors";
import Screen from "../constants/Layout";
import { Group, TelemGroup } from '../components/TelemGroup';

export default function ExpandedTelScreen({
  dataSet,
  selected,
  setCurrent,
  names
}: {
  dataSet: any;
  selected: string;
  setCurrent: Function;
  names: string[]
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [groups, setGroups] = React.useState<any>([]);
  const [hidden, setHidden] = React.useState({})

  const updateGroupList = () => {
    AsyncStorage.getItem("@Groups").then((ret: any) => {
      let n = JSON.parse(ret)
      console.log("n",n)
      console.log("groups", groups)
      if (n !== null) {
        setGroups([...n]);
        let temp = {}
        n.forEach(e => {
          Object.keys(e.telems).forEach(l => {
            temp[e.telems[l]] = ""
          })
        });
        setHidden(temp)
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      updateGroupList()
      // AsyncStorage.setItem("@Groups", JSON.stringify([{groupTitle: "Test Title", telems: ["RSSI"]}]))
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.GraphArea}>
        {dataSet.map((e: any) => {
          return (
            !loaded && (
              <View
                style={
                  selected === e.key
                    ? {
                        flex: 1,
                        width: Screen.window.width - 40,
                        height: 250,
                      }
                    : {
                        backgroundColor: "#00000000",
                        height: 0,
                        width: 0,
                        position: "absolute",
                        top: -500,
                      }
                }
              >
                <Graph data={e} width={Screen.window.width - 40} height={250} />
              </View>
            )
          );
        })}
      </View>
      <View style={{ height: Screen.window.height / 3 }} />
      <ScrollView
        style={{ flex: 1, marginTop: Platform.OS !== "android" ? 11 : 0 }}
      >
        {groups.map((e: any) => {
          return(
            <TelemGroup 
              group={e}
              setVal={setCurrent}
              telem={dataSet}
              updateGroups={updateGroupList}
              groups={groups}
            />
          )
        })}
        <TouchableOpacity 
          style={styles.groupAdd}
          onPress={() => {
            let temp = groups
            temp.push({groupTitle: "Edit Me!", telems: ["Edit Me!"]})
            setGroups([...temp])
          }}
        >
          <Text style={styles.text}>Add Grouping</Text>
          <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="add-circle-sharp" />
        </TouchableOpacity>
        {dataSet.map((e: any) => {
          return (
            <TouchableOpacity
              style={ e.key in hidden ? {height: 0} : styles.button}
              onPress={() => {
                setCurrent(e.key);
              }}
            >
              <Text style={e.key in hidden ? {fontSize: 0} : styles.text}>
                {`${e.key}`} (RT):{" "}
                {`${Math.round(e.vals[e.vals.length - 1] * 100) / 100}`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
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
    backgroundColor: Colors.newColors.secondary,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5, //IOS
    elevation: 2, // Android
  },
  text: {
    color: Colors.newColors.text,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  groupAdd: {
    width: Screen.window.width / 1.2,
    height: 50,
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  GraphArea: {
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
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 2, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5, //IOS
    elevation: 2, // Android
  },
  groupTitle: {
    fontSize: 25,
  },
  dataText: {
    marginLeft: 4,
    marginVertical: 4,
    color: "#4976a6",
    fontSize: 20,
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: "#fff",
    textShadowRadius: 10,
  },
});
