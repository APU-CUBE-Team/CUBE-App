import {auth} from '../firebase-util';
import * as firebase from 'firebase';

  // Listen for authentication state to change.
export function emailSignIn(username: any, password: any) { 
  return auth.signInWithEmailAndPassword(username, password)
}

export function signOut() {
  firebase.auth().signOut()
  .then(() => {
    
    // Sign-out successful.
    console.log('Sign-Out Success');
  }).catch((error) => {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorMessage);
  });
}

export async function findNewToken() {
  auth.onAuthStateChanged(user => {
    if (user != null) {
      console.log('Authenticated!');

      // getting id token
      user.getIdToken().then(idToken => {
        console.log(idToken);
        return idToken
      });
    }
  });
}