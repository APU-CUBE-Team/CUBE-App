import { db } from "../firebase-util";

export const organizations = db.collection("Organizations");

export const teamMembersDBColl = db
  .collection("Organizations")
  .doc("AdminOrganization")
  .collection("teamMembers");

export async function getTelemetryDBDoc() {
  let telem;
  await db
    .collection("Organizations")
    .doc("UserOrganization")
    .collection("cubesats")
    .doc("Fox1_Cliff")
    .get()
    .then(ret => {
      telem = ret
    })
  return telem
}

export const getTelDBDoc = db
  .collection("Organizations")
  .doc("UserOrganization")
  .collection("cubesats")
  .doc("Fox1_Cliff")
  .get();
