import firebase from "firebase";
import { auth, db } from "../firebase-util";

// might need to initialize as admin? unless this works. we'll find out.

// instantiate time stamp
let currTime = firebase.firestore.Timestamp.fromDate(new Date());

// get username from current logged in user

// if collection exists, add to that collection. else, return error
export async function reportBug(message: string) {
  let user = auth.currentUser;
  let userEmail = `${user?.email}`;
  await db
    .collection("BugReports") // TODO: designate collection to logged in organization
    .add({
      [userEmail]: {
        bugReports: {
          message,
          currTime,
          userEmail,
        },
      },
    });

  console.log(userEmail); // TODO: implement user data
}
