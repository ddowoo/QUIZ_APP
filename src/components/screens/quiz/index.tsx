import SafeBg from '../../blocks/safeArea';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import quizQuestionListState from '../../../recoil/quizes/selector';
import {useRecoilValue} from 'recoil';
import {FullWidthButton} from '../../atoms/btn';
import {useState} from 'react';

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

const {width: screenWidth} = Dimensions.get('window');

const Quiz = () => {
  const [isSolving, setIsSolving] = useState(true);
  const questionList = useRecoilValue(quizQuestionListState);

  const onPressOption = () => {
    setIsSolving(false);
  };

  return (
    <SafeBg>
      <FlatList
        data={questionList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({
          item: {question, incorrect_answers, correct_answer},
          index: questionIdx,
        }) => {
          const optionList = shuffle([...incorrect_answers, correct_answer]);

          return (
            <View style={styles.questionPage}>
              <Text style={styles.question}>
                {`${questionIdx + 1}. ${question}`}
              </Text>
              {optionList.map((option, index) => {
                return (
                  <TouchableOpacity
                    onPress={onPressOption}
                    key={`${question}_${option}`}>
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
      {isSolving === false && (
        <FullWidthButton onPress={() => {}} text="다음 문항" />
      )}
    </SafeBg>
  );
};

export default Quiz;

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
  option: {
    marginVertical: 5,
    fontSize: 16,
  },
});
