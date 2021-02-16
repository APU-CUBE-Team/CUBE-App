import { Context } from "react";

export type RootStackParamList = {
  Root: { SignOut: any };
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

export type LandingParamList = {
  LandingScreen: { SignOut: any };
  ThreeOrbitView: undefined;
  AlertsConditions: undefined;
  BugReportPage: undefined;
  CompTelPage: undefined;
  CredRecovPage: undefined;
  ExpandedTelPage: undefined;
  WorkspacePage: undefined;
  MapPage: undefined;
  NotificationsPage: undefined;
  AlertSetupPage: undefined;
  EditRolePage: undefined;
  CreateUserPage: undefined;
  TeamRolesPage: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type SignInParamList = {
  SignInScreen: {props: any};
  CredRecovPage: undefined;
}

export type CompTelParamList = {
  CompTelPage: undefined;
}

export type ExpandedTelParamList = {
  ExpandedTelPage: undefined;
}

export type WorkspaceParamList = {
  WorkspacePage: undefined;
}

export type MapParamList = {
  initialPath: undefined;
  ExpandedTelPage: undefined;
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
}