import firebase from "firebase";
import { auth, db } from "../firebase-util";

// might need to initialize as admin? unless this works. we'll find out.

// instantiate time stamp
let currTime = firebase.firestore.Timestamp.fromDate(new Date());


// get username from current logged in user

let user = auth.currentUser;
let userEmail = `${user?.email}`;
// if collection exists, add to that collection. else, return error
export function reportBug(message: string) {
  db.collection("TestOrganization") // TODO: designate collection to logged in organization
    .doc("team")
    .collection("bugReports")
    .add({
      [userEmail]: {
        bugReports: {
          message,
          currTime,
          userEmail
        },
          

      },
    });

  console.log(userEmail); // TODO: implement user data
}
