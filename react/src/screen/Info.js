import '../../config/i18n';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { globalSty } from '../style/globalStyle';

const InfoScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={globalSty.container}>
      {/*<View style={globalSty.pic}>*/}
      {/*  <Image style={globalSty.slogo}*/}
      {/*         source={Images.logo}/>*/}
      {/*  <Image style={globalSty.xlogo}*/}
      {/*         source={Images.WSUlogo}/>*/}
      {/*</View>*/}

      <Text>Welcome to NAB, We hope it is helping</Text>
      <Text>
        This app/tool was designed and developed by College students at Weber
        State University in Partnership with the Nomad Alliance
      </Text>

      <Text>
        Dev Team: {'\n'}
        {'\n'}
        Students{'\n'}
        {'\t'}Matt {'\n'}
        {'\t'}Cayden{'\n'}
        {'\t'}Jaden{'\n'}
        {'\t'}Amanda{'\n'}
        {'\t'}Vipen{'\n'}
        {'\t'}Braden {'\n'}
        {'\n'}
        Advisoriers {'\n'}
        {'\t'} Harrison Smith {'\n'}
        {'\t'}Ted Cowan{'\n'}
      </Text>
      <Pressable onPress={() => navigation.navigate('Doc')}>
        <Text>Documantaion</Text>
      </Pressable>
    </View>
  );
};

export default InfoScreen;
