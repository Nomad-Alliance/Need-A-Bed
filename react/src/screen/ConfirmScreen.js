import '../../config/i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Text, View } from 'react-native';

import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const ConfirmScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const load = () => {
    setTimeout(() => {
      navigation.navigate('PostSurvey');
    }, 10000);
  };

  return (
    <View style={globalSty.container}>
      <ImageBackground
        source={Images.NABBackgroundLogo}
        resizeMode="cover"
        style={globalSty.image}
      >
        <View style={global.pad}>
          <Image style={globalSty.logo} source={Images.logo} />
          <Text style={globalSty.texth1}>
            Thank you for using NAB, after you get settled we love to hear about
            the shelter and your experience with NAB
          </Text>
          {load()}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ConfirmScreen;
