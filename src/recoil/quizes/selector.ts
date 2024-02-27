import {selector} from 'recoil';
import {getQuizListFetch} from '../../api/quiz';
import pickQuizConfigState from './atom';

const quizQuestionListState = selector({
  key: 'QuizQuestionList',
  get: async ({get}) => {
    const {count, quizLevel} = get(pickQuizConfigState);

    const quizList = await getQuizListFetch(count, quizLevel);

    return quizList;
  },
});

export default quizQuestionListState;
