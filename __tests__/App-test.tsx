/**
 * @format
 */
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import 'react-native';
import React, {useEffect} from 'react';

// Note: test renderer must be required after react-native.
import Home from '../src/components/screens/home';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../src/navigations/rootScreens';
import {RecoilRoot, RecoilState, useRecoilValue} from 'recoil';
import {quizConfigState} from '../src/recoil/quiz/atom';

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

test('Home Component Test', () => {
  const onChange = jest.fn();
  const {getAllByLabelText} = render(
    <RecoilRoot>
      <RecoilObserver states={quizConfigState} onChange={onChange} />
      <Home navigation={undefined} route={{key: '', name: 'home'}} />
    </RecoilRoot>,
  );

  const countBntList = screen.getAllByLabelText('count btn');
  const levelBtnList = screen.getAllByLabelText('level btn');

  fireEvent(countBntList[1], 'press');
  fireEvent(levelBtnList[0], 'press');

  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenCalledWith({count: 10, level: 'easy'});
});
