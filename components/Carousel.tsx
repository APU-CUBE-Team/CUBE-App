import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Screen from '../constants/Layout'

export function Carousel({data, onChange}: {data: any[], onChange: Function}) {
    const [index, setIndex] = React.useState(0);
    const [renderWidth, setWidth] = React.useState(-1);
    const indexRef = React.useRef(index);
    indexRef.current = index;
    const onScroll = React.useCallback((event) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);

      const distance = Math.abs(roundIndex - index);

      // Prevent one pixel triggering setIndex in the middle
      // of the transition. With this we have to scroll a bit
      // more to trigger the index change.
      const isNoMansLand = 0.4 < distance;
  
      if (roundIndex !== indexRef.current && !isNoMansLand) {
        // console.log("Changed index ", roundIndex)
        setIndex(roundIndex);
        onChange(roundIndex)
      }
    }, []);
  
    function measureView(event: any) {
        if (renderWidth === -1) {
          // console.log(`*** event: ${JSON.stringify(event.nativeEvent)}`);
          // console.log(`Render Width  ${event.nativeEvent.layout.width}`)
          setWidth(event.nativeEvent.layout.width)
        }
      }

    // Use the index
    React.useEffect(() => {
      console.warn(index);
    }, [index]);
  
    return (
      <FlatList
        data={data}
        style={{ flex: 1, width: Screen.window.width / 2 }}
        renderItem={({ item }) => (
              <View style={{width:Screen.window.width / 2, height: 30}} onLayout={(event) => {measureView(event)}}>
                  <Text style={{fontSize: 15, color: '#fff'}}>{`${item.key}`}</Text>
              </View>
            )
        } 
        horizontal
        pagingEnabled
        extraData={renderWidth}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    );
  }