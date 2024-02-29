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
          <Text style={styles.title}>문제수</Text>
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
          <Text style={styles.title}>난이도</Text>
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
        </View>
        <View>
          <FullWidthButton
            text="오답노트"
            type="ghost"
            onPress={onPressIncorrectNote}
            mb={10}
          />
          <FullWidthButton
            text="퀴즈풀기"
            onPress={onPressStartQuizBtn}
            testID="start quiz"
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
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
