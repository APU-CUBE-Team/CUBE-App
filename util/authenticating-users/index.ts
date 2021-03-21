import { auth } from "../firebase-util";

// Listen for authentication state to change.
export function emailSignIn(username: any, password: any) {
  return auth.signInWithEmailAndPassword(username, password).then(
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in
        console.log("current user: ", user);
      } else {
        // no user is signed in.
      }
    })
  );
}

export function signOut() {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Sign-Out Success");
    })
    .catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorMessage);
    });
}
