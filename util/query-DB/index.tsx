import { db } from "../firebase-util";

export const organizations = db.collection("Organizations");

export const teamMembersDBColl = db
  .collection("Organizations")
  .doc("AdminOrganization")
  .collection("teamMembers");

export async function getTelemetryDBDoc() {
  return await db
    .collection("Organizations")
    .doc("UserOrganization")
    .collection("cubesats")
    .doc("Fox1_Cliff")
    .get();
}
