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
import RootScreens, {RootStackParams} from '@/navigations/rootScreens';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import IncorrectNote from '@/components/screens/incorrectNote';
import {act} from 'react-test-renderer';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

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

const Stack = createStackNavigator<RootStackParams>();

describe('Home Component Test', () => {
  it('quiz config btn', () => {
    const onChange = jest.fn();
    const {getAllByLabelText} = render(
      <RecoilRoot>
        <NavigationContainer>
          <RecoilObserver states={quizConfigState} onChange={onChange} />
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>,
    );

    const countBntList = getAllByLabelText('count btn');
    const levelBtnList = getAllByLabelText('level btn');

    fireEvent(countBntList[1], 'press');
    fireEvent(levelBtnList[0], 'press');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith({count: 10, level: 'easy'});
  });

  it('navigate btn', async () => {
    const {getByTestId} = render(
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="incorrectNote" component={IncorrectNote} />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>,
    );

    const navigateIncorrectNoteBtn = getByTestId('navigate incorrect note btn');

    await act(() => fireEvent(navigateIncorrectNoteBtn, 'press'));

    const totalIncorrectList = getByTestId('total incorrect list');

    expect(totalIncorrectList).toBeOnTheScreen();
  });
});
