import '../../config/i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  Text,
  View,
} from 'react-native';
import { showLocation } from 'react-native-map-link';

import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const PlaceScreen = ({ navigation, route }) => {
  const details = {
    Name: route.params.place.shelter_name,
    Street: route.params.place.street,
    State: route.params.place.state,
    City: route.params.place.city,
    Zip: route.params.place.zipcode,
    Phone: route.params.place.phone,
    Lat: route.params.place.lat,
    Lng: route.params.place.lon,
  };

  const openGps = () =>
    showLocation({
      latitude: details.Lat,
      longitude: details.Lng,
      sourceLatitude: global.myLoc.coords.latitude,
      sourceLongitude: global.myLoc.coords.longitude,
    });
  const call = () => {
    Linking.openURL(`tel:${details.Phone}`);
  };

  const { t } = useTranslation();

  return (
    <View style={globalSty.container}>
      <ImageBackground
        source={Images.NABBackgroundLogo}
        resizeMode="cover"
        style={globalSty.image}
      >
        <View style={globalSty.pad}></View>
        <Image style={globalSty.logo} source={Images.logo} />
        <Text style={globalSty.texth1}>{details.Name}</Text>
        <Text style={globalSty.texth2}>{details.Street}</Text>
        <Text
          style={globalSty.texth2}
        >{`${details.City}, ${details.State} ${details.Zip}`}</Text>
        <Pressable
          title={'Address'}
          onPress={() => openGps()}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{t('ShelterTran.directions')} </Text>
        </Pressable>
        <Pressable
          title={'Phone'}
          onPress={() => call()}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{`${t('ShelterTran.call')} ${
            details.Phone
          }`}</Text>
        </Pressable>
        <Pressable
          title="Confirm"
          onPress={() => navigation.navigate('Confirm')}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{t('ShelterTran.confirm')}</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default PlaceScreen;
