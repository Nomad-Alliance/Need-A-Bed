import '../../config/i18n';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import CheckBox from '../../config/CheckBox';
import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const intialState = {
  LGBTQ: false,
  Veteran: false,
  Victim_DV: false,
  Children: false,
  Pregnant: false,
  Dog: false,
};

const QuestionScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [state, setState] = useState(intialState);
  //const [toggleButton,setToggleButton] = useState(false)
  const { handleSubmit } = useForm(); //here initialize handlesubmit from react-hooked
  const onsubmit = () => {
    navigation.navigate('Accessibility', { q1Data: state });
  };

  return (
    <View style={globalSty.container}>
      <ImageBackground source={Images.NABBackgroundLogo} resizeMode="cover" style={globalSty.image}>
        <View style={globalSty.pad}>
          <Text>{t('QuestionTran.text')}</Text>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, LGBTQ: !state.LGBTQ })}
              title={t('QuestionTran.LGBTQ')}
              isChecked={state.LGBTQ}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, Veteran: !state.Veteran })}
              title={t('QuestionTran.Veteran')}
              isChecked={state.Veteran}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, Victim_DV: !state.Victim_DV })}
              title={t('QuestionTran.Victim_DV')}
              isChecked={state.Victim_DV}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, Children: !state.Children })}
              title={t('QuestionTran.Childern')}
              isChecked={state.Children}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, Pregnant: !state.Pregnant })}
              title={t('QuestionTran.Pregnant')}
              isChecked={state.Pregnant}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) => setState({ ...state, Dog: !state.Dog })}
              title={t('QuestionTran.Dog')}
              isChecked={state.Dog}
            />
          </View>
          <Pressable
            title={t('QuestionTran.contBtn')}
            onPress={handleSubmit(onsubmit)}
            style={globalSty.Button} //handlesubmit is from react hooked
          >
            <Text style={globalSty.btnText}>{t('QuestionTran.contBtn')}</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default QuestionScreen;
