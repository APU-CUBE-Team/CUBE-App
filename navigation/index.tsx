import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from 'react';
import { ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import { RootStackParamList } from '../types';
import DrawerNavigator from './DrawerNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {isSignedIn, signIn} from '../hooks/Storage';
import SignInScreen from '../screens/SignIn_Screen1';
import {emailSignIn, signOut } from '../util/authenticating-users/firebaseAuth';

const AuthContext = React.createContext();

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TestMode/>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function TestMode() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
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
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        if ((data.username != "" && data.password != "")
        && (data.username != null && data.password != null)) {
          emailSignIn(data.username, data.password);

          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        } else {
          console.log("Nothing there");
        }
        
      },
      signOut: () =>{
        signOut(); 
        dispatch({ type: 'SIGN_OUT' })},
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return(<RootNavigator/>)

  function SignIn() {
    return(
      <SignInScreen authentication={AuthContext}/>
    )
  }

  function RootNavigator() {
    let signedIn = false;
    isSignedIn()
            .then(ret => {
              if (ret != null)
                signedIn = true;
            })
    return (

      <AuthContext.Provider value={authContext}>
        <Stack.Navigator 
          screenOptions={{
          headerShown: false
        }}>
          {state.userToken == null ? (
            <Stack.Screen name="SignIn" component={SignIn} /> 
          ) : (
            <Stack.Screen name="Root" component={DrawerNavigator}/>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  }
}
