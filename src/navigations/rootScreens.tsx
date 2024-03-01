import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@/components/screens/home';
import Quiz from '@/components/screens/quiz';
import QuizResult from '@/components/screens/quizResult';
import IncorrectNote from '@/components/screens/incorrectNote';

export type RootStackParams = {
  home: undefined;
  quiz: undefined;
  quizResult: undefined;
  incorrectNote: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RootScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="quiz" component={Quiz} />
      <Stack.Screen name="incorrectNote" component={IncorrectNote} />
      <Stack.Screen name="quizResult" component={QuizResult} />
    </Stack.Navigator>
  );
};

export default RootScreens;
