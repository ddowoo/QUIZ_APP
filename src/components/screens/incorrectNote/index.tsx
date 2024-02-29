import {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {deviceDB} from '../../../utils/deviceDB';
import SafeArea from '../../blocks/safeArea';
import {useNavigation} from '@react-navigation/native';
import {QuestionItem} from '../../../api/quiz';

const {width: screenWidth} = Dimensions.get('window');

const ListEmptyComponent = () => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.emptyBg}>
      <Text style={styles.emptyText}>오답 기록이 없습니다.</Text>
      <TouchableOpacity onPress={goBack} style={styles.goBackBtn}>
        <Text style={styles.goBackText}>뒤로 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const IncorrectNote = () => {
  const [questionList, setQuestionList] = useState<null | QuestionItem[]>(null);

  useEffect(() => {
    getIncorrectQuestionList();
  }, []);

  const getIncorrectQuestionList = async () => {
    const res = await deviceDB.get('incorrectQuiz');
    const questionList: QuestionItem[] = res ? JSON.parse(res) : [];

    setQuestionList(questionList);
  };

  const onPressDel = async (idx: number) => {
    if (questionList) {
      const _questionList = [...questionList];
      _questionList.splice(idx, 1);

      deviceDB.set('incorrectQuiz', JSON.stringify(_questionList));

      getIncorrectQuestionList();
    }
  };

  return (
    <SafeArea>
      <FlatList
        data={questionList}
        ListEmptyComponent={<ListEmptyComponent />}
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
              <TouchableOpacity
                onPress={() => onPressDel(questionIdx)}
                style={{
                  backgroundColor: '#ef4f52',
                  alignSelf: 'flex-end',
                  padding: 8,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff'}}>제거</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeArea>
  );
};

export default IncorrectNote;

const styles = StyleSheet.create({
  emptyBg: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'gray',
  },
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
  goBackBtn: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#19C084',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
