import {RecoilRoot} from 'recoil';
import RootScreens from './src/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';

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
