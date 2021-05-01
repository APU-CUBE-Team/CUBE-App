import { auth } from "../firebase-util";
import { teamMembersDBColl } from "../query-DB";
// https://stackoverflow.com/questions/58547671/firebase-user-profile-add-custom-fields
// https://firebase.google.com/docs/auth/web/manage-users

export function SignUp(
  fName: string,
  lName: string,
  email: any,
  password: any,
  role: any
) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((registeredUser) => {
      teamMembersDBColl.add({
        uid: registeredUser.user?.uid,
        role: role,
        orgID: "AdminOrganization",
        email: registeredUser.user?.email,
        lastName: lName,
        firstName: fName,
      });
    });
}
