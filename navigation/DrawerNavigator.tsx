import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerParamList, TabOneParamList, TabTwoParamList, ThreeOrbitParamList } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

//How we will be importing our screens. I would prefer if we separate Screen imports from component imports so that it is easier to tell what 
// is what.
import TabOneScreen from '../screens/TabOneScreen';
import ThreeOrbitView from '../screens/3DOrbitView';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
    //We will use this hook eventually. It enables us to more easily establish a consistent colorscheme throughout the app
    const colorScheme = useColorScheme();
  
    return (
        //This is how navigation works in v5. The Drawer.Navigator is what initializes our Drawers navigation. It creates and handles
        // the 'navigation' object similar to how it worked in v4. The Drawer.Screen is basically a screen object within our Drawer navigator.
        // The best part of this is that we can still point the component of our screen to another navigator instead of a screen, as we do here.
        // The name part of our Drawer.Screen has to correspond to the values within our types.tsx for parameter reasons. Don't really get it yet.
      <Drawer.Navigator
        initialRouteName="TabOne"
        drawerPosition={'right'}
        drawerType={'slide'}
      >
        <Drawer.Screen
          name="TabOne"
          component={TabOneNavigator}
        />
        <Drawer.Screen
          name="ThreeOrbitView"
          component={ThreeOrbit}
        />
        
      </Drawer.Navigator>
    );
  }
  //Unfortunately due to this being a typescript file (.tsx) any time we don't tell it the type, it will in turn get rather angry at us. These
  // red lines don't mean anything however, and the code will still compile.
  //This function is what we will need to insert into every stack navigator that we wan't to have button access for the drawer. It isn't 
  // mandatory, however it makes it much more apparent there is a drawer, and makes accessing said drawer on the 3D rendering screen easier.
  function DrawerToggle(props: {onPress}) {
      return (
        <TouchableOpacity 
        {...props}
        >
            <Ionicons size={30} style={{ marginBottom: -3, color: '#fff'}} name="menu-outline"  />
        </TouchableOpacity>
      )
  }

  //This next code block is how we will create screens that can be accessed via one of the drawer buttons. It involves the creation of a new
  // stack navigator to store all the screens that can be accessed from that button in the drawer menu, i.e. the various telemetry screens in one 
  // stack. The navigation.toggleDrawer() will be able to be accessed from any function within the drawer which should be all of them.
  const TabOneStack = createStackNavigator<TabOneParamList>();

  function TabOneNavigator({navigation}) {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={TabOneScreen}
                options={{ headerTitle: 'Tab One Title', 
                headerRight: () => <DrawerToggle onPress={() => {navigation.toggleDrawer()}}/>}}
            />
        </TabOneStack.Navigator>
    );
  }
  
  const TabTwoStack = createStackNavigator<ThreeOrbitParamList>();
  
  function ThreeOrbit({navigation}) {
    return (
      <TabTwoStack.Navigator>
        <TabTwoStack.Screen
            name="ThreeOrbitView"
            component={ThreeOrbitView}
            options={{ headerTitle: '3D Orbital View',
            headerRight: () => <DrawerToggle onPress={() => {navigation.toggleDrawer()}}/>}}
        />
      </TabTwoStack.Navigator>
    );
  }
  