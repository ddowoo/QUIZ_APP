import {RecoilRoot} from 'recoil';
import RootScreens from './src/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';
import {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <RootScreens />
      </RecoilRoot>
    </NavigationContainer>
  );
};

export default App;
