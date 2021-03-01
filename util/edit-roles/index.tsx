import { teamMembersDBColl } from "../firebase-util";

export function listAllTeamMembers() {
  teamMembersDBColl.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("Team Members:\n", doc.id, "=>", doc.data());
      return doc.data();
    });
  });
}

export function getUsersOfTeam() {
  teamMembersDBColl
    .where("role", "==", "2")
    .get()
    .then((querySnapshot) => {
      console.log("Users:\n");
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, "=>", doc.data());
      });
    });
}

export function getAdminsOfTeam() {
  teamMembersDBColl
    .where("role", "==", "1")
    .get()
    .then((querySnapshot) => {
      console.log("Admins:\n");
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, "=>", doc.data());
      });
    });
}

export function updateUser() {
  console.log("TODO");
}
