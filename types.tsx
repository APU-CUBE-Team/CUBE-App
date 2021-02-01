import { Context } from "react";

export type RootStackParamList = {
  Root: {SignOut: any};
  NotFound: undefined;
  SignIn: Element;
};

export type DrawerParamList = {
  Landing: {SignOut: any};
  "3D Orbit View": undefined;
  "Cartesian Map": {InitialPath: string};
  "Telemetry": {InitialPath: string};
};

export type ThreeOrbitParamList = {
  ThreeOrbitView: undefined;
}

export type LandingParamList = {
  LandingScreen: {SignOut: any};
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
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type SignInParamList = {
  SignInScreen: Element;
  Drawer: undefined;
}


export type CredRecovParamList = {
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
}

export type AlertConditionsParamList = {
  AlertConditionsPage: undefined;
}

export type AlertSetupParamList = {
  AlertSetupPage: undefined;
}

export type BugReportParamList = {
  BugReportPage: undefined;
}


export type UserPermParamList = {
  UserPermPage: undefined;
}

export type CreateUserParamList = {
  CreateUserPage: undefined;
}

export type EditRoleParamList = {
  EditRolePage: undefined;
}