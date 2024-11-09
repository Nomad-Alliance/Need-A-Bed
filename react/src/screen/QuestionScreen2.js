import '../../config/i18n';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import CheckBox from '../../config/CheckBox';
import Images from '../../config/Images';
import { getSheltersAPI } from '../helpers/getDjango';
import { globalSty } from '../style/globalStyle';

const intialState = {
  PC: false,
  Disabled: false,
  notEnglish: false,
  Deaf: false,
};

const QuestionScreenTwo = ({ navigation, route }) => {
  const form1Data = route.params.q1Data;
  const { t } = useTranslation();
  const [state, setState] = useState(intialState);
  const [toggleButton, setToggleButton] = useState(false);
  const { handleSubmit } = useForm(); // in the future want to implement any library hooked-form will be implement here

  const onsubmit = () => {
    const allData = Object.assign({}, form1Data, state);
    let shelterListURL = getSheltersAPI(allData);
    navigation.navigate('ShelterMap', { mapData: shelterListURL });
  };
  return (
    <View style={globalSty.container}>
      <ImageBackground
        source={Images.NABBackgroundLogo}
        resizeMode="cover"
        style={globalSty.image}
      >
        <View style={globalSty.pad}>
          <Text>{t('QuestionTran.text')}</Text>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, PC: !state.PC })}
              title={t('QuestionTran.PC')}
              isChecked={state.PC}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) =>
                setState({ ...state, Disabled: !state.Disabled })
              }
              title={t('QuestionTran.Disabled')}
              isChecked={state.Disabled}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) =>
                setState({ ...state, notEnglish: !state.notEnglish })
              }
              title={t('QuestionTran.notEnglish')}
              isChecked={state.notEnglish}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, Deaf: !state.Deaf })}
              title={t('QuestionTran.Deaf')}
              isChecked={state.Deaf}
            />
          </View>
          <Pressable
            title={t('QuestionTran.contBtn')}
            onPress={handleSubmit(onsubmit)}
            style={globalSty.Button} //handleSubmit from react hooked
          >
            <Text style={globalSty.btnText}>{t('QuestionTran.contBtn')}</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default QuestionScreenTwo;
