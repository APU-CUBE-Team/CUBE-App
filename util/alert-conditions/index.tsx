import { organizations } from "../query-DB";

export async function getAlertsCollection() {
  return await organizations
    .doc("AdminOrganization")
    .collection("alerts")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}
