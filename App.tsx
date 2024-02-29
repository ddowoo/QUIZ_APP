import {RecoilRoot} from 'recoil';
import RootScreens from './src/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RecoilRoot>
          <RootScreens />
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
