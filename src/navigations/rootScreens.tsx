import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/screens/home';
import Quiz from '../components/screens/quiz';

export type RootStackParams = {
  home: undefined;
  quiz: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RootScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="quiz" component={Quiz} />
    </Stack.Navigator>
  );
};

export default RootScreens;
