import {db, auth} from '../authenticating-users/firebaseAuth';
// https://stackoverflow.com/questions/58547671/firebase-user-profile-add-custom-fields
// https://firebase.google.com/docs/auth/web/manage-users


// NOTE: organization will be whatever the admin's organization is.
const usersDBDoc = db.collection('TestOrganization').doc("team").collection("teamMembers");

export function SignUp(email: any, password: any) {
      
  console.log('right here')
      
  return auth.createUserWithEmailAndPassword(email, password)
      .then( registeredUser =>  {
        usersDBDoc.doc(`${registeredUser.user?.email}`)
        .set(
          {
              uid: registeredUser.user?.uid,
              role: 'Team Member (Replace)',
              orgID: 'TestOrganization',
              email: registeredUser.user?.email,
              lastName: 'Grissom',
              firstName: 'Dan',
              
              

        })
        //DEBUG
        // console.log(usersDBDoc.doc(`${registeredUser.user?.email}`))
      })

      
  }