import * as React from 'react';
import { StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useFocusEffect, NavigationAction } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import OverlayPrompt from '../components/Prompt';
import { Text, View } from '../components/Themed';
import Screen from '../constants/Layout'

const styles = StyleSheet.create({
    container: {
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
    map: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },
    CUBE: {
        position: 'absolute',
        width: 60,
        height: 50
    },
    sine: {
    }
});

type Pather = {
    x: any,
    y: any
}

const CustomLayoutAnimation = {
    duration: 900,
    create: {
        property: LayoutAnimation.Properties.scaleXY,
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    update: {
        property: LayoutAnimation.Properties.scaleXY,
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
        property: LayoutAnimation.Properties.scaleXY,
        type: LayoutAnimation.Types.easeInEaseOut,
    },
}

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) 
    { UIManager.setLayoutAnimationEnabledExperimental(true); }

export default function MapScreen({ navigation }) {
    const [loaded, setLoaded] = React.useState(false);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const [d, setD] = React.useState("")
    const [x, setX] = React.useState(-1);
    const [y, setY] = React.useState(0.0);
    const [overlay, setOverlay] = React.useState(false);
    const [pathing, setPathing] = React.useState<Pather[]>([]);
    
    let index = 0;
    useFocusEffect(
        React.useCallback(() => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
            .then(() => {
                const windowHeight = Screen.window.width;
                const windowWidth = Screen.window.height;
                let pathing: Pather[] = [];
                let d: string = "";
                let rarity = 14
                let freq = .1;
                let phase = 100;
                let amplitude = windowWidth / 5;
                let origin = {
                    x: 0,
                    y: windowHeight / 2
                }
                for(var i = 0; i < windowWidth; i++) {
                    var operator = ' M ';
                
                    d += operator + ((i - 1) * rarity + origin.x) + ', ';
                    d += (Math.sin(freq * (i - 1 + phase)) * amplitude + origin.y);
                
                    if(operator !== ' L ') { operator = ' L '; }
                    
                    let xT = (i * rarity + origin.x)
                    let yT = (Math.sin(freq * (i + phase)) * amplitude + origin.y)

                    d += ' L ' + xT + ', ';
                    d += yT;

                    pathing.push({x: xT, y: yT})
                    
                }
                setPathing(pathing)
                setD(d)
                setLoaded(true)
            })
        }, [])
    )

    React.useEffect(() => {
        if (loaded) {
            const interval = setInterval(() => {
                setX(pathing[index].x)
                setY(pathing[index].y)
                index++;
                if (index > 55)
                    index=0;
                if (index !== 1)
                    LayoutAnimation.configureNext(CustomLayoutAnimation);
            }, 1000);
            return () => {clearInterval(interval)};
        }
    }, [loaded]);
    
    return (
    <View style={[styles.container]}>
        {loaded ? 
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/globe.png')} style={styles.map}
            >
                    <Svg height={`${windowHeight}`} width={`${windowWidth}`}>
                        <Path
                            d={d}
                            fill={"none"}
                            stroke={"red"}
                            strokeWidth={5}
                        />
                    </Svg>
                    <TouchableOpacity 
                        style={[styles.CUBE, {top: y - (styles.CUBE.height / 2), left: x - (styles.CUBE.width / 2)}]}
                        onPress={() => setOverlay(true)}
                    >
                        <Image 
                            source={require('../assets/images/telemSat_icon.png')}
                            style={[styles.CUBE]}
                        />
                
                    </TouchableOpacity> 
                 
                
            </ImageBackground>
            {overlay ? 
                <OverlayPrompt
                    promptText={"Would you like to view this CUBE's Telemetry or Controls"}
                    closeOverlay={() => setOverlay(false)}
                    yAxis
                    btns={[
                        {key: "  Telemetry  ", action: () => {
                            setOverlay(false);
                            navigation.navigate("Telemetry")
                        }},
                        {key: "  Control  ", action: () => {alert("TODO")}},
                        {key: "  Cancel  ", action: () => {setOverlay(false)}},
                    ]}
                />
                : 
                null
            }
        </View>
        : null}
        </View>
    );
    
}

