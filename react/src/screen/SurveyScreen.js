import '../../config/i18n';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import CheckBox from '../../config/CheckBox';
import Images from '../../config/Images';
import { globalSty } from '../style/globalStyle';

const intialState = {
  No_Room: false,
  No_Shelter: false,
  Felt_Safe: false,
  Felt_Discriminated: false,
};

const SurveyScreen = ({ navigation }) => {
  const [comment, onChangeText] = useState('');
  const { t } = useTranslation();
  const [state, setState] = useState(intialState);
  const { handleSubmit } = useForm(); //here initialize handlesubmit from react-hooked
  const onsubmit = () => {
    navigation.navigate('Home');
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
              onPress={(value) =>
                setState({ ...state, No_Room: !state.No_Room })
              }
              title={t('QuestionTran.No_Room')}
              isChecked={state.No_Room}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) =>
                setState({ ...state, No_Shelter: !state.No_Shelter })
              }
              title={t('QuestionTran.No_Shelter')}
              isChecked={state.No_Shelter}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) =>
                setState({ ...state, Felt_Safe: !state.Felt_Safe })
              }
              title={t('QuestionTran.Felt_Safe')}
              isChecked={state.Felt_Safe}
            />
          </View>
          <View style={globalSty.CheckBoxForm}>
            <CheckBox
              onPress={(value) =>
                setState({
                  ...state,
                  Felt_Discriminated: !state.Felt_Discriminated,
                })
              }
              title={t('QuestionTran.Felt_Discriminated')}
              isChecked={state.Felt_Discriminated}
            />
          </View>

          <TextInput
            style={globalSty.inputSurvey}
            onChangeText={onChangeText}
            value={comment}
            placeholder={t('QuestionTran.OtherFeedback')}
          />

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

export default SurveyScreen;
