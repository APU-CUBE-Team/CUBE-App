import { parameterType } from "../../components/AlertPrompt";
import { organizations } from "../query-DB";

export const alertsChanges = organizations
  .doc("AdminOrganization")
  .collection("alerts")
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.docChanges());
  });

export async function pushNewAlertParameter(newParam: parameterType) {
  // doc Example
  {
    /**
     * docID: {
     *   telem: str,
     *   msg: str, // sent to push notifications
     *   op: char, // operator symbol/comparator
     *   val: double // compared by the operator
     *  }
     */
  }
  await organizations
    .doc("AdminOrganization")
    .collection("alerts")
    .add(newParam);
}

export async function getPushNotifications() {
  let organizationsArray: any[] = [];
  await organizations
    .doc("AdminOrganization")
    .collection("pushNotifications")
    .get()
    .then((querySnapshot) => {
      const o = querySnapshot.docs;
      o.forEach((doc) => {
        organizationsArray.push(doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  return organizationsArray;
}