import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { globalSty } from '../style/globalStyle';

const LocScreenAuto = ({ navigation }) => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermisson = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      print(status)
      if (status !== 'granted') {
        navigation.navigate('LocMan');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      global.myLoc = currentLocation;
      global.autoLoc = true;
      navigation.navigate('Demographics');
    };
    getPermisson();
  }, []);

  return (
    <View style={globalSty.container}>
      <StatusBar style="auto" />
    </View>
  );
};

export default LocScreenAuto;
