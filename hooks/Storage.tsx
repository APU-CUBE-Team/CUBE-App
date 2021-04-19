import AsyncStorage from '@react-native-community/async-storage';
import { telemetryList } from '../constants/FullTelemetrySet';

export const storeToken = async (value: String) => {
    const jsonValue = JSON.stringify(value)
    return AsyncStorage.setItem('@Token', jsonValue)
}

export const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@Token')
        // console.log(jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log(e)
    }
}

export async function deleteToken() {
    return AsyncStorage.removeItem('@Token')
}

export const storeTelemetryPreference = async (value: string) => {
    const jsonValue = JSON.stringify(value)
    return AsyncStorage.setItem('@Telemetry', jsonValue)
}

export const storeTelOrder = async (value: string[]) => {
    const jsonValue = JSON.stringify(value)
    return AsyncStorage.setItem('@Order', jsonValue)
}

export const getSettings = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@VisibleData')
        return jsonValue != null ? JSON.parse(jsonValue) : initSettings();
    } catch(e) {
        console.log(e)
    }
}

export const setSettings = async (val: any) => {
    const jsonValue = JSON.stringify(val);
    return AsyncStorage.setItem('@VisibleData', jsonValue)
}
// This will likely need to ping our database and ask for the full list of telemetry that exists and initialize all of that to true,
//  but one bridge at a time shall we?
const initSettings = async () => {
    const jsonValue = telemetryList
    return setSettings(jsonValue);
}