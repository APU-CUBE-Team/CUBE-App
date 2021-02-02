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
        emailSignIn(data.username, data.password).then((ret) => {
          var token = ret.stsTokenManager.accessToken;
          console.log(ret)
          console.log('Sign-In Success');
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        
          console.log(errorMessage, errorCode);
          if (errorCode === 'auth/invalid-email')
            alert('Your Email is Invalid.')
          if (errorCode === 'auth/wrong-password')
            alert('Password is Incorrect')
        });
      },
      signOut: () =>{
        console.log('Auth Call')
        signOut(); 
        dispatch({ type: 'SIGN_OUT' })},
      signUp: async data => {
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
            <Stack.Screen name="Root" component={DrawerNavigator} initialParams={{SignOut: AuthContext}}/>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  }
}
