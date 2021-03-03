import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  NativeModules,
} from 'react-native';
var location = NativeModules.MyLocationDataManager;
console.log('Location', location);
export default function App(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Native module</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
