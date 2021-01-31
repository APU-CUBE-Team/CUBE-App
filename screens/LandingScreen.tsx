// THESE ARE EXAMPLES
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import screen from '../constants/Layout';
import { Text, View } from '../components/Themed';
import { resetOrientation } from '../hooks/resetOrientation';

export default function LandingScreen({ navigation }) {
  resetOrientation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation To Screens</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('ThreeOrbitView')}}>
          <Text>ThreeOrbitView</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('AlertsConditions')}}>
          <Text>AlertsConditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('BugReportPage')}}>
          <Text>BugReportPage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('CompTelPage')}}>
          <Text>CompTelPage</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('CredRecovPage')}}>
          <Text>CredRecovPage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('ExpandedTelPage')}}>
          <Text>ExpandedTelPage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('WorkspacePage')}}>
          <Text>WorkspacePage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('MapPage')}}>
          <Text>MapPage</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('NotificationsPage')}}>
          <Text>NotificationsPage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('EditRolePage')}}>
          <Text>EditRolePage</Text>
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
    width: screen.window.width / 6,
    height: screen.window.width / 6,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff00'
  }
});
