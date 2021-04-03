import { db, auth } from "../firebase-util";

export const teamMembersDBColl = db
  .collection("Organizations")
  .doc("AdminOrganization")
  .collection("teamMembers");

export async function gettelemetryDBDoc() {
  return await db
    .collection("Organizations")
    .doc("UserOrganization")
    .collection("cubesats")
    .doc("Fox1_Cliff")
    .get();
}
