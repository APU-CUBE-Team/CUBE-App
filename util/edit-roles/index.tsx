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

// export async function getAdminsOfTeam() {
//   let adminsArray: any[] = [];
//   let response = await teamMembersDBColl
//     .where("role", "==", "1")
//     .get()
//     .then((querySnapshot) => {
//       // console.log("Admins:\n");
//       const data1 = querySnapshot.docs;
//       // console.log(data1);
//       // data1.forEach(doc => {
//       //   console.log(doc.data());
//       // })
//       data1.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         //console.log(doc.id, "=>", doc.data());
//         adminsArray.push(doc.data());
//       });

//     });
//     return Promise.resolve(adminsArray);
// }

export async function getAdminsOfTeam() {
  let adminsArray: any[] = [];
  let response = await teamMembersDBColl
    .where("role", "==", "1")
    .get()
    .then((querySnapshot) => {
      const data1 = querySnapshot.docs;

      data1.forEach((doc) => {
        adminsArray.push(doc.data());
      });
    });
  return Promise.resolve(adminsArray);
}

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