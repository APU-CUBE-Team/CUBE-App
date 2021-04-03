import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as SplashScreen from 'expo-splash-screen';
global.atob = function atob(input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var output = ''
  var chr1, chr2, chr3
  var enc1, enc2, enc3, enc4
  var i = 0
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
  do {
      enc1 = keyStr.indexOf(input.charAt(i++))
      enc2 = keyStr.indexOf(input.charAt(i++))
      enc3 = keyStr.indexOf(input.charAt(i++))
      enc4 = keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3)
      }
  } while (i < input.length)
return output} 
global.btoa = function btoa(s) {return s}

export default function App() {
  // const gifAsset = require('./assets/images/splash.gif')
  const isLoadingComplete = useCachedResources(); 
  // const colorScheme = "dark";

  if (!isLoadingComplete) {
    return null;
    // if (true) { // Looks really trash sadly
    // return (
    //   <Image style={{backgroundColor: '#000'}} source={gifAsset}/>
    // )
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
