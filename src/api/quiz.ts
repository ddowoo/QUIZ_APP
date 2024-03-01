import {quizAxios} from './axiosInstance';

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export type QuestionItem = Question & {optionList: string[]};

type OpenDbReturn = {
  response_code: number;
  results: Question[];
};

export const getQuestionListFetch = async (count: QuizCount, level: QuizLevel): Promise<QuestionItem[]> => {
  try {
    const params = {
      amount: count,
      difficulty: level,
      type: 'multiple',
    };

    const res = await quizAxios.get<OpenDbReturn>('', {params});

    if (res.data.response_code === 0) {
      return res.data.results.map(question => {
        const {correct_answer, incorrect_answers} = question;

        return {
          ...question,
          optionList: shuffle([correct_answer, ...incorrect_answers]),
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
