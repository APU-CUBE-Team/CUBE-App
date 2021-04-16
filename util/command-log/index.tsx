import { db } from "../firebase-util";
import { organizations } from "../query-DB";

export async function setCommandLog(data: any) {
  //TODO: parse data into clean info for db. this might work?
  let commandInfo = JSON.parse(data);

  return await organizations
    .doc("AdminOrganization")
    .collection("cubesats")
    .doc("cubesat_001")
    .collection("commands")
    .add(commandInfo);
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
