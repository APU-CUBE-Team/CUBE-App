import { auth } from "../firebase-util";

export async function sendPasswordResetEmail(email: string) {
  let returnmessage: string;

  auth.sendPasswordResetEmail(email).catch(function (error) {
    console.log(error);
    // returnmessage = error;
  });
}
