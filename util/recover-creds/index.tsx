import { auth } from "../firebase-util";

export async function sendPasswordResetEmail(email: string) {
  let returnmessage: string;
  /**
  auth
    .sendPasswordResetEmail(email)
    .then(auth.onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in
        console.log("current user: ", user);
      } else {
        // no user is signed in.
      })
    .catch(function (error) {
      returnmessage = error;
    });
 */
}
