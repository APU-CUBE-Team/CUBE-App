import { db, auth } from "../firebase-util";

export const organizations = db.collection("Organizations");

export const teamMembersDBColl = db
  .collection("Organizations")
  .doc("AdminOrganization")
  .collection("teamMembers");

export async function getTelemetryDBDoc() {
  return db
    .collection("Organizations")
    .doc("UserOrganization")
    .collection("cubesats")
    .doc("Fox1_Cliff")
    .get();
}

export const getTelDBDoc = db
  .collection("Organizations")
  .doc("UserOrganization")
  .collection("cubesats")
  .doc("Fox1_Cliff")
  .get();

// get current user from DB.
export async function getCurrentUser() {
  let localCurrentUser;
  await organizations
    .doc("AdminOrganization")
    .collection("teamMembers")
    .where("uid", "==", auth.currentUser?.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log("Current user: ", doc.data());
        localCurrentUser.push(doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  return localCurrentUser;
}
