import {atom} from 'recoil';

const defaultConffigState: {
  count: QuizCount;
  quizLevel: QuizLevel;
} = {
  count: '5',
  quizLevel: 'medium',
};

const pickQuizConfigState = atom({
  key: 'quizConfig',
  default: defaultConffigState,
});

export default pickQuizConfigState;
