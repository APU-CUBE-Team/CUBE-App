import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerParamList, LandingParamList, ThreeOrbitParamList, MapParamList } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

//How we will be importing our screens. I would prefer if we separate Screen imports from component imports so that it is easier to tell what 
// is what.
import ThreeOrbitView from '../screens/3DOrbitView';
import LandingScreen from '../screens/LandingScreen';
import AlertConditionsScreen from '../screens/AlertConditions_Screen8';
import BugReportScreen from '../screens/BugReport_Screen9';
import CompTelScreen from '../screens/CompTel_Screen3';
import CredRecoveryScreen from '../screens/CredRecov_Screen2';
import ExpandedTelScreen from '../screens/ExpandedTel_Screen4';
import WorkspaceScreen from '../screens/WorkspaceParam_Screen5';
import MapScreen from '../screens/Map_Screen6';
import NotificationsScreen from '../screens/Notifications_Screen7';
import EditRoleScreen from '../screens/EditRole_Screen12';
import CreateUserScreen from '../screens/CreateUser_Screen11';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator({ route }) {
  //We will use this hook eventually. It enables us to more easily establish a consistent colorscheme throughout the app
  const colorScheme = useColorScheme();
  return (
    //This is how navigation works in v5. The Drawer.Navigator is what initializes our Drawers navigation. It creates and handles
    // the 'navigation' object similar to how it worked in v4. The Drawer.Screen is basically a screen object within our Drawer navigator.
    // The best part of this is that we can still point the component of our screen to another navigator instead of a screen, as we do here.
    // The name part of our Drawer.Screen has to correspond to the values within our types.tsx for parameter reasons. Don't really get it yet.
    <Drawer.Navigator
      initialRouteName="Landing"
      drawerPosition={'right'}
      drawerType={'slide'}
    >
      <Drawer.Screen
        name="Landing"
        component={Landing}
        initialParams={{
          SignOut: route.params.SignOut
        }}
      />
      <Drawer.Screen
        name="Cartesian Map"
        component={TelemetryMap}
        initialParams={{
          InitialPath: "MapPage"
        }}
      />
      <Drawer.Screen
        name="Telemetry"
        component={TelemetryMap}
        initialParams={{
          InitialPath: "ExpandedTelPage"
        }}
      />
      <Drawer.Screen
        name="3D Orbit View"
        component={ThreeOrbit}
      />

    </Drawer.Navigator>
  );
}
//Unfortunately due to this being a typescript file (.tsx) any time we don't tell it the type, it will in turn get rather angry at us. These
// red lines don't mean anything however, and the code will still compile.
//This function is what we will need to insert into every stack navigator that we wan't to have button access for the drawer. It isn't 
// mandatory, however it makes it much more apparent there is a drawer, and makes accessing said drawer on the 3D rendering screen easier.
function DrawerToggle(props: { onPress }) {
  return (
    <TouchableOpacity
      {...props}
    >
      <Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="menu-outline" />
    </TouchableOpacity>
  )
}

//This next code block is how we will create screens that can be accessed via one of the drawer buttons. It involves the creation of a new
// stack navigator to store all the screens that can be accessed from that button in the drawer menu, i.e. the various telemetry screens in one 
// stack. The navigation.toggleDrawer() will be able to be accessed from any function within the drawer which should be all of them.


const TelemetryMapStack = createStackNavigator<MapParamList>();

function TelemetryMap({ navigation, route }) {
  return (
    <TelemetryMapStack.Navigator
      initialRouteName={route.params?.InitialPath}
    >
      <TelemetryMapStack.Screen
        name="MapPage"
        component={MapScreen}
        options={{
          headerShown: false,
          headerTitle: 'Location Tracking',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <TelemetryMapStack.Screen
        name="ExpandedTelPage"
        component={ExpandedTelScreen}
        options={{
          headerTitle: 'CUBE Telemetry',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
    </TelemetryMapStack.Navigator>
  )
}

const ThreeOrbitStack = createStackNavigator<ThreeOrbitParamList>();

function ThreeOrbit({ navigation }) {
  return (
    <ThreeOrbitStack.Navigator>
      <ThreeOrbitStack.Screen
        name="ThreeOrbitView"
        component={ThreeOrbitView}
        options={{
          headerTitle: '3D Orbital View',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
    </ThreeOrbitStack.Navigator>
  );
}

const LandingStack = createStackNavigator<LandingParamList>();

function Landing({ navigation, route }) {
  return (
    <LandingStack.Navigator>
      <LandingStack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          headerTitle: 'Landing Page',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
        initialParams={{
          SignOut: route.params?.SignOut
        }}
      />
      <LandingStack.Screen
        name="ThreeOrbitView"
        component={ThreeOrbitView}
        options={{
          headerTitle: 'ThreeOrbitView',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="AlertsConditions"
        component={AlertConditionsScreen}
        options={{
          headerTitle: 'AlertsConditions',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="BugReportPage"
        component={BugReportScreen}
        options={{
          headerTitle: 'BugReportPage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="CompTelPage"
        component={CompTelScreen}
        options={{
          headerTitle: 'CompTelPage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="CredRecovPage"
        component={CredRecoveryScreen}
        options={{
          headerTitle: 'CredRecovPage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="ExpandedTelPage"
        component={ExpandedTelScreen}
        options={{
          headerTitle: 'ExpandedTelPage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="WorkspacePage"
        component={WorkspaceScreen}
        options={{
          headerTitle: 'WorkspacePage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="MapPage"
        component={MapScreen}
        options={{
          headerTitle: 'MapPage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="NotificationsPage"
        component={NotificationsScreen}
        options={{
          headerTitle: 'NotificationsPage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <LandingStack.Screen
        name="EditRolePage"
        component={EditRoleScreen}
        options={{
          headerTitle: 'EditRolePage',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      {/* --------------------------------------- TEMP (SHOULD NAV FROM SIGN IN) -------------------------------------------------- */}
      <LandingStack.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={{
          headerTitle: 'Create User (TEMP)',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      {/* --------------------------------------- TEMP (SHOULD NAV FROM SIGN IN) -------------------------------------------------- */}

    </LandingStack.Navigator>
  );
}