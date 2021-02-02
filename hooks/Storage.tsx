import AsyncStorage from '@react-native-community/async-storage';

export const signIn = async (value: String) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Token', jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
  }

export const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@Token')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log(e)
    }
}