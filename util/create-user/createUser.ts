import {db, auth} from '../authenticating-users/firebaseAuth';
// https://stackoverflow.com/questions/58547671/firebase-user-profile-add-custom-fields
// https://firebase.google.com/docs/auth/web/manage-users


// NOTE: organization will be whatever the admin's organization is.
export const teamMembersDBDoc = db.collection('Organizations').doc("AdminOrganization").collection("teamMembers");

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