import {RecoilRoot} from 'recoil';
import RootScreens from './src/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import ErrorBoundary from 'react-native-error-boundary';
import Error from './src/components/error';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RecoilRoot>
            <RootScreens />
          </RecoilRoot>
        </NavigationContainer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
