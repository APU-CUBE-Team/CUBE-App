import React from 'react'
import { View, TouchableOpacity, LayoutAnimation, Text, Platform, UIManager } from 'react-native'
import DataGraph from './dataGraph';
import Screen from '../constants/Layout';

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
            style={{flexDirection: 'column', marginVertical: 10}}
            onPress={() => {
                LayoutAnimation.configureNext(CustomLayoutAnimation);
                setExpanded(!expanded);
        }}>
            <View style={{
                width: Screen.window.width-30, 
                height: expanded ? Screen.window.height / 3 : 50, 
                backgroundColor: '#a8bff7', 
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
                    {`${data.name}`} (RT): {`${Math.round(data.data.vals[data.data.vals.length -1] * 100) / 100}`}
                </Text>}
                {expanded && (
                    <View style={{
                        backgroundColor: "#4976a6",
                        flexDirection: 'column',
                        flex: 1,
                        borderWidth: 5,
                        borderColor: "#a8bff7",
                        borderRadius: 25
                    }}>
                        <View style={{
                            flex: 1, 
                            height: Screen.window.height / 3, 
                            width: Screen.window.width - 40,
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            backgroundColor: '#fff',
                            borderRadius: 15
                        }}>
                            <DataGraph
                                data = {data.data}
                                width = {Screen.window.width - 40}
                                height = {250}
                            />
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
)}