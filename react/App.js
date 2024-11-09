import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ConfirmScreen from './src/screen/ConfirmScreen';
import DocScreen from './src/screen/Doc';
import Home from './src/screen/HomeScreen';
import InfoScreen from './src/screen/Info';
import Loc from './src/screen/locScreen';
import Loc_auto from './src/screen/locScreen_auto';
import Loc_man from './src/screen/locScreen_man';
import OSM_Screen from './src/screen/OSM_Screen';
import PlaceScreen from './src/screen/PlaceScreen';
import QuestionScreen from './src/screen/QuestionScreen';
import QuestionScreenTwo from './src/screen/QuestionScreen2';
import SurveyScreen from './src/screen/SurveyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Doc" component={DocScreen} />
        <Stack.Screen name="Demographics" component={QuestionScreen} />
        <Stack.Screen name="Accessibility" component={QuestionScreenTwo} />
        <Stack.Screen name="Location" component={Loc} />
        <Stack.Screen name="LocAuto" component={Loc_auto} />
        <Stack.Screen name="LocMan" component={Loc_man} />
        <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        <Stack.Screen name="ShelterMap" component={OSM_Screen} />
        <Stack.Screen name="ShelterItem" component={PlaceScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="PostSurvey" component={SurveyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
