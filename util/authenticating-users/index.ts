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

export async function signOut() {
  // MARK! I added an await here. i don't know if it's necessary but did it in case.
  await auth
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

// So, after X time, signOut and navigate to signIn
// gotta navigate to sign-in

// currently watching this haha
// https://www.youtube.com/watch?v=bZMSoxcrIN8
async function authSessionTimeout() {
  // classic timeout function
  setTimeout(function () {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        signOut();
        // navigate to sign-in
      } else {
        // navigate to 'home page'
        // the telemetry screen
      }
    });
  }, 1000);
}
