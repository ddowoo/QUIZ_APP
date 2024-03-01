import SafeBg from '@/components/blocks/safeArea';
import {FullWidthButton} from '@/components/atoms/btn';
import {Suspense, lazy, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootScreens';
import {useRecoilValue} from 'recoil';
import {quizConfigState} from '@/recoil/quiz/atom';
import Loading from '@/components/loading';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';

type Props = StackScreenProps<RootStackParams, 'quiz'>;
const Questions = lazy(() => import('./components/questions'));

const Quiz = ({navigation}: Props) => {
  const {count} = useRecoilValue(quizConfigState);

  const [isSolving, setIsSolving] = useState(true);
  const [nowSolvingIndex, setNowSolvingIndex] = useState(0);

  const isLast = +count - 1 === nowSolvingIndex;

  const queryClient = useQueryClient();

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();

        Alert.alert(
          '메인화면으로 돌아가시겠습니까?',
          '퀴즈 기록은 전부 지워집니다.',
          [
            {
              text: '돌아가기',
              style: 'destructive',
              onPress: () => {
                navigation.dispatch(e.data.action);
                queryClient.removeQueries('quiz');
              },
            },
            {text: '계속 풀기', style: 'cancel', onPress: () => {}},
          ],
        );
      }),
    [navigation],
  );

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
      <Suspense fallback={<Loading />}>
        <Questions
          isSolving={isSolving}
          nowSolvingIndex={nowSolvingIndex}
          setIsSolving={setIsSolving}
        />
      </Suspense>
      {!isSolving && (
        <FullWidthButton
          mb={20}
          onPress={onPressNextQuestion}
          text={isLast ? '결과 보기' : '다음 문항'}
        />
      )}
    </SafeBg>
  );
};

export default Quiz;
