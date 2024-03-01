import {RootStackParams} from '@/navigations/rootScreens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ReactNode, useEffect} from 'react';
import {RecoilRoot, RecoilState, useRecoilValue} from 'recoil';

const Stack = createStackNavigator<RootStackParams>();

/**
 * @description Recoil, React-Navigation 셋팅 하기, 내부 요소 형식 example 참고
 * @example <Stack.Screen name="home" component={Home} />
 */
export const stackScreenWrapper = ({children}: {children: ReactNode}) => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {children}
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
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
