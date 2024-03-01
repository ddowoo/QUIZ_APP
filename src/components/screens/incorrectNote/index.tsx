import {useEffect, useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {deviceDB} from '@/utils/deviceDB';
import SafeArea from '@/components/blocks/safeArea';
import {useNavigation} from '@react-navigation/native';
import {QuestionItem} from '@/api/quiz';
import {styles} from './style';
import {RootStackParams} from '@/navigations/rootScreens';
import {StackScreenProps} from '@react-navigation/stack';

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

type Props = StackScreenProps<RootStackParams, 'incorrectNote'>;

const IncorrectNote = ({}: Props) => {
  const [questionList, setQuestionList] = useState<null | QuestionItem[]>(null);

  useEffect(() => {
    getIncorrectQuestionList();
  }, []);

  const getIncorrectQuestionList = async () => {
    const res = await deviceDB.get('incorrectQuiz');
    const _questionList: QuestionItem[] = res ? JSON.parse(res) : [];

    setQuestionList(_questionList);
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
        testID={'total incorrect list'}
        data={questionList}
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={({item: {optionList, question, correct_answer}, index: questionIdx}) => {
          return (
            <View style={styles.questionPage}>
              <Text style={styles.question}>{`${questionIdx + 1}. ${question}`}</Text>
              {optionList.map((option, index) => {
                return (
                  <Pressable disabled style={styles.optionBtn} key={`${question}_${option}`}>
                    <Text style={option === correct_answer ? styles.correct : styles.incorrect}>
                      {index + 1}. {option}
                    </Text>
                  </Pressable>
                );
              })}
              <TouchableOpacity onPress={() => onPressDel(questionIdx)} style={styles.delBtn}>
                <Text style={styles.delText}>제거</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeArea>
  );
};

export default IncorrectNote;
