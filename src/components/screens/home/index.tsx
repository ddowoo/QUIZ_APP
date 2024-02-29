import {StyleSheet, Text, View} from 'react-native';
import SafeArea from '../../blocks/safeArea';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/rootScreens';
import {useRecoilState} from 'recoil';
import {FullWidthButton, RowRadioButton} from '../../atoms/btn';
import {quizConfigState} from '../../../recoil/quiz/atom';

type Props = StackScreenProps<RootStackParams, 'home'>;

const QUIZ_COUNT_LIST: QuizCount[] = [5, 10, 15];
const QUIZ_LEVEL_LIST: QuizLevel[] = ['easy', 'medium', 'hard'];

const Home = ({navigation}: Props) => {
  const [quizConfig, setQuizConfig] = useRecoilState(quizConfigState);

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
            <Text style={styles.infoText}>
              * 문제수와 난이도를 선택 후 퀴즈풀기 버튼을 누르면 퀴즈가
              시작됩니다.
            </Text>
            <Text style={styles.infoText}>
              * 오답노트를 누르면 지금까지 틀린 문제를 모두 볼 수 있습니다.
            </Text>
          </View>
        </View>
        <View>
          <FullWidthButton
            text="오답노트"
            type="ghost"
            onPress={onPressIncorrectNote}
            mb={10}
            testID="incorrect btn"
          />
          <FullWidthButton
            text="퀴즈풀기"
            onPress={onPressStartQuizBtn}
            testID="quiz btn"
          />
        </View>
      </View>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  configTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  infoBox: {
    marginTop: 10,
  },
  infoText: {
    color: 'gray',
    fontSize: 11,
    marginVertical: 3,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
