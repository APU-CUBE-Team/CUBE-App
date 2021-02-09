// THESE ARE EXAMPLES
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import screen from '../constants/Layout';
import { Text, View } from '../components/Themed';
import { resetOrientation } from '../hooks/resetOrientation';

export default function LandingScreen({ navigation, route }) {
  resetOrientation();

  const { signOut } = React.useContext(route.params?.SignOut);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation To Screens</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ThreeOrbitView') }}>
          <Text style={styles.text}>Three Orbit View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AlertsConditions') }}>
          <Text style={styles.text}>Alerts Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('BugReportPage') }}>
          <Text style={styles.text}>Bug Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('CompTelPage') }}>
          <Text style={styles.text}>Compact Telemetry</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('CredRecovPage') }}>
          <Text style={styles.text}>Credential Recovery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ExpandedTelPage') }}>
          <Text style={styles.text}>Expanded Telemetry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('WorkspacePage') }}>
          <Text style={styles.text}>Workspace</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('MapPage') }}>
          <Text style={styles.text}>Map</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('NotificationsPage') }}>
          <Text style={styles.text}>Notifications Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adminButton} onPress={() => { navigation.navigate('EditRolePage') }}>
          <Text style={styles.text}>Edit Roles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adminButton} onPress={() => { navigation.navigate('CreateUserPage') }}>
          <Text style={styles.text}>Create User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adminButton} onPress={() => { navigation.navigate('TeamRolesPage') }}>
          <Text style={styles.text}>Team Roles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.signOutButton} onPress={() => { signOut() }}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  text: {
    fontSize: 15,
    margin: 3,
    textAlign: 'center'

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    width: screen.window.width / 5,
    height: screen.window.width / 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
  },
  adminButton: {
    width: screen.window.width / 5,
    height: screen.window.width / 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    borderRadius: 10
  },
  signOutButton: {
    width: screen.window.width - 40,
    height: screen.window.width / 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 10
  }
});
