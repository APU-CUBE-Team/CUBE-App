import * as firebase from 'firebase'

  export function SignUp(email, password) {
      console.log('right here')
      return firebase.auth().createUserWithEmailAndPassword(email, password)
  }