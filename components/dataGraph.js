import React from 'react'
import { LineChart, Grid, YAxis, XAxis, ScaleType } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View, Text } from 'react-native'
import moment from 'moment';
import Colors from '../constants/Colors'

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = axesSvg.fontSize * 1.5 +4

// Has to be JS so that this line will work, it needs to be a component.
export default class DataGraph extends React.PureComponent {
    state = {
        vals: this.props.data.vals,
        dates: this.props.data.dates,
    }

    render() {
        return (
            <View style={{ height: this.props.height, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={this.state.vals}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ 
                            flex: 1,
                            shadowColor: '#000', // IOS
                            shadowOffset: { height: 5, width: 3 }, // IOS
                            shadowOpacity: 2, // IOS
                            shadowRadius: 2, //IOS
                            elevation: 2, // Android 
                        }}
                        data={this.state.vals}
                        contentInset={verticalContentInset}
                        svg={{ stroke: Colors.newColors.text }}
                        animate={true}
                        curve={shape.curveCatmullRom}
                    >
                        <Grid/>
                    </LineChart>
                    {/* Double XAxis component so that we can fit the full date data, as otherwise they overlay easily
                    and cause other drawing data */}
                    <XAxis
                        style={{ marginHorizontal: -10, height: axesSvg.fontSize}}
                        numberOfTicks={5}
                        data={this.state.vals}
                        formatLabel={ (index) => 
                            `${moment.unix(this.state.dates[index]).format('MM/DD')}`
                        }
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                    <XAxis
                        style={{ marginHorizontal: -10, height: axesSvg.fontSize, marginTop: -axesSvg.fontSize/2 + 4 }}
                        numberOfTicks={5}
                        data={this.state.vals}
                        formatLabel={ (index) => 
                            `${moment.unix(this.state.dates[index]).format('HH:mm')}`
                        }
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
        )
    }
}