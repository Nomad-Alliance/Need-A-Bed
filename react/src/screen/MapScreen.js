import '../../config/i18n';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';

import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const MapScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([{ title: 'MAP' }]);
  const query_url = route.params.mapData;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  useEffect(() => {
    fetch(query_url, requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={globalSty.container}>
      <ImageBackground source={Images.NABBackgroundLogo} resizeMode="cover" style={globalSty.image}>
        <Text>{t('MapTran.text')}</Text>

        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.shelter_name} />}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );
};

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
});

export default MapScreen;
