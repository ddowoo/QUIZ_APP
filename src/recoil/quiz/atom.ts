import {atom} from 'recoil';

const defaultQuizConfigState: {
  count: QuizCount;
  level: QuizLevel;
} = {
  count: 5,
  level: 'easy',
};

export const quizConfigState = atom({
  key: 'quizConfig',
  default: defaultQuizConfigState,
});

export const pickAnswerListState = atom<string[]>({
  key: 'pickAnswerList',
  default: [],
});

export const raceSecondsState = atom({
  key: 'raceTime',
  default: 0,
});
