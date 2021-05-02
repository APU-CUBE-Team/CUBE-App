import { response } from 'express';
import UserScreen from '../screens/UserInfo';
import { getCurrentUser } from '../util/query-DB';

let user = null;

getCurrentUser().then((response) => {
    user = response;
    console.log(user)
})

export default {
    user
}