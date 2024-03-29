import { StatusBar } from 'expo-status-bar';
import { Subscription } from '@unimodules/core';
import Constants from 'expo-constants';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation';
import { db} from './util/firebase-util'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e. multiple minutes'])

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState<any>(false);
  const notificationListener = React.useRef<Subscription>();
  const responseListener = React.useRef<Subscription>();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(
      // token => setExpoPushToken(token)
    );

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
        <Navigation 
          token={expoPushToken}
        />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


async function registerForPushNotificationsAsync() {
  let token;
  try {
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
    //alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // alert(token)
  
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  }); 
  }catch (e) {
    alert(e)
  }

  return token;
}