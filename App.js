import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  NativeModules,
  EventEmitter,
  NativeEventEmitter,
} from 'react-native';
var location = NativeModules.MyLocationDataManager;
const _event_ = new NativeEventEmitter(NativeModules.MyLocationDataManager);
console.log('Event', _event_);
console.log('Location', location);
export default function App(props) {
  const check = async () => {
    const result = await location.requestPermissions('');
    console.log('check', result);
    return result;
  };
  useEffect(() => {
    check();
  }, []);
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
