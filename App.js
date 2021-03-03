import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  Platform,
} from 'react-native';
const _EVENT_EMITTER = new NativeEventEmitter(
  NativeModules.MyLocationDataManager,
);
export default function App(props) {
  const [location, setlocation] = useState(null);
  useEffect(() => {
    _EVENT_EMITTER.addListener('significantLocationChange', (data) => {
      console.log('event:', data);
      setlocation(data);
    });
    NativeModules.MyLocationDataManager.start();
    return () => {
      NativeModules.MyLocationDataManager.stop();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Native module {Platform.OS === 'ios' ? 'ios' : 'android'} get location
      </Text>
      <Text>Lat: {location?.coords?.latitude}</Text>
      <Text>Lng: {location?.coords?.longitude}</Text>
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
