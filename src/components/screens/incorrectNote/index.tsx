import {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {deviceDB} from '../../../utils/deviceDB';
import {QuestionItem} from '../../../recoil/quiz/selector';
import SafeArea from '../../blocks/safeArea';

const {width: screenWidth} = Dimensions.get('window');

const IncorrectNote = () => {
  const [questionList, setQuestionList] = useState<null | QuestionItem[]>(null);

  useEffect(() => {
    async function getIncorrectQuestionList() {
      const res = await deviceDB.get('incorrectQuiz');
      const questionList: QuestionItem[] = res ? JSON.parse(res) : [];

      setQuestionList(questionList);
    }
    getIncorrectQuestionList();
  }, []);

  return (
    <SafeArea>
      <FlatList
        data={questionList}
        ListEmptyComponent={
          <View>
            <Text>없네용~</Text>
          </View>
        }
        renderItem={({
          item: {optionList, question, correct_answer},
          index: questionIdx,
        }) => {
          return (
            <View style={styles.questionPage}>
              <Text style={styles.question}>
                {`${questionIdx + 1}. ${question}`}
              </Text>
              {optionList.map((option, index) => {
                return (
                  <Pressable
                    disabled
                    style={styles.optionBtn}
                    key={`${question}_${option}`}>
                    <Text
                      style={
                        option === correct_answer
                          ? styles.correct
                          : styles.incorrect
                      }>
                      {index + 1}. {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          );
        }}
      />
    </SafeArea>
  );
};

export default IncorrectNote;

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
