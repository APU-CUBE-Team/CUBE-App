import firebase from "firebase";
import { auth, db } from "../firebase-util";

// instantiate time stamp
let currTime = firebase.firestore.Timestamp.fromDate(new Date());

// if collection exists, add to that collection. else, return error
export async function reportBug(message: string) {
  let userID = `${auth.currentUser?.uid}`;
  let userEmail = `${auth.currentUser?.email}`;
  await db
    .collection("BugReports") // TODO: designate collection to logged in organization
    .add({
      [userEmail]: {
        bugReports: {
          message,
          currTime,
          userEmail,
          userID,
        },
      },
    });
}
