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
        // console.log(doc.id, " => ", doc.data());
        alertsArray.push(doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return alertsArray;
}

// Query documents with collection, delete subcollection
export async function deleteAlertDoc(docField: string) {
  // FIND the document via QUERY
  await organizations
    .doc("AdminOrganization")
    .collection("alerts")
    .where("msg", "==", docField)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let docID = doc.id;
        // DELETE QUERIED DOCUMENT
        organizations
          .doc("AdminOrganization")
          .collection("alerts")
          .doc(docID)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
