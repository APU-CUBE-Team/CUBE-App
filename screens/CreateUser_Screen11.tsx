import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { resetOrientation } from "../hooks/resetOrientation";
import UserInfo from './UserInfo';

export default function CreateUserScreen() {
  useFocusEffect(
    React.useCallback(() => {
      resetOrientation();
    }, [])
  );

  return (
    <UserInfo
      create={true}
      user={null}
    />
  );
}
