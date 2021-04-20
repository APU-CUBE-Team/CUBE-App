import { organizations } from "../query-DB";
import firebase from "firebase";
import { auth } from "../firebase-util";

export async function setCommandLog(data: any) {
  //TODO: parse data into clean info for db. this might work?
  let currTime = firebase.firestore.Timestamp.fromDate(new Date());
  let commandData = {
    command: data,
    time: currTime,
    user: { email: auth.currentUser?.email, uid: auth.currentUser?.uid },
  };
  return await organizations
    .doc("AdminOrganization")
    .collection("cubesats")
    .doc("cubesat_001")
    .collection("commands")
    .add(commandData);
}

export async function getCommandLog() {
  let commandLogArray: any[] = [];

  await organizations
    .doc("AdminOrganization")
    .collection("cubesats")
    .doc("cubesat_001")
    .collection("commands")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data);
        commandLogArray.push(doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting docs: ", error);
    });

  return commandLogArray;
}
