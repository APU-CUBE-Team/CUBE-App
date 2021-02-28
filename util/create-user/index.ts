import {db, auth} from '../firebase-util';
import { teamMembersDBDoc} from '../firebase-util';
// https://stackoverflow.com/questions/58547671/firebase-user-profile-add-custom-fields
// https://firebase.google.com/docs/auth/web/manage-users

export function SignUp(fName: string, lName: string, email: any, password: any, role: any) {
      
  console.log('right here')
      
  return auth.createUserWithEmailAndPassword(email, password)
      .then( registeredUser =>  {
        teamMembersDBDoc.add({
              "uid": registeredUser.user?.uid,
              "role": role,
              "orgID": 'TestOrganization',
              "email": registeredUser.user?.email,
              "lastName": lName,
              "firstName": fName,
      })
    });
  };