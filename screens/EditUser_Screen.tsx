import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import UserInfo from './UserInfo';

export default function EditUserScreen({ navigation, route }) {
    useFocusEffect(
        React.useCallback(() => {
            resetOrientation();
        }, [])
    );
    console.log(route.params?.testUser)

    return (
        <UserInfo
            create={false}
            user={route.params?.testUser}
        />
    );
}
