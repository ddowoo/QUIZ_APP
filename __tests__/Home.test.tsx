/**
 * @format
 */
import {render, fireEvent} from '@testing-library/react-native';

import 'react-native';
import React, {useEffect} from 'react';

// Note: test renderer must be required after react-native.
import Home from '../src/components/screens/home';
import {RecoilRoot, RecoilState, useRecoilValue} from 'recoil';
import {quizConfigState} from '@/recoil/quiz/atom';
import {RootStackParams} from '@/navigations/rootScreens';
import {StackNavigationProp} from '@react-navigation/stack';

const RecoilObserver = ({
  states,
  onChange,
}: {
  states: RecoilState<{
    count: QuizCount;
    level: QuizLevel;
  }>;
  onChange: jest.Mock;
}) => {
  const value = useRecoilValue(states);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

const navigation: StackNavigationProp<RootStackParams, 'home'> = {
  goBack: jest.fn(),
  getId: jest.fn(),
  removeListener: jest.fn(),
  addListener: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  isFocused: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  canGoBack: jest.fn(),
  navigate: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  dispatch: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
};

describe('Home Component Test', () => {
  it('quiz config change btn', () => {
    const onChange = jest.fn();
    const {getAllByLabelText} = render(
      <RecoilRoot>
        <RecoilObserver states={quizConfigState} onChange={onChange} />
        <Home navigation={navigation} route={{key: '', name: 'home'}} />
      </RecoilRoot>,
    );

    const countBntList = getAllByLabelText('count btn');
    const levelBtnList = getAllByLabelText('level btn');

    fireEvent(countBntList[1], 'press');
    fireEvent(levelBtnList[0], 'press');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith({count: 10, level: 'easy'});
  });
});
