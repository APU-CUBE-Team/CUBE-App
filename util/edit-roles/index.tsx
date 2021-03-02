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

/////////////////////////////////////////////////////////////////
// BACKEND FUNCTION: retrieves a promise of all admins from
//  a specific organization
/////////////////////////////////////////////////////////////////
export async function getAdminsOfTeam() {
  let adminsArray: any[] = [];
  await teamMembersDBColl
    .where("role", "==", "1")
    .get()
    .then((querySnapshot) => {
      const a = querySnapshot.docs;
      a.forEach((doc) => {
        adminsArray.push(doc.data());
      });
    });
  return adminsArray;
}

/////////////////////////////////////////////////////////////////
// BACKEND FUNCTION: retrieves a promise of all users from
//  a specific organization
/////////////////////////////////////////////////////////////////
export async function getUsersOfTeam() {
  let usersArray: any[] = [];
  await teamMembersDBColl
    .where("role", "==", "2")
    .get()
    .then((querySnapshot) => {
      const u = querySnapshot.docs;
      u.forEach((doc) => {
        usersArray.push(doc.data());
      });
      console.log(usersArray)
    });
  return usersArray;
}

/////////////////////////////////////////////////////////////////
// TODO
/////////////////////////////////////////////////////////////////
export function updateUser(data: any) {
  console.log("TODO");
}

// telemetryDBDoc.then(ret => {
//   const data = ret.data();
//   data.names.forEach((item: {item: string}) => {
//       dataPoints.push({
//           key: item,
//           vals: data[item+"_Vals"],
//           dates: data[item+"_Times"]
//       })
//   });
//   setDataPoints(dataPoints);
//   console.log("DataPoints: ", dataPoints)

//   setFetched(true);
// })