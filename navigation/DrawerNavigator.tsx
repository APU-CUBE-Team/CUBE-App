import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerParamList, LandingParamList, ThreeOrbitParamList, MapParamList, NotificationsParamList, UserPermParamList } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import { storeTelemetryPreference } from '../hooks/Storage';
//How we will be importing our screens. I would prefer if we separate Screen imports from component imports so that it is easier to tell what 
// is what.
import ThreeOrbitView from '../screens/3DOrbitView';
import AlertConditionsScreen from '../screens/AlertConditions_Screen8';
import BugReportScreen from '../screens/BugReport_Screen9';
import TelemetryScreen from '../screens/TelemetryScreen';
import WorkspaceScreen from '../screens/WorkspaceParam_Screen5';
import MapScreen from '../screens/Map_Screen6';
import NotificationsScreen from '../screens/Notifications_Screen7';
import EditRoleScreen from '../screens/EditRole_Screen12';
import CreateUserScreen from '../screens/CreateUser_Screen11';
import TeamRolesScreen from '../screens/TeamRoles_Screen10';
import UserPerm from '../screens/UserPerm_Screen10';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator({ route }) {
  //We will use this hook eventually. It enables us to more easily establish a consistent colorscheme throughout the app
  const { signOut } = React.useContext(route.params?.SignOut);
  const colorScheme = useColorScheme();

  return (
    //This is how navigation works in v5. The Drawer.Navigator is what initializes our Drawers navigation. It creates and handles
    // the 'navigation' object similar to how it worked in v4. The Drawer.Screen is basically a screen object within our Drawer navigator.
    // The best part of this is that we can still point the component of our screen to another navigator instead of a screen, as we do here.
    // The name part of our Drawer.Screen has to correspond to the values within our types.tsx for parameter reasons. Don't really get it yet.
    <Drawer.Navigator
      initialRouteName="Telemetry"
      drawerPosition={'right'}
      drawerType={'slide'}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => signOut()} />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen
        name="Telemetry"
        component={TelemetryMap}
        initialParams={{
          InitialPath: "Telemetry"
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
        name="3D Orbit View"
        component={ThreeOrbit}
      />
      <Drawer.Screen
        name="Notification History"
        component={Notifications}
      />
      <Drawer.Screen
        name="Bug Report"
        component={BugReportScreen}
      />
      <Drawer.Screen
        name="User Permissions"
        component={UserPermissions}
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
  let path = route.params?.InitialPath;
  return (
    <TelemetryMapStack.Navigator
      initialRouteName={path}
    >
      <TelemetryMapStack.Screen
        name="Telemetry"
        component={TelemetryScreen}
        options={{
          headerTitle: 'CUBE Telemetry',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />,
          headerLeft: () => <TouchableOpacity style={{marginLeft: 5}} onPress={() => {
            navigation.navigate("WorkspacePage")
          }}><Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="cog-outline" /></TouchableOpacity>,
        }}
        initialParams={{
          path: path
        }}
      />
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
        name="WorkspacePage"
        component={WorkspaceScreen}
        options={{
          headerTitle: 'Workspace Settings',
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

const NotificationStack = createStackNavigator<NotificationsParamList>();

function Notifications({ navigation }) {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen 
        name="NotificationsPage"
        component={NotificationsScreen}
        options={{
          headerTitle: 'Alert History',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />,
          headerLeft: () => <TouchableOpacity style={{marginLeft: 5}} onPress={() => {
            navigation.navigate("AlertConditionsPage")
          }}><Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="pencil-outline" /></TouchableOpacity>
        }}
      />
      <NotificationStack.Screen 
        name="AlertConditionsPage"
        component={AlertConditionsScreen}
        options={{
          headerTitle: 'Alert Conditions',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      {/* <NotificationStack.Screen // So this doesn't exist as a screen rn I think because it's a popup?
        name="AlertSetupPage"
        component={NotFoundScreen}
        options={{
          headerTitle: 'Alert Triggers',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      /> */}
    </NotificationStack.Navigator>
  )
}

const TeamStack = createStackNavigator<UserPermParamList>();

function UserPermissions({ navigation }) {
  return (
    <TeamStack.Navigator>
      <TeamStack.Screen 
        name="TeamRolePage"
        component={TeamRolesScreen}
        options={{
          headerTitle: 'Team Roles',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />,
          headerLeft: () => <TouchableOpacity style={{marginLeft: 5}} onPress={() => {
            navigation.navigate("CreateUserPage")
          }}><Ionicons size={30} style={{ marginBottom: -3, color: '#fff' }} name="person-add-outline" /></TouchableOpacity>
        }}
      />
      <TeamStack.Screen 
        name="CreateUserPage"
        component={CreateUserScreen}
        options={{
          headerTitle: 'Create a User',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <TeamStack.Screen 
        name="EditRolePage"
        component={EditRoleScreen}
        options={{
          headerTitle: 'Edit Role',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
      <TeamStack.Screen 
        name="UserPermPage"
        component={UserPerm}
        options={{
          headerTitle: 'User Permissions',
          headerRight: () => <DrawerToggle onPress={() => { navigation.toggleDrawer() }} />
        }}
      />
    </TeamStack.Navigator>
  )
}
