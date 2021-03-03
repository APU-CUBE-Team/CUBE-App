import React from 'react'
import { View, TouchableOpacity, LayoutAnimation, Text, Platform, UIManager } from 'react-native'
import DataGraph from './dataGraph';
import Screen from '../constants/Layout';
import Colors from '../constants/Colors';

const CustomLayoutAnimation = {
    duration: 400,
    create: {
        property: LayoutAnimation.Properties.scaleXY,
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    update: {
        property: LayoutAnimation.Properties.scaleXY,
        type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
        duration: 200,
        property: LayoutAnimation.Properties.scaleXY,
        type: LayoutAnimation.Types.easeInEaseOut,
    },
}

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) 
    { UIManager.setLayoutAnimationEnabledExperimental(true); }

export default function AdvGraph({ data }: {data: any}) {
    
    const [expanded, setExpanded] = React.useState(false);
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'column', 
                marginVertical: 10, 
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 2, width: 0 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1.5, //IOS
                elevation: 10, // Android
        }}
            onPress={() => {
                LayoutAnimation.configureNext(CustomLayoutAnimation);
                setExpanded(!expanded);
        }}>
            <View style={{
                width: Screen.window.width-30, 
                height: expanded ? Screen.window.height / 3 : 50, 
                backgroundColor: '#15181a', 
                flexDirection: 'column',
                borderRadius: 15
            }}>
                {(data !== null) &&
                <Text style={{ 
                    fontSize: 20, 
                    color: '#fff', 
                    textShadowOffset:{width: 0, height: 0}, 
                    textShadowColor:'#000', 
                    textShadowRadius:10,
                    marginLeft: 10
                }}>
                    {`${data.key}`} (RT): {`${Math.round(data.vals[data.vals.length -1] * 100) / 100}`}
                </Text>}
                {expanded && (
                    <View style={{
                        backgroundColor: "#15181a",
                        flexDirection: 'column',
                        flex: 1,
                        borderWidth: 5,
                        borderColor: "#15181a",
                        borderRadius: 25
                    }}>
                        <View style={{
                            flex: 1, 
                            height: Screen.window.height / 3, 
                            width: Screen.window.width - 40,
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            borderRadius: 15,
                            backgroundColor: Colors.newColors.background2,
                            shadowColor: "rgba(0,0,0, .4)", // IOS
                            shadowOffset: { height: 2, width: 0 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius: 1.5, //IOS
                            elevation: 2, // Android
                        }}>
                            <DataGraph
                                data = {data}
                                width = {Screen.window.width - 40}
                                height = {250}
                            />
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
)}