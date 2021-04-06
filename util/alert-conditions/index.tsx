import { organizations } from "../query-DB";

export async function getAlertsCollection() {
  let alertsArray: any[] = [];

  await organizations
    .doc("AdminOrganization")
    .collection("alerts")
    .get()
    .then(function (querySnapshot) {
      const o = querySnapshot.docs;

      o.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        alertsArray.push(doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return alertsArray;
}
