import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const LocScreenMan = ({ navigation }) => {
  const [street, onChangeText] = useState('');
  const [city, onChangeText1] = useState('');
  const [state, onChangeText2] = useState('');
  const { t } = useTranslation();

  function submitInfo() {
    const raw_add = { street: street, city: city, state: state };
    global.myAdd = raw_add;
    global.myLoc = { coords: { latitude: 40.67331, longitude: -111.94236 } };
    global.autoLoc = false;
    navigation.navigate('Demographics');
  }

  return (
    <View style={globalSty.container}>
      <ImageBackground
        source={Images.NABBackgroundLogo}
        resizeMode="cover"
        style={globalSty.image}
      >
        <View style={globalSty.pad}>
          <Text>{t('AddressTran.street')}</Text>
          <TextInput
            style={globalSty.input}
            onChangeText={onChangeText}
            value={street}
          />
          <Text>{t('AddressTran.city')}</Text>
          <TextInput
            style={globalSty.input}
            onChangeText={onChangeText1}
            value={city}
          />
          <Text>{t('AddressTran.state')}</Text>
          <TextInput
            style={globalSty.input}
            onChangeText={onChangeText2}
            value={state}
          />
          <Pressable
            title={t('GlobalTran.submit')}
            onPress={() => submitInfo()}
            style={globalSty.Button}
          >
            <Text style={globalSty.btnText}>{t('GlobalTran.submit')}</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LocScreenMan;
