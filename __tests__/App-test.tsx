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
import React from 'react';

// Note: test renderer must be required after react-native.
import Home from '../src/components/screens/home';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../src/navigations/rootScreens';
import {RecoilRoot} from 'recoil';

describe('퀴즈 시작 버튼 상태값 변경 후 퀴즈 호출 체크', () => {});
