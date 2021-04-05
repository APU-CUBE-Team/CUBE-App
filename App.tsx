import { StatusBar } from 'expo-status-bar';
import { Subscription } from '@unimodules/core';
import Constants from 'expo-constants';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation';

//FONT IMPORTS
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  setCustomText
} from 'react-native-global-props';

const fetchFonts = () => {

  return Font.loadAsync({
    'GillSans-Reg': require('./assets/fonts/GillSans-Reg.ttf'),
  })
    .then(() => {
      defaultFonts();

    })
};

const defaultFonts = () => {
  console.log("reached");

  const customTextProps = {
    style: {
      fontFamily: 'GillSans-Reg'
    }
  }
  setCustomText(customTextProps);
};
export default function App() {
  const isLoadingComplete = useCachedResources();
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState<any>(false);
  const notificationListener = React.useRef<Subscription>();
  const responseListener = React.useRef<Subscription>();

  //THIS IS NOT A SECURE WAY TO DO THIS. FIX LATER
  fetchFonts();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };


  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push token", token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  return token;
}