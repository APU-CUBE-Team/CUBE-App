import { organizations } from "../firebase-util";

export const alertsChanges = organizations
  .doc("AdminOrganization")
  .collection("alerts")
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.docChanges());
  });

export async function pushNewAlertParameter(newParam: any) {
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
  organizations
    .doc("AdminOrganization")
    .collection("alerts")
    .add(newParam)
    .then((stuff) => {
      console.log("stuff: ", stuff);
    })
    .catch((e) => {
      console.log("An error occured: ", e);
    });
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