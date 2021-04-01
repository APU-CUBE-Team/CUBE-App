import { organizations } from "../firebase-util";
import { parameterType } from '../../components/AlertPrompt';

export const alertsChanges = organizations
  .doc("AdminOrganization")
  .collection("alerts")
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.docChanges());
  });

export async function pushNewAlertParameter(newParam: parameterType) {
  /**
   * docID: {
   *   telem: str,
   *   msg: str, // sent to push notifications
   *   op: string, // operator symbol/comparator
   *   val: double // compared by the operator
   *  }
   */

  organizations
    .doc("AdminOrganization")
    .collection("alerts")
    .add(newParam)
}
