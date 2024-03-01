import {Text, Dimensions, View} from 'react-native';
import SafeArea from '@/components/blocks/safeArea';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootScreens';
import PieChart from 'react-native-pie-chart';
import {FullWidthButton} from '@/components/atoms/btn';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {pickAnswerListState, quizConfigState, raceSecondsState} from '@/recoil/quiz/atom';

import {styles} from './style';
import {deviceDB} from '@/utils/deviceDB';
import {useQuiz} from '@/hooks/queries/useQuiz';
import {QuestionItem} from '@/api/quiz';
import {commonStyle} from '@/constants/style';

const {width: screenWidth} = Dimensions.get('window');

type Props = StackScreenProps<RootStackParams, 'quizResult'>;

const QuizResult = ({navigation}: Props) => {
  const {count, level} = useRecoilValue(quizConfigState);

  const {data: quizQuestionList} = useQuiz(count, level);

  const pickAnswerList = useRecoilValue(pickAnswerListState);
  const raceSeconds = useRecoilValue(raceSecondsState);

  const resetRaceSeconds = useResetRecoilState(raceSecondsState);

  const correctCount =
    quizQuestionList?.reduce((acc, question, idx) => {
      if (question.correct_answer === pickAnswerList[idx]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0) ?? 0;

  const series = [correctCount, +count - correctCount];
  const sliceColor = [commonStyle.KEY_COLOR, commonStyle.SUB_COLOR];
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
    resetRaceSeconds();
  };

  const onPressGoBack = async () => {
    if (quizQuestionList) {
      const dbIncorrectQuiz = await deviceDB.get('incorrectQuiz');
      const accIncorrectQuizList: QuestionItem[] = dbIncorrectQuiz ? JSON.parse(dbIncorrectQuiz) : [];

      const nowIncorrectQuizList = quizQuestionList?.filter(({correct_answer}, index) => {
        return correct_answer !== pickAnswerList[index];
      });

      accIncorrectQuizList.push(...nowIncorrectQuizList);

      await deviceDB.set('incorrectQuiz', JSON.stringify(accIncorrectQuizList));
    }
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
              coverFill={commonStyle.WHITE}
            />
            <View style={styles.legendBox}>
              {legensdList.map((legend, index) => {
                return (
                  <View key={legend} style={styles.rowBox}>
                    <Text style={styles.legendText}>{legend}</Text>
                    <View style={[styles.legendColorBox, {backgroundColor: sliceColor[index]}]} />
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
          <FullWidthButton onPress={onPressGoBack} text="돌아가기" mb={10} type="ghost" />
          <FullWidthButton text="다시 풀기" onPress={onPressRetry} />
        </View>
      </View>
    </SafeArea>
  );
};

export default QuizResult;
