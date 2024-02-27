import {selector} from 'recoil';
import {getQuestionListFetch} from '../../api/quiz';
import pickQuizConfigState from './atom';

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

const quizQuestionListState = selector({
  key: 'QuizQuestionList',
  get: async ({get}) => {
    const {count, quizLevel} = get(pickQuizConfigState);

    const quizList = await getQuestionListFetch(count, quizLevel);

    return quizList.map(question => {
      const {correct_answer, incorrect_answers} = question;

      return {
        ...question,
        optionList: shuffle([correct_answer, ...incorrect_answers]),
      };
    });
  },
});

export default quizQuestionListState;
