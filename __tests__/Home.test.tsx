/**
 * @format
 */
import {render, fireEvent} from '@testing-library/react-native';

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import Home from '../src/components/screens/home';
import {quizConfigState} from '@/recoil/quiz/atom';
import IncorrectNote from '@/components/screens/incorrectNote';
import {act} from 'react-test-renderer';
import '@testing-library/jest-native/extend-expect';
import {RecoilObserver, TestStack, wrapStackScreen} from '@/utils/testHelper';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Home Component Test', () => {
  it('quiz config btn', () => {
    const onChange = jest.fn();

    const children = (
      <TestStack.Screen name="home">
        {props => (
          <>
            <RecoilObserver onChange={onChange} states={quizConfigState} />
            <Home {...props} />
          </>
        )}
      </TestStack.Screen>
    );

    const {getAllByLabelText} = render(wrapStackScreen({children}));

    const countBntList = getAllByLabelText('count btn');
    const levelBtnList = getAllByLabelText('level btn');

    fireEvent(countBntList[1], 'press');
    fireEvent(levelBtnList[0], 'press');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith({count: 10, level: 'easy'});
  });

  it('navigate btn', async () => {
    const children = (
      <>
        <TestStack.Screen name="home" component={Home} />
        <TestStack.Screen name="incorrectNote" component={IncorrectNote} />
      </>
    );

    const {getByTestId} = render(wrapStackScreen({children}));

    const navigateIncorrectNoteBtn = getByTestId('navigate incorrect note btn');
    await act(() => fireEvent(navigateIncorrectNoteBtn, 'press'));

    const totalIncorrectList = getByTestId('total incorrect list');
    expect(totalIncorrectList).toBeOnTheScreen();
  });
});
