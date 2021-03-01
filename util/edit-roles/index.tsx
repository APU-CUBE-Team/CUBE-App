import { teamMembersDBColl } from "../firebase-util";

// TODO: return from db

export function listAllTeamMembers() {
  let teamMembersArray: any[] = [];
  teamMembersDBColl.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log("Team Members:\n", doc.id, "=>", doc.data());
      teamMembersArray.push(doc.data());
    });
  });
  return teamMembersArray;
}

export function getUsersOfTeam() {
  let usersArray: any[] = [];
  teamMembersDBColl
    .where("role", "==", "2")
    .get()
    .then((querySnapshot) => {
      // console.log("Users:\n");
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, "=>", doc.data());
        usersArray.push(doc.data());
      });
    });
}

export function getAdminsOfTeam() {
  let adminsArray: any[] = [];
  teamMembersDBColl
    .where("role", "==", "1")
    .get()
    .then((querySnapshot) => {
      // console.log("Admins:\n");
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, "=>", doc.data());
        adminsArray.push(doc.data());
      });
      return adminsArray;
    });
}

export function updateUser(data: any) {
  console.log("TODO");
}
