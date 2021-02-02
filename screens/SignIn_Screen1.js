import * as React from 'react';
import {
   Button,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   SafeAreaView,
   StatusBar,
   Dimensions,
   Image,
   KeyboardAvoidingView
} from 'react-native';

import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import Screen from '../constants/Layout';
//import Icon from '../assets/images/cubeTEMP.png';

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.c.black
   },
   iconSafeArea: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputSafeArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
   },
   text: {
      color: Colors.c.white,
      fontSize: 20,
      textAlign: "center"
   },
   text2: {
      color: Colors.c.blue,
      fontSize: 12,
      textAlign: "center",
      padding: 5
   },
   text3: {
      color: Colors.c.white,
      paddingTop: 20,
      fontSize: 70,
      textAlign: "center",
   },
   input: {
      backgroundColor: Colors.c.darkGray,
      fontSize: 20,
      padding: 10,
      margin: 5,
      width: screen.width - 30,
      borderRadius: 10,
      color: Colors.c.white

   },
   icon: {
      width: 300,
      height: 300,
      marginLeft: 20,
      marginTop: 10,
      tintColor: '#fff'
   },
   signInButton: {
      backgroundColor: Colors.c.blue,
      width: screen.width - 30,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 10
   }
});

export default function SignInScreen(props) {
   const [username, setUsername] = React.useState('');
   const [password, setPassword] = React.useState('');

   const { signIn } = React.useContext(props.authentication);

   // checks for empty string, or if there is nothing in general. either signs in,
   // or you get bonked.
   function signInAuth (username, password) {
      if ((username != "" && password != "")&&(username != null && password != null)) {
         signIn(username, password);
      } else {
         alert("what are you doing.");
      }
   }

   return (
   <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
      <SafeAreaView style={styles.container}>
         

         <StatusBar barStyle="light-content" />

         <View style={styles.iconSafeArea}>
            <Text style={styles.text3}>
               CUBE
            </Text>
            <Image
               style={styles.icon}
               source={require('../assets/images/trans-icon.png')}
            />
         </View>
         

         <View style={styles.inputSafeArea}>
            <TextInput
               placeholder="Username"
               value={username}
               onChangeText={username => setUsername(username)}
               style={styles.input}
               autoCapitalize="none"
               placeholderTextColor="#fff"



            />
            <TextInput
               placeholder="Password"
               value={password}
               onChangeText={password => setPassword(password)}
               secureTextEntry={true}
               style={styles.input}
               autoCapitalize="none"
               placeholderTextColor="#fff"

            />
            
            

            <TouchableOpacity
               style={styles.signInButton}
               onPress={() => signInAuth(username, password)}>
               <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("TODO")} >
               <Text style={styles.text2}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("TODO")} >
               <Text style={styles.text2}>Forgot Password</Text>
            </TouchableOpacity>
         </View>
         
        
      </SafeAreaView> 
   </KeyboardAvoidingView>
   );
}