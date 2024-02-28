import {atom} from 'recoil';

const defaultPickConffigState: {
  count: QuizCount;
  quizLevel: QuizLevel;
} = {
  count: '5',
  quizLevel: 'medium',
};

export const pickQuizConfigState = atom({
  key: 'quizConfig',
  default: defaultPickConffigState,
});

export const pickAnswerListState = atom<string[]>({
  key: 'pickAnswerList',
  default: [],
});

export const raceSecondsState = atom({
  key: 'raceTime',
  default: 0,
});
