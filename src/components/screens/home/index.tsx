import {Text, View} from 'react-native';
import SafeArea from '@/components/blocks/safeArea';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootScreens';
import {useRecoilState} from 'recoil';
import {FullWidthButton, RowRadioButton} from '@/components/atoms/btn';
import {quizConfigState} from '@/recoil/quiz/atom';
import {styles} from './style';
import {useFocusEffect} from '@react-navigation/native';
import {useQueryClient} from 'react-query';

type Props = StackScreenProps<RootStackParams, 'home'>;

const QUIZ_COUNT_LIST: QuizCount[] = [5, 10, 15];
const QUIZ_LEVEL_LIST: QuizLevel[] = ['easy', 'medium', 'hard'];

const Home = ({navigation}: Props) => {
  const [quizConfig, setQuizConfig] = useRecoilState(quizConfigState);

  const queryClient = useQueryClient();

  useFocusEffect(() => {
    queryClient.removeQueries('quiz');
  });

  const onPressQuizCount = (count: QuizCount) => {
    setQuizConfig(prev => ({...prev, count}));
  };

  const onPressQuizLevel = (level: QuizLevel) => {
    setQuizConfig(prev => ({...prev, level}));
  };

  const onPressStartQuizBtn = () => {
    navigation.navigate('quiz');
  };

  const onPressIncorrectNote = () => {
    navigation.navigate('incorrectNote');
  };

  return (
    <SafeArea>
      <View style={styles.bg}>
        <View>
          <Text style={styles.configTitle}>문제수</Text>
          <View style={styles.selectBox}>
            {QUIZ_COUNT_LIST.map(count => {
              return (
                <RowRadioButton
                  accessibilityLabel="count btn"
                  key={`count_${count}`}
                  text={`${count} 개`}
                  isChecked={quizConfig.count === count}
                  value={quizConfig.count.toString()}
                  onPress={() => onPressQuizCount(count)}
                />
              );
            })}
          </View>
          <Text style={styles.configTitle}>난이도</Text>
          <View style={styles.selectBox}>
            {QUIZ_LEVEL_LIST.map(level => {
              return (
                <RowRadioButton
                  accessibilityLabel="level btn"
                  key={`level_${level}`}
                  text={level}
                  isChecked={quizConfig.level === level}
                  value={quizConfig.level.toString()}
                  onPress={() => onPressQuizLevel(level)}
                />
              );
            })}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>* 문제수와 난이도를 선택 후 퀴즈풀기 버튼을 누르면 퀴즈가 시작됩니다.</Text>
            <Text style={styles.infoText}>* 오답노트를 누르면 지금까지 틀린 문제를 모두 볼 수 있습니다.</Text>
          </View>
        </View>
        <View>
          <FullWidthButton
            text="오답노트"
            type="ghost"
            onPress={onPressIncorrectNote}
            mb={10}
            testID="navigate incorrect note btn"
          />
          <FullWidthButton text="퀴즈풀기" onPress={onPressStartQuizBtn} testID="quiz btn" />
        </View>
      </View>
    </SafeArea>
  );
};

export default Home;
