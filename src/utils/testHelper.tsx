import {RootStackParams} from '@/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ReactNode, useEffect} from 'react';
import {QueryClientProvider} from 'react-query';
import {RecoilRoot, RecoilState, useRecoilValue} from 'recoil';
import {queryClient} from '../../App';

export const TestStack = createStackNavigator<RootStackParams>();

/**
 * @description Recoil, React-Navigation 셋팅 하기, 내부 요소 형식 example 참고 / TestStack Import 해서 사용
 * @example <TestStack.Screen name="home" component={Home} />
 */
export const wrapStackScreen = ({children}: {children?: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <TestStack.Navigator screenOptions={{headerShown: false}}>{children}</TestStack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export const RecoilObserver = ({
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
