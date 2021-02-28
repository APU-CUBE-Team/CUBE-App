import {db, auth} from '../firebase-util';

  // Listen for authentication state to change.
export function emailSignIn(username: any, password: any) { 
  return auth.signInWithEmailAndPassword(username, password)
}

export function signOut() {auth.signOut()
  .then((res) => {
    
    console.log('Sign-Out Success');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorMessage);
  });
}

export async function findNewToken() {
  auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdToken().then(idToken => {
        console.log(idToken);
        return idToken
      });
    }
  });
}