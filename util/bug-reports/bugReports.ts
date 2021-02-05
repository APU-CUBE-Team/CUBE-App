import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig, auth, db } from "../authenticating-users/firebaseAuth";

// checks if firebase has been initialized already. mainly just for refreshing purposes.
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

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
        bugReports: message,
      },
    });

  console.log(userEmail); // TODO: implement user data
}
