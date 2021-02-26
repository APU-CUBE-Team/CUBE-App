import { Context } from "react";

export type RootStackParamList = {
  Root: { SignOut: any, pref: any };
  NotFound: undefined;
  SignIn: Element;
};

export type DrawerParamList = {
  Landing: { SignOut: any };
  "3D Orbit View": undefined;
  "Cartesian Map": { InitialPath: string };
  "Telemetry": { InitialPath: string };
  "Bug Report": undefined;
  "User Permissions": undefined;
  "Notification History": undefined;
};

export type ThreeOrbitParamList = {
  ThreeOrbitView: undefined;
}

export type SignInParamList = {
  SignInScreen: { props: any };
  CredRecovPage: undefined;
}

export type CompTelParamList = {
  CompTelPage: undefined;
}

export type ExpandedTelParamList = {
  ExpandedTelPage: { path: string };
}

export type WorkspaceParamList = {
  WorkspacePage: undefined;
}

export type MapParamList = {
  initialPath: undefined;
  Telemetry: { path: string };
  MapPage: undefined;
  CompTelPage: undefined;
  WorkspacePage: undefined;
}

export type NotificationsParamList = {
  NotificationsPage: undefined;
  AlertConditionsPage: undefined;
  AlertSetupPage: undefined;
}

export type BugReportParamList = {
  BugReportPage: undefined;
}

export type UserPermParamList = {
  UserPermPage: undefined;
  CreateUserPage: undefined;
  EditRolePage: undefined;
  TeamRolePage: undefined;
  EditUserPage: undefined;
}