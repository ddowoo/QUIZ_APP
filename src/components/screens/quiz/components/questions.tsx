import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {
  pickAnswerListState,
  quizConfigState,
  raceSecondsState,
} from '@/recoil/quiz/atom';
import {useQuiz} from '@/hooks/queries/useQuiz';
import {QuestionItem} from '@/api/quiz';

const {width: screenWidth} = Dimensions.get('window');

type Props = {
  isSolving: boolean;
  nowSolvingIndex: number;
  setIsSolving: Dispatch<SetStateAction<boolean>>;
};

const Questions = ({isSolving, nowSolvingIndex, setIsSolving}: Props) => {
  const {count, level} = useRecoilValue(quizConfigState);
  const {data: questionList} = useQuiz(count, level);

  const flatListRef = useRef<FlatList>(null);
  const setPickAnswerList = useSetRecoilState(pickAnswerListState);
  const setRaceTime = useSetRecoilState(raceSecondsState);

  useEffect(() => {
    const startTime = new Date().getTime();

    return () => {
      const endTime = new Date().getTime();
      const raceTime = Math.round((endTime - startTime) / 1000);
      setRaceTime(raceTime);
    };
  }, [setRaceTime]);

  useEffect(() => {
    function moveNowQuestion(nowIndex: number) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: nowIndex,
      });
    }
    moveNowQuestion(nowSolvingIndex);
  }, [nowSolvingIndex]);

  const onPressOption = (pickOption: string) => {
    setPickAnswerList(prev => [...prev, pickOption]);
    setIsSolving(false);
  };

  return (
    <FlatList
      horizontal
      keyExtractor={item => item.question}
      data={questionList}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={({
        item: {optionList, question, correct_answer},
        index: questionIdx,
      }: {
        item: QuestionItem;
        index: number;
      }) => {
        return (
          <View style={styles.questionPage}>
            <Text style={styles.question}>
              {`${questionIdx + 1}. ${question}`}
            </Text>
            {optionList.map((option, index) => {
              return (
                <Pressable
                  disabled={!isSolving}
                  onPress={() => onPressOption(option)}
                  style={styles.optionBtn}
                  key={`${question}_${option}`}>
                  {isSolving ? (
                    <Text>
                      {index + 1}. {option}
                    </Text>
                  ) : (
                    <Text
                      style={
                        option === correct_answer
                          ? styles.correct
                          : styles.incorrect
                      }>
                      {index + 1}. {option}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        );
      }}
      ref={flatListRef}
    />
  );
};

export default Questions;

const styles = StyleSheet.create({
  questionPage: {
    width: screenWidth,
    padding: 20,
    flex: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionBtn: {
    marginVertical: 5,
  },

  correct: {
    color: '#19C084',
  },
  incorrect: {
    color: '#ef4f52',
  },
});
