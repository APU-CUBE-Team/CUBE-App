import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from '@expo/vector-icons';


import { RootStackParamList, SignInParamList } from "../types";
import DrawerNavigator from "./DrawerNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { getToken, storeToken, deleteToken } from "../hooks/Storage";
import SignInScreen from "../screens/SignIn_Screen1";
import CredRecoveryScreen from "../screens/CredRecov_Screen2";
import {
  emailSignIn,
  signOut,
  useCustomToken,
} from "../util/authenticating-users";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const AuthContext = React.createContext({});

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(114, 137, 218)",
    background: "rgb(35, 39, 42)",
    card: "rgb(48, 52, 55)",
    text: "rgb(255, 255, 255)",
    border: "rgb(35, 39, 42)",
    notification: "rgb(241, 95, 75)",
  },
  font: {},
};

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={MyTheme}>
      <TestMode />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const Login = createStackNavigator<SignInParamList>();

function TestMode() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("@Token");
        // DEBUG
        // console.log("testing customToken: ", userToken);
        return await useCustomToken(userToken);
      } catch (e) {
        // Restoring token failed
        console.log("Restoring token failed");
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        emailSignIn(data.username, data.password)
          .then((ret) => {
            console.log("Sign-In Success");
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                user.getIdToken().then((idToken) => {
                  // DEBUG
                  // console.log(idToken);
                  storeToken(idToken);
                  dispatch({ type: "SIGN_IN", token: idToken });
                });
              }
            });
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage, errorCode);
            if (errorCode === "auth/invalid-email")
              alert("Your Email is Invalid.");
            if (errorCode === "auth/user-not-found")
              alert("Your Email is incorrect.");
            if (errorCode === "auth/wrong-password")
              alert("Password is Incorrect");
          });
      },
      signOut: () => {
        console.log("Auth Call");
        deleteToken().then(() => {
          signOut();
          dispatch({ type: "SIGN_OUT" });
        });
      },
    }),
    []
  );

  return <RootNavigator />;



  function SignIn({ navigation }) {
    return (
      <Login.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Login.Screen
          name="SignInScreen"
          component={SignInScreen}
          initialParams={{ props: AuthContext }}
        />
        <Login.Screen
          name="CredRecovPage"
          component={CredRecoveryScreen}
          options={{
            headerShown: true,
            headerTitle: 'Forgot Password',
            headerLeft: () => <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => {
              navigation.navigate("SignInScreen")
            }}><Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="arrow-back-outline" /></TouchableOpacity>

          }}
        />
      </Login.Navigator>
    );
  }

  function RootNavigator() {
    return (
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {state.userToken == null ? (
            <Stack.Screen name="SignIn" component={SignIn} />
          ) : (
            <Stack.Screen
              name="Root"
              component={DrawerNavigator}
              initialParams={{ SignOut: AuthContext }}
            />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  }
}
