import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  // const gifAsset = require('./assets/images/splash.gif')
  const isLoadingComplete = useCachedResources(); 
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
    // if (true) { // Looks really trash sadly
    // return (
    //   <Image style={{backgroundColor: '#000'}} source={gifAsset}/>
    // )
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme}/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
