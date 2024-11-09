import '../../config/i18n';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

import Images from '../../config/Images';
import { getLocationManual } from '../helpers/geoLoc';
import { globalSty } from '../style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'grey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pinName: {
    backgroundColor: 'silver',
    fontSize: 20,
    textAlign: 'center', 
    fontWeight: 'bold'
  },
});

function OSM({ navigation, route }) {
  const { t } = useTranslation();
  const [mapRegion, setMapRegion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [loc, setLoc] = useState();

  let lat = global.myLoc.coords.latitude;
  let lon = global.myLoc.coords.longitude;

  const query_url = route.params.mapData;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  // This is called in the useEffect and will fetch from the django db based of the query path passed in the route param
  const getShelters = async () => {
    try {
      const response = await fetch(query_url, requestOptions);
      const json = await response.json();
      setMarkers(json);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setMapRegion({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    // This fetch should get the list of shelters, and store it in markers
    getShelters().then((r) => markers);

    if (!global.autoLoc) {
      const loc_url = getLocationManual(
        global.myAdd.street,
        global.myAdd.city,
        global.myAdd.state
      );

      fetch(loc_url, requestOptions)
        .then((resp) => resp.json())
        .then((data) => {
          setLoc(data);
          const found_region = {
            latitude: data.results[0].lat,
            longitude: data.results[0].lon,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221,
          };
          lon = data.results[0].lon;
          lat = data.results[0].lat;
          setMapRegion(found_region);
          global.myLoc = { coords: { latitude: lat, longitude: lon } };
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      lat = global.myLoc.coords.latitude;
      lon = global.myLoc.coords.longitude;
      const found_region = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221,
      };
      setMapRegion(found_region);
      global.myLoc = { coords: { latitude: lat, longitude: lon } };
    }
  }, []);

  return (
    <View style={globalSty.container}>
      {/* isLoading is set to false after the useEffect,
              ensuring the map renders all locations correctly */}
      {isLoading ? (
        <ActivityIndicator visible={isLoading} textContent="Loading..." />
      ) : (
        <ImageBackground
          source={Images.NABBackgroundLogo}
          resizeMode="cover"
          style={globalSty.image}
        >
          <MapView
            style={styles.map}
            initialRegion={mapRegion}
            region={mapRegion}
          >
            <Marker
              coordinate={mapRegion}
              title="ME"
              description="My Location"
              pinColor="rgba(18, 40, 40, 0.8)"
            >
              <View>
                <Image style={styles.mapIcon} source={Images.personIMG} />
                <Text style={styles.pinName}>ME</Text>
              </View>
            </Marker>
            <Circle
              center={{
                latitude: lat,
                longitude: lon,
              }}
              radius={750}
              color="rgba(158,158,255,1.0)"
              fillcolor="rgba(158,158,255,0.3)"
            />
            {markers.map((marker) => (
              <Marker
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lon,
                }}
                title={marker.shelter_name}
                description={marker.shelter_type}
                key={marker.id}
                onCalloutPress={() => {
                  navigation.navigate('ShelterItem', { place: marker });
                }}
              >
                <View>
                  <Image style={styles.mapIcon} source={Images.shelterIMG} />
                  
                  <Text style={styles.pinName}>{marker.bed_count}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        </ImageBackground>
      )}
    </View>
  );
}

OSM.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};
export default Platform.select({
  ios: OSM,
  android: OSM,
  // web: MapScreen,
});
