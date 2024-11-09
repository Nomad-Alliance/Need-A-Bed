import '../../config/i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={globalSty.container}>
      <ImageBackground
        source={Images.NABBackgroundLogo}
        resizeMode="cover"
        style={globalSty.image}
      >
        <Image style={globalSty.logo} source={Images.logo} />
        <Text style={globalSty.texth1}>{t('HomeTran.welcome')}</Text>
        <Pressable
          title={t('HomeTran.homeBtn')}
          onPress={() => navigation.navigate('Location')}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{t('HomeTran.homeBtn')}</Text>
        </Pressable>
        {/*<View style = {globalSty.space}/>*/}
        <Pressable
          title={t('HomeTran.feedback')}
          onPress={() => navigation.navigate('SurveyScreen')}
          style={globalSty.Button}
        >
          <Text style={globalSty.btnText}>{t('HomeTran.feedback')}</Text>
        </Pressable>
        <View style={globalSty.infoBtn}>
          <Pressable onPress={() => navigation.navigate('Info')}>
            <Image
              resizeMode="contain"
              style={globalSty.info}
              source={Images.info}
            />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
