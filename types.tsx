import { Component } from "react";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  SignIn: Element;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type DrawerParamList = {
  TabOne: undefined;
  ThreeOrbitView: undefined;
};

export type ThreeOrbitParamList = {
  ThreeOrbitView: undefined;
}

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type SignInParamList = {
  SignInScreen: Element;
  Drawer: undefined;
}
