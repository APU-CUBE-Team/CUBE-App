import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

import { Expo } from "expo-server-sdk";

/**
 * https://docs.expo.io/push-notifications/overview/
 *
 * Another helpful article with basically everything in one:
 * https://docs.expo.io/versions/latest/sdk/notifications/
 *
 * https://docs.expo.io/push-notifications/push-notifications-setup/
 * To get the client-side ready for push notifications, the 2 main things we need are:
 * 1) The user's permission to send them push notifications
 * 2) The user's ExpoPushToken- if push notifications are mail, then the ExpoPushToken is the user's address.
 * */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const [expoPushToken, setExpoPushToken] = useState("");
export const [notification, setNotification] = useState(false);
export const notificationListener: any = useRef(); // having typescript errors so i set this to any
export const responseListener: any = useRef(); // having typescript errors, so i set this to any

useEffect(() => {
  registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

  // This listener is fired whenever a notification is received while the app is foregrounded
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      setNotification(notification);
    }
  );

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log(response);
    }
  );

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken: any) {
  // having typescript errors, so i set above to any
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

//////////////////////////////
// Push Notifications Setup //
//////////////////////////////

// the following function is for 'New Notifications'
// there IS another function for legacy notifications but let's see if this is a good idea.
async function registerForPushNotificationsAsync() {
  let token; // to return token at end of function
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log("the token: \n", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// Credentials have been set up for android. iOS apparently handles it on its own.

// For Android, both managed and bare workflow users need to follow our FCM setup guide, it should only take about 5 minutes.
// ^^ https://docs.expo.io/push-notifications/using-fcm/
// I've done it already, so no need to do it. However, just for the sake of knowledge, here's what I did:

/**

$ expo push:android:upload --api-key <our-api-token>
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   There is a new version of expo-cli available (4.3.2).                 │
│   You are currently using expo-cli 4.1.6                                │
│   Install expo-cli globally using the package manager of your choice;   │
│   for example: `npm install -g expo-cli` to get the latest version      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
Accessing credentials for nbowman15 in project CUBE
All done!
 */
