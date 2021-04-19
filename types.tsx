import { Context } from "react";

export type RootStackParamList = {
  Root: { SignOut: any, pref: any, token: any };
  NotFound: undefined;
  SignIn: Element;
  
};

export type DrawerParamList = {
  Landing: { SignOut: any };
  "3D Orbit View": undefined;
  "Cartesian Map": { InitialPath: string };
  "Telemetry": { InitialPath: string, token: any };
  "Bug Report": undefined;
  "User Permissions": undefined;
  "Notification History": undefined;
  "Control": undefined;
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

export type TelParamList = {
  initialPath: {token: any};
  TelemetryScreens: { path: string };
  WorkspacePage: {token: any};
}

export type MapParamList = {
  MapPage: undefined;
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

export type ControlParamList = {
  ControlPage: undefined;
}