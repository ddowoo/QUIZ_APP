import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import SafeArea from '../../blocks/safeArea';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/rootScreens';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import pickQuizConfigState from '../../../recoil/quizes/atom';
import {RadioButton} from 'react-native-paper';
import {useState} from 'react';
import {RowRadio} from '../../atoms/btn';

const {width: screenWidth} = Dimensions.get('screen');

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
              <RowRadio
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
              <RowRadio
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
      <TouchableOpacity style={styles.startBtn} onPress={onPressStartQuizBtn}>
        <Text style={styles.startBtnText}>퀴즈 풀기</Text>
      </TouchableOpacity>
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
  startBtn: {
    width: screenWidth - 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19C084',
    color: '#fff',
  },
  startBtnText: {
    color: '#fff',
  },
});
