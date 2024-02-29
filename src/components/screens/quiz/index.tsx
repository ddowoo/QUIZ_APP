import SafeBg from '../../blocks/safeArea';
import {Text} from 'react-native';
import {FullWidthButton} from '../../atoms/btn';
import {Suspense, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/rootScreens';
import Questions from './components/questions';
import {useRecoilValue} from 'recoil';
import {quizConfigState} from '../../../recoil/quiz/atom';

type Props = StackScreenProps<RootStackParams, 'quiz'>;

const Quiz = ({navigation}: Props) => {
  const {count} = useRecoilValue(quizConfigState);

  const [isSolving, setIsSolving] = useState(true);
  const [nowSolvingIndex, setNowSolvingIndex] = useState(0);

  const isLast = +count - 1 === nowSolvingIndex;

  const onPressNextQuestion = () => {
    if (!isLast) {
      setNowSolvingIndex(prev => prev + 1);
      setIsSolving(true);
    } else {
      navigation.replace('quizResult');
    }
  };

  return (
    <SafeBg>
      <Suspense
        fallback={
          <Text style={{fontSize: 30, color: 'red'}}>가져오는중!</Text>
        }>
        <Questions
          isSolving={isSolving}
          nowSolvingIndex={nowSolvingIndex}
          setIsSolving={setIsSolving}
        />
      </Suspense>
      {!isSolving && (
        <FullWidthButton
          onPress={onPressNextQuestion}
          text={isLast ? '결과 보기' : '다음 문항'}
        />
      )}
    </SafeBg>
  );
};

export default Quiz;
