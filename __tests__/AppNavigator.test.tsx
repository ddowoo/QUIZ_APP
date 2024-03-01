/**
 * @format
 */
import {render, fireEvent} from '@testing-library/react-native';

import 'react-native';
import React, {useEffect} from 'react';

// Note: test renderer must be required after react-native.
import {RecoilRoot} from 'recoil';
import RootScreens from '@/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('App Navigator Test', () => {
  it('navigate Btn', () => {
    render(
      <RecoilRoot>
        <NavigationContainer>
          <RootScreens />
        </NavigationContainer>
      </RecoilRoot>,
    );
  });
});
