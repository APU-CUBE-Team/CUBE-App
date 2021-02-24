import AsyncStorage from '@react-native-community/async-storage';

export const storeToken = async (value: String) => {
    const jsonValue = JSON.stringify(value)
    return AsyncStorage.setItem('@Token', jsonValue)
}

export const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@Token')
        console.log(jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log(e)
    }
}

export async function deleteToken() {
    return AsyncStorage.removeItem('@Token')
}

export const storeTelemetryPreference = async (value: String) => {
    const jsonValue = JSON.stringify(value)
    return AsyncStorage.setItem('@Telemetry', jsonValue)
}