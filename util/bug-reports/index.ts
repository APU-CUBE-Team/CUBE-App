import firebase from "firebase";
import { auth, db } from "../firebase-util";

// might need to initialize as admin? unless this works. we'll find out.

// instantiate time stamp
let currTime = firebase.firestore.Timestamp.fromDate(new Date());

// if collection exists, add to that collection. else, return error
export async function reportBug(message: string) {
  let userEmail = `${auth.currentUser?.email}`; // get email from currently logged-in user
  await db.collection("BugReports").add({
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
