import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import quizQuestionListState from '../../../recoil/quizes/selector';

function shuffle(array: []) {
  array.sort(() => Math.random() - 0.5);
}

const {width: screenWidth} = Dimensions.get('window');

const Questions = () => {
  const questionList = useRecoilValue(quizQuestionListState);

  console.log('questionList :', questionList);

  return (
    <FlatList
      data={questionList}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({
        item: {question, incorrect_answers, correct_answer},
        index: questionIdx,
      }) => {
        const optionList = [...incorrect_answers, correct_answer];

        return (
          <View style={styles.questionPage}>
            <Text style={styles.question}>
              {`${questionIdx + 1}. ${question}`}
            </Text>
            {optionList.map((option, index) => {
              return (
                <TouchableOpacity key={`${question}_${option}`}>
                  <Text style={styles.option}>
                    {index + 1}. {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    />
  );
};

export default Questions;

const styles = StyleSheet.create({
  questionPage: {
    width: screenWidth,
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    marginVertical: 5,
    fontSize: 16,
  },
});
