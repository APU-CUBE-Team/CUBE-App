import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Colors from '../constants/Colors'

export function Carousel({data, onChange}: {data: any[], onChange: Function}) {
    const [index, setIndex] = React.useState(0);
    const [renderHeight, setHeight] = React.useState(-1);
    const indexRef = React.useRef(index);
    indexRef.current = index;
    const onScroll = React.useCallback((event) => {
      const slideSize = renderHeight + 32 //event.nativeEvent.layoutMeasurement.height; 
      const index = event.nativeEvent.contentOffset.y / slideSize;
      const roundIndex = Math.round(index);
  
      const distance = Math.abs(roundIndex - index);
  
      // Prevent one pixel triggering setIndex in the middle
      // of the transition. With this we have to scroll a bit
      // more to trigger the index change.
      const isNoMansLand = 0.4 < distance;
  
      if (roundIndex !== indexRef.current && !isNoMansLand) {
        setIndex(roundIndex);
        onChange(roundIndex)
      }
    }, []);
  
    function measureView(event: any) {
        if (renderHeight === -1) {
          console.log(`*** event: ${JSON.stringify(event.nativeEvent)}`);
          console.log(`Render Height  ${event.nativeEvent.layout.height}`)
          setHeight(event.nativeEvent.layout.height)
        }
      }

    // Use the index
    React.useEffect(() => {
      console.warn(index);
    }, [index]);
  
    return (
      <FlatList
        data={data}
        style={{ flex: 1, width: 150 }}
        renderItem={({ item }) => {
            return (
                <View style={{width:150, height: 30}} onLayout={(event) => {measureView(event)}}>
                    <Text style={{fontSize: 15, color: '#fff'}}>{`${item.key}`}</Text>
                </View>
            );
        }} 
        horizontal
        pagingEnabled
        extraData={renderHeight}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    );
  }