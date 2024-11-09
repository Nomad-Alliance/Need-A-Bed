import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from "../src/screen/HomeScreen";
import LocScreen from '../src/screen/locScreen';
import QuestionScreen from '../src/screen/QuestionScreen';
import QuestionScreenTwo from '../src/screen/QuestionScreen2';

import App from '../App';
import { Button } from 'react-native';
import CheckBox from '../config/CheckBox';

jest.useFakeTimers();

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
describe('<HomeScreen />', () => {
  it('HomeScreen button click generates next screen', () => {
    const fakeNavigation = {
      navigate: jest.fn(),
    };
    const inst = renderer.create(<HomeScreen navigation={fakeNavigation}/>);
    const button = inst.root.findByType(Button);

    button.props.onPress();

    expect(fakeNavigation.navigate).toBeCalledWith('Location')

  });
  it('HomeScreen renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('<LocScreen />', () => {
  it('Either Location Screen button click generates next screen', () => {

    const fakeNavigation = {
      navigate: jest.fn(),
    };
    const inst = renderer.create(<LocScreen navigation={fakeNavigation}/>);
    const button = inst.root.findAllByType(Button);

    button.at(0).props.onPress();

    expect(fakeNavigation.navigate).toBeCalledWith('LocAuto')

    button.at(1).props.onPress();

    expect(fakeNavigation.navigate).toBeCalledWith('LocMan')
  });
  it('LocScreen renders correctly', () => {
    const tree = renderer.create(<LocScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('<QuestionScreen />', () => {
  it('QuestionScreen button click generates next screen', () => {
    const fakeHandle = {
      handleSubmit: jest.fn(),
    };
    const fakeNavigation = {
      navigate: jest.fn(),
    };

    const inst = renderer.create(<QuestionScreen handleSubmit={fakeHandle} navigation={fakeNavigation}/>);
    const button = inst.root.findByType(Button);

    button.props.onPress();

    expect(fakeHandle)
  });
  it('QuestionScreen renders correctly', () => {
    const tree = renderer.create(<QuestionScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('<QuestionScreenTwo />', () => {
  it('QuestionScreen2 button click generates next screen', () => {
    const route = {
      params: {
        q1Data: 'my-test-id'
      }
    };
    const fakeHandle = {
      handleSubmit: jest.fn(),
    };
    const fakeNavigation = {
      navigate: jest.fn(),
    };
    //const form1Data = null;

    const inst = renderer.create(<QuestionScreenTwo route={route} handleSubmit={fakeHandle} navigation={fakeNavigation}/>);
    const button = inst.root.findByType(Button);

    button.props.onPress();

    expect(fakeHandle)
  });
  it('QuestionScreenTwo renders correctly', () => {
    const route = {
      params: {
        q1Data: 'my-test-id'
      }
    };
    const tree = renderer.create(<QuestionScreenTwo route={route}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
