/**
 * @format
 */
import {render} from '@testing-library/react-native';
import React from 'react';

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
