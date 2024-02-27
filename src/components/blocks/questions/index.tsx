import {FlatList, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import quizQuestionListState from '../../../recoil/quizes/selector';

const Questions = () => {
  const questionList = useRecoilValue(quizQuestionListState);

  console.log('questionList :', questionList);

  return (
    <FlatList
      data={questionList}
      scrollEnabled={false}
      renderItem={({item: {question, incorrect_answers, correct_answer}}) => {
        return <View></View>;
      }}
    />
  );
};

export default Questions;
