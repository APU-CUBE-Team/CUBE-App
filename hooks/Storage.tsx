import AsyncStorage from '@react-native-community/async-storage';

////
//// All of this is filler for now so we can set up our ternary operator lmao
////
export const signIn = async (value: Boolean) => {
    try {
        console.log('trying')
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

export const isSignedIn = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}