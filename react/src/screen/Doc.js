import '../../config/i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';

import { globalSty } from '../style/globalStyle';

const DocScreen = () => {
  const { t } = useTranslation();

  const urlBoot = (urlName) => {
    var http;

    switch (urlName) {
      case 'GitHub':
        http = 'http://www.github.com';
        break;
      default:
        break;
    }
    Linking.openURL(http);
  };

  return (
    <View style={globalSty.container}>
      <Pressable onPress={() => urlBoot('GitHub')}>
        <Text>GitHub</Text>
      </Pressable>
    </View>
  );
};

export default DocScreen;
