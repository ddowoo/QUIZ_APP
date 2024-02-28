import {selector} from 'recoil';
import {getQuestionListFetch} from '../../api/quiz';
import {pickQuizConfigState} from './atom';

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export type QuestionItem = Question & {optionList: string[]};

export const quizQuestionListState = selector<QuestionItem[]>({
  key: 'QuizQuestionList',
  get: async ({get}) => {
    const {count, quizLevel} = get(pickQuizConfigState);

    const quizList = await getQuestionListFetch(count, quizLevel);

    console.log('보내자');
    return quizList.map(question => {
      const {correct_answer, incorrect_answers} = question;

      return {
        ...question,
        optionList: shuffle([correct_answer, ...incorrect_answers]),
      };
    });
  },
});
