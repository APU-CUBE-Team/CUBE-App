import * as ScreenOrientation from 'expo-screen-orientation';

export function resetOrientation() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
}