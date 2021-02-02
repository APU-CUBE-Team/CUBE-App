import * as firebase from 'firebase'
import 'firebase/firestore';

/**
 * This whole thing is Firebase Initialization and Authentication.
 * All of this wll be moved to a separate file soon.
 */
export const firebaseConfig = {
    apiKey: "AIzaSyBMciA5V--El4jRZ42jPH5yFQwBhXiocPE",
    authDomain: "cube-301820.firebaseapp.com",
    projectId: "cube-301820",
    storageBucket: "cube-301820.appspot.com",
    messagingSenderId: "239117934874",
    appId: "1:239117934874:web:31e1dfa3c031b47ea4cca3"
  };
  
  // checks if firebase has been initialized already. mainly just for refreshing purposes.
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
  
  // Listen for authentication state to change.
export function emailSignIn(username, password) { 
  return firebase.auth().signInWithEmailAndPassword(username, password)
}

export function signOut() {firebase.auth().signOut()
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
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return user.getIdToken()
    }
  });
}
  
  /**
   * End of Firebase Init and Auth
   */