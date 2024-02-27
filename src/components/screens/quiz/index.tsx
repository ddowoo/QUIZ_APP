import SafeBg from '../../blocks/safeArea';
// import Questions from '../../blocks/questions';
import {Suspense, lazy, useRef} from 'react';
import {Text} from 'react-native';
import Questions from '../../blocks/questions';

// const Questions = lazy(() => import('../../blocks/questions'));

const Quiz = () => {
  const timer = useRef(new Date());

  const stopQuiz = () => {
    // const raceTime = new Date() - timer.current
  };

  return (
    <SafeBg>
      <Questions />
    </SafeBg>
  );
};

export default Quiz;
