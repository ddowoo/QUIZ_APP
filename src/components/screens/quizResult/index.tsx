import {Text, Dimensions, View} from 'react-native';
import SafeArea from '../../blocks/safeArea';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/rootScreens';
import PieChart from 'react-native-pie-chart';
import {FullWidthButton} from '../../atoms/btn';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {
  pickAnswerListState,
  pickQuizConfigState,
  raceSecondsState,
} from '../../../recoil/quiz/atom';
import {
  QuestionItem,
  quizQuestionListState,
} from '../../../recoil/quiz/selector';
import {styles} from './style';
import {deviceDB} from '../../../utils/deviceDB';

const {width: screenWidth} = Dimensions.get('window');

type Props = StackScreenProps<RootStackParams, 'quizResult'>;

const QuizResult = ({navigation}: Props) => {
  const {count} = useRecoilValue(pickQuizConfigState);
  const quizQuestionList = useRecoilValue(quizQuestionListState);
  const userPickAnswerList = useRecoilValue(pickAnswerListState);
  const raceSeconds = useRecoilValue(raceSecondsState);

  const resetUserPickAnswerList = useResetRecoilState(pickAnswerListState);
  const resetRaceSeconds = useResetRecoilState(raceSecondsState);

  const correctCount = quizQuestionList.reduce((acc, question, idx) => {
    if (question.correct_answer === userPickAnswerList[idx]) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const series = [correctCount, +count - correctCount];
  const sliceColor = ['#19C084', '#ef4f52'];
  const legensdList = ['정답', '오답'];

  const summary = [
    {
      title: '소요시간',
      value: new Date(raceSeconds * 1000).toISOString().substring(14, 19),
    },
    {
      title: '정답',
      value: correctCount,
    },
    {
      title: '오답',
      value: +count - correctCount,
    },
  ];

  const onPressRetry = () => {
    navigation.replace('quiz');
    resetUserPickAnswerList();
    resetRaceSeconds();
  };

  const onPressGoBack = async () => {
    const dbIncorrectQuiz = await deviceDB.get('incorrectQuiz');
    const accIncorrectQuizList: QuestionItem[] = dbIncorrectQuiz
      ? JSON.parse(dbIncorrectQuiz)
      : [];

    console.log('accIncorrectQuizList');
    console.log(accIncorrectQuizList);

    const nowIncorrectQuizList = quizQuestionList.filter(
      ({correct_answer}, index) => {
        return correct_answer !== userPickAnswerList[index];
      },
    );
    console.log('nowIncorrectQuizList');
    console.log(nowIncorrectQuizList);
    accIncorrectQuizList.push(...nowIncorrectQuizList);

    console.log('acc');
    console.log(accIncorrectQuizList);

    await deviceDB.set('incorrectQuiz', JSON.stringify(accIncorrectQuizList));

    navigation.goBack();
  };

  return (
    <SafeArea>
      <View style={styles.bg}>
        <Text style={styles.title}>결과</Text>

        <View>
          <View style={styles.chartBox}>
            <PieChart
              widthAndHeight={screenWidth / 3}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
            <View style={styles.legendBox}>
              {legensdList.map((legend, index) => {
                return (
                  <View key={legend} style={styles.rowBox}>
                    <Text style={styles.legendText}>{legend}</Text>
                    <View
                      style={[
                        styles.legendColorBox,
                        {backgroundColor: sliceColor[index]},
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.valueBox}>
            {summary.map(({value, title}) => {
              return (
                <View key={title} style={styles.rowBox}>
                  <Text style={styles.summaryTitle}>{title} :</Text>
                  <Text>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View>
          <FullWidthButton
            onPress={onPressGoBack}
            text="돌아 가기"
            mb={10}
            type="ghost"
          />
          <FullWidthButton text="다시 풀기" onPress={onPressRetry} />
        </View>
      </View>
    </SafeArea>
  );
};

export default QuizResult;
