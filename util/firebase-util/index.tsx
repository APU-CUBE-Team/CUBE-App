import * as firebase from "firebase";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBMciA5V--El4jRZ42jPH5yFQwBhXiocPE",
  authDomain: "cube-301820.firebaseapp.com",
  projectId: "cube-301820",
  storageBucket: "cube-301820.appspot.com",
  messagingSenderId: "239117934874",
  appId: "1:239117934874:web:31e1dfa3c031b47ea4cca3",
};

// checks if firebase has been initialized already. mainly just for refreshing purposes.
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const db = firebase.firestore();
export const auth = firebase.auth();

export const organizations = db.collection("Organizations");
export const bugReportsDB = db.collection("BugReports");

export const teamMembersDBColl = db
  .collection("Organizations")
  .doc("AdminOrganization")
  .collection("teamMembers");
