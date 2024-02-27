import SafeBg from '../../blocks/safeArea';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import quizQuestionListState from '../../../recoil/quizes/selector';
import {useRecoilValue} from 'recoil';
import {FullWidthButton} from '../../atoms/btn';
import {useRef, useState} from 'react';

const {width: screenWidth} = Dimensions.get('window');

const Quiz = () => {
  const questionsRef = useRef<FlatList | null>(null);

  const [isSolving, setIsSolving] = useState(true);
  const [nowSolvingIndex, setNowSolvingIndex] = useState(0);

  const questionList = useRecoilValue(quizQuestionListState);

  const onPressOption = () => {
    setIsSolving(false);
  };

  const onPressNextQuestion = () => {
    console.log('nowSolvingIndex : ', nowSolvingIndex);
    questionsRef.current?.scrollToIndex({
      animated: true,
      index: nowSolvingIndex + 1,
    });

    setNowSolvingIndex(prev => prev + 1);
    setIsSolving(true);
  };

  return (
    <SafeBg>
      <FlatList
        ref={ref => (questionsRef.current = ref)}
        horizontal
        keyExtractor={item => item.question}
        data={questionList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index: questionIdx}) => {
          const {optionList, question, correct_answer} = item;
          return (
            <View style={styles.questionPage}>
              <Text style={styles.question}>
                {`${questionIdx + 1}. ${question}`}
              </Text>
              {optionList.map((option, index) => {
                return (
                  <Pressable
                    onPress={onPressOption}
                    style={styles.optionBtn}
                    key={`${question}_${option}`}>
                    <Text
                      style={
                        isSolving
                          ? styles.optionText
                          : option === correct_answer
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
      {!isSolving && (
        <FullWidthButton onPress={onPressNextQuestion} text="다음 문항" />
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
  optionBtn: {
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
  },
  correct: {
    color: '#19C084',
    fontSize: 16,
  },
  incorrect: {
    color: '#ef4f52',
    fontSize: 16,
  },
});
