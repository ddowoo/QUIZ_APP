import {StyleSheet, Text, View} from 'react-native';
import SafeArea from '../../blocks/safeArea';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/rootScreens';
import {useSetRecoilState} from 'recoil';
import {useState} from 'react';
import {FullWidthButton, RowRadioButton} from '../../atoms/btn';
import {pickQuizConfigState} from '../../../recoil/quiz/atom';

type Props = StackScreenProps<RootStackParams, 'home'>;

const QUIZ_COUNT_LIST: QuizCount[] = ['5', '10', '15'];
const QUIZ_LEVEL_LIST: QuizLevel[] = ['easy', 'medium', 'hard'];

const Home = ({navigation}: Props) => {
  const [pickQuizCount, setPickQuizCount] = useState<QuizCount>('5');
  const [pickQuizLevel, setPickQuizLevel] = useState<QuizLevel>('easy');

  const setQuizConfig = useSetRecoilState(pickQuizConfigState);

  const onPressQuizCount = (count: QuizCount) => {
    setPickQuizCount(count);
  };

  const onPressQuizLevel = (level: QuizLevel) => {
    setPickQuizLevel(level);
  };
  const onPressStartQuizBtn = () => {
    setQuizConfig({count: pickQuizCount, quizLevel: pickQuizLevel});
    navigation.navigate('quiz');
  };

  return (
    <SafeArea>
      <View style={styles.bg}>
        <Text style={styles.title}>문제수</Text>
        <View style={styles.selectBox}>
          {QUIZ_COUNT_LIST.map(count => {
            return (
              <RowRadioButton
                key={`quiz_count_${count}`}
                text={`${count} 개`}
                isChecked={pickQuizCount === count}
                value={count}
                onPress={() => onPressQuizCount(count)}
              />
            );
          })}
        </View>
        <Text style={styles.title}>난이도</Text>
        <View style={styles.selectBox}>
          {QUIZ_LEVEL_LIST.map(quizLevel => {
            return (
              <RowRadioButton
                key={`quiz_count_${quizLevel}`}
                text={quizLevel}
                isChecked={pickQuizLevel === quizLevel}
                value={quizLevel}
                onPress={() => onPressQuizLevel(quizLevel)}
              />
            );
          })}
        </View>
      </View>
      <FullWidthButton text="퀴즈풀기" onPress={onPressStartQuizBtn} />
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
