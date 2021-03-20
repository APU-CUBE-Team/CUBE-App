import * as React from 'react';
import { StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

import { Text, View } from '../components/Themed';

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

type Path = {
    x: any,
    y: any
}

export default function MapScreen({ navigation }) {
    
    // thinking about grabbing the window dimensions as a way of generating the graph instead of wasting time 
    // trying to eyeball it
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    let pathing: Path[] = [];
    let d: string = "";
    const [x, setX] = React.useState(0.0);
    const [y, setY] = React.useState(0.0);
    const [index, setIndex] = React.useState(0);
    // let index = 0;

    let rarity = 14
    let freq = .1;
    let phase = 10;
    let amplitude = windowWidth /5;
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
    
    useFocusEffect(
        React.useCallback(() => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
            let index =  d.indexOf("L 4")
            let portion = d.substring(index)
            let point = d.substring(index, index+ portion.indexOf("M"))
            //console.log("D", d)
            console.log("Point", point)
            setX(parseFloat(point.substring(1, point.indexOf(",")).trim()))
            setY(parseFloat(point.substring(point.indexOf(",")+1).trim()))
            console.log("X: ", x)
            console.log("Y: ", y)
        }, [])
    )

    // Bruh idk how to get this to loop back around
    React.useEffect(() => {
        const interval = setInterval(() => {
            setX(pathing[index].x)
            setY(pathing[index].y)
            // index++;
            // if (x > windowWidth && index < 5){ index=0; console.log("WTF")}
            setIndex(index+1);
            // if (index > pathing.length) setIndex(0);
        }, 200);
        return () => {clearInterval(interval)};
    }, [index]);
    // console.log(y)
    if (x > windowWidth && index < 5){ setIndex(0); console.log("WTF")}

    return (
        <View style={styles.container}>
            {d !== "" && 
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
                <Image 
                    source={require('../assets/images/telemSat_icon.png')}
                    style={[styles.CUBE, {top: y - (styles.CUBE.height / 2), left: x - (styles.CUBE.width / 2)  }]}
                />
            </ImageBackground>}
        </View>
    );
    
}

