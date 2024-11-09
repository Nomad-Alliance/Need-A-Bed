import '../../config/i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const LocScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={globalSty.container}>
      <ImageBackground source={Images.NABBackgroundLogo} resizeMode="cover" style={globalSty.image}>
        <Image style={globalSty.logo} source={Images.logo} />
        <Text style={globalSty.texth1}>{t('LocTran.locQ')}</Text>
        <Pressable
          title={t('LocTran.lYes')}
          onPress={() => navigation.navigate('LocAuto')}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{t('LocTran.lYes')}</Text>
        </Pressable>
        {/*<View style = {globalSty.space}/>*/}
        <Pressable
          title={t('LocTran.lNo')}
          onPress={() => navigation.navigate('LocMan')}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{t('LocTran.lNo')}</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default LocScreen;
