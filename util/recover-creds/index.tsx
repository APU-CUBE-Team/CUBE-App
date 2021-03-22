import { auth } from "../firebase-util";

export async function sendPasswordResetEmail(email: string) {
  let retMessage: String;

  return auth.sendPasswordResetEmail(email).then(function () {});
}
